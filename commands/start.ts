import { Extra } from 'telegraf';
import { User } from '../model/user';


 export const menu = Extra
  .markdown()
  .markup((m) => m.keyboard([
    m.callbackButton('My reports'), //button in keyboard "lava" 
    m.callbackButton('Support'),
  ]).resize())



export const yesOrRemindMeLater = Extra
  .markdown()
  .markup((m) => m.keyboard([
    m.callbackButton('yes'), //button in keyboard "lava" 
    m.callbackButton('remind me later'),
  ]).resize())

export const toDbAndStart = async (ctx) => {
  console.log(ctx.message);
  
  const startCommand = ((ctx) => {
    ctx.reply("Բայլուս").then(() => {
      ctx.reply("ինչ կա՞, լավ ես՞", menu)
    })
  })
  startCommand(ctx);

  
  const model = await User();
  const userId = ctx.from.id;
  const userData = await model.findOne({ id: userId })
  // console.log(userData)
  if (!userData) {
    await model.create(
      {
        // setOnInsert: { dateAdded: new Date() },
        id: userId,
        isBotOrNo:ctx.from.is_bot,
        firstName: ctx.from.first_name,
        lastName:ctx.from.last_name
      })
  } else {
    console.log("goyutyun uni userData")
    return
  }
}