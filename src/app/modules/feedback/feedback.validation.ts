import { z } from 'zod';

const createFeedbackZodValidation = z.object({
  body: z.object({
    email: z.string(),
    message: z.string(),
  }),
});

const updateFeedbackZodValidation = z.object({
  body: z.object({
    email: z.string().optional(),
    message: z.string().optional(),
  }),
});

export const FeedbackValidation = {
  createFeedbackZodValidation,
  updateFeedbackZodValidation,
};
