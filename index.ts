import { session } from 'telegraf';
import { superWizard } from './wizard';
const Telegraf = require("telegraf");

import { Stage } from 'telegraf';

// tslint:disable-next-line: no-var-requires
const Calendar = require('telegraf-calendar-telegram');

import { User, UserInterface } from './model/user';
import { toDbAndStart, helpCommand, myReportsByDate } from './commands/index';

import { map } from 'lodash';
import { connectReportDb } from './db/reportsDb/index';

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

schedule.scheduleJob(`50 02 19 * * 1-5`, async () => {
  console.log('հեսա ուղարկեմ ');
  const model = await User();
  const usersData = await model.find();

  map(usersData, async (oneUserData) => {
    const x = await bot.telegram.sendPoll(oneUserData.id, 'քանի թասք ես արել էսօր՞', ['1', '2', '5', '10'],
      { allows_multiple_answers: true });
  });
});

calendar.setDateListener(async (context, date) => {
  return context.reply(
    await myReportsByDate(context, date)
  );
});

// ****BotId: 1138911172****,





bot.start(toDbAndStart);
// console.log("--------------",superWizard);

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


const stage = new Stage([superWizard]);
bot.use(session())
bot.use(stage.middleware())
 

bot.command('/test', (ctx)=> ctx.scene.enter('super-wizard'));

bot.hears('yes', ctx => {

  ctx.reply('հարց 1');
});

bot.launch();

export {
  UserInterface, User
};