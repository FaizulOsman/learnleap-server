"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookmarkValidation = void 0;
const zod_1 = require("zod");
const createBookmarkZodValidation = zod_1.z.object({
    question: zod_1.z.string().optional(),
    option1: zod_1.z.string().optional(),
    option2: zod_1.z.string().optional(),
    option3: zod_1.z.string().optional(),
    option4: zod_1.z.string().optional(),
    option5: zod_1.z.string().optional(),
    answer: zod_1.z.string().optional(),
    subject: zod_1.z.string().optional(),
    email: zod_1.z.string().optional(),
    questionId: zod_1.z.string().optional(),
});
const updateBookmarkZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        question: zod_1.z.string().optional(),
        option1: zod_1.z.string().optional(),
        option2: zod_1.z.string().optional(),
        option3: zod_1.z.string().optional(),
        option4: zod_1.z.string().optional(),
        option5: zod_1.z.string().optional(),
        answer: zod_1.z.string().optional(),
        subject: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        questionId: zod_1.z.string().optional(),
    }),
});
exports.BookmarkValidation = {
    createBookmarkZodValidation,
    updateBookmarkZodValidation,
};
