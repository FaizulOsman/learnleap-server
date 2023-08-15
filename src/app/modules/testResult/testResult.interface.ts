import { Model } from 'mongoose';

export type IQuestion = {
  question: string;
  option1: string;
  option2: string;
  option3?: string;
  option4?: string;
  option5?: string;
  answer: string;
  selectedOption: string;
  subject?: string;
};

export type ITestResult = {
  questions: IQuestion[];
  totalQues: number;
  totalAttempted: number;
  totalMarks: number;
  correctAnswer: number;
  wrongAnswer: number;
  email: string;
  name: string;
  testId: string;
};

// TestResult Model
export type TestResultModel = Model<ITestResult, Record<string, unknown>>;

export type ITestResultFilters = {
  searchTerm?: string;
  email?: string;
  name?: string;
  totalMarks?: string;
};
