/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestHandler, Response } from 'express';
import { BookmarkService } from './bookmark.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IBookmark } from './bookmark.interface';
import { bookmarkFilterableFields } from './bookmark.constants';
import { paginationFields } from '../../../constants/pagination';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { pick } from '../../../shared/pick';
import { jwtHelpers } from '../../../helper/jwtHelpers';

// Create Bookmark
const createBookmark: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const token: any = req.headers.authorization;
    const verifiedUser = jwtHelpers.verifyToken(
      token,
      config.jwt.secret as Secret
    );

    const { ...bookmarkData } = req.body;

    const result = await BookmarkService.createBookmark(
      bookmarkData,
      verifiedUser
    );

    // Send Response
    sendResponse<IBookmark>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Bookmark Created Successfully',
      data: result,
    });
  }
);

// Get all bookmarks
const getAllBookmarks: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, bookmarkFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const token: any = req.headers.authorization;
    const verifiedUser = jwtHelpers.verifyToken(
      token,
      config.jwt.secret as Secret
    );

    const result = await BookmarkService.getAllBookmarks(
      filters,
      paginationOptions,
      verifiedUser
    );

    // Send Response
    sendResponse<IBookmark[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Bookmarks retrieved Successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

// Get single Bookmark by id
const getSingleBookmark: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const questionId = req?.params?.id;
    const token: any = req.headers.authorization;
    const verifiedUser = jwtHelpers.verifyToken(
      token,
      config.jwt.secret as Secret
    );
    const result = await BookmarkService.getSingleBookmark(
      questionId,
      verifiedUser
    );

    // Send Response
    sendResponse<IBookmark>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get Single Bookmark Successfully',
      data: result,
    });
  }
);

// Update Bookmark
const updateBookmark: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await BookmarkService.updateBookmark(id, updateData);

  sendResponse<IBookmark>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookmark updated successfully',
    data: result,
  });
});

// Delete Bookmark
const deleteBookmark: RequestHandler = catchAsync(async (req, res) => {
  const question = req.body.question;
  const token: any = req.headers.authorization;
  const verifiedUser = jwtHelpers.verifyToken(
    token,
    config.jwt.secret as Secret
  );
  const result = await BookmarkService.deleteBookmark(question, verifiedUser);

  sendResponse<IBookmark>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookmark deleted successfully',
    data: result,
  });
});

export const BookmarkController = {
  createBookmark,
  getAllBookmarks,
  getSingleBookmark,
  updateBookmark,
  deleteBookmark,
};
