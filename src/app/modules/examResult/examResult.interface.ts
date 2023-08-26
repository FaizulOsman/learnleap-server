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

export type IExamResult = {
  questions: IQuestion[];
  subject: string;
  serial: number;
  totalQues: number;
  totalAttempted: number;
  totalMarks: number;
  correctAnswer: number;
  wrongAnswer: number;
  email: string;
  name: string;
  examId: string;
};

// ExamResult Model
export type ExamResultModel = Model<IExamResult, Record<string, unknown>>;

export type IExamResultFilters = {
  searchTerm?: string;
  email?: string;
  name?: string;
  totalMarks?: string;
};
