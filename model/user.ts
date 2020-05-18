import { Schema, Model, model, Document } from 'mongoose';

export const UserSchema = new Schema({
    id: String,
    isBotOrNo: Boolean,
    firstName: String,
    lastName: String
});

export interface UserInterface extends Document {
    id: string;
    isBotOrNo: boolean;
    firstName: string;
    lastName: string;
}

export const User = async (): Promise<Model<UserInterface, {}>>  => {
    return model<UserInterface>('users', UserSchema, 'users');
};