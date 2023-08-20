"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamResultRoutes = void 0;
const express_1 = __importDefault(require("express"));
const examResult_controller_1 = require("./examResult.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const examResult_validation_1 = require("./examResult.validation");
const router = express_1.default.Router();
// Routes
router.post('/create-exam-result', 
// auth(ENUM_USER_ROLE.USER),
(0, validateRequest_1.default)(examResult_validation_1.ExamResultValidation.createExamResultZodValidation), examResult_controller_1.ExamResultController.createExamResult);
router.get('/my-submitted-results', examResult_controller_1.ExamResultController.mySubmittedResults);
router.get('/:id', examResult_controller_1.ExamResultController.getSingleExamResult);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), examResult_controller_1.ExamResultController.deleteExamResult);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(examResult_validation_1.ExamResultValidation.updateExamResultZodValidation), examResult_controller_1.ExamResultController.updateExamResult);
router.patch('/add-review/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), (0, validateRequest_1.default)(examResult_validation_1.ExamResultValidation.updateExamResultZodValidation), examResult_controller_1.ExamResultController.addReview);
router.get('/', examResult_controller_1.ExamResultController.getAllExamResults);
exports.ExamResultRoutes = router;
