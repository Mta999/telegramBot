// import { firstQuestion } from './buttons/questions/index';
import { startCommand, helpCommand } from "./commands/index"
import "./env"
import   Telegraf, {Extra}  from "telegraf";
import { connect, model, Schema, Document, Model } from 'mongoose';


const mongoUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017';
const database = process.env.MONGODB_DATABASE_USERS || 'users';


const uri: string = [mongoUrl, database].join('/');

// console.log(uri)

const token = process.env.BOT_TOKEN

const bot = new Telegraf(token)




const UserSchema = new Schema({
  userName: String,
  id: String,
});

interface UserInterface extends Document  {
  userName: string;
  id: string;
}

const User = async (): Promise<Model<UserInterface,{}>> => {
  await connect(uri, (err: any) => {
      if (err) {
          console.error(err.message);
      } else {
          console.log(' Connected! ');
      }
  });
  return model<UserInterface>('users', UserSchema, 'users');
};

const getAllUsers = async (): Promise<UserInterface[]> => {
  console.log("get all users")
  const model = await User();
  console.log(model.find)
  return await model.find();

};

// const allUsers = async () => {
//   try {
//     const users = await getAllUsers();
//     console.log("users",users)
//   } catch (error) {
//       console.error();       ****id: 1138911172,
//   }
// };

// allUsers()

bot.start(async(ctx)=>{
  const botInfo =ctx.botInfo
  await model.findOne({
      if (botinfo) {
        
      },
   });
})
bot.help(helpCommand)
bot.launch()

bot.on('sticker', (ctx) => ctx.reply('լավն էր'))

export {
  UserSchema, UserInterface, User
};













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
