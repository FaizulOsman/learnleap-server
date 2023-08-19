import express from 'express';
import { ExamResultController } from './examResult.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { ExamResultValidation } from './examResult.validation';
const router = express.Router();

// Routes
router.post(
  '/create-exam-result',
  // auth(ENUM_USER_ROLE.USER),
  validateRequest(ExamResultValidation.createExamResultZodValidation),
  ExamResultController.createExamResult
);

router.get('/my-submitted-results', ExamResultController.mySubmittedResults);

router.get('/:id', ExamResultController.getSingleExamResult);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  ExamResultController.deleteExamResult
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(ExamResultValidation.updateExamResultZodValidation),
  ExamResultController.updateExamResult
);

router.patch(
  '/add-review/:id',
  auth(ENUM_USER_ROLE.USER),
  validateRequest(ExamResultValidation.updateExamResultZodValidation),
  ExamResultController.addReview
);

router.get('/', ExamResultController.getAllExamResults);

export const ExamResultRoutes = router;
