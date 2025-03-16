import { Request, Response } from 'express';
import { google } from 'googleapis';
import User from '../../models/User';
import AuthService from '../../libs/AuthService';
import dotenv from 'dotenv';
import Role from '../../models/Role';

dotenv.config();

class OAuthController
{
    protected GOOGLE_CLIENT_ID: string = process.env.GOOGLE_CLIENT_ID || '';
    protected GOOGLE_CLIENT_SECRET: string = process.env.GOOGLE_CLIENT_SECRET || '';

    private oauth2Client = new google.auth.OAuth2(
        this.GOOGLE_CLIENT_ID,
        this.GOOGLE_CLIENT_SECRET,
        'http://localhost:3001/auth/google/callback',
    );

    private scopes: string[] = [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
    ];

    private url: string = this.oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: this.scopes,
        include_granted_scopes: true
    });

    /**
     * 
     * @param res - redirect user ke url yang telah di generate 
     */
    public googleLogin (req: Request, res: Response)
    {
        res.redirect(this.url);
    }

    /**
     * 
     * @returns - memproses user setelah berhasil autentikasi
     */
    public async callbackLogin (req: Request, res: Response)
    {
        try {

            const { code } = req.query; // ex. GET http:xxxx?code=12341234

            if (!code) {
                throw new Error('code not valid.');
            }

            const { tokens } = await this.oauth2Client.getToken(code as string); // get token
            
            this.oauth2Client.setCredentials(tokens);

            const oauth2 = google.oauth2({
                auth: this.oauth2Client,
                version: 'v2',
            });

            const { data } = await oauth2.userinfo.get();

            if (!data.email || !data.name) {
                throw new Error('data not valid.');
            }

            let user = await User.findOne({ email: data.email });
            if (!user) {
                const userRole = await Role.findOne({ name: 'user' });
                if (!userRole) {
                    throw new Error('user role not valid.');
                }
                let usernameParts = data.name.split(' ') || [''];
                user = await User.create({
                    firstName: usernameParts[0] || '',
                    lastName: usernameParts.length > 1 ? usernameParts.slice(1).join(' ') : '',
                    email: data.email,
                    password: '',
                    roleId: userRole._id,
                    isOAuth: true,
                });
            }

            const userObject = user.toObject();

            const authService = new AuthService;
            const token = authService.generateToken(userObject, process.env.JWT_ACCESS_TOKEN_SECRET as string, { expiresIn: '1d' });

            return res.status(200).json({
                status: true,
                data: userObject,
                token: token,
            });

        } catch (err) {
            res.status(500).json({
                status: false,
                message: `internal server error: ${err instanceof Error ? err.message : 'unknown error'}`,
            });
        }
        
    }
}

export default OAuthController;