import { z } from 'zod';

const createFaqZodValidation = z.object({
  body: z.object({
    question: z.string(),
    answer: z.string(),
  }),
});

const updateFaqZodValidation = z.object({
  body: z.object({
    question: z.string().optional(),
    answer: z.string().optional(),
  }),
});

export const FaqValidation = {
  createFaqZodValidation,
  updateFaqZodValidation,
};
