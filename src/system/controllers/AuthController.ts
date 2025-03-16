import { Request, Response } from 'express';
import { Model } from "mongoose";
import { IUser } from "../../models/User";
import AuthService from "../../libs/AuthService";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export default class AuthController
{
    protected _model: Model<IUser>;
    
    private JWT_ACCESS_TOKEN_SECRET: string = process.env.JWT_ACCESS_TOKEN_SECRET || '';
    private JWT_REFRESH_TOKEN_SECRET: string = process.env.JWT_REFRESH_TOKEN_SECRET || '';

    constructor(model: Model<IUser>) {
        this._model = model;
    }

    public async login (req: Request, res: Response): Promise<Response>
    {
        try {
            const { email: emailPayload, password: passwordPayload } = req.body;
            const authService = new AuthService;

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

            const user: object = existsUser.toObject();

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
        } catch (err) {
            return res.status(500).json({
                status: false,
                message: `internal server error: ${err instanceof Error ? err.message : 'unknown error'}`,
            });
        }
    }

    public async register (req: Request, res: Response): Promise<Response>
    {
        try {
            const payload = req.body;
            const authService = new AuthService;

            const isExistsUser = await this._model.findOne({ email: payload.email });
            if (isExistsUser) {
                throw new Error('email already exists.');
            }

            const hashedPassword: string = await authService.hashPassword(payload.password);

            const newUser = await this._model.create({
                firstName: payload.firstName,
                lastName: payload.lastName,
                email: payload.email,
                password: hashedPassword,
                roleId: payload.roleId,
            });

            const user: object = newUser.toObject();

            // create new token (JWT)
            const accessToken: string = authService.generateToken(user, this.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            const refreshToken: string = authService.generateToken(user, this.JWT_REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

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
        } catch (err) {
            return res.status(500).json({
                status: false,
                message: `internal server error: ${err instanceof Error ? err.message : 'unknown error'}`,
            });
        }
    }

    public async refreshToken (req: Request, res: Response): Promise<Response>
    {
        try {
            const { token } = req.params;
            const authService = new AuthService;

            if (!token) {
                res.status(400).json({
                    status: false,
                    message: 'token required.',
                });
            }

            // verifikasi token
            const verifiedToken: jwt.JwtPayload | unknown = await authService.verifyToken(token, this.JWT_REFRESH_TOKEN_SECRET);
            if (!verifiedToken || typeof verifiedToken !== 'object') {
                return res.status(401).json({
                    status: false,
                    message: 'invalid or expired refresh token.',
                });
            }

            // ekstrak data user (hapus iat, exp)
            const { iat, exp, ...userData } = verifiedToken as jwt.JwtPayload;

            // generate token baru
            const accessToken = authService.generateToken(userData, this.JWT_REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
            const refreshToken = authService.generateToken(userData, this.JWT_REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

            return res.status(200).json({
                status: true,
                message: 'token successfully refreshed.',
                accessToken,
                refreshToken,
            });

        } catch (err) {
            return res.status(500).json({
                status: false,
                message: `${err instanceof Error ? err.message : 'unknown error'}`,
            });
        }
    }

}