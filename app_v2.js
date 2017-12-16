const { Client } = require('yamdbf');
const config = require('./botsettings.json');

//Setup the base bot settings.
const bot = new Client({
    name: 'LazyBot',
    commandsDir: './commands',
    statusText: '@LazyBot help for commands',
    token: config.token,
    owner: config.owner

}).start();

//Tell us in the log when the bot is alive.
bot.once('clientReady', () => {
	  console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds. `);
});

//Welcome new users
bot.on('guildMemberAdd', member => {
   member.send("Welcome to the Team Revolt discord!, use **help** for more a list of available commands.");
});
