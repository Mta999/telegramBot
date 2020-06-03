import { Extra } from 'telegraf';
import { User } from '../model/user';
import { firstMenu } from './buttons';


export const toDbAndStart = async (ctx) => {
  
  const startCommand = ((ctx) => {
      ctx.telegram.sendMessage(ctx.chat.id, 'Բայլուս', Extra.markup(firstMenu)); // , menu
  }); 
  startCommand(ctx);
  const model = await User();
  const userId = ctx.from.id;
  const userData = await model.findOne({ id: userId });
  if (!userData) {
    await model.create(
      {
        id: userId,
        isBotOrNo: ctx.from.is_bot,
        firstName: ctx.from.first_name,
        lastName: ctx.from.last_name
      });
  } else {
    console.log('goyutyun uni userData');
    return;
  }
};