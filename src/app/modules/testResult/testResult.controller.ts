/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestHandler, Response } from 'express';
import { TestResultService } from './testResult.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { ITestResult } from './testResult.interface';
import { testResultFilterableFields } from './testResult.constants';
import { paginationFields } from '../../../constants/pagination';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { pick } from '../../../shared/pick';
import { jwtHelpers } from '../../../helper/jwtHelpers';

// Create TestResult
const createTestResult: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const token: any = req.headers.authorization;
    const verifiedUser = jwtHelpers.verifyToken(
      token,
      config.jwt.secret as Secret
    );

    const { ...testResultData } = req.body;

    const result = await TestResultService.createTestResult(
      testResultData,
      verifiedUser
    );

    // Send Response
    sendResponse<ITestResult>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'TestResult Created Successfully',
      data: result,
    });
  }
);

// Get all testResults
const getAllTestResults: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, testResultFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await TestResultService.getAllTestResults(
      filters,
      paginationOptions
    );

    // Send Response
    sendResponse<ITestResult[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'TestResults retrieved Successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

// Get single TestResult by id
const getSingleTestResult: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const token: any = req?.headers?.authorization;
    const verifiedUser = jwtHelpers.verifyToken(
      token,
      config.jwt.secret as Secret
    );

    const result = await TestResultService.getSingleTestResult(
      id,
      verifiedUser
    );

    // Send Response
    sendResponse<ITestResult>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get Single TestResult Successfully',
      data: result,
    });
  }
);

// Update TestResult
const updateTestResult: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await TestResultService.updateTestResult(id, updateData);

  sendResponse<ITestResult>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'TestResult updated successfully',
    data: result,
  });
});

// Delete TestResult
const deleteTestResult: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await TestResultService.deleteTestResult(id);

  sendResponse<ITestResult>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'TestResult deleted successfully',
    data: result,
  });
});

// Add Review
export const addReview: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await TestResultService.addReview(id, updateData);

  sendResponse<ITestResult>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review added successfully',
    data: result,
  });
});

// My Submitted testResults
const mySubmittedResults: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const token: any = req?.headers?.authorization;
    const verifiedUser = jwtHelpers.verifyToken(
      token,
      config.jwt.secret as Secret
    );

    const result = await TestResultService.mySubmittedResults(verifiedUser);

    // Send Response
    sendResponse<ITestResult[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'TestResults retrieved Successfully',
      data: result,
    });
  }
);

export const TestResultController = {
  createTestResult,
  getAllTestResults,
  getSingleTestResult,
  updateTestResult,
  deleteTestResult,
  addReview,
  mySubmittedResults,
};
