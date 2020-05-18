import { Schema, Model, model, Document } from 'mongoose';

// const date = timestamp.split("T")[0]
export const ReportSchema = new Schema({
    id: String,
    question1: String,
    question2: String,
    question3: String,
    question4: String,
    question5: String,
    question6: String,
}, {
    timestamps: true,
});

export interface ReportInterface extends Document {
    id: string;
    question1: string;
    question2: string;
    question3: string;
    question4: string;
    question5: string;
    question6: string;
    createdAt: Date; 
}
export const Report = async (): Promise<Model<ReportInterface, {}>> => {
    return model<ReportInterface>('myReports', ReportSchema, 'myReports');
};