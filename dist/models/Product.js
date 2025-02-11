"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const productSchema = new Schema({
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true, },
    name: { type: String, required: true, },
    status: { type: Boolean, default: true, },
    price: { type: Number, required: true, },
    description: { type: String, required: false, },
}, {
    timestamps: true,
    toObject: { virtuals: true, },
    toJSON: { virtuals: true },
});
const Product = model('Product', productSchema);
exports.default = Product;
