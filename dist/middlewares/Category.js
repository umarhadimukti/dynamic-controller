"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const InputValidation_1 = __importDefault(require("../libs/InputValidation"));
const app = (0, express_1.default)();
app.post('/categories', ...InputValidation_1.default.validate({
    name: { notEmpty: true, errorMessage: 'nama kategori harus diisi.' },
    status: { notEmpty: true, errorMessage: 'status harus diisi.' }
}));
app.put('/categories/:id', ...InputValidation_1.default.validate({
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
        isBoolean: {
            errorMessage: 'tipe data status harus boolean.',
        },
    },
}));
app.delete('/categories/:id', ...InputValidation_1.default.validate({
    id: {
        notEmpty: true,
        in: 'params',
        errorMessage: 'id harus dimasukkan',
    },
}));
exports.default = app;
//# sourceMappingURL=Category.js.map