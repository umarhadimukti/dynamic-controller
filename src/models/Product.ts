import mongoose from 'mongoose';

const { Model, Document, Schema, model } = mongoose;

const productSchemaa = new Schema(
    {
        name: { type: String, required: true, },
        category_id: { type: Number, required: true, },
    },
    {
        timestamps: true,
        toObject: { virtuals: true, },
        toJSON: { virtuals: true },
    }
);

const Product = model('Product', productSchemaa);

export default Product;