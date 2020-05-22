import { superWizard } from './wizard';
const session = require('telegraf/session');
const Telegraf = require("telegraf");

import { Stage, Extra, Markup } from 'telegraf';

// tslint:disable-next-line: no-var-requires
const Calendar = require('telegraf-calendar-telegram');

import { User, UserInterface } from './model/user';
import { toDbAndStart, helpCommand, myReportsByDate } from './commands/index';

import { map } from 'lodash';
import { connectReportDb } from './db/reportsDb/index';

import { yesOrRemindMeLater } from './commands/buttons/yesOrRemindMeLater';
import './env';

const schedule = require('node-schedule');

const mongoUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017';


const dbForReports = process.env.MONGODB_DATABASE_REPORTS || 'reports';
const uriReports: string = [mongoUrl, dbForReports].join('/');


(async () => {
  await connectReportDb(uriReports);
})();

const token = process.env.BOT_TOKEN;

const bot = new Telegraf(token);
const calendar = new Calendar(bot);





schedule.scheduleJob(`0 14 14 * * 1-5`, async (ctx) => {
  console.log('հեսա ուղարկեմ ');
  const model = await User();
  const usersData = await model.find();

  const letsStartTest = Promise.all([map(usersData, async (oneUserData) => {
    await bot.telegram.sendMessage(oneUserData.id, 'please click YES button or type /test', Extra.markup(yesOrRemindMeLater));
    letsStartTest.catch(e => console.log(e))
  })]);
});

calendar.setDateListener(async (context, date) => {
  return context.reply(
    await myReportsByDate(context, date)
  );
});

// **** BotId: 1138911172 ****,

bot.start(toDbAndStart);
bot.help(helpCommand);

bot.on('sticker', (ctx) => ctx.reply('լավն էր'));

bot.hears('My reports', context => {
  const today = new Date();
  const minDate = new Date();
  minDate.setMonth(today.getMonth() - 2);
  const maxDate = new Date();
  maxDate.setMonth(today.getMonth() + 2);
  maxDate.setDate(today.getDate());
  context.reply('Նշեք, թե որ օրվա համար', calendar.setMinDate(minDate).setMaxDate(maxDate).getCalendar());
});




const support = Markup.inlineKeyboard([
  Markup.urlButton('Support', 'http://telegraf.js.org'),
])

const supportButton = async (ctx) => {

  const model = await User();
  const usersData = await model.find();

  Promise.all([map(usersData, async (oneUserData) => {
    
    console.log('from', ctx.from.id);
    console.log('oneuserdata.id', oneUserData.id);
    
    if (oneUserData.id == ctx.from.id) {
      
      return ctx.telegram.sendMessage(oneUserData.id, 'Կապ Մեզ հետ', Extra.markup(support))
    } return
  })]);
}

bot.hears('Support', supportButton)


const stage = new Stage([superWizard]);

bot.use(session());
bot.use(stage.middleware());
bot.command('/test', ctx => ctx.scene.enter('super-wizard'));
bot.hears('Yes 👍🏻 💪🏻', (ctx) => ctx.scene.enter('super-wizard'));

bot.launch();

export {
  UserInterface, User
};