import { z } from 'zod';

const createTestZodValidation = z.object({
  questions: z
    .array(
      z
        .object({
          question: z.string().optional(),
          option1: z.string().optional(),
          option2: z.string().optional(),
          option3: z.string().optional(),
          option4: z.string().optional(),
          option5: z.string().optional(),
          answer: z.string().optional(),
          subject: z.string().optional(),
        })
        .optional()
    )
    .optional(),
  timeLimit: z.number().optional(),
  reviews: z
    .array(
      z.object({
        userName: z.string(),
        userEmail: z.string(),
        rating: z.number(),
        review: z.string(),
      })
    )
    .optional(),
});

const updateTestZodValidation = z.object({
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
    timeLimit: z.number().optional().optional(),
    reviews: z
      .array(
        z.object({
          userName: z.string(),
          userEmail: z.string(),
          rating: z.number(),
          review: z.string(),
        })
      )
      .optional(),
  }),
});

export const TestValidation = {
  createTestZodValidation,
  updateTestZodValidation,
};
