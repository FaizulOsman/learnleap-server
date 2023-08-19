"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestValidation = void 0;
const zod_1 = require("zod");
const createTestZodValidation = zod_1.z.object({
    questions: zod_1.z
        .array(zod_1.z.object({
        question: zod_1.z.string(),
        option1: zod_1.z.string(),
        option2: zod_1.z.string(),
        option3: zod_1.z.string(),
        option4: zod_1.z.string(),
        option5: zod_1.z.string().optional(),
        subject: zod_1.z.string().optional(),
        answer: zod_1.z.string(),
    }))
        .optional(),
    timeLimit: zod_1.z.number().optional(),
    subject: zod_1.z.string().optional(),
    serial: zod_1.z.number().optional(),
    reviews: zod_1.z
        .array(zod_1.z.object({
        userName: zod_1.z.string(),
        userEmail: zod_1.z.string(),
        rating: zod_1.z.number(),
        review: zod_1.z.string(),
    }))
        .optional(),
});
const updateTestZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        questions: zod_1.z
            .array(zod_1.z.object({
            question: zod_1.z.string(),
            option1: zod_1.z.string(),
            option2: zod_1.z.string(),
            option3: zod_1.z.string(),
            option4: zod_1.z.string(),
            option5: zod_1.z.string(),
            answer: zod_1.z.string(),
            subject: zod_1.z.string().optional(),
        }))
            .optional(),
        timeLimit: zod_1.z.number().optional().optional(),
        results: zod_1.z
            .array(zod_1.z.object({
            name: zod_1.z.string(),
            email: zod_1.z.string(),
            marks: zod_1.z.number(),
        }))
            .optional(),
    }),
});
exports.TestValidation = {
    createTestZodValidation,
    updateTestZodValidation,
};
