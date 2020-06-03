import './env';

import { firstSchedule, secondSchedule,allReportsToChannel } from './schedules/';

const Telegraf = require('telegraf');
import { superWizard } from './wizard';
const session = require('telegraf/session');
import { Stage, Extra } from 'telegraf';

// tslint:disable-next-line: no-var-requires
const Calendar = require('telegraf-calendar-telegram');
// const schedule = require('node-schedule');

import { toDbAndStart, myReportsByDate,  support, myReports } from './commands';

import { connectReportDb } from './db/reportsDb/index';

import { yesOrRemindMeLater,supportButton } from './commands/buttons';


const mongoUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017';


const dbForReports = process.env.MONGODB_DATABASE_REPORTS || 'reports';
const uriReports: string = [mongoUrl, dbForReports].join('/');

(async () => {
  await connectReportDb(uriReports);
})();

const token = process.env.BOT_TOKEN;

const bot = new Telegraf(token);
const calendar = new Calendar(bot);

const stage = new Stage([superWizard]);
bot.use(session());
bot.use(stage.middleware());

firstSchedule(bot,Extra,yesOrRemindMeLater);

allReportsToChannel(bot);

calendar.setDateListener(async (ctx, date) => {
  return ctx.reply(
    await myReportsByDate(ctx, date)
  );
});

// **** BotId: 1138911172 ****,

bot.start(toDbAndStart);


bot.hears('My reports', ctx => myReports(ctx,calendar));
bot.hears('Support', ctx =>  support(ctx,supportButton));
bot.hears('Remind me Later 🤯 😈', ctx => ctx.reply('OK') );
bot.hears('Yes 👍🏻 💪🏻', ctx => ctx.scene.enter('super-wizard'));


bot.command('/test', ctx => ctx.scene.enter('super-wizard'));


bot.launch();


// here stage and bot are the same, bot contains mini-bots in it, such as a stage

//channel's link- https://t.me/joinchat/AAAAAE7c_ZRDyf2kz6rJwg channel's link
//bot's link- http://telegram.me/my_reports_bot

