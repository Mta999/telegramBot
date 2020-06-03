import { Schema, Model, model, Document } from 'mongoose';

export const ReportSchema = new Schema({
    id: String,
    fullName:String,
    startingTime: String,
    workedProjects: String,
    tasksCount: String,
    callsCounter:String,
    callsLength:String,
    finishingTime:String,
    blocksOrQuestions: String
},{
    timestamps: true,
});
export interface ReportInterface extends Document {
    id: string,
    fullName:string,
    startingTime: string,
    workedProjects: string,
    tasksCount: string,
    callsCounter:string,
    callsLength:string,
    finishingTime:string,
    blocksOrQuestions: string
    createdAt: Date; 
}
export const Report = async (): Promise<Model<ReportInterface, {}>> => {
    return model<ReportInterface>('myReports', ReportSchema, 'myReports');
};