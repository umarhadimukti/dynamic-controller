import mongoose from 'mongoose';

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
        categoryId: { type: Schema.Types.ObjectId, ref: 'Category', },
        name: { type: String, required: true, },
        status: { type: Boolean, default: true, },
        price: { type: Number, required: true, },
        description: { type: String, required: false, },
    },
    {
        timestamps: true,
        toObject: { virtuals: true, },
        toJSON: { virtuals: true },
    }
);

const Product = model<IProductDocument>('Product', productSchema);

export default Product;
export { IProduct, IProductDocument };