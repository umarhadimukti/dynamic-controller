import mongoose from 'mongoose';
import moment from 'moment';

const { Schema, model } = mongoose;

interface IMfProduct extends Document
{
    _id: mongoose.Types.ObjectId,
        categoryId:  mongoose.Types.ObjectId,
    name: string,
    description: string,
    test: Date

}

type IMfProductSchema = IMfProduct & Document;

const MfProductSchema = new Schema<IMfProductSchema>(
    {	
    categoryId:  {
        type:  Schema.Types.ObjectId,
        ref:  "Category",
        required:  true
    },		
    name:  {
        type: String,
        required:  true
    },		
    description:  {
        type: String,
        required:  true
    },		
    test:  {
        type: Date,
        required:  false
    }
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

const MfProduct = model<IMfProductSchema>('MfProduct', MfProductSchema);

export default MfProduct;