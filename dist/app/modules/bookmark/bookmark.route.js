"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookmarkRoutes = void 0;
const express_1 = __importDefault(require("express"));
const bookmark_controller_1 = require("./bookmark.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const bookmark_validation_1 = require("./bookmark.validation");
const router = express_1.default.Router();
// Routes
router.post('/create-bookmark', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), (0, validateRequest_1.default)(bookmark_validation_1.BookmarkValidation.createBookmarkZodValidation), bookmark_controller_1.BookmarkController.createBookmark);
router.get('/:id', bookmark_controller_1.BookmarkController.getSingleBookmark);
router.delete('/delete-bookmark', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), bookmark_controller_1.BookmarkController.deleteBookmark);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), (0, validateRequest_1.default)(bookmark_validation_1.BookmarkValidation.updateBookmarkZodValidation), bookmark_controller_1.BookmarkController.updateBookmark);
router.get('/', bookmark_controller_1.BookmarkController.getAllBookmarks);
exports.BookmarkRoutes = router;
