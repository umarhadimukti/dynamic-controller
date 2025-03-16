"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const googleapis_1 = require("googleapis");
const User_1 = __importDefault(require("../../models/User"));
const AuthService_1 = __importDefault(require("../../libs/AuthService"));
const dotenv_1 = __importDefault(require("dotenv"));
const Role_1 = __importDefault(require("../../models/Role"));
dotenv_1.default.config();
class OAuthController {
    GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
    GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
    oauth2Client = new googleapis_1.google.auth.OAuth2(this.GOOGLE_CLIENT_ID, this.GOOGLE_CLIENT_SECRET, 'http://localhost:3001/auth/google/callback');
    scopes = [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
    ];
    url = this.oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: this.scopes,
        include_granted_scopes: true
    });
    /**
     *
     * @param res - redirect user ke url yang telah di generate
     */
    googleLogin(req, res) {
        res.redirect(this.url);
    }
    /**
     *
     * @returns - memproses user setelah berhasil autentikasi
     */
    async callbackLogin(req, res) {
        try {
            const { code } = req.query; // ex. GET http:xxxx?code=12341234
            if (!code) {
                throw new Error('code not valid.');
            }
            const { tokens } = await this.oauth2Client.getToken(code); // get token
            this.oauth2Client.setCredentials(tokens);
            const oauth2 = googleapis_1.google.oauth2({
                auth: this.oauth2Client,
                version: 'v2',
            });
            const { data } = await oauth2.userinfo.get();
            if (!data.email || !data.name) {
                throw new Error('data not valid.');
            }
            let user = await User_1.default.findOne({ email: data.email });
            if (!user) {
                const userRole = await Role_1.default.findOne({ name: 'user' });
                if (!userRole) {
                    throw new Error('user role not valid.');
                }
                let usernameParts = data.name.split(' ') || [''];
                user = await User_1.default.create({
                    firstName: usernameParts[0] || '',
                    lastName: usernameParts.length > 1 ? usernameParts.slice(1).join(' ') : '',
                    email: data.email,
                    password: '',
                    roleId: userRole._id,
                });
            }
            const userObject = user.toObject();
            const authService = new AuthService_1.default;
            const token = authService.generateToken(userObject, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
            return res.status(200).json({
                status: true,
                data: userObject,
                token: token,
            });
        }
        catch (err) {
            res.status(500).json({
                status: false,
                message: `internal server error: ${err instanceof Error ? err.message : 'unknown error'}`,
            });
        }
    }
}
exports.default = OAuthController;
//# sourceMappingURL=OAuthController.js.map