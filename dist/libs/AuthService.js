"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
class AuthService {
    /**
     *
     * @param password - password asli
     * @returns - password yang sudah di hash
     */
    hashPassword = async (password) => {
        const salt = await bcryptjs_1.default.genSalt(10);
        return bcryptjs_1.default.hash(password, salt);
    };
    /**
     *
     * @param password - password asli
     * @param hashedPassword - password yang sudah di hash
     * @returns - mengembalikan boolean dari hasil pengecekkan
     */
    comparePassword = async (password, hashedPassword) => {
        return await bcryptjs_1.default.compare(password, hashedPassword);
    };
    /**
     *
     * @param payload - payload data user
     * @param secretKey - secretKey
     * @param options - options untuk expiresIn
     * @returns
     */
    generateToken = (payload, secretKey, options) => {
        const token = jsonwebtoken_1.default.sign(payload, secretKey, options);
        return token;
    };
    /**
     *
     * @param token - string token
     * @param secretKey - secretKey
     * @returns - return hasil verifikasi
     */
    verifyToken = async (token, secretKey) => {
        try {
            return jsonwebtoken_1.default.verify(token, secretKey);
        }
        catch (err) {
            return `test: ${err}`;
        }
    };
}
exports.default = AuthService;
//# sourceMappingURL=AuthService.js.map