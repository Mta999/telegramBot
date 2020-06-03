import { User } from './../model/user';
import { map } from 'lodash';
const schedule = require('node-schedule');

export const firstSchedule = (bot, Extra, yesOrRemindMeLater) => {
  schedule.scheduleJob(`0 31 18 * * 1-5`, async (ctx) => {
    console.log('հեսա ուղարկեմ');
    const model = await User();
    const usersData = await model.find();
    await Promise.all(map(usersData, async (oneUserData) => {
      await bot.telegram.sendMessage(oneUserData.id, 'please click YES button or type /test', Extra.markup(yesOrRemindMeLater));
    }));
  })
};
