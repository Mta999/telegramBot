import { Schema, Model, model, Document } from 'mongoose';

export const ReportSchema = new Schema({
    id: String,
    startingTime: String,
    workedProjects: Array,
    tasksCount: String,
    blocksOrQuestions: String,
}, {
    timestamps: true,
});

export interface ReportInterface extends Document {
    id: String;
    startingTime: String;
    workedProjects: String[];
    tasksCount: String;
    blocksOrQuestions: String;
    createdAt: Date; 
}
export const Report = async (): Promise<Model<ReportInterface, {}>> => {
    return model<ReportInterface>('myReports', ReportSchema, 'myReports');
};