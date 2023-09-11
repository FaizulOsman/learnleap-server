import { Schema, model } from 'mongoose';
import { IDiscuss, DiscussModel } from './discuss.interface';

// Discuss Schema
const DiscussSchema = new Schema<IDiscuss, DiscussModel>(
  {
    userName: {
      type: String,
      required: [true, 'userName is missing!'],
    },
    userEmail: {
      type: String,
      required: [true, 'userEmail is missing!'],
    },
    question: {
      type: String,
      required: [true, 'question is missing!'],
    },
    replies: [
      {
        name: {
          type: String,
          required: false,
        },
        email: {
          type: String,
          required: false,
        },
        reply: {
          type: String,
          required: false,
        },
      },
    ],
    likes: [
      {
        email: {
          type: String,
          required: false,
        },
        isLiked: {
          type: Boolean,
          required: false,
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Discuss = model<IDiscuss, DiscussModel>('Discuss', DiscussSchema);
