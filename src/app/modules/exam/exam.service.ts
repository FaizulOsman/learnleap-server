/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { SortOrder } from 'mongoose';
import { IExam, IExamFilters } from './exam.interface';
import { Exam } from './exam.model';
import httpStatus from 'http-status';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { examSearchableFields } from './exam.constants';
import { IGenericResponse } from '../../../interfaces/common';
import { User } from '../user/user.model';
import ApiError from '../../../errors/apiError';
import { paginationHelper } from '../../../helper/paginationHelper';

// Create Exam
const createExam = async (
  payload: IExam,
  verifiedUser: any
): Promise<IExam | null> => {
  const user = await User.find({ _id: verifiedUser.id });
  if (user.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await Exam.create(payload);
  return result;
};

// Get All Exams (can also filter)
const getAllExams = async (
  filters: IExamFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IExam[]>> => {
  // Try not to use any
  const { searchTerm, ...filtersData } = filters;

  const andConditions = []; // Try not to use any

  if (searchTerm) {
    andConditions?.push({
      $or: examSearchableFields?.map(field => ({
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

  const result = await Exam.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Exam.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Get Single Exam
const getSingleExam = async (id: string): Promise<IExam | null> => {
  const result = await Exam.findById(id);

  return result;
};

const updateExam = async (
  id: string,
  payload: Partial<IExam>
): Promise<IExam | null> => {
  const isExist = await Exam.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Exam not found');
  }

  const result = await Exam.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

// Delete Exam
const deleteExam = async (id: string): Promise<IExam | null> => {
  const result = await Exam.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Exam Not Found');
  }
  return result;
};

const addResult = async (
  id: string,
  payload: Partial<IExam>,
  verifiedUser: any
): Promise<IExam | null> => {
  const isExist = await Exam.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Exam not found');
  }

  // Check is result exist
  const isMyResultExist = await isExist.results?.find(
    r => r.email === verifiedUser.email
  );
  if (isMyResultExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'You have already submitted the exam!'
    );
  }

  const result = await Exam.findOneAndUpdate(
    { _id: id },
    { $push: { results: payload } },
    {
      new: true,
    }
  );

  return result;
};

export const ExamService = {
  createExam,
  getAllExams,
  getSingleExam,
  updateExam,
  deleteExam,
  addResult,
};
