"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscussRoutes = void 0;
const express_1 = __importDefault(require("express"));
const discuss_controller_1 = require("./discuss.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const discuss_validation_1 = require("./discuss.validation");
const router = express_1.default.Router();
// Routes
router.post('/create-discuss', (0, validateRequest_1.default)(discuss_validation_1.DiscussValidation.createDiscussZodValidation), discuss_controller_1.DiscussController.createDiscuss);
router.get('/:id', discuss_controller_1.DiscussController.getSingleDiscuss);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), discuss_controller_1.DiscussController.deleteDiscuss);
router.patch('/:id', (0, validateRequest_1.default)(discuss_validation_1.DiscussValidation.updateDiscussZodValidation), discuss_controller_1.DiscussController.updateDiscuss);
router.get('/', discuss_controller_1.DiscussController.getAllDiscusses);
exports.DiscussRoutes = router;
