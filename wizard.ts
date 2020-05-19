// import WizardScene from 'telegraf/scenes/wizard';
// import { Extra, Markup } from 'telegraf';
// const WizardScene = require('telegraf/scenes/wizard');



// const chooseTime =  Markup.inlineKeyboard([
//   Markup.callbackButton('11:00','11:00'),
//   Markup.callbackButton('12:00','12:00'),
//   Markup.callbackButton('13:00','13:00'),
//   Markup.callbackButton('Choose other time','Choose other time')
//     ]).oneTime()
//     .resize();


// export const superWizard = new WizardScene('super-wizard',
//  async (ctx) => {
//    console.log('aaaaaaaaaaaaaaaaaaaaaaaaa');
   
//      await ctx.telegram.sendMessage(796175303,'When you started your working day yesterday ?', Extra.markup(chooseTime))
//      console.log(2222222);
//      // ctx-update-callbackquery-data
//      console.log('++++++++++++++++++++++++++',ctx.wizard.ctx) //undefined
//     console.log('------------------------',ctx);
//     return ctx.wizard.next();
//   },
//   (ctx) => {
//     ctx.reply('Step 3');
//     return ctx.wizard.next();
//   },
//   (ctx) => {
//     ctx.reply('Step 4');
//     return ctx.wizard.next();
//   },
//   (ctx) => {
//     ctx.reply('Done');
//     return ctx.scene.leave();
//   }
// );

const Telegraf = require('telegraf');
const session = require('telegraf/session');
const Stage = require('telegraf/stage');
const WizardScene = require('telegraf/scenes/wizard');
import { Extra, Markup } from 'telegraf';

const chooseTime = Markup.keyboard([
    ['11:00', '12:00'],
    ['13:00', 'Choose other time']
   ]).oneTime()
   .resize();
   
   const chooseNumbers = Markup.keyboard([
    ['1', '2'],
    ['5', '10']
   ]).oneTime()
   .resize();



export const superWizard = new WizardScene(
  'super-wizard',
   (ctx) => {
      ctx.telegram.sendMessage(796175303,'Երբ ես երեկ սկսել գործ անել՞ ', Extra.markup(chooseTime))
    ctx.wizard.state.data = {};    
    return ctx.wizard.next();
  },
  ctx => {
      console.log(ctx);
      
    ctx.wizard.state.data.time = ctx.message.text;
    ctx.telegram.sendMessage(796175303,'երեկ քանի հատ թասկ եք արել՞', Extra.markup(chooseNumbers))
    return ctx.wizard.next();
  },
  ctx => {

    ctx.wizard.state.data.number = ctx.message.text;

    ctx.reply(`երեկ սկսել ես գործ անել ${ctx.wizard.state.data.time}-ին ու արել ես  ${ctx.wizard.state.data.number} հատ թասք `);
    return ctx.scene.leave();
  }
);

