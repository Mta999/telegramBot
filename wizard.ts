import { User } from './model/user';
import { Report } from './model/report';
const WizardScene = require('telegraf/scenes/wizard');
import { Extra, Markup } from 'telegraf';
import { map } from 'lodash';

const tasks = [];


export const saveOrNo = Markup.keyboard([
  ['Save',"Don't save" ]
 ]).oneTime()
 .resize();

const chooseTime: Markup = Markup.keyboard([
  ['11:00', '12:00'],
  ['13:00', 'Choose other time']
]).oneTime()
  .resize();

const chooseNumbers = Markup.keyboard([
  ['1', '2'],
  ['5', '10']
]).oneTime()
  .resize();

const chooseProjects = Markup.keyboard([
  ['4nextLab', 'bitCluster'],
  ['Blot', 'KW'],
  ['Other, please write which']
]).oneTime()
  .resize();


const chooseProjectOrNo = Markup.keyboard([
  ['4nextLab', 'bitCluster'],
  ['Blot', 'KW'],
  ['No']
]).oneTime()
  .resize();
  
export const superWizard = new WizardScene(
  'super-wizard',
  ctx => {
    console.log('-------------------',ctx.from.id,);
    ctx.telegram.sendMessage(ctx.from.id, 'Երբ ես երեկ սկսել գործ անել՞ ', Extra.markup(chooseTime))
    ctx.wizard.state.data = {};
    return ctx.wizard.next();
  },
  ctx => {
    ctx.wizard.state.data.workTime = ctx.message.text;
    ctx.telegram.sendMessage(ctx.from.id, 'երեկ քանի հատ թասկ եք արել՞', Extra.markup(chooseNumbers))
    return ctx.wizard.next();
  },
  ctx => {
    ctx.wizard.state.data.tasksCounter = ctx.message.text;
    ctx.telegram.sendMessage(ctx.from.id, 'ինչ պրոյեկտների վրա ես աշխատել', Extra.markup(chooseProjects))
    return ctx.wizard.next();
  },
  ctx => {
    const firstTask = ctx.message.text;
    tasks.push(ctx.message.text);
    ctx.wizard.state.data.whatTasks = tasks;
    ctx.telegram.sendMessage(ctx.from.id, 'եթե էլի կա, նշեք, եթե չէ՝ սեղմեք NO', Extra.markup(chooseProjectOrNo))
    console.log(ctx.message.text);

    // return ctx.scene.leave();
    return ctx.wizard.next(firstTask);
  },
  ctx => {
    console.log('-----------------', ctx.wizard.state.data.whatTasks[0]);
    // if (firstTask ) {

    // }
    tasks.push(ctx.message.text);
    ctx.reply('առաջարկություն կամ խնդիրներ՞');
    console.log('55555555555', ctx.wizard.state.data);
    return ctx.wizard.next();
    // return ctx.scene.leave();
  },
  ctx => {
    ctx.telegram.sendMessage(ctx.from.id, 'Ապրես Դու', Extra.markup(saveOrNo))
    ctx.wizard.state.data.blocksOrQuestions = ctx.message.text;
    console.log('առաջարկություն կամ խնդիրներ՞', ctx.message.text);
    // return ctx.scene.leave();
    return ctx.wizard.next();
  },
  async (ctx, date:Date) => {
    const model = await Report();
    const userId = ctx.from.id;
    console.log(userId);
    console.log(date);


    const userData = await model.findOne({ id: userId });
    await model.create(
      {
        id: userId,
        startingTime: ctx.wizard.state.data.workTime,
        workedProjects: tasks,
        tasksCount: ctx.wizard.state.data.tasksCounter,
        blocksOrQuestions: ctx.wizard.state.data.blocksOrQuestions,
        date: date
      });

    return ctx.scene.leave();
  });

