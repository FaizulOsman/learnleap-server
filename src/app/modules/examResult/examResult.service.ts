/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { SortOrder } from 'mongoose';
import { IExamResult, IExamResultFilters } from './examResult.interface';
import { ExamResult } from './examResult.model';
import httpStatus from 'http-status';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { examResultSearchableFields } from './examResult.constants';
import { IGenericResponse } from '../../../interfaces/common';
import { User } from '../user/user.model';
import ApiError from '../../../errors/apiError';
import { paginationHelper } from '../../../helper/paginationHelper';
import { Exam } from '../exam/exam.model';

// Create ExamResult
const createExamResult = async (
  payload: IExamResult,
  verifiedUser: any
): Promise<IExamResult | null> => {
  // Check is user exist
  const user = await User.find({ _id: verifiedUser.id });
  if (user.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  // Check is exam exist
  const exam = await Exam.find({ _id: payload.examId });
  if (exam.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Exam not found');
  }

  // Check is result exist
  const examResult = await ExamResult.find({
    $and: [{ examId: payload.examId }, { email: payload.email }],
  });
  if (examResult.length > 0) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'You have already submitted the exam!'
    );
  }

  const result = await ExamResult.create(payload);
  return result;
};

// Get All ExamResults (can also filter)
const getAllExamResults = async (
  filters: IExamResultFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IExamResult[]>> => {
  // Try not to use any
  const { searchTerm, ...filtersData } = filters;

  const andConditions = []; // Try not to use any

  if (searchTerm) {
    andConditions?.push({
      $or: examResultSearchableFields?.map(field => ({
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

  const result = await ExamResult.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await ExamResult.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Get Single ExamResult
const getSingleExamResult = async (
  id: string,
  verifiedUser: any
): Promise<IExamResult | null> => {
  const result = await ExamResult.findOne({
    examId: id,
    email: verifiedUser?.email,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No Data Found!');
  }

  return result;
};

const updateExamResult = async (
  id: string,
  payload: Partial<IExamResult>
): Promise<IExamResult | null> => {
  const isExist = await ExamResult.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'ExamResult not found');
  }

  const result = await ExamResult.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate('reviews');

  return result;
};

// Delete ExamResult
const deleteExamResult = async (id: string): Promise<IExamResult | null> => {
  const result = await ExamResult.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(httpStatus.FORBIDDEN, 'ExamResult Not Found');
  }
  return result;
};

const addReview = async (
  id: string,
  payload: Partial<IExamResult>
): Promise<IExamResult | null> => {
  const isExist = await ExamResult.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'ExamResult not found');
  }

  const result = await ExamResult.findOneAndUpdate(
    { _id: id },
    { $push: { reviews: payload } },
    {
      new: true,
    }
  ).populate('reviews');

  return result;
};

// My Submitted examResults (can also filter)
const mySubmittedResults = async (
  verifiedUser: any
): Promise<IExamResult[]> => {
  const result = await ExamResult.find({ email: verifiedUser?.email });

  return result;
};

export const ExamResultService = {
  createExamResult,
  getAllExamResults,
  getSingleExamResult,
  updateExamResult,
  deleteExamResult,
  addReview,
  mySubmittedResults,
};
