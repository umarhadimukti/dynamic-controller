import mongoose from 'mongoose';
import moment from 'moment';

const { Schema, model } = mongoose;

interface IRole extends Document
{
    _id: mongoose.Types.ObjectId,
    name: string,
    description: string,
}

type IRoleSchema = IRole & Document;

const RoleSchema = new Schema<IRoleSchema>(
    {	
        name:{
            type: String,
            required: true
        },		
        description: {
            type: String,
            required: true
        },
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

const Role = model<IRoleSchema>('Role', RoleSchema);

export default Role;