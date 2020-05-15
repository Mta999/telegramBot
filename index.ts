import { Telegraf, Stage } from 'telegraf';
import WizardScene from 'telegraf/scenes/wizard';
const session = require('telegraf/session');

// tslint:disable-next-line: no-var-requires
const Calendar = require('telegraf-calendar-telegram');

import { User, UserInterface } from './model/user';
import { toDbAndStart, helpCommand, myReportsByDate } from './commands/index';

import { map } from 'lodash';
import { yesOrRemindMeLater, menu } from './commands/start';
import { connectReportDb } from './db/reportsDb/index';

import './env';



var schedule = require('node-schedule');


const mongoUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017'


const dbForReports = process.env.MONGODB_DATABASE_REPORTS || 'reports';
const uriReports: string = [mongoUrl, dbForReports].join('/');


(async () => {
  await connectReportDb(uriReports);
})();

const token = process.env.BOT_TOKEN;

const bot = new Telegraf(token);
const calendar = new Calendar(bot);

// const x = new CronJob ("",)

///---------////////
// console.log('Before job instantiation');

// const job = new CronJob('4 44 14 * * *', () => {

//   // const d = new Date();
//   console.log('ժամն է եկել արդեն');

//   yesOrRemindMeLater;
// job.start();
// })

schedule.scheduleJob(`50 02 19 * * 1-5`, async () => {
  console.log('հեսա ուղարկեմ ');
  const model = await User();
  const usersData = await model.find()
 

  map(usersData, async (oneUserData) => {
    // bot.telegram.sendMessage(oneUserData.id, "բայլուս", yesOrRemindMeLater)

    // bot.telegram.sendQuiz(oneUserData.id, "քանի տարեկան ես", ["10","20","25"], yesOrRemindMeLater)

    const x = await bot.telegram.sendPoll(oneUserData.id, "քանի թասք ես արել էսօր՞", ["1","2","5","10"],{allows_multiple_answers:true}) 
    console.log(x,"jhewgfscxn-----");
    
  })
  bot.hears('yes', ctx => {
    
    ctx.reply('հարց 1');
  })

});

calendar.setDateListener(async (context, date) => {
  const x = await myReportsByDate(context, date)
  console.log("date---", date) //date-->1970-01-09  
  return context.reply(x)

});



// ****BotId: 1138911172****,

bot.start(toDbAndStart)


// bot.help(helpCommand)
bot.help(helpCommand)


// telegram.sendMessage(chatId, text, [extra]) => Promise

// bot.on('text', (ctx) => {
// Explicit usage
// console.log(ctx.message.chat.id, "չատի այ դին ազիզ");

//   ctx.telegram.sendMessage(ctx.message.chat.id, `Hello`)
// })

bot.on('sticker', (ctx) => ctx.reply('լավն էր'));




bot.hears('My reports', context => {
  const today = new Date();
  const minDate = new Date();
  minDate.setMonth(today.getMonth() - 2);
  const maxDate = new Date();
  maxDate.setMonth(today.getMonth() + 2);
  maxDate.setDate(today.getDate());
  context.reply("Նշեք, թե որ օրվա համար", calendar.setMinDate(minDate).setMaxDate(maxDate).getCalendar())
})

bot.launch()



export {
  UserInterface, User
};
