import { Schema, model } from 'mongoose';
import { IFaq, FaqModel } from './faq.interface';

// Faq Schema
const FaqSchema = new Schema<IFaq, FaqModel>(
  {
    question: {
      type: String,
      required: [true, 'question is missing!'],
    },
    answer: {
      type: String,
      required: [true, 'answer is missing!'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Faq = model<IFaq, FaqModel>('Faq', FaqSchema);
