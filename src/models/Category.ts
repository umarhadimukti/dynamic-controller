import mongoose from 'mongoose';

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
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

const Category = model<ICategoryDocument>('Category', categorySchema);

export default Category;
export { ICategory, ICategoryDocument };