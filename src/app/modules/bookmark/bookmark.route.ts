import express from 'express';
import { BookmarkController } from './bookmark.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { BookmarkValidation } from './bookmark.validation';
const router = express.Router();

// Routes
router.post(
  '/create-bookmark',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(BookmarkValidation.createBookmarkZodValidation),
  BookmarkController.createBookmark
);

router.get('/:id', BookmarkController.getSingleBookmark);

router.delete(
  '/delete-bookmark',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  BookmarkController.deleteBookmark
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(BookmarkValidation.updateBookmarkZodValidation),
  BookmarkController.updateBookmark
);

router.get('/', BookmarkController.getAllBookmarks);

export const BookmarkRoutes = router;
