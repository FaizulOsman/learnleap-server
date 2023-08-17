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
exports.TestResultService = void 0;
const testResult_model_1 = require("./testResult.model");
const http_status_1 = __importDefault(require("http-status"));
const testResult_constants_1 = require("./testResult.constants");
const user_model_1 = require("../user/user.model");
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const paginationHelper_1 = require("../../../helper/paginationHelper");
const test_model_1 = require("../test/test.model");
// Create TestResult
const createTestResult = (payload, verifiedUser) => __awaiter(void 0, void 0, void 0, function* () {
    // Check is user exist
    const user = yield user_model_1.User.find({ _id: verifiedUser.id });
    if (user.length === 0) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    // Check is test exist
    const test = yield test_model_1.Test.find({ _id: payload.testId });
    if (test.length === 0) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Test not found');
    }
    // Check is result exist
    const testResult = yield testResult_model_1.TestResult.find({
        $and: [{ testId: payload.testId }, { email: payload.email }],
    });
    if (testResult.length > 0) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'You have already submitted the test!');
    }
    const result = yield testResult_model_1.TestResult.create(payload);
    return result;
});
// Get All TestResults (can also filter)
const getAllTestResults = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // Try not to use any
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = []; // Try not to use any
    if (searchTerm) {
        andConditions === null || andConditions === void 0 ? void 0 : andConditions.push({
            $or: testResult_constants_1.testResultSearchableFields === null || testResult_constants_1.testResultSearchableFields === void 0 ? void 0 : testResult_constants_1.testResultSearchableFields.map(field => ({
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
    const result = yield testResult_model_1.TestResult.find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield testResult_model_1.TestResult.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// Get Single TestResult
const getSingleTestResult = (id, verifiedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield testResult_model_1.TestResult.findOne({
        testId: id,
        email: verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.email,
    });
    if (!result) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'No Data Found!');
    }
    return result;
});
const updateTestResult = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield testResult_model_1.TestResult.findOne({ _id: id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'TestResult not found');
    }
    const result = yield testResult_model_1.TestResult.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    }).populate('reviews');
    return result;
});
// Delete TestResult
const deleteTestResult = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield testResult_model_1.TestResult.findByIdAndDelete(id).populate('reviews');
    if (!result) {
        throw new apiError_1.default(http_status_1.default.FORBIDDEN, 'TestResult Not Found');
    }
    return result;
});
const addReview = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield testResult_model_1.TestResult.findOne({ _id: id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'TestResult not found');
    }
    const result = yield testResult_model_1.TestResult.findOneAndUpdate({ _id: id }, { $push: { reviews: payload } }, {
        new: true,
    }).populate('reviews');
    return result;
});
// My Submitted testResults (can also filter)
const mySubmittedResults = (verifiedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield testResult_model_1.TestResult.find({ email: verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.email });
    return result;
});
exports.TestResultService = {
    createTestResult,
    getAllTestResults,
    getSingleTestResult,
    updateTestResult,
    deleteTestResult,
    addReview,
    mySubmittedResults,
};
