const botSettings = require("./botsettings.json");
const Discord = require("discord.js");

var axios = require("axios");

axios.defaults.baseURL =  'https://api.battlemetrics.com';
axios.defaults.headers.common['Authorization'] = "Bearer privateyo";
axios.defaults.headers.post['Content-Type'] = 'application/json';


const bot = new Discord.Client({disableEveryone: true});

// Here we load the config.json file that contains our token and our prefix values.
const config = require("./botsettings.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

bot.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds. `);
  // Example of changing the bot's playing game to something useful. `bot.user` is what the
  // docs refer to as the "botUser".
    bot.user.setGame(`on ${bot.guilds.size} servers`);
});

bot.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setGame(`on ${client.guilds.size} servers`);
});

bot.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  bot.user.setGame(`on ${bot.guilds.size} servers`);
});


bot.on('guildMemberAdd', member => {
   member.send("Welcome to the Team Revolt discord!, use !help for more info and rules.");
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

  if(command === "kick") {
    // This command must be limited to mods and admins. In this example we just hardcode the role names.
    // Please read on Array.some() to understand this bit:
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
    if(!message.member.roles.some(r=>["Team Revolt Admin", "Team Revolt Staff" , "Game Server Admin"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");

    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable)
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");

    // slice(1) removes the first part, which here should be the user mention!
    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the kick!");

    // Now, time for a swift kick in the nuts!
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }

  if(command === "ban") {
    // Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
    if(!message.member.roles.some(r=>["Team Revolt Admin"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");

    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable)
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the ban!");

    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }

  if(command === "purge") {
    if(!message.member.roles.some(r=>["Team Revolt Admin"].includes(r.name)) )
     return message.reply("Sorry, you don't have permissions to use this!");
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

    message.author.send({embed:{
        color: 3447003,
        author: {
          name: bot.user.username,
          icon_url: bot.user.avatarURL
        },
        title: "Hi, I'm LazyBot. Let me try and help you",
        url: "https://teamrevolt.org",
        description: "Help is subjective and hard sometimes, below is what I can help you with..",
        image: {
           url: "https://i.imgur.com/j6YMTdL.png"
        },
        fields: [{
            name: "Why is no one in voice?",
            value: "Well ah, voice in discord actually sucks, join our [TeamSpeak](ts3server://ts3.teamrevolt.org)."
          },
          {
            name: "Lost your KoTH profile?",
            value: "Use !profile to learn more about this."
          },
          {
            name: "Servers",
            value: "We run a lot, vist the forum they can be found there. I'm Lazy after all."
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: bot.user.avatarURL,
          text: "©LazyBot, The Revolt Slave"
        }
      }
    });

  }

  if (command === 'bans'){

      // Gets the ban counts from battlemetrics
      axios.get('/bans')
        .then(function (response) {
          console.log(response.data.meta);
          var active = JSON.stringify(response.data.meta.active);
          var expired = JSON.stringify(response.data.meta.expired);
          var total = JSON.stringify(response.data.meta.total);

          let embed = new Discord.RichEmbed()
              .setAuthor("Ban Count")
              .setDescription("Alright, I'm lazy I can't imagine you are much better.... Here are the numbers")
              .setColor("#3f542f")
              .addField("Active", active)
              .addField("Expired", expired)
              .addField("Total", total);

          message.channel.sendEmbed(embed);

        })
        .catch(function (error) {
          console.log(error);
        });

  }


  if (command === 'profile') {

      let embed = new Discord.RichEmbed()
          .setAuthor("Profile Restore")
          .setDescription("Oh no, someone didnt back up did they.....")
          .setColor("#3f542f")
          .addField("First", "Profiles can only presently be done via Discord. Restores can happen at anytime around the clock, and are done by random community members. We don't organise any Restorations.")
          .addField("Second", "Join the WS Discord https://discord.gg/T7QP6cJ");

      message.author.sendEmbed(embed);
  }

  if (command === 'Who rocks') {
    message.reply('My creator, revolt| fingerguns');

  }
  if (command === 'Who sucks') {

    message.reply("you, lean nodejs");

  }
});

bot.login(config.token);
