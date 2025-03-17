import { Request, Response, NextFunction } from "express";
import AuthService from "../libs/AuthService";
import { JwtPayload } from "jsonwebtoken";

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
    const secretKey: string = process.env.JWT_ACCESS_TOKEN_SECRET as string;
    const authService = new AuthService;

    try {
        const jwtDecode: unknown | JwtPayload = await authService.verifyToken(token, secretKey);

        console.log(jwtDecode)
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