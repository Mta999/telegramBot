import { Calendar } from 'telegraf-calendar-telegram';
import { Extra } from 'telegraf';
import { User } from '../model/user';


const menu = Extra
  .markdown()
  .markup((m) => m.keyboard([
    m.callbackButton('My reports'), //button in keyboard "lava" 
    m.callbackButton('Support'),
  ]).resize())



export const toDbAndStart = async (ctx) => {


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
        userName: ctx.from.first_name,
      })
  } else {
    console.log("goyutyun uni userData")
    return
  }
}