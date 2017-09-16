const botSettings = require("./botsettings.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

// Here we load the config.json file that contains our token and our prefix values.
const config = require("./botsettings.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

bot.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);
  // Example of changing the bot's playing game to something useful. `bot.user` is what the
  // docs refer to as the "botUser".
});


bot.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.

  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;

  // Also good practice to ignore any message that does not start with our prefix,
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;

  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Let's go with a few common example commands! Feel free to delete or change those.

  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    let m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`);
  }

  if(command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use.
    // To get the "message" itself we join the `args` back into a string with spaces:
    let sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{});
    // And we get the bot to say the thing:
    message.channel.send(sayMessage);
  }


  if(command === "purge") {
    // This command removes all messages from all users in the channel, up to 100.
    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);

    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");

    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({count: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
  if (command === 'help') {

      let embed = new Discord.RichEmbed()
          .setAuthor("Team Revolt Bot")
          .setDescription("Below you will find some basic help.")
          .setColor("#3f542f")
          .addField("Join our Forum", 'All are welcome, https://www.teamrevolt.org/forums/')
          .addField("Team Speak", 'ts3.teamrevolt.org')
          .addField("Profile Restore", '!profile will tell let you know how to restore your KoTH profile, do remember its easier to keep backups.');

      message.channel.sendEmbed(embed);
  }

  if (command === 'profile') {

      let embed = new Discord.RichEmbed()
          .setAuthor("Profile Restore")
          .setDescription("Oh no, someone didnt back up did they.....")
          .setColor("#3f542f")
          .addField("First", "Profiles can only presently be done via Discord. Restores can happen at anytime around the clock, and are done by random community members. We don't organise any Restorations.")
          .addField("Second", "Join the WS Discord https://discord.gg/T7QP6cJ");

      message.channel.sendEmbed(embed);
  }

  if (command === 'Who rocks') {
    message.reply('My creator, revolt| fingerguns');

  }
  if (command === 'Who sucks') {

    message.reply("you, lean nodejs");

  }
});

bot.login(config.token);
