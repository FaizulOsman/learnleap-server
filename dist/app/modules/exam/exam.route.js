"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamRoutes = void 0;
const express_1 = __importDefault(require("express"));
const exam_controller_1 = require("./exam.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const exam_validation_1 = require("./exam.validation");
const router = express_1.default.Router();
// Routes
router.post('/create-exam', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(exam_validation_1.ExamValidation.createExamZodValidation), exam_controller_1.ExamController.createExam);
router.get('/:id', exam_controller_1.ExamController.getSingleExam);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), exam_controller_1.ExamController.deleteExam);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(exam_validation_1.ExamValidation.updateExamZodValidation), exam_controller_1.ExamController.updateExam);
router.patch('/add-result/:id', (0, validateRequest_1.default)(exam_validation_1.ExamValidation.updateExamZodValidation), exam_controller_1.ExamController.addResult);
router.get('/', exam_controller_1.ExamController.getAllExams);
exports.ExamRoutes = router;
