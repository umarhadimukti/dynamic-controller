"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dynamicRoute_1 = __importDefault(require("../routes/dynamicRoute"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const Category_1 = __importDefault(require("./Category"));
app.use('/categories', (0, dynamicRoute_1.default)(Category_1.default));
const Product_1 = __importDefault(require("./Product"));
app.use('/products', (0, dynamicRoute_1.default)(Product_1.default));
const User_1 = __importDefault(require("./User"));
app.use('/users', (0, dynamicRoute_1.default)(User_1.default));
const Role_1 = __importDefault(require("./Role"));
app.use('/roles', (0, dynamicRoute_1.default)(Role_1.default));
exports.default = app;
//# sourceMappingURL=LoadModels.js.map