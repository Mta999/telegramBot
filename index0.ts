import TelegramBot from "node-telegram-bot-api";
const token = "1186503636:AAHq5LjKsJBcpgvKVnL4f4eiBJTYnCJYzvw"
const bot = new TelegramBot(token, { polling: true })

const time = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{
                text: "Show London's current time",
                callback_data: '1'
            }],
        ]
    })
};

bot.on("message", msg => {
    //  console.log("lava")
    const { chat: { id } } = msg;
    const londonTime = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })
    bot.sendMessage(id, "current time in London is  " + londonTime)
})

bot.on('callback_query', function onCallbackQuery(callbackQuery) {
    const action = callbackQuery.data;
    console.log(action);
    const msg = callbackQuery.message;

    if (action === '1') {
        const { chat: { id } } = msg;
        console.log("lava")
        const londonTime = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })
        bot.sendMessage(id, "current time in London is  " + londonTime)
    }
});