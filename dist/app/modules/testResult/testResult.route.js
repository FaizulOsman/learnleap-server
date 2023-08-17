"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestResultRoutes = void 0;
const express_1 = __importDefault(require("express"));
const testResult_controller_1 = require("./testResult.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const testResult_validation_1 = require("./testResult.validation");
const router = express_1.default.Router();
// Routes
router.post('/create-test-result', 
// auth(ENUM_USER_ROLE.USER),
(0, validateRequest_1.default)(testResult_validation_1.TestResultValidation.createTestResultZodValidation), testResult_controller_1.TestResultController.createTestResult);
router.get('/my-submitted-results', testResult_controller_1.TestResultController.mySubmittedResults);
router.get('/:id', testResult_controller_1.TestResultController.getSingleTestResult);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), testResult_controller_1.TestResultController.deleteTestResult);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(testResult_validation_1.TestResultValidation.updateTestResultZodValidation), testResult_controller_1.TestResultController.updateTestResult);
router.patch('/add-review/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), (0, validateRequest_1.default)(testResult_validation_1.TestResultValidation.updateTestResultZodValidation), testResult_controller_1.TestResultController.addReview);
router.get('/', testResult_controller_1.TestResultController.getAllTestResults);
exports.TestResultRoutes = router;
