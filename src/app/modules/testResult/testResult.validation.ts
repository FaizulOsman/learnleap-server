import { z } from 'zod';

const createTestResultZodValidation = z.object({
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
          selectedOption: z.string().optional(),
          subject: z.string().optional(),
        })
        .optional()
    )
    .optional(),
  totalQues: z.number().optional(),
  totalAttempted: z.number().optional(),
  totalMarks: z.number().optional(),
  correctAnswer: z.number().optional(),
  wrongAnswer: z.number().optional(),
  email: z.string().optional(),
  name: z.string().optional(),
  testId: z.string().optional(),
});

const updateTestResultZodValidation = z.object({
  body: z.object({
    questions: z
      .array(
        z.object({
          question: z.string().optional(),
          option1: z.string().optional(),
          option2: z.string().optional(),
          option3: z.string().optional(),
          option4: z.string().optional(),
          option5: z.string().optional(),
          answer: z.string().optional(),
          subject: z.string().optional(),
        })
      )
      .optional(),
    totalQues: z.number().optional(),
    totalAttempted: z.number().optional(),
    totalMarks: z.number().optional(),
    correctAnswer: z.number().optional(),
    wrongAnswer: z.number().optional(),
    email: z.string().optional(),
    name: z.string().optional(),
    testId: z.string().optional(),
  }),
});

export const TestResultValidation = {
  createTestResultZodValidation,
  updateTestResultZodValidation,
};
