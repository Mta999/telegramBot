import { Extra } from "telegraf";

export const support = async (ctx,supportButton) => {
    await ctx.telegram.sendMessage(ctx.from.id, 'Կապ Մեզ հետ', Extra.markup(supportButton));
  };