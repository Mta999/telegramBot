const WizardScene = require('telegraf/scenes/wizard');
import { Extra } from 'telegraf';
import { Report } from './model/report';

import {
  chooseStartingTime,
  chooseNumbers,
  chooseProjects,
  saveOrNo,
  firstMenu,
  buttonNo,
  callsCount,
  callslength,
  chooseFinishingTime
} from './commands/buttons';

const moment = require('moment')

const adminsId = process.env.ADMINS_ID
const channelsId = process.env.CHANNEL_ID;

export const superWizard = new WizardScene(
  'super-wizard',
  ctx => {
    ctx.telegram.sendMessage(ctx.from.id, 'When did you start your working day yesterday?', Extra.markup(chooseStartingTime));
    ctx.wizard.state.data = {};
    return ctx.wizard.next();
  },
  ctx => {
    ctx.wizard.state.data.workTime = ctx.message.text;
    ctx.telegram.sendMessage(ctx.from.id, 'How many tasks did you  do yesterday?', Extra.markup(chooseNumbers));
    return ctx.wizard.next();
  },
  ctx => {
    ctx.wizard.state.data.tasksCounter = ctx.message.text;
    ctx.telegram.sendMessage(ctx.from.id, `On which projects did you  work? If you  work with two or more projects, please tell me in this case what kind of projects.`, Extra.markup(chooseProjects));
    return ctx.wizard.next();
  },
  ctx => {
    ctx.wizard.state.data.projects = ctx.message.text;
    ctx.telegram.sendMessage(ctx.from.id, `How many calls and meetings did you participate?`, Extra.markup(callsCount));
    return ctx.wizard.next();
  },
  ctx => {
    ctx.wizard.state.data.callsCounter = ctx.message.text;
    ctx.telegram.sendMessage(ctx.from.id, `How long did the calls last?`, Extra.markup(callslength));
    return ctx.wizard.next();
  },
  ctx => {
    ctx.wizard.state.data.callsLength = ctx.message.text;
    ctx.telegram.sendMessage(ctx.from.id, `When did you finish the work?`, Extra.markup(chooseFinishingTime));
    return ctx.wizard.next();
  },
  ctx => {
    ctx.wizard.state.data.finishTime = ctx.message.text;
    ctx.telegram.sendMessage(ctx.from.id, ' Do you have any blockers or questions?', Extra.markup(buttonNo));
    return ctx.wizard.next();
  },
  ctx => {
    if (ctx.message.text !== 'No') {
      ctx.telegram.sendMessage(adminsId, `From ${ctx.from.first_name} -> ${ctx.message.text} `);
    }
    ctx.telegram.sendMessage(ctx.from.id, 'Thanks!', Extra.markup(saveOrNo));
    ctx.wizard.state.data.blocksOrQuestions = ctx.message.text;
    return ctx.wizard.next();
  },
  async ctx => {
    const model = await Report();
    const userId = ctx.from.id;
    const start = moment().startOf('day');
    const end = moment().endOf('day');
    const reportData = await model.findOne({ id: userId, createdAt: { $lt: end, $gt: start } });
    if (reportData) {
      ctx.telegram.sendMessage(ctx.from.id, "You have already registered your yesterday's reports.", Extra.markup(firstMenu));
    } else if (ctx.message.text === 'Save') {
      ctx.telegram.sendMessage(ctx.from.id, 'Have a nice day', Extra.markup(firstMenu));
      await model.create(
        {
          id: userId,
          fullName: [ctx.from.first_name , ctx.from.last_name].join(' '),
          startingTime: ctx.wizard.state.data.workTime,
          workedProjects: ctx.wizard.state.data.projects,
          tasksCount: ctx.wizard.state.data.tasksCounter,
          callsCounter: ctx.wizard.state.data.callsCounter,
          callsLength: ctx.wizard.state.data.callsLength,
          finishingTime: ctx.wizard.state.data.finishTime,
          blocksOrQuestions: ctx.wizard.state.data.blocksOrQuestions,

        });

      ctx.telegram.sendMessage(channelsId, ` ${ctx.from.first_name} ${ctx.from.last_name}'s daily report for ${moment().format('LL')} is:

            He/She started her/him work at ${ctx.wizard.state.data.workTime}
        
            He/She has done ${ctx.wizard.state.data.tasksCounter} tasks,
        
            And he/she worked with these projects: ${ctx.wizard.state.data.projects}
            
            work finished at : ${ctx.wizard.state.data.finishTime}

            calls length: ${ctx.wizard.state.data.callsLength}
            
            had ${ctx.wizard.state.data.callsCounter} calls 

            work length  ${ctx.wizard.state.data.finishTime.split(':')[0] - ctx.wizard.state.data.workTime.split(':')[0]} hours and ${ctx.wizard.state.data.finishTime.split(':')[1] - ctx.wizard.state.data.workTime.split(':')[1]} minutes

            `);

    }
    return ctx.scene.leave();
  });