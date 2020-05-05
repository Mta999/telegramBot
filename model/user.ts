import { Schema, Model, model, Document } from 'mongoose';

export const UserSchema = new Schema({
    userName: String,
    id: String,
});

export interface UserInterface extends Document {
    userName: string;
    id: string;
}

export const User = async (): Promise<Model<UserInterface, {}>>  => {
    return model<UserInterface>('users', UserSchema, 'users');
};