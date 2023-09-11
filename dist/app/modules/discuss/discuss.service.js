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
exports.DiscussService = void 0;
const discuss_model_1 = require("./discuss.model");
const http_status_1 = __importDefault(require("http-status"));
const discuss_constants_1 = require("./discuss.constants");
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const paginationHelper_1 = require("../../../helper/paginationHelper");
// Create Discuss
const createDiscuss = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield discuss_model_1.Discuss.create(payload);
    return result;
});
// Get All Discusses (can also filter)
const getAllDiscusses = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // Try not to use any
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = []; // Try not to use any
    if (searchTerm) {
        andConditions === null || andConditions === void 0 ? void 0 : andConditions.push({
            $or: discuss_constants_1.discussSearchableFields === null || discuss_constants_1.discussSearchableFields === void 0 ? void 0 : discuss_constants_1.discussSearchableFields.map(field => ({
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
    const result = yield discuss_model_1.Discuss.find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield discuss_model_1.Discuss.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// Get Single Discuss
const getSingleDiscuss = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield discuss_model_1.Discuss.findById(id);
    return result;
});
const updateDiscuss = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield discuss_model_1.Discuss.findOne({ _id: id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'Discuss not found');
    }
    const result = yield discuss_model_1.Discuss.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
// Delete Discuss
const deleteDiscuss = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield discuss_model_1.Discuss.findByIdAndDelete(id);
    if (!result) {
        throw new apiError_1.default(http_status_1.default.FORBIDDEN, 'Discuss Not Found');
    }
    return result;
});
exports.DiscussService = {
    createDiscuss,
    getAllDiscusses,
    getSingleDiscuss,
    updateDiscuss,
    deleteDiscuss,
};
