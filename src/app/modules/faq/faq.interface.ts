import { Model } from 'mongoose';

export type IFaq = {
  question: string;
  answer: string;
};

// Faq Model
export type FaqModel = Model<IFaq, Record<string, unknown>>;

export type IFaqFilters = {
  searchTerm?: string;
  question?: string;
};
