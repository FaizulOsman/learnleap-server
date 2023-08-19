/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestHandler, Response } from 'express';
import { ExamService } from './exam.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IExam } from './exam.interface';
import { examFilterableFields } from './exam.constants';
import { paginationFields } from '../../../constants/pagination';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { pick } from '../../../shared/pick';
import { jwtHelpers } from '../../../helper/jwtHelpers';

// Create Exam
const createExam: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const token: any = req.headers.authorization;
    const verifiedUser = jwtHelpers.verifyToken(
      token,
      config.jwt.secret as Secret
    );

    const { ...examData } = req.body;

    const result = await ExamService.createExam(examData, verifiedUser);

    // Send Response
    sendResponse<IExam>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Exam Created Successfully',
      data: result,
    });
  }
);

// Get all exams
const getAllExams: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, examFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await ExamService.getAllExams(filters, paginationOptions);

    // Send Response
    sendResponse<IExam[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Exams retrieved Successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

// Get single Exam by id
const getSingleExam: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await ExamService.getSingleExam(id);

    // Send Response
    sendResponse<IExam>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get Single Exam Successfully',
      data: result,
    });
  }
);

// Update Exam
const updateExam: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await ExamService.updateExam(id, updateData);

  sendResponse<IExam>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Exam updated successfully',
    data: result,
  });
});

// Delete Exam
const deleteExam: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await ExamService.deleteExam(id);

  sendResponse<IExam>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Exam deleted successfully',
    data: result,
  });
});

// Add Result
export const addResult: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  const token: any = req.headers.authorization;
  const verifiedUser = jwtHelpers.verifyToken(
    token,
    config.jwt.secret as Secret
  );

  const result = await ExamService.addResult(id, updateData, verifiedUser);

  sendResponse<IExam>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Result added successfully',
    data: result,
  });
});

export const ExamController = {
  createExam,
  getAllExams,
  getSingleExam,
  updateExam,
  deleteExam,
  addResult,
};
