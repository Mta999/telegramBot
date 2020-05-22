import { Markup } from "telegraf";

export const firstMenu = Markup.keyboard([
    ['My reports', 'Support']
   ]).oneTime()
   .resize();