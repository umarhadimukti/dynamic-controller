"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const googleapis_1 = require("googleapis");
class OAuthController {
    GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
    GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
    oauth2Client = new googleapis_1.google.auth.OAuth2(this.GOOGLE_CLIENT_ID, this.GOOGLE_CLIENT_SECRET, 'http://localhost:3001/auth/google/callback');
    scopes = [
        'http://localhost:3001/auth/userinfo.email',
        'http://localhost:3001/auth/userinfo.profile',
    ];
    url = this.oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: this.scopes,
        include_granted_scopes: true
    });
    googleLogin(req, res) {
        res.redirect(this.url);
    }
    async callbackLogin(req, res) {
        const { code } = req.query; // ex. GET http:xxxx?code=12341234
        if (!code) {
            return res.status(400).json({
                status: false,
                message: 'code is required.',
            });
        }
        const { tokens } = await this.oauth2Client.getToken(code); // get token
        this.oauth2Client.setCredentials(tokens);
    }
}
exports.default = OAuthController;
//# sourceMappingURL=OAuthController.js.map