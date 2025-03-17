import { Request, Response, NextFunction } from "express";
import AuthService from "../libs/AuthService";

export default async function JwtAuth (req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({
            status: false,
            message: 'unauthorized: no token provided.',
        });
    }

    const token: string = authorization.split(' ')[1];
    const secretKey: string = process.env.JWT_ACCESS_TOKEN_SECRET as string;
    const authService = new AuthService;

    try {
        const jwtDecode = await authService.verifyToken(token, secretKey);
        req.userData = jwtDecode;

        next();
    } catch (err) {
        return res.status(401).json({
            status: false,
            message: `unauthorized: ${err instanceof Error ? err.message : err}`,
        });
    }
}