import mongoose from 'mongoose';
import moment from 'moment';

const { Schema, model } = mongoose;

interface IUser extends Document
{
    _id: mongoose.Types.ObjectId,
    roleId: mongoose.Types.ObjectId,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    isOAuth: boolean,
}

const UserSchema = new Schema<IUser>(
    {	
        roleId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            default: null,
            validate: {
                validator: function (val: string) {
                    if (!this.isOAuth && !val) return false;
                    return true;
                },
                message: 'password is required.',
            }
        },
        isOAuth: {
            type: Boolean,
            default: false,
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

/**
 * @return - mengambil fullName dari gabungan first dan last
 */
UserSchema.virtual('fullName').get(function() { return `${this.firstName} ${this.lastName}`; });

const User = model<IUser>('User', UserSchema);

export default User;
export { IUser };