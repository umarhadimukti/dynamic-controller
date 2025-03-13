import { Request, Response } from 'express';
import { Model } from "mongoose";
import { IUser } from "../../models/User";
import AuthService from "../../libs/AuthService";
import dotenv from 'dotenv';

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
                throw new Error('user doesn\'t exists.');
            }
            

            return res.status(201).json({
                status: true,
                message: 'login success.',
            })
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

            const hashedPassword = await authService.hashPassword(payload.password);

            const newUser = await this._model.create({
                firstName: payload.firstName,
                lastName: payload.lastName,
                email: payload.email,
                password: hashedPassword,
                roleId: payload.roleId,
            });

            const user: object = newUser.toObject();

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
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                },
            });
        } catch (err) {
            return res.status(500).json({
                status: false,
                message: `internal server error: ${err instanceof Error ? err.message : 'unknown error'}`,
            });
        }
    }

}