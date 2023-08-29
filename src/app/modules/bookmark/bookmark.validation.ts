import { z } from 'zod';

const createBookmarkZodValidation = z.object({
  questions: z
    .array(
      z.object({
        question: z.string(),
        option1: z.string(),
        option2: z.string(),
        option3: z.string(),
        option4: z.string(),
        option5: z.string().optional(),
        subject: z.string().optional(),
        answer: z.string(),
      })
    )
    .optional(),
  subject: z.string().optional(),
  email: z.string().optional(),
});

const updateBookmarkZodValidation = z.object({
  body: z.object({
    questions: z
      .array(
        z.object({
          question: z.string(),
          option1: z.string(),
          option2: z.string(),
          option3: z.string(),
          option4: z.string(),
          option5: z.string(),
          answer: z.string(),
          subject: z.string().optional(),
        })
      )
      .optional(),
    subject: z.string().optional(),
    email: z.string().optional(),
  }),
});

export const BookmarkValidation = {
  createBookmarkZodValidation,
  updateBookmarkZodValidation,
};
