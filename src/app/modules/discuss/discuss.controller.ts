/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestHandler, Response } from 'express';
import { DiscussService } from './discuss.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IDiscuss } from './discuss.interface';
import { discussFilterableFields } from './discuss.constants';
import { paginationFields } from '../../../constants/pagination';
import { pick } from '../../../shared/pick';

// Create Discuss
const createDiscuss: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...discussData } = req.body;

    const result = await DiscussService.createDiscuss(discussData);

    // Send Response
    sendResponse<IDiscuss>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Discuss Created Successfully',
      data: result,
    });
  }
);

// Get all discusses
const getAllDiscusses: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, discussFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await DiscussService.getAllDiscusses(
      filters,
      paginationOptions
    );

    // Send Response
    sendResponse<IDiscuss[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Discusses retrieved Successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

// Get single Discuss by id
const getSingleDiscuss: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await DiscussService.getSingleDiscuss(id);

    // Send Response
    sendResponse<IDiscuss>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get Single Discuss Successfully',
      data: result,
    });
  }
);

// Update Discuss
const updateDiscuss: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await DiscussService.updateDiscuss(id, updateData);

  sendResponse<IDiscuss>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Discuss updated successfully',
    data: result,
  });
});

// Delete Discuss
const deleteDiscuss: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await DiscussService.deleteDiscuss(id);

  sendResponse<IDiscuss>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Discuss deleted successfully',
    data: result,
  });
});

export const DiscussController = {
  createDiscuss,
  getAllDiscusses,
  getSingleDiscuss,
  updateDiscuss,
  deleteDiscuss,
};
