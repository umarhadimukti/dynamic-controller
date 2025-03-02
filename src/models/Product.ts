import mongoose from 'mongoose';
import moment from 'moment';

const { Schema, model } = mongoose;

interface IProduct {
    _id: mongoose.Types.ObjectId,
    categoryId: mongoose.Types.ObjectId,
    name: string,
    status: boolean,
    price: number,
    description?: string,
}

type IProductDocument = IProduct & Document;

const productSchema = new Schema<IProductDocument>(
    {
        categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true, },
        name: { type: String, required: true, },
        status: { type: Boolean, default: true, },
        price: { type: Number, required: true, },
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

const Product = model<IProductDocument>('Product', productSchema);

export default Product;
export { IProduct, IProductDocument };