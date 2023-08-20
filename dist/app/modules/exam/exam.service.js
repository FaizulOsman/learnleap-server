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
exports.ExamService = void 0;
const exam_model_1 = require("./exam.model");
const http_status_1 = __importDefault(require("http-status"));
const exam_constants_1 = require("./exam.constants");
const user_model_1 = require("../user/user.model");
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const paginationHelper_1 = require("../../../helper/paginationHelper");
// Create Exam
const createExam = (payload, verifiedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.find({ _id: verifiedUser.id });
    if (user.length === 0) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const result = yield exam_model_1.Exam.create(payload);
    return result;
});
// Get All Exams (can also filter)
const getAllExams = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // Try not to use any
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = []; // Try not to use any
    if (searchTerm) {
        andConditions === null || andConditions === void 0 ? void 0 : andConditions.push({
            $or: exam_constants_1.examSearchableFields === null || exam_constants_1.examSearchableFields === void 0 ? void 0 : exam_constants_1.examSearchableFields.map(field => ({
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
    const result = yield exam_model_1.Exam.find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield exam_model_1.Exam.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// Get Single Exam
const getSingleExam = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield exam_model_1.Exam.findById(id);
    return result;
});
const updateExam = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield exam_model_1.Exam.findOne({ _id: id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'Exam not found');
    }
    const result = yield exam_model_1.Exam.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
// Delete Exam
const deleteExam = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield exam_model_1.Exam.findByIdAndDelete(id);
    if (!result) {
        throw new apiError_1.default(http_status_1.default.FORBIDDEN, 'Exam Not Found');
    }
    return result;
});
const addResult = (id, payload, verifiedUser) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const isExist = yield exam_model_1.Exam.findOne({ _id: id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'Exam not found');
    }
    // Check is result exist
    const isMyResultExist = yield ((_a = isExist.results) === null || _a === void 0 ? void 0 : _a.find(r => r.email === verifiedUser.email));
    if (isMyResultExist) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'You have already submitted the exam!');
    }
    const result = yield exam_model_1.Exam.findOneAndUpdate({ _id: id }, { $push: { results: payload } }, {
        new: true,
    });
    return result;
});
exports.ExamService = {
    createExam,
    getAllExams,
    getSingleExam,
    updateExam,
    deleteExam,
    addResult,
};
