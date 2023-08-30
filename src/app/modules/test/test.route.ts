import express from 'express';
import { TestController } from './test.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { TestValidation } from './test.validation';
const router = express.Router();

// Routes
router.post(
  '/create-test',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(TestValidation.createTestZodValidation),
  TestController.createTest
);

router.get('/get-test-by-subject/:subject', TestController.getTestBySubject);

router.get('/:id', TestController.getSingleTest);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), TestController.deleteTest);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(TestValidation.updateTestZodValidation),
  TestController.updateTest
);

router.patch(
  '/add-result/:id',
  validateRequest(TestValidation.updateTestZodValidation),
  TestController.addResult
);

router.get('/', TestController.getAllTests);

export const TestRoutes = router;
