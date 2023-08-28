"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exam = void 0;
const mongoose_1 = require("mongoose");
// Exam Schema
const ExamSchema = new mongoose_1.Schema({
    questions: [
        {
            question: {
                type: String,
                required: [true, 'question is missing!'],
            },
            option1: {
                type: String,
                required: [true, 'option1 is missing!'],
            },
            option2: {
                type: String,
                required: [true, 'option2 is missing!'],
            },
            option3: {
                type: String,
                required: [true, 'option3 is missing!'],
            },
            option4: {
                type: String,
                required: [true, 'option4 is missing!'],
            },
            option5: {
                type: String,
                required: [false, 'option5 is missing!'],
            },
            answer: {
                type: String,
                required: [true, 'answer is missing!'],
            },
            subject: {
                type: String,
                required: [false, 'subject is missing!'],
            },
        },
    ],
    timeLimit: {
        type: Number,
        required: [false, 'timeLimit is missing!'],
    },
    subject: {
        type: String,
        required: [false, 'subject is missing!'],
    },
    serial: {
        type: Number,
        required: [false, 'serial is missing!'],
    },
    isPublished: {
        type: Boolean,
        required: [false, 'isPublished is missing!'],
    },
    results: [
        {
            name: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
            },
            marks: {
                type: Number,
                required: true,
            },
        },
    ],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Exam = (0, mongoose_1.model)('Exam', ExamSchema);
