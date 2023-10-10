import { compare } from 'bcryptjs'
import { model, Schema } from 'mongoose'
import isEmail from 'validator/lib/isEmail'

// export interface IUserDocument extends IUser {
//     save: () => Promise<any>
//     comparePassword: (password: string) => Promise<boolean>
//     hasRight: (args: string, requiredRight: unknown) => boolean | string | Array<unknown>
// }

export const SYSTEM_LANGS = ['ua', 'ru', 'en', 'cs']
const UserSchema: Schema<any> = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        surname: {
            type: String
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            validate: [isEmail, 'Invalid Email']
        },
        confirmations: {
            email: {
                code: {
                    type: String
                },
                confirmed: {
                    type: Boolean,
                    default: false
                }
            }
        },
        password: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            immutable: true
        },
        language: {
            type: String,
            enum: SYSTEM_LANGS,
            default: 'en'
        }
    },
    {
        timestamps: true
    }
)

UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await compare(password, this.password)
}

export default model('User', UserSchema)
