"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DynamicController {
    _model;
    constructor(model) {
        this._model = model;
    }
    index = async (req, res) => {
        try {
            const data = await this._model.find();
            return res.status(200).json({
                status: true,
                message: data.length > 0 ? `data found` : `data empty`,
                total: data.length,
                data: data,
            });
        }
        catch (err) {
            const errMessage = err instanceof Error ? err.message : 'data not found';
            return res.status(404).json({
                status: false,
                message: errMessage,
            });
        }
    };
    show = async (req, res) => {
        try {
            const data = await this._model.findOne({ _id: req.params.id });
            return res.status(200).json({
                status: true,
                message: 'data found',
                total: data.length,
                data: data,
            });
        }
        catch (err) {
            const errMessage = err instanceof Error ? err.message : 'data not found';
            return res.status(404).json({
                status: false,
                message: errMessage,
            });
        }
    };
    store = async (req, res) => {
        try {
            const createdData = await this._model.create(req.body);
            if (!createdData) {
                throw new Error('failed to store data');
            }
            return res.status(201).json({
                status: true,
                message: 'data sent successfully',
                data: createdData,
            });
        }
        catch (err) {
            const errMessage = err instanceof Error ? err.message : 'failed to store dadta';
            return res.status(404).json({
                status: false,
                message: errMessage,
            });
        }
    };
    update = async (req, res) => {
        try {
            const updatedData = await this._model.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true });
            if (!updatedData) {
                throw new Error('failed to update data');
            }
            return res.status(201).json({
                status: true,
                message: 'data update successfully',
                data: updatedData,
            });
        }
        catch (err) {
            const errMessage = err instanceof Error ? err.message : 'failed to update data';
            return res.status(404).json({
                status: false,
                message: errMessage,
            });
        }
    };
    delete = async (req, res) => {
        try {
            const deletedData = await this._model.findOneAndDelete({ _id: req.params.id });
            if (!deletedData) {
                throw new Error('failed to delete data');
            }
            ;
            return res.status(200).json({
                status: true,
                message: 'data was deleted',
            });
        }
        catch (err) {
            const errMessage = err instanceof Error ? err.message : 'failed to delete data';
            return res.status(404).json({
                status: false,
                message: errMessage,
            });
        }
    };
}
exports.default = DynamicController;
