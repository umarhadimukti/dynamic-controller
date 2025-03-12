"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../models/User"));
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const ModuleController_1 = __importDefault(require("../controllers/ModuleController"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const moduleController = new ModuleController_1.default;
const authController = new AuthController_1.default(User_1.default);
app.post('/system/modules', (req, res) => {
    moduleController.createModel(req, res);
});
app.post('/register', (req, res) => {
    authController.register(req, res);
});
app.post('/login', (req, res) => {
    authController.login(req, res);
});
exports.default = app;
//# sourceMappingURL=system.js.map