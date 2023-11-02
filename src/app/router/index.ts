import express from 'express';
import { UserRoutes } from '../modules/user/user.router';
import { AuthRouter } from '../modules/auth/auth.router';
import { TestRoutes } from '../modules/test/test.route';
import { ExamResultRoutes } from '../modules/examResult/examResult.route';
import { ExamRoutes } from '../modules/exam/exam.route';
import { BookmarkRoutes } from '../modules/bookmark/bookmark.route';
import { DiscussRoutes } from '../modules/discuss/discuss.route';
import { FeedbackRoutes } from '../modules/feedback/feedback.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRouter,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/test',
    route: TestRoutes,
  },
  {
    path: '/exam',
    route: ExamRoutes,
  },
  {
    path: '/exam-result',
    route: ExamResultRoutes,
  },
  {
    path: '/bookmarks',
    route: BookmarkRoutes,
  },
  {
    path: '/discusses',
    route: DiscussRoutes,
  },
  {
    path: '/feedbacks',
    route: FeedbackRoutes,
  },
];

moduleRoutes?.forEach(route => router.use(route?.path, route?.route));

export default router;
