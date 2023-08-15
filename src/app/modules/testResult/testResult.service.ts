/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { SortOrder } from 'mongoose';
import { ITestResult, ITestResultFilters } from './testResult.interface';
import { TestResult } from './testResult.model';
import httpStatus from 'http-status';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { testResultSearchableFields } from './testResult.constants';
import { IGenericResponse } from '../../../interfaces/common';
import { User } from '../user/user.model';
import ApiError from '../../../errors/apiError';
import { paginationHelper } from '../../../helper/paginationHelper';
import { Test } from '../test/test.model';

// Create TestResult
const createTestResult = async (
  payload: ITestResult,
  verifiedUser: any
): Promise<ITestResult | null> => {
  // Check is user exist
  const user = await User.find({ _id: verifiedUser.id });
  if (user.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  // Check is test exist
  const test = await Test.find({ _id: payload.testId });
  if (test.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Test not found');
  }

  // Check is result exist
  const testResult = await TestResult.find({
    $and: [{ testId: payload.testId }, { email: payload.email }],
  });
  console.log(testResult);
  if (testResult.length > 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'You have already submitted');
  }

  const result = await TestResult.create(payload);
  return result;
};

// Get All TestResults (can also filter)
const getAllTestResults = async (
  filters: ITestResultFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ITestResult[]>> => {
  // Try not to use any
  const { searchTerm, ...filtersData } = filters;

  const andConditions = []; // Try not to use any

  if (searchTerm) {
    andConditions?.push({
      $or: testResultSearchableFields?.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => {
        return { [field]: value };
      }),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: '' | { [key: string]: SortOrder } = sortBy &&
    sortOrder && { [sortBy]: sortOrder };

  const whereCondition =
    andConditions?.length > 0 ? { $and: andConditions } : {};

  const result = await TestResult.find(whereCondition)
    .populate('reviews')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await TestResult.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Get Single TestResult
const getSingleTestResult = async (id: string): Promise<ITestResult | null> => {
  const result = await TestResult.findById(id).populate('reviews');
  console.log(result);
  return result;
};

const updateTestResult = async (
  id: string,
  payload: Partial<ITestResult>
): Promise<ITestResult | null> => {
  const isExist = await TestResult.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'TestResult not found');
  }

  const result = await TestResult.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate('reviews');

  return result;
};

// Delete TestResult
const deleteTestResult = async (id: string): Promise<ITestResult | null> => {
  const result = await TestResult.findByIdAndDelete(id).populate('reviews');
  if (!result) {
    throw new ApiError(httpStatus.FORBIDDEN, 'TestResult Not Found');
  }
  return result;
};

const addReview = async (
  id: string,
  payload: Partial<ITestResult>
): Promise<ITestResult | null> => {
  const isExist = await TestResult.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'TestResult not found');
  }

  const result = await TestResult.findOneAndUpdate(
    { _id: id },
    { $push: { reviews: payload } },
    {
      new: true,
    }
  ).populate('reviews');
  console.log(result);
  return result;
};

export const TestResultService = {
  createTestResult,
  getAllTestResults,
  getSingleTestResult,
  updateTestResult,
  deleteTestResult,
  addReview,
};
