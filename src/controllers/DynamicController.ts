import { Request, Response } from 'express';
import { Model, Document } from 'mongoose';

export default class DynamicController<T extends Document> {
    private _model: Model<T>;

    constructor(model: Model<T>) {
        this._model = model;
    }

    index = async (req: Request, res: Response): Promise<Response> => {
        try {
            const data: any = await this._model.find();
            return res.status(200).json({
                status: true,
                message: 'data found',
                total: data.length,
                data: data,
            });
        } catch(err: unknown) {
            const errMessage: string = err instanceof Error ? err.message : 'data not found';
            return res.status(404).json({
                status: false,
                message: errMessage,
            });
        }
    }

    store = async (req: Request, res: Response): Promise<Response> => {
        try {
            const data: T | null = await this._model.create(req.body);
            return res.status(201).json({
                status: true,
                message: 'data sent successfully',
                data: data,
            });
        } catch(err: unknown) {
            const errMessage = err instanceof Error ? err.message : 'failed to store dadta';
            return res.status(404).json({
                status: false,
                message: errMessage,
            });
        }
    }

    update = async (req: Request, res: Response): Promise<Response> => {
        try {
            const updatedData: T | null = await this._model.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true });
            if (!updatedData) { throw { message: 'failed to update data' } }
            return res.status(201).json({
                status: true,
                message: 'data update successfully',
                data: updatedData,
            });
        } catch(err: unknown) {
            const errMessage = err instanceof Error ? err.message : 'failed to update data';
            return res.status(404).json({
                status: false,
                message: errMessage,
            });
        }
    }

    delete = async (req: Request, res: Response): Promise<Response> => {
        try {
            const deletedData: T | null = await this._model.findOneAndDelete({ _id: req.params.id });
            if (!deletedData) { throw { message: 'failed to delete data' } };
            return res.status(204).json({
                status: true,
                message: 'data was deleted',
            });
        } catch (err: unknown) {
            const errMessage: string = err instanceof Error ? err.message : 'failed to delete data';
            return res.status(404).json({
                status: false,
                message: errMessage,
            });
        }
    }
}