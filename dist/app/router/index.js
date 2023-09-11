"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_router_1 = require("../modules/user/user.router");
const auth_router_1 = require("../modules/auth/auth.router");
const test_route_1 = require("../modules/test/test.route");
const examResult_route_1 = require("../modules/examResult/examResult.route");
const exam_route_1 = require("../modules/exam/exam.route");
const bookmark_route_1 = require("../modules/bookmark/bookmark.route");
const discuss_route_1 = require("../modules/discuss/discuss.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_router_1.AuthRouter,
    },
    {
        path: '/users',
        route: user_router_1.UserRoutes,
    },
    {
        path: '/test',
        route: test_route_1.TestRoutes,
    },
    {
        path: '/exam',
        route: exam_route_1.ExamRoutes,
    },
    {
        path: '/exam-result',
        route: examResult_route_1.ExamResultRoutes,
    },
    {
        path: '/bookmarks',
        route: bookmark_route_1.BookmarkRoutes,
    },
    {
        path: '/discusses',
        route: discuss_route_1.DiscussRoutes,
    },
];
moduleRoutes === null || moduleRoutes === void 0 ? void 0 : moduleRoutes.forEach(route => router.use(route === null || route === void 0 ? void 0 : route.path, route === null || route === void 0 ? void 0 : route.route));
exports.default = router;
