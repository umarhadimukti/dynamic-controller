import { Request, Response } from 'express';
import { google } from 'googleapis';

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
        'http://localhost:3001/auth/userinfo.email',
        'http://localhost:3001/auth/userinfo.profile',
    ];

    private url: string = this.oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: this.scopes,
        include_granted_scopes: true
    });

    public googleLogin (req: Request, res: Response)
    {
        res.redirect(this.url);
    }

    public callbackLogin (req: Request, res: Response)
    {
        
    }
}

export default OAuthController;