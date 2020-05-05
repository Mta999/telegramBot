import { Schema, Model, model, Document } from 'mongoose';

export const ReportSchema = new Schema({
    id: String,
    question1: String,
    question2: String,
    question3: String,
    question4: String,
    question5: String,
    question6: String,
},{
    timestamps:true
});

export interface ReportInterface extends Document {
    id: String,
    question1: String,
    question2: String,
    question3: String,
    question4: String,
    question5: String,
    question6: String,
}

export const Report = async (): Promise<Model<ReportInterface, {}>> => {
    return model<ReportInterface>('myReports', ReportSchema, 'myReports');
};