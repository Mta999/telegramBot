import { Markup } from "telegraf";

export const yesOrRemindMeLater =  Markup.keyboard([
    ['Yes 👍🏻 💪🏻' , 'Remind me Later 🤯 😈']
    ]).oneTime()
    .resize();