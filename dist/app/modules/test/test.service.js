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
exports.TestService = void 0;
const test_model_1 = require("./test.model");
const http_status_1 = __importDefault(require("http-status"));
const test_constants_1 = require("./test.constants");
const user_model_1 = require("../user/user.model");
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const paginationHelper_1 = require("../../../helper/paginationHelper");
// Create Test
const createTest = (payload, verifiedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.find({ _id: verifiedUser.id });
    if (user.length === 0) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const result = yield test_model_1.Test.create(payload);
    return result;
});
// Get All Tests (can also filter)
const getAllTests = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // Try not to use any
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = []; // Try not to use any
    if (searchTerm) {
        andConditions === null || andConditions === void 0 ? void 0 : andConditions.push({
            $or: test_constants_1.testSearchableFields === null || test_constants_1.testSearchableFields === void 0 ? void 0 : test_constants_1.testSearchableFields.map(field => ({
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
    const result = yield test_model_1.Test.find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield test_model_1.Test.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// Get Single Test
const getSingleTest = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield test_model_1.Test.findById(id);
    return result;
});
const updateTest = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield test_model_1.Test.findOne({ _id: id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'Test not found');
    }
    const result = yield test_model_1.Test.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
// Delete Test
const deleteTest = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield test_model_1.Test.findByIdAndDelete(id);
    if (!result) {
        throw new apiError_1.default(http_status_1.default.FORBIDDEN, 'Test Not Found');
    }
    return result;
});
const addResult = (id, payload, verifiedUser) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const isExist = yield test_model_1.Test.findOne({ _id: id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'Test not found');
    }
    // Check is result exist
    const isMyResultExist = yield ((_a = isExist.results) === null || _a === void 0 ? void 0 : _a.find(r => r.email === verifiedUser.email));
    if (isMyResultExist) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'You have already submitted the test!');
    }
    const result = yield test_model_1.Test.findOneAndUpdate({ _id: id }, { $push: { results: payload } }, {
        new: true,
    });
    return result;
});
const getTestBySubject = (subject) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield test_model_1.Test.find({});
    if (subject === 'all') {
        result = yield test_model_1.Test.find({});
    }
    else {
        const allFiltersData = [];
        const filterDataFromSubject = yield test_model_1.Test.find({ subject: subject });
        allFiltersData.push(...filterDataFromSubject);
        // Filter from model test
        const quesFromModelTest = yield test_model_1.Test.find({ subject: 'Model Test' }, { questions: 1, _id: 0 });
        const newArr = [];
        for (let i = 0; i < quesFromModelTest.length; i++) {
            const filtersData = quesFromModelTest[i].questions.filter(q => q.subject === subject);
            newArr.push(...filtersData);
        }
        const filterFromModelTest = {
            questions: newArr,
            subject: subject,
            timeLimit: newArr === null || newArr === void 0 ? void 0 : newArr.length,
            serial: (filterDataFromSubject === null || filterDataFromSubject === void 0 ? void 0 : filterDataFromSubject.length) + 1,
        };
        allFiltersData.push(filterFromModelTest);
        result = allFiltersData;
    }
    let total = 0;
    result.forEach((test) => {
        total += test.questions.length;
    });
    return {
        meta: {
            total,
        },
        data: result,
    };
});
exports.TestService = {
    createTest,
    getAllTests,
    getSingleTest,
    updateTest,
    deleteTest,
    addResult,
    getTestBySubject,
};
