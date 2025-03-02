import mongoose from 'mongoose';
import moment from 'moment';

const { Schema, model } = mongoose;

interface ICategory extends Document {
    _id: mongoose.Types.ObjectId,
    name: string,
    status: boolean,
    description?: string,
};

type ICategoryDocument = ICategory & Document;

const categorySchema = new Schema<ICategoryDocument>(
    {
        name: { type: String, required: true, },
        status: { type: Boolean, default: true, },
        description: { type: String, required: false, },
    },
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

const Category = model<ICategoryDocument>('Category', categorySchema);

export default Category;
export { ICategory, ICategoryDocument };