"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const connection_1 = __importDefault(require("./db/connection"));
const LoadModels_1 = __importDefault(require("./models/LoadModels"));
const LoadMiddleware_1 = __importDefault(require("./middlewares/LoadMiddleware"));
const system_1 = __importDefault(require("./system/routes/system"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
// built-in middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// connect db
(0, connection_1.default)();
// middleware express-validator (for sanitazion input)
app.use(LoadMiddleware_1.default);
// middleware routes
app.use(system_1.default); // module generator
app.use(LoadModels_1.default); // common route
app.listen(port, () => console.log(`server running at port ${port}`));
//# sourceMappingURL=index.js.map