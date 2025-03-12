"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const moment_1 = __importDefault(require("moment"));
const { Schema, model } = mongoose_1.default;
const varSchema = new Schema({}, //schema
{
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
const TableSchema = model('modelName', varSchema);
exports.default = TableSchema;
//# sourceMappingURL=model.js.map