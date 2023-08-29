import { Model } from 'mongoose';

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

export type IBookmark = {
  questions: IQuestion[];
  subject: string;
  email: string;
};

// Bookmark Model
export type BookmarkModel = Model<IBookmark, Record<string, unknown>>;

export type IBookmarkFilters = {
  searchTerm?: string;
  subject?: string;
};
