import express from 'express';
import { FaqController } from './faq.controller';
import validateRequest from '../../middlewares/validateRequest';
import { FaqValidation } from './faq.validation';
const router = express.Router();

// Routes
router.post(
  '/create-faq',
  validateRequest(FaqValidation.createFaqZodValidation),
  FaqController.createFaq
);

router.get('/:id', FaqController.getSingleFaq);

router.delete('/:id', FaqController.deleteFaq);

router.patch(
  '/:id',
  validateRequest(FaqValidation.updateFaqZodValidation),
  FaqController.updateFaq
);

router.get('/', FaqController.getAllFaqs);

export const FaqRoutes = router;
