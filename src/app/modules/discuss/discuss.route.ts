import express from 'express';
import { DiscussController } from './discuss.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { DiscussValidation } from './discuss.validation';
const router = express.Router();

// Routes
router.post(
  '/create-discuss',
  validateRequest(DiscussValidation.createDiscussZodValidation),
  DiscussController.createDiscuss
);

router.get('/:id', DiscussController.getSingleDiscuss);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  DiscussController.deleteDiscuss
);

router.patch(
  '/:id',
  validateRequest(DiscussValidation.updateDiscussZodValidation),
  DiscussController.updateDiscuss
);

router.get('/', DiscussController.getAllDiscusses);

export const DiscussRoutes = router;
