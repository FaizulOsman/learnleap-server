"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Faq = void 0;
const mongoose_1 = require("mongoose");
// Faq Schema
const FaqSchema = new mongoose_1.Schema({
    question: {
        type: String,
        required: [true, 'question is missing!'],
    },
    answer: {
        type: String,
        required: [true, 'answer is missing!'],
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Faq = (0, mongoose_1.model)('Faq', FaqSchema);
