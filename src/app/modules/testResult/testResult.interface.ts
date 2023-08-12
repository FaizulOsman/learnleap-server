import { Model } from 'mongoose';

export type ITestResult = {
  totalQues: number;
  totalAttempted: number;
  totalMarks: number;
  correctAnswer: number;
  wrongAnswer: number;
  email: string;
  name: string;
  testId: number;
};

// TestResult Model
export type TestResultModel = Model<ITestResult, Record<string, unknown>>;

export type ITestResultFilters = {
  searchTerm?: string;
  email?: string;
  name?: string;
  totalMarks?: string;
};
