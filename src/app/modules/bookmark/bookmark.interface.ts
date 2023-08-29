import { Model } from 'mongoose';

export type IBookmark = {
  question: string;
  option1: string;
  option2: string;
  option3?: string;
  option4?: string;
  option5?: string;
  answer: string;
  subject: string;
  email: string;
  questionId: string;
};

// Bookmark Model
export type BookmarkModel = Model<IBookmark, Record<string, unknown>>;

export type IBookmarkFilters = {
  searchTerm?: string;
  subject?: string;
};
