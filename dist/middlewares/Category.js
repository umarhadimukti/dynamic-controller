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
    name: { notEmpty: true },
    status: { notEmpty: true },
}), runValidation_1.default);
exports.default = app;
