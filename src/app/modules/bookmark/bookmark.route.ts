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
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BookmarkValidation.createBookmarkZodValidation),
  BookmarkController.createBookmark
);

router.get('/:id', BookmarkController.getSingleBookmark);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  BookmarkController.deleteBookmark
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BookmarkValidation.updateBookmarkZodValidation),
  BookmarkController.updateBookmark
);

router.patch(
  '/add-result/:id',
  validateRequest(BookmarkValidation.updateBookmarkZodValidation),
  BookmarkController.addResult
);

router.get('/', BookmarkController.getAllBookmarks);

export const BookmarkRoutes = router;
