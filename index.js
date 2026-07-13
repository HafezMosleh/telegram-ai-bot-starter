require('dotenv').config();
const { Telegraf } = require('telegraf');
const { OpenAI } = require('openai');

const bot = new Telegraf(process.env.BOT_TOKEN);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

bot.start((ctx) => ctx.reply('👋 Welcome! I am an AI bot. Ask me anything.'));

bot.on('text', async (ctx) => {
    try {
        ctx.sendChatAction('typing');
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: ctx.message.text }],
        });
        await ctx.reply(response.choices[0].message.content);
    } catch (error) {
        console.error(error);
        ctx.reply('❌ Sorry, error processing request.');
    }
});

bot.launch();