/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestHandler, Response } from 'express';
import { FeedbackService } from './feedback.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IFeedback } from './feedback.interface';
import { feedbackFilterableFields } from './feedback.constants';
import { paginationFields } from '../../../constants/pagination';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { pick } from '../../../shared/pick';
import { jwtHelpers } from '../../../helper/jwtHelpers';

// Create Feedback
const createFeedback: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const token: any = req.headers.authorization;
    const verifiedUser = jwtHelpers.verifyToken(
      token,
      config.jwt.secret as Secret
    );

    const { ...feedbackData } = req.body;

    const result = await FeedbackService.createFeedback(
      feedbackData,
      verifiedUser
    );

    // Send Response
    sendResponse<IFeedback>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Feedback Created Successfully',
      data: result,
    });
  }
);

// Get all Feedbacks
const getAllFeedbacks: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, feedbackFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await FeedbackService.getAllFeedbacks(
      filters,
      paginationOptions
    );

    // Send Response
    sendResponse<IFeedback[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Feedbacks retrieved Successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

// Get single Feedback by id
const getSingleFeedback: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await FeedbackService.getSingleFeedback(id);

    // Send Response
    sendResponse<IFeedback>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get Single Feedback Successfully',
      data: result,
    });
  }
);

// Update Feedback
const updateFeedback: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await FeedbackService.updateFeedback(id, updateData);

  sendResponse<IFeedback>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback updated successfully',
    data: result,
  });
});

// Delete Feedback
const deleteFeedback: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await FeedbackService.deleteFeedback(id);

  sendResponse<IFeedback>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback deleted successfully',
    data: result,
  });
});

export const FeedbackController = {
  createFeedback,
  getAllFeedbacks,
  getSingleFeedback,
  updateFeedback,
  deleteFeedback,
};
