import { Request, Response, NextFunction } from "express";
import AuthService from "../libs/AuthService";

declare module "express" {
    export interface Request {
        userData?: any,
    }
}

export default async function JwtAuth (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { authorization } = req.headers;

    if (!authorization) {
        res.status(401).json({
            status: false,
            message: 'unauthorized: no token provided.',
        });
        return;
    }

    const token: string = authorization.split(' ')[1];
    console.log(token)
    const secretKey: string = process.env.JWT_REFRESH_TOKEN_SECRET as string;
    const authService = new AuthService;

    try {
        const jwtDecode = await authService.verifyToken(token, secretKey);
        req.userData = jwtDecode;
    } catch (err) {
        res.status(401).json({
            status: false,
            message: `unauthorized: ${err instanceof Error ? err.message : err}`,
        });
        return;
    }

    next();
}