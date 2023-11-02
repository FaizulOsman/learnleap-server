"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackValidation = void 0;
const zod_1 = require("zod");
const createFeedbackZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string(),
        message: zod_1.z.string(),
    }),
});
const updateFeedbackZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().optional(),
        message: zod_1.z.string().optional(),
    }),
});
exports.FeedbackValidation = {
    createFeedbackZodValidation,
    updateFeedbackZodValidation,
};
