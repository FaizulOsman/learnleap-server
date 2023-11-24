/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { SortOrder } from 'mongoose';
import { IFaq, IFaqFilters } from './faq.interface';
import { Faq } from './faq.model';
import httpStatus from 'http-status';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { faqSearchableFields } from './faq.constants';
import { IGenericResponse } from '../../../interfaces/common';
import { User } from '../user/user.model';
import ApiError from '../../../errors/apiError';
import { paginationHelper } from '../../../helper/paginationHelper';

// Create Faq
const createFaq = async (
  payload: IFaq,
  verifiedUser: any
): Promise<IFaq | null> => {
  const user = await User.find({ _id: verifiedUser.id });
  if (user.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await Faq.create(payload);
  return result;
};

// Get All Faqs (can also filter)
const getAllFaqs = async (
  filters: IFaqFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IFaq[]>> => {
  // Try not to use any
  const { searchTerm, ...filtersData } = filters;

  const andConditions = []; // Try not to use any

  if (searchTerm) {
    andConditions?.push({
      $or: faqSearchableFields?.map(field => ({
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

  const result = await Faq.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Faq.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Get Single Faq
const getSingleFaq = async (id: string): Promise<IFaq | null> => {
  const result = await Faq.findById(id);

  return result;
};

const updateFaq = async (
  id: string,
  payload: Partial<IFaq>
): Promise<IFaq | null> => {
  const isExist = await Faq.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Faq not found');
  }

  const result = await Faq.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

// Delete Faq
const deleteFaq = async (id: string): Promise<IFaq | null> => {
  const result = await Faq.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Faq Not Found');
  }
  return result;
};

export const FaqService = {
  createFaq,
  getAllFaqs,
  getSingleFaq,
  updateFaq,
  deleteFaq,
};
