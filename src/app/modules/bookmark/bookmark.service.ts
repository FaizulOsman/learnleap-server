/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { SortOrder } from 'mongoose';
import { IBookmark, IBookmarkFilters } from './bookmark.interface';
import { Bookmark } from './bookmark.model';
import httpStatus from 'http-status';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { bookmarkSearchableFields } from './bookmark.constants';
import { IGenericResponse } from '../../../interfaces/common';
import { User } from '../user/user.model';
import ApiError from '../../../errors/apiError';
import { paginationHelper } from '../../../helper/paginationHelper';

// Create Bookmark
const createBookmark = async (
  payload: IBookmark,
  verifiedUser: any
): Promise<IBookmark | null> => {
  const user = await User.find({ _id: verifiedUser.id });
  if (user.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isExist = await Bookmark.findOne({ question: payload?.question });
  console.log(isExist);
  if (isExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'This question already added to bookmark'
    );
  }

  const result = await Bookmark.create(payload);
  return result;
};

// Get All Bookmarks (can also filter)
const getAllBookmarks = async (
  filters: IBookmarkFilters,
  paginationOptions: IPaginationOptions,
  verifiedUser: any
): Promise<IGenericResponse<IBookmark[]>> => {
  // Try not to use any
  const { searchTerm, ...filtersData } = filters;

  const andConditions = []; // Try not to use any

  if (searchTerm) {
    andConditions?.push({
      $or: bookmarkSearchableFields?.map(field => ({
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

  const result = await Bookmark.find({
    $and: [whereCondition, { email: verifiedUser?.email }],
  })
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Bookmark.countDocuments({
    $and: [whereCondition, { email: verifiedUser?.email }],
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Get Single Bookmark
const getSingleBookmark = async (
  questionId: string,
  verifiedUser: any
): Promise<IBookmark | null> => {
  const result = await Bookmark.findOne({
    $and: [{ questionId }, { email: verifiedUser?.email }],
  });

  return result;
};

const updateBookmark = async (
  id: string,
  payload: Partial<IBookmark>
): Promise<IBookmark | null> => {
  const isExist = await Bookmark.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Bookmark not found');
  }

  const result = await Bookmark.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

// Delete Bookmark
const deleteBookmark = async (id: string): Promise<IBookmark | null> => {
  const result = await Bookmark.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Bookmark Not Found');
  }
  return result;
};

const addResult = async (
  id: string,
  payload: Partial<IBookmark>,
  verifiedUser: any
): Promise<IBookmark | null> => {
  console.log(verifiedUser);
  const isExist = await Bookmark.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Bookmark not found');
  }

  const result = await Bookmark.findOneAndUpdate(
    { _id: id },
    { $push: { results: payload } },
    {
      new: true,
    }
  );

  return result;
};

export const BookmarkService = {
  createBookmark,
  getAllBookmarks,
  getSingleBookmark,
  updateBookmark,
  deleteBookmark,
  addResult,
};
