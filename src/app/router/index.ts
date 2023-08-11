import express from 'express';
import { UserRouter } from '../modules/user/user.router';
import { AuthRouter } from '../modules/auth/auth.router';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRouter,
  },
  {
    path: '/users',
    route: UserRouter,
  },
];

moduleRoutes?.forEach(route => router.use(route?.path, route?.route));

export default router;
