"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = JwtAuth;
const AuthService_1 = __importDefault(require("../libs/AuthService"));
async function JwtAuth(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401).json({
            status: false,
            message: 'unauthorized: no token provided.',
        });
        return;
    }
    const token = authorization.split(' ')[1];
    const secretKey = process.env.JWT_ACCESS_TOKEN_SECRET;
    const authService = new AuthService_1.default;
    try {
        const jwtDecode = await authService.verifyToken(token, secretKey);
        req.userData = jwtDecode;
    }
    catch (err) {
        res.status(401).json({
            status: false,
            message: `unauthorized: ${err instanceof Error ? err.message : err}`,
        });
        return;
    }
    next();
}
//# sourceMappingURL=JwtAuth.js.map