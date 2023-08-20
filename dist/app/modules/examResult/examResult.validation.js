"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamResultValidation = void 0;
const zod_1 = require("zod");
const createExamResultZodValidation = zod_1.z.object({
    questions: zod_1.z
        .array(zod_1.z
        .object({
        question: zod_1.z.string().optional(),
        option1: zod_1.z.string().optional(),
        option2: zod_1.z.string().optional(),
        option3: zod_1.z.string().optional(),
        option4: zod_1.z.string().optional(),
        option5: zod_1.z.string().optional(),
        answer: zod_1.z.string().optional(),
        selectedOption: zod_1.z.string().optional(),
        subject: zod_1.z.string().optional(),
    })
        .optional())
        .optional(),
    totalQues: zod_1.z.number().optional(),
    totalAttempted: zod_1.z.number().optional(),
    totalMarks: zod_1.z.number().optional(),
    correctAnswer: zod_1.z.number().optional(),
    wrongAnswer: zod_1.z.number().optional(),
    email: zod_1.z.string().optional(),
    name: zod_1.z.string().optional(),
    examId: zod_1.z.string().optional(),
});
const updateExamResultZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        questions: zod_1.z
            .array(zod_1.z.object({
            question: zod_1.z.string().optional(),
            option1: zod_1.z.string().optional(),
            option2: zod_1.z.string().optional(),
            option3: zod_1.z.string().optional(),
            option4: zod_1.z.string().optional(),
            option5: zod_1.z.string().optional(),
            answer: zod_1.z.string().optional(),
            subject: zod_1.z.string().optional(),
        }))
            .optional(),
        totalQues: zod_1.z.number().optional(),
        totalAttempted: zod_1.z.number().optional(),
        totalMarks: zod_1.z.number().optional(),
        correctAnswer: zod_1.z.number().optional(),
        wrongAnswer: zod_1.z.number().optional(),
        email: zod_1.z.string().optional(),
        name: zod_1.z.string().optional(),
        examId: zod_1.z.string().optional(),
    }),
});
exports.ExamResultValidation = {
    createExamResultZodValidation,
    updateExamResultZodValidation,
};
