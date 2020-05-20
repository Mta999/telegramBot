const Telegraf = require('telegraf');
const session = require('telegraf/session');
const Stage = require('telegraf/stage');
const WizardScene = require('telegraf/scenes/wizard');
import { Extra, Markup } from 'telegraf';

const tasks = [];

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
  (ctx) => {
    ctx.telegram.sendMessage(796175303, 'Երբ ես երեկ սկսել գործ անել՞ ', Extra.markup(chooseTime))
    ctx.wizard.state.data = {};
    return ctx.wizard.next();
  },
  ctx => {
    ctx.wizard.state.data.workTime = ctx.message.text;
    ctx.telegram.sendMessage(796175303, 'երեկ քանի հատ թասկ եք արել՞', Extra.markup(chooseNumbers))
    return ctx.wizard.next();
  },
  ctx => {
    ctx.wizard.state.data.tasksCounter = ctx.message.text;
    ctx.telegram.sendMessage(796175303, 'ինչ պրոյեկտների վրա ես աշխատել', Extra.markup(chooseProjects))
    return ctx.wizard.next();
  },
  ctx => {
    // ctx.wizard.state.data.whatTask = ctx.message.text;
    tasks.push(ctx.message.text)
    ctx.telegram.sendMessage(796175303, 'բա բացի դրանցից՞', Extra.markup(chooseProjects))
    //  console.log('55555555555', ctx.wizard.state.data);
    // return ctx.scene.leave();
    return ctx.wizard.next();
  },
  ctx => {
    tasks.push(ctx.message.text);
    ctx.wizard.state.data.whatTasks = tasks;
    ctx.telegram.sendMessage(796175303, 'եթե էլի կա, նշեք, եթե չէ՝ սեղմեք NO', Extra.markup(chooseProjectOrNo))
    console.log('55555555555', ctx.wizard.state.data);
    return ctx.scene.leave();
    // return ctx.wizard.next();
  },
  ctx =>{
    
  }
);

// return ctx.scene.leave();
