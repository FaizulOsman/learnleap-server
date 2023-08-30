"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestRoutes = void 0;
const express_1 = __importDefault(require("express"));
const test_controller_1 = require("./test.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const test_validation_1 = require("./test.validation");
const router = express_1.default.Router();
// Routes
router.post('/create-test', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(test_validation_1.TestValidation.createTestZodValidation), test_controller_1.TestController.createTest);
router.get('/get-test-by-subject/:subject', test_controller_1.TestController.getTestBySubject);
router.get('/:id', test_controller_1.TestController.getSingleTest);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), test_controller_1.TestController.deleteTest);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(test_validation_1.TestValidation.updateTestZodValidation), test_controller_1.TestController.updateTest);
router.patch('/add-result/:id', (0, validateRequest_1.default)(test_validation_1.TestValidation.updateTestZodValidation), test_controller_1.TestController.addResult);
router.get('/', test_controller_1.TestController.getAllTests);
exports.TestRoutes = router;
