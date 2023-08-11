/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestHandler, Response } from 'express';
import { TestService } from './test.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { ITest } from './test.interface';
import { testFilterableFields } from './test.constants';
import { paginationFields } from '../../../constants/pagination';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { pick } from '../../../shared/pick';
import { jwtHelpers } from '../../../helper/jwtHelpers';

// Create Test
const createTest: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const token: any = req.headers.authorization;
    const verifiedUser = jwtHelpers.verifyToken(
      token,
      config.jwt.secret as Secret
    );

    const { ...testData } = req.body;

    const result = await TestService.createTest(testData, verifiedUser);

    // Send Response
    sendResponse<ITest>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Test Created Successfully',
      data: result,
    });
  }
);

// Get all tests
const getAllTests: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, testFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await TestService.getAllTests(filters, paginationOptions);

    // Send Response
    sendResponse<ITest[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Tests retrieved Successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

// Get single Test by id
const getSingleTest: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await TestService.getSingleTest(id);

    // Send Response
    sendResponse<ITest>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get Single Test Successfully',
      data: result,
    });
  }
);

// Update Test
const updateTest: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await TestService.updateTest(id, updateData);

  sendResponse<ITest>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Test updated successfully',
    data: result,
  });
});

// Delete Test
const deleteTest: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await TestService.deleteTest(id);

  sendResponse<ITest>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Test deleted successfully',
    data: result,
  });
});

// Add Review
export const addReview: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await TestService.addReview(id, updateData);

  sendResponse<ITest>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review added successfully',
    data: result,
  });
});

export const TestController = {
  createTest,
  getAllTests,
  getSingleTest,
  updateTest,
  deleteTest,
  addReview,
};
