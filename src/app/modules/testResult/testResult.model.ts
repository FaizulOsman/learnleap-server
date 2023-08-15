import { Schema, model } from 'mongoose';
import { ITestResult, TestResultModel } from './testResult.interface';

// TestResult Schema
const TestResultSchema = new Schema<ITestResult, TestResultModel>(
  {
    questions: [
      {
        question: {
          type: String,
          required: [true, 'question is missing!'],
        },
        option1: {
          type: String,
          required: [true, 'option1 is missing!'],
        },
        option2: {
          type: String,
          required: [true, 'option2 is missing!'],
        },
        option3: {
          type: String,
          required: [true, 'option3 is missing!'],
        },
        option4: {
          type: String,
          required: [true, 'option4 is missing!'],
        },
        option5: {
          type: String,
          required: [false, 'option5 is missing!'],
        },
        answer: {
          type: String,
          required: [true, 'answer is missing!'],
        },
        selectedOption: {
          type: String,
          required: [true, 'selectedOption is missing!'],
        },
        subject: {
          type: String,
          required: [false, 'subject is missing!'],
        },
      },
    ],
    totalQues: {
      type: Number,
      required: [true, 'totalQues is missing!'],
    },
    totalAttempted: {
      type: Number,
      required: [true, 'totalAttempted is missing!'],
    },
    totalMarks: {
      type: Number,
      required: [true, 'totalMarks is missing!'],
    },
    correctAnswer: {
      type: Number,
      required: [true, 'correctAnswer is missing!'],
    },
    wrongAnswer: {
      type: Number,
      required: [true, 'wrongAnswer is missing!'],
    },
    email: {
      type: String,
      required: [true, 'email is missing!'],
    },
    name: {
      type: String,
      required: [true, 'name is missing!'],
    },
    testId: {
      type: String,
      required: [true, 'testId is missing!'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const TestResult = model<ITestResult, TestResultModel>(
  'TestResult',
  TestResultSchema
);
