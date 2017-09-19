const Discord = require("discord.js");
const axios = require("axios");
const moment = require('moment');
const Cleverbot = require('cleverbot-api-node');


// Here we load the config.json file that contains our token and our prefix values.
const config = require("./botsettings.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.
// config.batmetrics contains battlemetrics token

const Clever = new Cleverbot(config.cleverbot);
axios.defaults.baseURL =  'https://api.battlemetrics.com';
axios.defaults.headers.common['Authorization'] = "Bearer "+config.batmetrics;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const bot = new Discord.Client({disableEveryone: true});


bot.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds. `);
  // Example of changing the bot's playing game to something useful. `bot.user` is what the
  // docs refer to as the "botUser".
  bot.user.setGame(`Helping you`);
});

bot.on('guildMemberAdd', member => {
   member.send("Welcome to the Team Revolt discord!, use **!help** for more help.");
});

bot.on("message", async message => {



  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;

  // Also good practice to ignore any message that does not start with our prefix,
  // which is set in the configuration file.
  //if(message.content.indexOf(config.prefix) == 0) return;

  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();


  if (message.channel.type === "dm") {

    message.channel.startTyping();

    setTimeout(() => {
      Clever.request(args).then(function(response) {
        console.log(response.output);
        message.channel.send(response.output);
        message.channel.stopTyping();
      }, Math.random() * (1 - 3) + 1 * 1000);
     }).catch(function(error) {
      console.error(error);

    });
  }


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

    message.reply({embed:{
        color: 3447003,
        author: {
          name: bot.user.username,
          icon_url: bot.user.avatarURL
        },
        title: "Hi, I'm LazyBot. Let me try and help you",
        url: "https://teamrevolt.org",
        description: "Help is subjective and hard sometimes, below is what I can help you with..",
        image: {
           url: "https://i.imgur.com/j6YMTdL.png" //help image
        },
        fields: [{
          name: "I have been banned?",
          value: "I can help you with this,use **!banid IDHERE** and I will search it for you."
        },
          {
            name: "Why is no one in voice?",
            value: "Well ah, voice in discord actually sucks, join our [TeamSpeak](ts3server://ts3.teamrevolt.org)."
          },
          {
            name: "Lost your KoTH profile?",
            value: "Use **!profile** to learn more about this."
          },
          {
            name: "Servers",
            value: "We run a lot, vist the [forum](https://teamrevolt.org) they can be found there."
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

  if (command === 'profile') {

      message.reply({embed:{
          color: 3447003,
          // author: {
          //   name: bot.user.username,
          //   icon_url: bot.user.avatarURL
          // },
          title: "Profile Restore",
          description: "Oh no, someone didnt back up did they.....",
          // image: {
          //    url: "https://i.imgur.com/j6YMTdL.png" //help image
          // },
          fields: [{
            name: "First",
            value: "Profiles can only presently be done via Discord. Restores can happen at anytime around the clock, and are done by random community members. We don't organise any Restorations"
          },
            {
              name: "Second",
              value: "Join the [WS Discord](https://discord.gg/T7QP6cJ)"
            },
            {
              name: "Third",
              value: "Read WS Discord & Do what they request & wait."
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
    if(!message.member.roles.some(r=>["Team Revolt Admin", "Team Revolt Staff" , "Game Server Admin"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
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

          message.channel.send(embed);

        })
        .catch(function (error) {
          console.log(error);
        });

  }

  if (command === 'banid'){
      // get the id so we can search
      let banID = args.join(" ");

      message.reply("Just hunting it down..")

      let url = '/bans?filter[search]='+banID;
      // Gets the ban counts from battlemetrics
      let getConfig = {
          scope:'ban:read'
        }

      axios.get(url, getConfig)
      .then(function (response) {

        let result = response.data;
        let expires = ""+ moment(result['data'][0]['attributes']['expires']).endOf('day').fromNow()+" or "+ moment(result['data'][0]['attributes']['expires']).format('MMMM Do YYYY, h:mm:ss a');
        let banURL = "[Open Ban #"+result['data'][0]['id']+"](https://www.battlemetrics.com/rcon/bans/edit/"+result['data'][0]['id']+")";
        console.log(result.data);

        let embed = new Discord.RichEmbed()
            .setAuthor("I found the ban")
            .setDescription("Looks like they broke a rule... naughty!")
            .setColor("#3f542f")
            .addField("Type", result['data'][0]['type'])
            .addField('Reason', result['data'][0]['attributes']['reason'])
            .addField('Expires', expires);

        let PrivateEmbed = new Discord.RichEmbed()
            .setAuthor("A Ban was queried")
            .setDescription("I found the following ban")
            .setColor("#3f542f")
            .addField("Type", result['data'][0]['type'])
            .addField('Reason', result['data'][0]['attributes']['reason'])
            .addField('Expires', expires)
            .addField('Note', result['data'][0]['attributes']['note'])
            .addField('Battle Metrics', banURL);

        message.channel.send(embed)
        bot.channels.get("357434597979586560").send(PrivateEmbed);

      })
      .catch(function (error) {
        message.reply("Sorry, couldn't find it.")
        console.log('error');
      });

  }



  if (command === 'Who rocks') {
    message.reply('My creator, revolt| fingerguns');

  }
  if (command === 'Who sucks') {

    message.reply("you, lean nodejs");

  }

});

bot.login(config.token);
