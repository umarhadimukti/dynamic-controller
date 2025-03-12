"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Category_1 = __importDefault(require("./Category"));
const Product_1 = __importDefault(require("./Product"));
const app = (0, express_1.default)();
app.use('/', Category_1.default);
app.use('/', Product_1.default);
exports.default = app;
//# sourceMappingURL=LoadMiddleware.js.map