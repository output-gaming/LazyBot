const { Command, Middleware } = require('yamdbf');
const {  Collection, Guild, GuildMember, Message, RichEmbed, TextChannel, User, Client } = require('discord.js');
const { resolve, expect } = Middleware;

const axios = require("axios");
const moment = require('moment');
const Cleverbot = require('cleverbot-api-node');

// Here we load the botsettings.json file that contains our token for battlemetrics
const config = require("../botsettings.json");



module.exports = class extends Command
{
	constructor()
	{
		super({
			name: 'cleverbot',
			desc: 'Bored with your life? Have a chat with me',
			usage: '<prefix> [text]',
			ratelimit: '1/10s'
      /* The remaining fields are optional
			aliases: ['banid',]
			aliases: ['p'],
			info: 'A basic ping/pong command example.',
			group: 'example',
			clientPermissions: [],
			callerPermissions: [],
			roles: [],
			guildOnly: false,
			ownerOnly: false,
			hidden: false,
			argOpts: { separator: ',' },
			overloads: 'ping',

			*/
		});
		this.use(resolve('text:String'))
	}

	action(message, [text])
	{

		// get the id so we can search
		let cleverText = text;

		const args = text.slice(config.prefix.length).trim().split(/ +/g);
	  const command = args.shift().toLowerCase();

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
}
