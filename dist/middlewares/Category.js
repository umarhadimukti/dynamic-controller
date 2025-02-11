"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const runValidation_1 = __importDefault(require("../libs/runValidation"));
const app = (0, express_1.default)();
app.post('/categories', (0, express_validator_1.checkSchema)({
    name: { notEmpty: true, errorMessage: 'nama kategori harus diisi.' },
    status: { notEmpty: true, errorMessage: 'status harus diisi.' },
}), runValidation_1.default);
app.put('categories/:id', (0, express_validator_1.checkSchema)({
    id: {
        notEmpty: true,
        errorMessage: 'id kategori harus di masukkan.',
        in: 'params',
    },
    name: {
        notEmpty: true,
        errorMessage: 'nama kategori harus diisi.',
        in: 'body',
        isLength: {
            options: { min: 3 },
            errorMessage: 'minimal 3 karakter.',
        }
    },
    status: {
        notEmpty: true,
        in: 'body',
        errorMessage: 'status harus diisi.',
        isBoolean: true,
    },
}), runValidation_1.default);
exports.default = app;
