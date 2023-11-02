"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feedback = void 0;
const mongoose_1 = require("mongoose");
// Feedback Schema
const FeedbackSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, 'email is missing!'],
    },
    message: {
        type: String,
        required: [true, 'message is missing!'],
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Feedback = (0, mongoose_1.model)('Feedback', FeedbackSchema);
