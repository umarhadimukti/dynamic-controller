"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const InputValidation_1 = __importDefault(require("../libs/InputValidation"));
const app = (0, express_1.default)();
app.post('/categories', ...InputValidation_1.default.validate({
    name: { notEmpty: true, errorMessage: 'category name required.' },
    status: { notEmpty: true, errorMessage: 'status required.' }
}));
app.put('/categories/:id', ...InputValidation_1.default.validate({
    id: {
        notEmpty: true,
        errorMessage: 'category id required.',
        in: 'params',
    },
    name: {
        notEmpty: true,
        errorMessage: 'category name required.',
        in: 'body',
        isLength: {
            options: { min: 3 },
            errorMessage: 'category name at least 3 characters.',
        }
    },
    status: {
        notEmpty: true,
        in: 'body',
        errorMessage: 'status required.',
        isBoolean: {
            errorMessage: 'status must be boolean.',
        },
    },
}));
app.delete('/categories/:id', ...InputValidation_1.default.validate({
    id: {
        notEmpty: true,
        in: 'params',
        errorMessage: 'category id required',
    },
}));
exports.default = app;
//# sourceMappingURL=Category.js.map