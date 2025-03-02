import { Request, Response } from "express";


export default class ModuleController
{
    public test: string = '';

    public createModel = async (req: Request, res: Response): Promise<Response> =>
    {
        try {
            return res.status(200).json({
                status: true,
                message: 'model dan route berhasil dibuat',
            });
        } catch(err) {
            return res.status(500).json({
                status: false,
                message: `internal server error: ${err instanceof Error ? err.message:'-- unknown error --'}`,
            });
        }
    }
}