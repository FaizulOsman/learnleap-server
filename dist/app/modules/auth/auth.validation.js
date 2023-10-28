"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const zod_1 = require("zod");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string(),
        password: zod_1.z.string(),
        role: zod_1.z.enum(['user', 'admin']),
        name: zod_1.z.string(),
        phone: zod_1.z.string(),
        isPremium: zod_1.z.boolean().optional(),
        imageUrl: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
    }),
});
const loginUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'email is required',
        }),
        password: zod_1.z.string({
            required_error: 'password is required',
        }),
    }),
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'refreshToken is required',
        }),
    }),
});
exports.authValidation = {
    createUserZodSchema,
    loginUserZodSchema,
    refreshTokenZodSchema,
};
