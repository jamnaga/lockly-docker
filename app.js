const telegraf = require('telegraf');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const Composer = require('telegraf/composer');
const scheduler = require('node-schedule');
const markovTrainer = require('./utils/markovTrainer');
const telegramParser = require('./utils/telegramParser');

const trainJob = scheduler.scheduleJob('trainJob', '* */1 * * *', markovTrainer);

const bot = new telegraf.Telegraf(process.env.BOT_TOKEN);

(async () => {
  
  await mongoose.connect('mongodb://localhost:27017/Lockly', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

})();

// Middleware

const groupCommands = new Composer();

groupCommands.command('/debug', require('./events/commands/debug'));
groupCommands.on('message', require('./events/messages/markovReply'));

bot.use(groupCommands);

bot.use(async (ctx, next) => {

  //If it's not a text message
  if(ctx.message.text == undefined) 
    return;

  // If it's start command and private chat, next.
  if(ctx.message.text.includes('start') && ctx.message.chat.type == 'private') 
    return next();

  // If it's start command but not in a private chat, return.
  if(ctx.message.text.includes('start') && ctx.message.chat.type != 'private') 
    return;

  // If it's any other command/text message but it's not coming from a supergroup or group, return.
  if(ctx.message.chat.type == 'private' || ctx.chat.type == 'channel') 
    return;

  // Any other case should work correctly with the bot, next.
  return next();

});

// Events

bot.start((ctx) => {

  ctx.replyWithHTML('<b>Benvento da Lockly Bot!</b>\nQuesto bot è stupido e vuole imparare a parlare.\nTi consigliamo di tenerlo disabilitato fino a quando non ha qualche centinaio di messaggi nel database (usa /stats nel gruppo) e di non condividere dati sensibili in quanto i messaggi vengono salvati in chiaro nel nostro database.')

});

bot.launch();