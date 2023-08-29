import { z } from 'zod';

const createBookmarkZodValidation = z.object({
  question: z.string().optional(),
  option1: z.string().optional(),
  option2: z.string().optional(),
  option3: z.string().optional(),
  option4: z.string().optional(),
  option5: z.string().optional(),
  answer: z.string().optional(),
  subject: z.string().optional(),
  email: z.string().optional(),
  questionId: z.string().optional(),
});

const updateBookmarkZodValidation = z.object({
  body: z.object({
    question: z.string().optional(),
    option1: z.string().optional(),
    option2: z.string().optional(),
    option3: z.string().optional(),
    option4: z.string().optional(),
    option5: z.string().optional(),
    answer: z.string().optional(),
    subject: z.string().optional(),
    email: z.string().optional(),
    questionId: z.string().optional(),
  }),
});

export const BookmarkValidation = {
  createBookmarkZodValidation,
  updateBookmarkZodValidation,
};
