"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster-projects.2wh8y.mongodb.net/${process.env.DB_NAME}`;
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(MONGO_URI);
        console.log('MongoDB connected successfully ✅');
    }
    catch (err) {
        console.error(`failed connect to db: ${err}`);
        process.exit(1);
    }
};
exports.default = connectDB;
//# sourceMappingURL=connection.js.map