import { z } from 'zod';

const updateUserZodSchema = z.object({
  body: z.object({
    email: z.string().optional(),
    password: z.string().optional(),
    role: z.enum(['user', 'admin']).optional(),
    name: z.string().optional(),
    phone: z.string().optional(),
    isPremium: z.boolean().optional(),
    imageUrl: z.string().optional(),
    address: z.string().optional(),
  }),
});

export const userValidation = {
  updateUserZodSchema,
};
