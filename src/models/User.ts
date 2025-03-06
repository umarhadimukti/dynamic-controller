import mongoose from 'mongoose';
import moment from 'moment';

const { Schema, model } = mongoose;

interface IUser extends Document
{
    _id: mongoose.Types.ObjectId,
        name: string,
    description: string,
    test: Date

}

type IUserSchema = IUser & Document;

const UserSchema = new Schema<IUserSchema>(
    {	
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

const User = model<IUserSchema>('User', UserSchema);

export default User;