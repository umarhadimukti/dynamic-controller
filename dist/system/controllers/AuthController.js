"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthService_1 = __importDefault(require("../../libs/AuthService"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class AuthController {
    _model;
    JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET || '';
    JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET || '';
    constructor(model) {
        this._model = model;
    }
    async login(req, res) {
        try {
            const { email: emailPayload, password: passwordPayload } = req.body;
            const authService = new AuthService_1.default;
            const existsUser = await this._model.findOne({ email: emailPayload });
            if (!existsUser) {
                return res.status(401).json({
                    status: false,
                    message: 'user doesn\'t exists.',
                });
            }
            if (!await authService.comparePassword(passwordPayload, existsUser.password)) {
                return res.status(401).json({
                    status: false,
                    message: 'invalid email or password.',
                });
            }
            const user = existsUser.toObject();
            const accessToken = authService.generateToken(user, this.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
            const refreshToken = authService.generateToken(user, this.JWT_REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
            return res.status(201).json({
                status: true,
                message: 'login success.',
                data: {
                    _id: existsUser._id,
                    firstName: existsUser.firstName,
                    lastName: existsUser.lastName,
                    email: existsUser.email,
                },
                accessToken,
                refreshToken,
            });
        }
        catch (err) {
            return res.status(500).json({
                status: false,
                message: `internal server error: ${err instanceof Error ? err.message : 'unknown error'}`,
            });
        }
    }
    async register(req, res) {
        try {
            const payload = req.body;
            const authService = new AuthService_1.default;
            const isExistsUser = await this._model.findOne({ email: payload.email });
            if (isExistsUser) {
                throw new Error('email already exists.');
            }
            const hashedPassword = await authService.hashPassword(payload.password);
            const newUser = await this._model.create({
                firstName: payload.firstName,
                lastName: payload.lastName,
                email: payload.email,
                password: hashedPassword,
                roleId: payload.roleId,
            });
            const user = newUser.toObject();
            // create new token (JWT)
            const accessToken = authService.generateToken(user, this.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            const refreshToken = authService.generateToken(user, this.JWT_REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
            return res.status(201).json({
                status: true,
                message: 'user created successfully.',
                length: 0,
                data: {
                    _id: newUser._id,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                },
                accessToken: accessToken,
                refreshToken: refreshToken,
            });
        }
        catch (err) {
            return res.status(500).json({
                status: false,
                message: `internal server error: ${err instanceof Error ? err.message : 'unknown error'}`,
            });
        }
    }
    async refreshToken(req, res) {
        try {
            const { token } = req.params;
            const authService = new AuthService_1.default;
            if (!token) {
                res.status(400).json({
                    status: false,
                    message: 'token required.',
                });
            }
            // verifikasi token
            const verifiedToken = await authService.verifyToken(token, this.JWT_REFRESH_TOKEN_SECRET);
            if (!verifiedToken || typeof verifiedToken !== 'object') {
                return res.status(401).json({
                    status: false,
                    message: 'invalid or expired refresh token.',
                });
            }
            // ekstrak data user (hapus iat, exp)
            const { iat, exp, ...userData } = verifiedToken;
            // generate token baru
            const accessToken = authService.generateToken(userData, this.JWT_REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
            const refreshToken = authService.generateToken(userData, this.JWT_REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
            return res.status(200).json({
                status: true,
                message: 'token successfully refreshed.',
                accessToken,
                refreshToken,
            });
        }
        catch (err) {
            return res.status(500).json({
                status: false,
                message: `${err instanceof Error ? err.message : 'unknown error'}`,
            });
        }
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map