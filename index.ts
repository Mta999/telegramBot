import { map } from 'lodash';
import Telegraf from "telegraf";
import { yesOrRemindMeLater, menu } from './commands/start';
import { connectReportDb } from './db/reportsDb/index';
import { User, UserInterface } from './model/user';
import { toDbAndStart, helpCommand, myReportsByDate } from "./commands/index"
import "./env"

var schedule = require('node-schedule');

const Calendar = require("telegraf-calendar-telegram");

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





// const telegramDate = new Date(date).toISOString().split("T")[0];
// console.log("telegramDate---",telegramDate) // 1970-01-09 same 
// console.log(new Date(date).toISOString() )

//****** 1970-01-09T00:00:00.000Z **** from calendar

// bot.command("calendar", context => {
//   // console.log(context)
//   return context.reply("Here you are", calendar.getCalendar()
//   )
// });





// const allUsers = async () => {
//   try {
//     const users = await getAllUsers();
//     console.log("users",users)
//   } catch (error) {
//       console.error();       
//   }
// };

// allUsers()


// bot.hears('լավ ես՞', (ctx) => ctx.reply('լավ եմ, դու՞'))


// const testMenu = Extra
//   .markdown()
//   .markup((m) => m.inlineKeyboard([
//     m.callbackButton('ինչի է հավասար 1 + 1', 'test')
//   ]))

// const aboutMenu = Extra
//   .markdown()
//   .markup((m) => m.keyboard([
//     m.callbackButton('2'), //button in keyboard "lava" 
//     m.callbackButton('3'),
//     m.callbackButton('11')
//   ]).resize())

// bot.hears('test', (ctx) => {
//   ctx.reply( "", testMenu).then(() => {
//     ctx.reply("",aboutMenu)
//   })
// })

// bot.hears('test', (ctx) => {
//   ctx.reply("2",testMenu).then(() => {
//     ctx.reply("1",aboutMenu)
//   })
// }) 