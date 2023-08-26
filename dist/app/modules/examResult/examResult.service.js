"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamResultService = void 0;
const examResult_model_1 = require("./examResult.model");
const http_status_1 = __importDefault(require("http-status"));
const examResult_constants_1 = require("./examResult.constants");
const user_model_1 = require("../user/user.model");
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const paginationHelper_1 = require("../../../helper/paginationHelper");
const exam_model_1 = require("../exam/exam.model");
// Create ExamResult
const createExamResult = (payload, verifiedUser) => __awaiter(void 0, void 0, void 0, function* () {
    // Check is user exist
    const user = yield user_model_1.User.find({ _id: verifiedUser.id });
    if (user.length === 0) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    // Check is exam exist
    const exam = yield exam_model_1.Exam.find({ _id: payload.examId });
    if (exam.length === 0) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Exam not found');
    }
    // Check is result exist
    const examResult = yield examResult_model_1.ExamResult.find({
        $and: [{ examId: payload.examId }, { email: payload.email }],
    });
    if (examResult.length > 0) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'You have already submitted the exam!');
    }
    const result = yield examResult_model_1.ExamResult.create(payload);
    return result;
});
// Get All ExamResults (can also filter)
const getAllExamResults = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // Try not to use any
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = []; // Try not to use any
    if (searchTerm) {
        andConditions === null || andConditions === void 0 ? void 0 : andConditions.push({
            $or: examResult_constants_1.examResultSearchableFields === null || examResult_constants_1.examResultSearchableFields === void 0 ? void 0 : examResult_constants_1.examResultSearchableFields.map(field => ({
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
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions);
    const sortCondition = sortBy &&
        sortOrder && { [sortBy]: sortOrder };
    const whereCondition = (andConditions === null || andConditions === void 0 ? void 0 : andConditions.length) > 0 ? { $and: andConditions } : {};
    const result = yield examResult_model_1.ExamResult.find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield examResult_model_1.ExamResult.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// Get Single ExamResult
const getSingleExamResult = (id, verifiedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield examResult_model_1.ExamResult.findOne({
        examId: id,
        email: verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.email,
    });
    if (!result) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'No Data Found!');
    }
    return result;
});
const updateExamResult = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield examResult_model_1.ExamResult.findOne({ _id: id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'ExamResult not found');
    }
    const result = yield examResult_model_1.ExamResult.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    }).populate('reviews');
    return result;
});
// Delete ExamResult
const deleteExamResult = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield examResult_model_1.ExamResult.findByIdAndDelete(id);
    if (!result) {
        throw new apiError_1.default(http_status_1.default.FORBIDDEN, 'ExamResult Not Found');
    }
    return result;
});
const addReview = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield examResult_model_1.ExamResult.findOne({ _id: id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'ExamResult not found');
    }
    const result = yield examResult_model_1.ExamResult.findOneAndUpdate({ _id: id }, { $push: { reviews: payload } }, {
        new: true,
    }).populate('reviews');
    return result;
});
// My Submitted examResults (can also filter)
const mySubmittedResults = (verifiedUser, filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = []; // Try not to use any
    if (searchTerm) {
        andConditions === null || andConditions === void 0 ? void 0 : andConditions.push({
            $or: examResult_constants_1.examResultSearchableFields === null || examResult_constants_1.examResultSearchableFields === void 0 ? void 0 : examResult_constants_1.examResultSearchableFields.map(field => ({
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
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions);
    const sortCondition = sortBy &&
        sortOrder && { [sortBy]: sortOrder };
    const whereCondition = (andConditions === null || andConditions === void 0 ? void 0 : andConditions.length) > 0 ? { $and: andConditions } : {};
    const result = yield examResult_model_1.ExamResult.find({
        $and: [whereCondition, { email: verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.email }],
    })
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield examResult_model_1.ExamResult.countDocuments({
        $and: [whereCondition, { email: verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.email }],
    });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
exports.ExamResultService = {
    createExamResult,
    getAllExamResults,
    getSingleExamResult,
    updateExamResult,
    deleteExamResult,
    addReview,
    mySubmittedResults,
};
