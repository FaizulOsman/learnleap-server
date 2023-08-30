/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { SortOrder } from 'mongoose';
import { ITest, ITestFilters } from './test.interface';
import { Test } from './test.model';
import httpStatus from 'http-status';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { testSearchableFields } from './test.constants';
import { IGenericResponse } from '../../../interfaces/common';
import { User } from '../user/user.model';
import ApiError from '../../../errors/apiError';
import { paginationHelper } from '../../../helper/paginationHelper';

// Create Test
const createTest = async (
  payload: ITest,
  verifiedUser: any
): Promise<ITest | null> => {
  const user = await User.find({ _id: verifiedUser.id });
  if (user.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await Test.create(payload);
  return result;
};

// Get All Tests (can also filter)
const getAllTests = async (
  filters: ITestFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ITest[]>> => {
  // Try not to use any
  const { searchTerm, ...filtersData } = filters;

  const andConditions = []; // Try not to use any

  if (searchTerm) {
    andConditions?.push({
      $or: testSearchableFields?.map(field => ({
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

  const result = await Test.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Test.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Get Single Test
const getSingleTest = async (id: string): Promise<ITest | null> => {
  const result = await Test.findById(id);

  return result;
};

const updateTest = async (
  id: string,
  payload: Partial<ITest>
): Promise<ITest | null> => {
  const isExist = await Test.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Test not found');
  }

  const result = await Test.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

// Delete Test
const deleteTest = async (id: string): Promise<ITest | null> => {
  const result = await Test.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Test Not Found');
  }
  return result;
};

const addResult = async (
  id: string,
  payload: Partial<ITest>,
  verifiedUser: any
): Promise<ITest | null> => {
  const isExist = await Test.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Test not found');
  }

  // Check is result exist
  const isMyResultExist = await isExist.results?.find(
    r => r.email === verifiedUser.email
  );
  if (isMyResultExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'You have already submitted the test!'
    );
  }

  const result = await Test.findOneAndUpdate(
    { _id: id },
    { $push: { results: payload } },
    {
      new: true,
    }
  );

  return result;
};

const getTestBySubject = async (subject: string): Promise<any> => {
  const result = await Test.find({ subject: subject });

  let total = 0;
  result.forEach(test => {
    total += test.questions.length;
  });

  return {
    meta: {
      total,
    },
    data: result,
  };
};

export const TestService = {
  createTest,
  getAllTests,
  getSingleTest,
  updateTest,
  deleteTest,
  addResult,
  getTestBySubject,
};
