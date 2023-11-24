/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestHandler, Response } from 'express';
import { FaqService } from './faq.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IFaq } from './faq.interface';
import { faqFilterableFields } from './faq.constants';
import { paginationFields } from '../../../constants/pagination';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { pick } from '../../../shared/pick';
import { jwtHelpers } from '../../../helper/jwtHelpers';

// Create Faq
const createFaq: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const token: any = req.headers.authorization;
    const verifiedUser = jwtHelpers.verifyToken(
      token,
      config.jwt.secret as Secret
    );

    const { ...faqData } = req.body;

    const result = await FaqService.createFaq(faqData, verifiedUser);

    // Send Response
    sendResponse<IFaq>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faq Created Successfully',
      data: result,
    });
  }
);

// Get all Faqs
const getAllFaqs: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, faqFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await FaqService.getAllFaqs(filters, paginationOptions);

    // Send Response
    sendResponse<IFaq[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faqs retrieved Successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

// Get single Faq by id
const getSingleFaq: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await FaqService.getSingleFaq(id);

    // Send Response
    sendResponse<IFaq>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get Single Faq Successfully',
      data: result,
    });
  }
);

// Update Faq
const updateFaq: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await FaqService.updateFaq(id, updateData);

  sendResponse<IFaq>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faq updated successfully',
    data: result,
  });
});

// Delete Faq
const deleteFaq: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await FaqService.deleteFaq(id);

  sendResponse<IFaq>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faq deleted successfully',
    data: result,
  });
});

export const FaqController = {
  createFaq,
  getAllFaqs,
  getSingleFaq,
  updateFaq,
  deleteFaq,
};
