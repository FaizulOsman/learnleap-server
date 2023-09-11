import { z } from 'zod';

const createDiscussZodValidation = z.object({
  body: z.object({
    userName: z.string(),
    userEmail: z.string(),
    question: z.string(),
    replies: z
      .array(
        z.object({
          name: z.string(),
          email: z.string(),
          reply: z.string(),
        })
      )
      .optional(),
    likes: z
      .array(
        z.object({
          email: z.string(),
          isLiked: z.boolean(),
        })
      )
      .optional(),
  }),
});

const updateDiscussZodValidation = z.object({
  body: z.object({
    userName: z.string().optional(),
    userEmail: z.string().optional(),
    question: z.string().optional(),
    replies: z
      .array(
        z.object({
          name: z.string(),
          email: z.string(),
          reply: z.string(),
        })
      )
      .optional(),
    likes: z
      .array(
        z.object({
          email: z.string(),
          isLiked: z.boolean(),
        })
      )
      .optional(),
  }),
});

export const DiscussValidation = {
  createDiscussZodValidation,
  updateDiscussZodValidation,
};
