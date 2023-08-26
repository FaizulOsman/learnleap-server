/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestHandler, Response } from 'express';
import { ExamResultService } from './examResult.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IExamResult } from './examResult.interface';
import { examResultFilterableFields } from './examResult.constants';
import { paginationFields } from '../../../constants/pagination';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { pick } from '../../../shared/pick';
import { jwtHelpers } from '../../../helper/jwtHelpers';

// Create ExamResult
const createExamResult: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const token: any = req.headers.authorization;
    const verifiedUser = jwtHelpers.verifyToken(
      token,
      config.jwt.secret as Secret
    );

    const { ...examResultData } = req.body;

    const result = await ExamResultService.createExamResult(
      examResultData,
      verifiedUser
    );

    // Send Response
    sendResponse<IExamResult>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'ExamResult Created Successfully',
      data: result,
    });
  }
);

// Get all examResults
const getAllExamResults: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, examResultFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await ExamResultService.getAllExamResults(
      filters,
      paginationOptions
    );

    // Send Response
    sendResponse<IExamResult[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'ExamResults retrieved Successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

// Get single ExamResult by id
const getSingleExamResult: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const token: any = req?.headers?.authorization;
    const verifiedUser = jwtHelpers.verifyToken(
      token,
      config.jwt.secret as Secret
    );

    const result = await ExamResultService.getSingleExamResult(
      id,
      verifiedUser
    );

    // Send Response
    sendResponse<IExamResult>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get Single ExamResult Successfully',
      data: result,
    });
  }
);

// Update ExamResult
const updateExamResult: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await ExamResultService.updateExamResult(id, updateData);

  sendResponse<IExamResult>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'ExamResult updated successfully',
    data: result,
  });
});

// Delete ExamResult
const deleteExamResult: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await ExamResultService.deleteExamResult(id);

  sendResponse<IExamResult>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'ExamResult deleted successfully',
    data: result,
  });
});

// Add Review
export const addReview: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await ExamResultService.addReview(id, updateData);

  sendResponse<IExamResult>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review added successfully',
    data: result,
  });
});

// My Submitted examResults
const mySubmittedResults: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const token: any = req?.headers?.authorization;
    const verifiedUser = jwtHelpers.verifyToken(
      token,
      config.jwt.secret as Secret
    );

    const filters = pick(req.query, examResultFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await ExamResultService.mySubmittedResults(
      verifiedUser,
      filters,
      paginationOptions
    );

    // Send Response
    sendResponse<IExamResult[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'ExamResults retrieved Successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

export const ExamResultController = {
  createExamResult,
  getAllExamResults,
  getSingleExamResult,
  updateExamResult,
  deleteExamResult,
  addReview,
  mySubmittedResults,
};
