"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
;
const categorySchema = new Schema({
    // name: { type: String, required: true, },
    status: { type: Boolean, default: true, },
    description: { type: String, required: false, },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
const Category = model('Category', categorySchema);
exports.default = Category;
