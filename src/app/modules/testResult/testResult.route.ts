import express from 'express';
import { TestResultController } from './testResult.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { TestResultValidation } from './testResult.validation';
const router = express.Router();

// Routes
router.post(
  '/create-test-result',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(TestResultValidation.createTestResultZodValidation),
  TestResultController.createTestResult
);

router.get('/:id', TestResultController.getSingleTestResult);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  TestResultController.deleteTestResult
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(TestResultValidation.updateTestResultZodValidation),
  TestResultController.updateTestResult
);

router.patch(
  '/add-review/:id',
  auth(ENUM_USER_ROLE.USER),
  validateRequest(TestResultValidation.updateTestResultZodValidation),
  TestResultController.addReview
);

router.get('/', TestResultController.getAllTestResults);

export const TestResultRoutes = router;
