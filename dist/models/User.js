"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const moment_1 = __importDefault(require("moment"));
const { Schema, model } = mongoose_1.default;
const UserSchema = new Schema({
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
            validator: function (val) {
                if (!this.isOAuth && !val)
                    return false;
                return true;
            },
            message: 'password is required.',
        }
    },
    isOAuth: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (_, ret) => {
            ret.createdAt = (0, moment_1.default)(ret.createdAt).format('YYYY-MM-DD HH:mm:ss.SSS');
            ret.updatedAt = (0, moment_1.default)(ret.updatedAt).format('YYYY-MM-DD HH:mm:ss.SSS');
            return ret;
        },
    },
    toObject: {
        virtuals: true,
        transform: (_, ret) => {
            ret.createdAt = (0, moment_1.default)(ret.createdAt).format('YYYY-MM-DD HH:mm:ss.SSS');
            ret.updatedAt = (0, moment_1.default)(ret.updatedAt).format('YYYY-MM-DD HH:mm:ss.SSS');
            return ret;
        },
    },
});
/**
 * @return - mengambil fullName dari gabungan first dan last
 */
UserSchema.virtual('fullName').get(function () { return `${this.firstName} ${this.lastName}`; });
const User = model('User', UserSchema);
exports.default = User;
//# sourceMappingURL=User.js.map