import express from 'express';
import { ExamController } from './exam.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { ExamValidation } from './exam.validation';
const router = express.Router();

// Routes
router.post(
  '/create-exam',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(ExamValidation.createExamZodValidation),
  ExamController.createExam
);

router.get('/:id', ExamController.getSingleExam);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), ExamController.deleteExam);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(ExamValidation.updateExamZodValidation),
  ExamController.updateExam
);

router.patch(
  '/add-result/:id',
  validateRequest(ExamValidation.updateExamZodValidation),
  ExamController.addResult
);

router.get('/', ExamController.getAllExams);

export const ExamRoutes = router;
