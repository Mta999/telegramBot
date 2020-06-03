import { User } from './../model/user';
import { Report } from './../model/report';
import { map } from 'lodash';
const schedule = require('node-schedule');
const moment = require('moment')

export const secondSchedule = async (bot,ctx, Extra, yesOrRemindMeLater) => {
  //check users that dont write reports YET
  const start = moment().startOf('day');
  const end = moment().endOf('day');

  const userModel = await User();
  const userData = await userModel.find();

  const reportModel = await Report();
  const reportData = await reportModel.find({ createdAt: { $lt: end, $gt: start } });

  map(reportData, (oneReportData) => {
    map(userData,(oneUserData) =>{
      if (oneReportData.id !== oneUserData.id ) {
        schedule.scheduleJob(`0 32 18 * * 1-5`, async ()=>{
          console.log('հեսա ուղարկեմ մենակ նրանց');    
          bot.telegram.sendMessage(oneReportData.id, "It's time to fill your Reports. Please click YES button or type /test ", Extra.markup(yesOrRemindMeLater));
        })
      }
    })
  })


   
  }
