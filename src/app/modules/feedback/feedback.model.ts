import { Schema, model } from 'mongoose';
import { IFeedback, FeedbackModel } from './feedback.interface';

// Feedback Schema
const FeedbackSchema = new Schema<IFeedback, FeedbackModel>(
  {
    email: {
      type: String,
      required: [true, 'email is missing!'],
    },
    message: {
      type: String,
      required: [true, 'message is missing!'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Feedback = model<IFeedback, FeedbackModel>(
  'Feedback',
  FeedbackSchema
);
