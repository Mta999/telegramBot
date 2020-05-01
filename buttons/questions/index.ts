import * as Telegraf  from 'telegraf';

export const  firstQuestion = () => {
   Telegraf.Extra
  .markdown()
  .markup((m) => m.inlineKeyboard([
  m.callbackButton('ինչի է հավասար 1 + 1', 'test')
  ]))
  // console.log("firstQuestion")
} 