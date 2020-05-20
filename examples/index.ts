
// const x = '2020-1-10';
// const y = '2020-1-10';
// const date = new Date(x).toISOString();
// const mongoDate = new Date(y).toISOString()
// console.log(mongoDate);
// const parsedDate = mongoDate.split("T")[0]
// console.log(parsedDate);


// const londonTime = new Date().toLocaleString('en-AM  ', { timeZone: 'Europe/London' })
// import { map, filter, find, reduce } from "lodash"
// const date = "2020-05-07"

// const arr = [{
//     id: "ewjhdbs",
//     createdAt: "2020-05-07T09:32:55.574Z"
// },
// {
//     id: "er",
//     createdAt: "2020-05-08T09:32:55.574Z"
// },
// {
//     id: "eregdvr",
//     createdAt: "2020-06-07T09:32:55.574Z"
// }]


// const telegramDate = new Date(date).toISOString().split("T")[0];
// console.log("telegramDate---",telegramDate) // 1970-01-09 same 
// console.log(new Date(date).toISOString() )

//****** 1970-01-09T00:00:00.000Z **** from calendar

// bot.command("calendar", context => {
//   // console.log(context)
//   return context.reply("Here you are", calendar.getCalendar()
//   )
// });





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
// const y = map(arr, (el) => {
//     const x = el.id
//     if (x === date) {
//         return el
//     }
//     // console.log((x));
// })

// console.log(y);

// arr[5] ="boxk";

// const z = find(y, (el) => el !== undefined)
// const z1 = filter(y, (el) => el !== undefined)

// // console.log(z1);


// const u = reduce(arr, (acc, el) => {
//     const x = el.createdAt.split("T")[0]
//     if (x === date) {
//         acc.push(el)
//     }
//     return acc
// }, [])
// console.log(u);



  
// const CronJob = require('cron').CronJob;

// console.log('Before job instantiation');
// const job = new CronJob('00 00 00 * * *', function() {
// 	const d = new Date();
// 	console.log('Midnight:', d);
// });
// console.log('After job instantiation');
// job.start();

// var CronJob = require('cron').CronJob;
// var job = new CronJob('55 17 * * * *', function() {
//   console.log('You will see this message at 17:55');
// }, null, true, 'Asia/Yerevan');
// job.start();


// const CronJob = require('cron').CronJob;

// console.log('Before job instantiation');
// const job = new CronJob('* 20 18 * * *', function() {
// 	const d = new Date();
//     console.log('At 15 Minutes:', d);
//     job.stop();
// });
// console.log('After job instantiation');
// job.start();



// const Telegraf = require('telegraf')
// const TelegrafInlineMenu = require('telegraf-inline-menu')
 
// const menu = new TelegrafInlineMenu(ctx => `Hey ${ctx.from.first_name}!`)
// menu.setCommand('start')
 
// menu.simpleButton('I am excited!', 'a', {
//   doFunc: ctx => ctx.reply('As am I!')
// })
// const token = process.env.BOT_TOKEN;

 
// const bot = new Telegraf("token")
 
// bot.use(menu.init())
 
// bot.startPolling()



// import Telegraf from '@telegraf/core'
// import session from '@telegraf/session'
 
// const bot = new Telegraf('token')
 
// bot.use(session())
 
// bot.on('text', (ctx) => {
//   ctx.session.counter = ctx.session.counter || 0
//   ctx.session.counter++
//   return ctx.reply(`Message counter:${ctx.session.counter}`)
// })
 
// bot.launch()

// use - context - message -



// map(usersData, async (oneUserData) => {
//     const x = await bot.telegram.sendPoll(oneUserData.id, "քանի թասք ես արել էսօր՞", ["1","2","5","10"],{allows_multiple_answers:true}) 
//     console.log(x,"jhewgfscxn-----");
//   })


// const Telegraf = require('telegraf')
// const { Extra, Markup } = Telegraf

// const keyboard = Markup.keyboard([
//   Markup.pollRequestButton('Create poll', 'regular'),
//   Markup.pollRequestButton('Create quiz', 'quiz')
// ])

// const bot = new Telegraf("")

// bot.on('poll', (ctx) => console.log('Poll update', ctx.poll))
// bot.on('poll_answer', (ctx) => console.log('Poll answer', ctx.pollAnswer))

// bot.start((ctx) => ctx.reply('supported commands: /poll /quiz', Extra.markup(keyboard)))

// bot.command('poll', (ctx) =>
//   ctx.replyWithPoll(
//     'Your favorite math constant',
//     ['x', 'e', 'π', 'φ', 'γ'],
//     { is_anonymous: false }
//   )
// )
// bot.command('quiz', (ctx) =>
//   ctx.replyWithQuiz(
//     '2b|!2b',
//     ['True', 'False'],
//     { correct_option_id: 0 }
//   )
// )

// bot.launch()

// const Telegraf = require('telegraf')
// const Composer = require('telegraf/composer')
// const session = require('telegraf/session')
// const Stage = require('telegraf/stage')
// const Markup = require('telegraf/markup')
// const WizardScene = require('telegraf/scenes/wizard')

// const stepHandler = new Composer()
// stepHandler.action('next', (ctx) => {
//   ctx.reply('Step 2. Via inline button')
//   return ctx.wizard.next()
// })
// stepHandler.command('next', (ctx) => {
//   ctx.reply('Step 2. Via command')
//   return ctx.wizard.next()
// })
// stepHandler.use((ctx) => ctx.replyWithMarkdown('Press `Next` button or type /next'))

// const superWizard = new WizardScene('super-wizard',
//   (ctx) => {
//     ctx.reply('Step 1', Markup.inlineKeyboard([
//       Markup.urlButton('❤️', 'http://telegraf.js.org'),
//       Markup.callbackButton('➡️ Next', 'next')
//     ]).extra())
//     return ctx.wizard.next()
//   },
//   stepHandler,
//   (ctx) => {
//     ctx.reply('Step 3')
//     return ctx.wizard.next()
//   },
//   (ctx) => {
//     ctx.reply('Step 4')
//     return ctx.wizard.next()
//   },
//   (ctx) => {
//     ctx.reply('Done')
//     return ctx.scene.leave()
//   }
// )

// const bot = new Telegraf('1138911172:AAGvt8jYQmXotSZa5do-qhKtz0qNkHAl0Fs')
// const stage = new Stage([superWizard], { default: 'super-wizard' })
// bot.use(session())
// bot.use(stage.middleware())
// bot.launch()


// const Telegraf = require('telegraf');
// const Extra = require('telegraf/extra');
// const Markup = require('telegraf/markup');

// const bot = new Telegraf('1138911172:AAGvt8jYQmXotSZa5do-qhKtz0qNkHAl0Fs');

// bot.use(Telegraf.log());

// bot.command('onetime', ({ reply }) =>
//   reply('One time keyboard', Markup
//     .keyboard(['/simple', '/inline', '/pyramid'])
//     .oneTime()
//     .resize()
//     .extra()
//   )
// );

// bot.command('custom', ({ reply }) => {
//   return reply('Custom buttons keyboard', Markup
//     .keyboard([
//       ['🔍 Search', '😎 Popular'], // Row1 with 2 buttons
//       ['☸ Setting', '📞 Feedback'], // Row2 with 2 buttons
//       ['📢 Ads', '⭐️ Rate us', '👥 Share'] // Row3 with 3 buttons
//     ])
//     .oneTime()
//     .resize()
//     .extra()
//   );
// });

// bot.hears('🔍 Search', ctx => ctx.reply('Yay!'));
// bot.hears('📢 Ads', ctx => ctx.reply('Free hugs. Call now!'));

// bot.command('special', (ctx) => {
//   return ctx.reply('Special buttons keyboard', Extra.markup((markup) => {
//     return markup.resize()
//       .keyboard([
//         markup.contactRequestButton('Send contact'),
//         markup.locationRequestButton('Send location')
//       ]);
//   }));
// });

// bot.command('pyramid', (ctx) => {
//   return ctx.reply('Keyboard wrap', Extra.markup(
//     Markup.keyboard(['one', 'two', 'three', 'four', 'five', 'six'], {
//       wrap: (btn, index, currentRow) => currentRow.length >= (index + 1) / 2
//     })
//   ));
// });

// bot.command('simple', (ctx) => {
//   return ctx.replyWithHTML('<b>Coke</b> or <i>Pepsi?</i>', Extra.markup(
//     Markup.keyboard(['Coke', 'Pepsi'])
//   ));
// });

// bot.command('inline', (ctx) => {
//   return ctx.reply('<b>Coke</b> or <i>Pepsi?</i>', Extra.HTML().markup((m) =>
//     m.inlineKeyboard([
//       m.callbackButton('Coke', 'Coke'),
//       m.callbackButton('Pepsi', 'Pepsi')
//     ])));
// });

// bot.command('random', (ctx) => {
//   return ctx.reply('random example',
//     Markup.inlineKeyboard([
//       Markup.callbackButton('Coke', 'Coke'),
//       Markup.callbackButton('Dr Pepper', 'Dr Pepper', Math.random() > 0.5),
//       Markup.callbackButton('Pepsi', 'Pepsi')
//     ]).extra()
//   );
// });

// bot.command('caption', (ctx) => {
//   return ctx.replyWithPhoto({ url: 'https://picsum.photos/200/300/?random' },
//     Extra.load({ caption: 'Caption' })
//       .markdown()
//       .markup((m) =>
//         m.inlineKeyboard([
//           m.callbackButton('Plain', 'plain'),
//           m.callbackButton('Italic', 'italic')
//         ])
//       )
//   );
// });

// bot.hears(/\/wrap (\d+)/, (ctx) => {
//   return ctx.reply('Keyboard wrap', Extra.markup(
//     Markup.keyboard(['one', 'two', 'three', 'four', 'five', 'six'], {
//       columns: parseInt(ctx.match[1])
//     })
//   ));
// });

// bot.action('Dr Pepper', (ctx, next) => {
//   return ctx.reply('👍').then(() => next());
// });

// bot.action('plain', async (ctx) => {
//   await ctx.answerCbQuery();
//   await ctx.editMessageCaption('Caption', Markup.inlineKeyboard([
//     Markup.callbackButton('Plain', 'plain'),
//     Markup.callbackButton('Italic', 'italic')
//   ]));
// });

// bot.action('italic', async (ctx) => {
//   await ctx.answerCbQuery();
//   await ctx.editMessageCaption('_Caption_', Extra.markdown().markup(Markup.inlineKeyboard([
//     Markup.callbackButton('Plain', 'plain'),
//     Markup.callbackButton('* Italic *', 'italic')
//   ])));
// });

// bot.action(/.+/, (ctx) => {
//   return ctx.answerCbQuery(`Oh, ${ctx.match[0]}! Great choice`);
// });

// bot.launch();


// ctx-update-callbackquery-data

// import { Telegraf } from 'telegraf';





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

// const chooseTime =  Markup.keyboard([
//     Markup.callbackButton('11:00','11:00'),
//     Markup.callbackButton('12:00','12:00'),
//     Markup.callbackButton('13:00','13:00'),
//     Markup.callbackButton('Choose other time','Choose other time')
//       ]).oneTime()
//       .resize();

const superWizard = new WizardScene(
  'super-wizard',
   (ctx) => {
      ctx.telegram.sendMessage(797417047,'Երբ ես երեկ սկսել գործ անել՞ ', Extra.markup(chooseTime))
    ctx.wizard.state.data = {};    
    return ctx.wizard.next();
  },
  ctx => {
      console.log(ctx);
      
    ctx.wizard.state.data.time = ctx.message.text;
    ctx.telegram.sendMessage(797417047,'երեկ քանի հատ թասկ եք արել՞', Extra.markup(chooseNumbers))
    return ctx.wizard.next();
  },
  ctx => {

    ctx.wizard.state.data.number = ctx.message.text;

    ctx.reply(`երեկ սկսել ես գործ անել ${ctx.wizard.state.data.time}-ին`);
    ctx.reply(`Ու արել ես  ${ctx.wizard.state.data.number} հատ թասք`);
    return ctx.scene.leave();
  }
);
const stage = new Stage([superWizard], { default: 'super-wizard' });

// const bot = new Telegraf(token);


// bot.command('test', (ctx) => ctx.scene.enter('super-wizard'));

// bot.use(session());
// bot.use(stage.middleware());
// bot.command('test', ctx => {
//     ctx.scene.enter('super-wizard');
//    });
// bot.launch();



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