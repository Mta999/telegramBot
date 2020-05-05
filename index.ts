import { connectReportDb } from './dbs/reportsDb/index';
import { User, UserInterface } from './model/user';
import { connectBotDb, } from './dbs/botsDb/index';
import { toDbAndStart, helpCommand, myReportsByDate } from "./commands/index"
import "./env"
import Telegraf from "telegraf";

// const Telegraf = require("telegraf")
const Calendar = require("telegraf-calendar-telegram");


const mongoUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017';
const dbForUsers = process.env.MONGODB_DATABASE_BOT_DAILY_REPORTS || 'botDailyReports';
const uriBot: string = [mongoUrl, dbForUsers].join('/');

const dbForReports = process.env.MONGODB_DATABASE_REPORTS || 'reports';
const uriReports: string = [mongoUrl, dbForReports].join('/');

(async () => {
  await connectBotDb(uriBot);
})();

(async () => {
  await connectReportDb(uriReports);
})();

const token = process.env.BOT_TOKEN;

const bot = new Telegraf(token);

const calendar = new Calendar(bot);

calendar.setDateListener(async (context, date) => {
 const x = await myReportsByDate(context)
  // console.log(new Date(date))
 return context.reply(x)
});

bot.command("calendar", context => {
  // console.log(context)
 return context.reply("Here you are", calendar.getCalendar()
 )});


// ****BotId: 1138911172****,
bot.start(toDbAndStart)

bot.help(helpCommand)

bot.launch()
bot.on('sticker', (ctx) => ctx.reply('լավն էր'))
bot.hears('My reports', myReportsByDate)

export {
  UserInterface, User
};










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