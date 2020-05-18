import { connect } from 'mongoose';
// console.log(uri)
export const connectReportDb = async (uriReports) => {
  await connect(uriReports, (err: any) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log(' Connected Reports! ');
    }
});
};