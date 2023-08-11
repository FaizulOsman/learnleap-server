import express from 'express';
import { UserRoutes } from '../modules/user/user.router';
import { AuthRouter } from '../modules/auth/auth.router';
import { TestRoutes } from '../modules/test/test.route';
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
];

moduleRoutes?.forEach(route => router.use(route?.path, route?.route));

export default router;
