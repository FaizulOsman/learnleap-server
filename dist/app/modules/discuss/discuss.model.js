"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Discuss = void 0;
const mongoose_1 = require("mongoose");
// Discuss Schema
const DiscussSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: [true, 'userName is missing!'],
    },
    userEmail: {
        type: String,
        required: [true, 'userEmail is missing!'],
    },
    question: {
        type: String,
        required: [true, 'question is missing!'],
    },
    replies: [
        {
            name: {
                type: String,
                required: false,
            },
            email: {
                type: String,
                required: false,
            },
            reply: {
                type: String,
                required: false,
            },
        },
    ],
    likes: [
        {
            email: {
                type: String,
                required: false,
            },
            isLiked: {
                type: Boolean,
                required: false,
            },
        },
    ],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Discuss = (0, mongoose_1.model)('Discuss', DiscussSchema);
