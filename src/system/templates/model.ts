import mongoose from 'mongoose';
import moment from 'moment';

const { Schema, model } = mongoose;

interface IModel extends Document
{
    _id: mongoose.Types.ObjectId,
    // type
}

type ISchema = IModel & Document;

const varSchema = new Schema<ISchema>(
    {},//schema
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (_, ret) => {
                ret.createdAt = moment(ret.createdAt).format('YYYY-MM-DD HH:mm:ss.SSS');
                ret.updatedAt = moment(ret.updatedAt).format('YYYY-MM-DD HH:mm:ss.SSS');
                return ret;
            },
        },
        toObject: { 
            virtuals: true,
            transform: (_, ret) => {
                ret.createdAt = moment(ret.createdAt).format('YYYY-MM-DD HH:mm:ss.SSS');
                ret.updatedAt = moment(ret.updatedAt).format('YYYY-MM-DD HH:mm:ss.SSS');
                return ret;
            },
         },
    }
);

const TableSchema = model<ISchema>('modelName', varSchema);

export default TableSchema;