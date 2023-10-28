import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    email: z.string(),
    password: z.string(),
    role: z.enum(['user', 'admin']),
    name: z.string(),
    phone: z.string(),
    isPremium: z.boolean().optional(),
    imageUrl: z.string().optional(),
    address: z.string().optional(),
  }),
});

const loginUserZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'email is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'refreshToken is required',
    }),
  }),
});

export const authValidation = {
  createUserZodSchema,
  loginUserZodSchema,
  refreshTokenZodSchema,
};
