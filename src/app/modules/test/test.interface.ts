import { Model } from 'mongoose';

export type IResults = {
  name: string;
  email: string;
  marks: number;
};

export type IQuestion = {
  question: string;
  option1: string;
  option2: string;
  option3?: string;
  option4?: string;
  option5?: string;
  answer: string;
  subject?: string;
};

export type ITest = {
  questions: IQuestion[];
  timeLimit?: number;
  subject: string;
  serial: number;
  results?: IResults[];
};

// Test Model
export type TestModel = Model<ITest, Record<string, unknown>>;

export type ITestFilters = {
  searchTerm?: string;
  question?: string;
  answer?: string;
  subject?: string;
};
