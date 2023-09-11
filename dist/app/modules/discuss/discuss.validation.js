"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscussValidation = void 0;
const zod_1 = require("zod");
const createDiscussZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        userName: zod_1.z.string(),
        userEmail: zod_1.z.string(),
        question: zod_1.z.string(),
        replies: zod_1.z
            .array(zod_1.z.object({
            name: zod_1.z.string(),
            email: zod_1.z.string(),
            reply: zod_1.z.string(),
        }))
            .optional(),
        likes: zod_1.z
            .array(zod_1.z.object({
            email: zod_1.z.string(),
            isLiked: zod_1.z.boolean(),
        }))
            .optional(),
    }),
});
const updateDiscussZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        userName: zod_1.z.string().optional(),
        userEmail: zod_1.z.string().optional(),
        question: zod_1.z.string().optional(),
        replies: zod_1.z
            .array(zod_1.z.object({
            name: zod_1.z.string(),
            email: zod_1.z.string(),
            reply: zod_1.z.string(),
        }))
            .optional(),
        likes: zod_1.z
            .array(zod_1.z.object({
            email: zod_1.z.string(),
            isLiked: zod_1.z.boolean(),
        }))
            .optional(),
    }),
});
exports.DiscussValidation = {
    createDiscussZodValidation,
    updateDiscussZodValidation,
};
