import { Model } from 'mongoose';

export type IReplies = {
  name: string;
  email: string;
  reply: string;
};

export type ILikes = {
  email: string;
  isLiked: boolean;
};

export type IDiscuss = {
  userName: string;
  userEmail: string;
  question: string;
  replies?: IReplies[];
  likes?: ILikes[];
};

// Discuss Model
export type DiscussModel = Model<IDiscuss, Record<string, unknown>>;

export type IDiscussFilters = {
  searchTerm?: string;
  question?: string;
};
