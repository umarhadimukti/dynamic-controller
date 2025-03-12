"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DynamicController_1 = __importDefault(require("../controllers/DynamicController"));
const express_1 = __importDefault(require("express"));
/**
 *
 * @file - this file used for load models
 */
const dynamicRoute = (model) => {
    const router = express_1.default.Router();
    const controller = new DynamicController_1.default(model);
    router.get('/', (req, res) => {
        controller.index(req, res);
    });
    router.get('/:id', (req, res) => {
        controller.show(req, res);
    });
    router.post('/', (req, res) => {
        controller.store(req, res);
    });
    router.put('/:id', (req, res) => {
        controller.update(req, res);
    });
    router.delete('/:id', (req, res) => {
        controller.delete(req, res);
    });
    return router;
};
exports.default = dynamicRoute;
//# sourceMappingURL=dynamicRoute.js.map