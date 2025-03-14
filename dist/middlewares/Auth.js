"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const InputValidation_1 = __importDefault(require("../libs/InputValidation"));
const app = (0, express_1.default)();
app.post('/register', ...InputValidation_1.default.validate({
    firstName: {
        in: 'body',
        notEmpty: true,
        errorMessage: 'first name required.',
        isLength: {
            options: {
                min: 3,
            },
            errorMessage: 'firstName at least 3 characters.',
        }
    },
    lastName: {
        in: 'body',
        notEmpty: false,
    },
    email: {
        in: 'body',
        notEmpty: true,
        errorMessage: 'email required.',
    },
    password: {
        in: 'body',
        isLength: {
            options: {
                min: 6,
            },
            errorMessage: 'password at least 6 characters.',
        },
        notEmpty: true,
        errorMessage: 'password required.',
    },
    roleId: {
        in: 'body',
        notEmpty: true,
        errorMessage: 'role id required.'
    }
}));
app.post('/login', ...InputValidation_1.default.validate({
    email: {
        in: 'body',
        isEmail: {
            errorMessage: 'must be a valid email address.',
        },
        notEmpty: true,
        errorMessage: 'email required.',
    }
}));
exports.default = app;
//# sourceMappingURL=Auth.js.map