import WizardScene from 'telegraf/scenes/wizard';
import { Extra, Markup } from 'telegraf';
const Composer = require('telegraf/composer');
const WizardScene = require('telegraf/scenes/wizard');



const chooseTime =  Markup.inlineKeyboard([
  Markup.callbackButton('➡️ Next', 'next'),
  Markup.callbackButton('11:00','11:00'),
  Markup.callbackButton('12:00','12:00'),
  Markup.callbackButton('13:00','13:00'),
  Markup.callbackButton('Choose other time','Choose other time')
    ]).oneTime()
    .resize();

const stepHandler = new Composer();
stepHandler. action('next', (ctx) => {  
  ctx.reply('Step 2. Via inline button');
  return ctx.wizard.next();
});

stepHandler.use((ctx) => ctx.replyWithMarkdown('Please press `Next` button '));

export const superWizard = new WizardScene('super-wizard',
  (ctx) => {
    ctx.reply('When you started your working day yesterday ?',(ctx)=>{ 
      ctx.telegram.sendMessage()
      Extra.markup(chooseTime)
    }) 
    return ctx.wizard.next();
  },
  stepHandler,
  (ctx) => {
    ctx.reply('Step 3');
    return ctx.wizard.next();
  },
  (ctx) => {
    ctx.reply('Step 4');
    return ctx.wizard.next();
  },
  (ctx) => {
    ctx.reply('Done');
    return ctx.scene.leave();
  }
);


