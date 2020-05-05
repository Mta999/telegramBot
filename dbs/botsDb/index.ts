import { connect } from 'mongoose';
// console.log(uri)
export const connectBotDb = async (uriBot)=> {
  await connect(uriBot, (err: any) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log(' Connected botDb! ');
    }
});
}
