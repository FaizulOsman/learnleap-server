import { Schema, model } from 'mongoose';
import { IBookmark, BookmarkModel } from './bookmark.interface';

// Bookmark Schema
const BookmarkSchema = new Schema<IBookmark, BookmarkModel>(
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
      required: [false, 'option3 is missing!'],
    },
    option4: {
      type: String,
      required: [false, 'option4 is missing!'],
    },
    option5: {
      type: String,
      required: [false, 'option5 is missing!'],
    },
    answer: {
      type: String,
      required: [true, 'answer is missing!'],
    },
    subject: {
      type: String,
      required: [true, 'Subject is missing!'],
    },
    email: {
      type: String,
      required: [true, 'Email is missing!'],
    },
    questionId: {
      type: String,
      required: [true, 'Question Id is missing!'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Bookmark = model<IBookmark, BookmarkModel>(
  'Bookmark',
  BookmarkSchema
);
