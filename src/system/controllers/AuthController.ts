import User from "../../models/User";
import { Request, Response } from 'express';
import { Model } from "mongoose";
import { IUser } from "../../models/User";

export default class AuthController
{
    protected _model: Model<IUser>;

    constructor(model: Model<IUser>) {
        this._model = model;
    }

    public async login (req: Request, res: Response): Promise<Response>
    {
        try {
            const payload = req.body;
            console.log(payload);

            return res.status(201).json({
                status: true,
                message: 'login success.',
                length: 0,
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

            const newUser = await this._model.create(payload);

            return res.status(201).json({
                status: true,
                message: 'user created successfully.',
                length: 0,
                data: newUser,
            });
        } catch (err) {
            return res.status(500).json({
                status: false,
                message: `internal server error: ${err instanceof Error ? err.message : 'unknown error'}`,
            });
        }
    }

}