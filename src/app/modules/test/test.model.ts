import { Schema, model } from 'mongoose';
import { ITest, TestModel } from './test.interface';

// Test Schema
const TestSchema = new Schema<ITest, TestModel>(
  {
    questions: [
      {
        question: {
          type: String,
          required: [true, 'timeLimit is missing!'],
        },
        option1: {
          type: String,
          required: [true, 'timeLimit is missing!'],
        },
        option2: {
          type: String,
          required: [true, 'timeLimit is missing!'],
        },
        option3: {
          type: String,
          required: [true, 'timeLimit is missing!'],
        },
        option4: {
          type: String,
          required: [true, 'timeLimit is missing!'],
        },
        option5: {
          type: String,
          required: [false, 'timeLimit is missing!'],
        },
        answer: {
          type: String,
          required: [true, 'timeLimit is missing!'],
        },
        subject: {
          type: String,
          required: [false, 'timeLimit is missing!'],
        },
      },
    ],
    timeLimit: {
      type: Number,
      required: [false, 'timeLimit is missing!'],
    },
    reviews: [
      {
        userName: {
          type: String,
          required: true,
        },
        userEmail: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        review: {
          type: String,
          required: true,
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

export const Test = model<ITest, TestModel>('Test', TestSchema);
