"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const moment_1 = __importDefault(require("moment"));
const { Schema, model } = mongoose_1.default;
const MfProductSchema = new Schema({
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    test: {
        type: Date,
        required: false
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (_, ret) => {
            ret.createdAt = (0, moment_1.default)(ret.createdAt).format('YYYY-MM-DD HH:mm:ss.SSS');
            ret.updatedAt = (0, moment_1.default)(ret.updatedAt).format('YYYY-MM-DD HH:mm:ss.SSS');
            return ret;
        },
    },
    toObject: {
        virtuals: true,
        transform: (_, ret) => {
            ret.createdAt = (0, moment_1.default)(ret.createdAt).format('YYYY-MM-DD HH:mm:ss.SSS');
            ret.updatedAt = (0, moment_1.default)(ret.updatedAt).format('YYYY-MM-DD HH:mm:ss.SSS');
            return ret;
        },
    },
});
const MfProduct = model('MfProduct', MfProductSchema);
exports.default = MfProduct;
//# sourceMappingURL=MfProduct.js.map