const WizardScene = require('telegraf/scenes/wizard');
import { Extra, Markup } from 'telegraf';
import { Report } from './model/report';
import { chooseTime, chooseNumbers, chooseProjects, chooseProjectOrNo, saveOrNo, firstMenu } from './commands/buttons';

const tasks = [];


// export const saveOrNo = Markup.keyboard([
//   ['Save', 'Don\'t save']
// ]).oneTime()
//   .resize();

// const chooseTime: Markup = Markup.keyboard([
//   ['11:00', '12:00'],
//   ['13:00', 'Choose other time']
// ]).oneTime()
//   .resize();

// const chooseNumbers = Markup.keyboard([
//   ['1', '2'],
//   ['5', '10']
// ]).oneTime()
//   .resize();

// const chooseProjects = Markup.keyboard([
//   ['4nextLab', 'bitCluster'],
//   ['Blot', 'KW'],
//   ['Other, please write which']
// ]).oneTime()
//   .resize();


// const chooseProjectOrNo = Markup.keyboard([
//   ['4nextLab', 'bitCluster'],
//   ['Blot', 'KW'],
//   ['No']
// ]).oneTime()
//   .resize();

export const superWizard = new WizardScene(
  'super-wizard',
  ctx => {
    ctx.telegram.sendMessage(ctx.from.id, 'Երբ ես երեկ սկսել գործ անել՞ ', Extra.markup(chooseTime));
    ctx.wizard.state.data = {};
    return ctx.wizard.next();
  },
  ctx => {
    if (ctx.message.text == 'Choose other time') {
    }
    ctx.wizard.state.data.workTime = ctx.message.text;
    ctx.telegram.sendMessage(ctx.from.id, 'երեկ քանի հատ թասկ եք արել՞', Extra.markup(chooseNumbers));
    return ctx.wizard.next();
  },
  ctx => {
    ctx.wizard.state.data.tasksCounter = ctx.message.text;
    // console.log('22222222222222222',ctx.wizard.cursor);
    ctx.telegram.sendMessage(ctx.from.id, 'ինչ պրոյեկտների վրա ես աշխատել', Extra.markup(chooseProjects));
    return ctx.wizard.next();
  },
  ctx => {
    if (ctx.message.text == 'Other, please write which') {
    } else {
      const firstTask = ctx.message.text;
      tasks.push(ctx.message.text);
      ctx.wizard.state.data.whatTasks = tasks;
      ctx.telegram.sendMessage(ctx.from.id, 'եթե էլի կա, նշեք, եթե չէ՝ սեղմեք NO', Extra.markup(chooseProjectOrNo));
      console.log(ctx.message.text);
      return ctx.wizard.next(firstTask);
    }
  },
  ctx => {
    // console.log('-----------------', ctx.wizard.state.data.whatTasks[0]);
    if (ctx.message.text == 'No') {
      return ctx.wizard.steps[5](ctx)
    }
    else if (ctx.wizard.state.data.whatTasks[0] !== ctx.message.text) {
      tasks.push(ctx.message.text);
    }
    ctx.reply('առաջարկություն կամ խնդիրներ՞');
    return ctx.wizard.next();
  },
  ctx => {
    ctx.telegram.sendMessage(ctx.from.id, 'Ապրես Դու', Extra.markup(saveOrNo));
    ctx.wizard.state.data.blocksOrQuestions = ctx.message.text;
    ctx.wizard.selectStep(5);
    return ctx.wizard.next();
  },
  // 
  ctx => {
    ctx.telegram.sendMessage(ctx.from.id, 'Հաճելի օր ենք մաղթում', Extra.markup(firstMenu));
    (async (ctx, date: Date) => {
      const model = await Report();
      const userId = ctx.from.id;
      if (ctx.message.text === 'Save') {
        await model.create(
          {
            id: userId,
            startingTime: ctx.wizard.state.data.workTime,
            workedProjects: tasks,
            tasksCount: ctx.wizard.state.data.tasksCounter,
            blocksOrQuestions: ctx.wizard.state.data.blocksOrQuestions,
            date
          });
      }
    })(ctx, new Date);
    
    ctx.telegram.sendMessage('@steadFastTech', ` ${ctx.from.first_name} ${ctx.from.last_name}'s daily report for today is:

    He/She start her/him work at ${ctx.wizard.state.data.workTime}

    He/She had done ${ctx.wizard.state.data.tasksCounter} tasks

    And he/she worked with these projects: ${tasks}` );
    return ctx.scene.leave();
  }

);

  //channels id - @steadFastTech
  
    //I want something like that 

   // `Your daily report for ${date} is

    // You start your work at ${startingTime}

    // You had done ${tasksCount} tasks

    // And You worked with these projects: ${workedProjects}
    //       Thanks!!!`