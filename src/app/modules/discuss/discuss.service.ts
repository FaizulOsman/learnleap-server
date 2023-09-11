/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { SortOrder } from 'mongoose';
import { IDiscuss, IDiscussFilters } from './discuss.interface';
import { Discuss } from './discuss.model';
import httpStatus from 'http-status';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { discussSearchableFields } from './discuss.constants';
import { IGenericResponse } from '../../../interfaces/common';
import ApiError from '../../../errors/apiError';
import { paginationHelper } from '../../../helper/paginationHelper';

// Create Discuss
const createDiscuss = async (payload: IDiscuss): Promise<IDiscuss | null> => {
  const result = await Discuss.create(payload);
  return result;
};

// Get All Discusses (can also filter)
const getAllDiscusses = async (
  filters: IDiscussFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IDiscuss[]>> => {
  // Try not to use any
  const { searchTerm, ...filtersData } = filters;

  const andConditions = []; // Try not to use any

  if (searchTerm) {
    andConditions?.push({
      $or: discussSearchableFields?.map(field => ({
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

  const result = await Discuss.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Discuss.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Get Single Discuss
const getSingleDiscuss = async (id: string): Promise<IDiscuss | null> => {
  const result = await Discuss.findById(id);

  return result;
};

const updateDiscuss = async (
  id: string,
  payload: Partial<IDiscuss>
): Promise<IDiscuss | null> => {
  const isExist = await Discuss.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Discuss not found');
  }

  const result = await Discuss.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

// Delete Discuss
const deleteDiscuss = async (id: string): Promise<IDiscuss | null> => {
  const result = await Discuss.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Discuss Not Found');
  }
  return result;
};

export const DiscussService = {
  createDiscuss,
  getAllDiscusses,
  getSingleDiscuss,
  updateDiscuss,
  deleteDiscuss,
};
