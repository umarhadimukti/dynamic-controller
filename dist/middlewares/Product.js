"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const InputValidation_1 = __importDefault(require("../libs/InputValidation"));
const app = (0, express_1.default)();
app.post('/products', ...InputValidation_1.default.validate({
    categoryId: {
        notEmpty: true,
        in: 'body',
        errorMessage: 'category id required.',
    },
    name: {
        notEmpty: true,
        in: 'body',
        errorMessage: 'product name required.',
    },
    status: {
        notEmpty: true,
        in: 'body',
        default: true,
        errorMessage: 'status required.',
        isBoolean: {
            errorMessage: 'status must be boolean.',
        },
    },
    price: {
        notEmpty: true,
        in: 'body',
        errorMessage: 'price required.',
        isNumeric: {
            errorMessage: 'price must be numeric.',
        },
    },
    description: {
        notEmpty: true,
        in: 'body',
        isString: {
            errorMessage: 'description must be string.',
        },
        errorMessage: 'description required.',
    },
}));
app.put('/products/:id', ...InputValidation_1.default.validate({
    id: {
        notEmpty: true,
        in: 'params',
        isEmpty: {
            errorMessage: 'product id required.',
        },
    },
    categoryId: {
        notEmpty: true,
        in: 'params',
        isEmpty: {
            errorMessage: 'category id required.',
        },
    },
    name: {
        notEmpty: true,
        in: 'body',
        isEmpty: {
            errorMessage: 'product name required.',
        },
    },
    status: {
        notEmpty: true,
        in: 'body',
        default: true,
        isEmpty: {
            errorMessage: 'status required.',
        },
        isBoolean: {
            errorMessage: 'status must be boolean.',
        },
    },
    price: {
        notEmpty: true,
        in: 'body',
        errorMessage: 'price required.',
        isNumeric: {
            errorMessage: 'price must be numeric.',
        },
    },
    description: {
        notEmpty: false,
        in: 'body',
        isString: {
            errorMessage: 'description must be string.'
        },
    },
}));
app.delete('/products/:id', ...InputValidation_1.default.validate({
    id: {
        notEmpty: true,
        in: 'params',
        isEmpty: {
            errorMessage: 'product id required.',
        },
    },
}));
exports.default = app;
//# sourceMappingURL=Product.js.map