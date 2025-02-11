"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const connection_1 = __importDefault(require("./db/connection"));
const api_1 = __importDefault(require("./routes/api"));
const Category_1 = __importDefault(require("./models/Category"));
const Product_1 = __importDefault(require("./models/Product"));
const Category_2 = __importDefault(require("./middlewares/Category"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
// built-in middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// connect db
(0, connection_1.default)();
// middleware express-validator (for sanitazion input)
app.use(Category_2.default);
// middleware routes
app.use('/categories', (0, api_1.default)(Category_1.default));
app.use('/products', (0, api_1.default)(Product_1.default));
app.listen(port, () => console.log(`server running at port ${port}`));
