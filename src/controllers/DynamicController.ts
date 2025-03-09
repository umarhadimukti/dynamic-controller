import { Request, Response } from 'express';
import { Model, Document } from 'mongoose';

class DynamicController<T extends Document> {
    private _model: Model<T>;

    constructor(model: Model<T>) {
        this._model = model;
    }

    public index = async (req: Request, res: Response): Promise<Response> =>
    {
        try {
            const test = this.join(req);
            const data: any = await this._model.find();
            return res.status(200).json({
                status: true,
                message: data.length > 0 ? `data found` : `data empty`,
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

    public show = async (req: Request, res: Response): Promise<Response> =>
    {
        try {
            const data: any = await this._model.findOne({ _id: req.params.id });
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

    public store = async (req: Request, res: Response): Promise<Response> =>
    {
        try {
            const createdData: T | null = await this._model.create(req.body);
            if (!createdData) { throw new Error('failed to store data') }
            return res.status(201).json({
                status: true,
                message: 'data sent successfully',
                data: createdData,
            });
        } catch(err: unknown) {
            const errMessage = err instanceof Error ? err.message : 'failed to store dadta';
            return res.status(404).json({
                status: false,
                message: errMessage,
            });
        }
    }

    public update = async (req: Request, res: Response): Promise<Response> =>
    {
        try {
            const updatedData: T | null = await this._model.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true });
            if (!updatedData) { throw new Error('failed to update data') }
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

    public delete = async (req: Request, res: Response): Promise<Response> =>
    {
        try {
            const deletedData: T | null = await this._model.findOneAndDelete({ _id: req.params.id });
            if (!deletedData) { throw new Error('failed to delete data') };
            return res.status(200).json({
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

    public join = async (req: Request): Promise<{path: string; select: string}[]> =>
    {
        const { join } = req.query;
        if (!join) {
            return [];
        }
        console.log(join);

        let output: {path: string; select: string}[] = [];
        const joins: string[] = join.toString().split('|');
        joins.forEach(j => {
            const result: string[] = j.split(':');
            output.push({
                path: result[0],
                select: result[1],
            });
        });

        return output;
    }
}

export default DynamicController