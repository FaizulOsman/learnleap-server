import { z } from 'zod';

const createExamZodValidation = z.object({
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
  timeLimit: z.number().optional(),
  subject: z.string().optional(),
  serial: z.number().optional(),
  isPublished: z.boolean().optional(),
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

const updateExamZodValidation = z.object({
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
    subject: z.string().optional(),
    serial: z.number().optional(),
    isPublished: z.boolean().optional(),
    results: z
      .array(
        z.object({
          name: z.string(),
          email: z.string(),
          marks: z.number(),
        })
      )
      .optional(),
  }),
});

export const ExamValidation = {
  createExamZodValidation,
  updateExamZodValidation,
};
