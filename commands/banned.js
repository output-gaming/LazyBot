const { Command, Middleware } = require('yamdbf');
const {  Collection, Guild, GuildMember, Message, RichEmbed, TextChannel, User, Client } = require('discord.js');
const { resolve, expect } = Middleware;

const axios = require("axios");
const moment = require('moment');

// Here we load the botsettings.json file that contains our token for battlemetrics
const config = require("../botsettings.json");

axios.defaults.baseURL =  'https://api.battlemetrics.com';
axios.defaults.headers.common['Authorization'] = "Bearer "+config.batmetrics;
axios.defaults.headers.post['Content-Type'] = 'application/json';

module.exports = class extends Command
{
	constructor()
	{
		super({
			name: 'banned',
			desc: 'Have you been banned? Use this followed by your banID to find out for how long and maybe why..',
			usage: '<prefix>banned <banid>',
      aliases: ['banid',]
			/* The remaining fields are optional
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
			ratelimit: '1/10s'
			*/
		});
		this.use(resolve('banid:String'))
	}

	action(message, [banid])
	{

		// get the id so we can search
		let banID = banid;

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

			let embed = new RichEmbed()
					.setAuthor("I found the ban")
					.setDescription("Looks like player "+result['data'][0]['meta']['player']+" broke a rule... naughty!")
					.setColor("#3f542f")
					.addField("Type", result['data'][0]['type'])
					.addField('Reason', result['data'][0]['attributes']['reason'])
					.addField('Expires', expires);

			message.channel.sendEmbed(embed)

			let adminEmbed = new RichEmbed()
					.setAuthor("A Ban was queried")
					.setDescription("I found the following ban for player:"+result['data'][0]['meta']['player']+"")
					.setColor("#3f542f")
					.addField("Type", result['data'][0]['type'])
					.addField('Reason', result['data'][0]['attributes']['reason'])
					.addField('Expires', expires)
					.addField('Note', result['data'][0]['attributes']['note'])
					.addField('Battle Metrics', banURL);

					const adminChannel = message.guild.channels.find("name", "game-admins");
					adminChannel.sendEmbed(adminEmbed);

		})
		.catch(function (error) {
			message.reply("Sorry, couldn't find it.")
			console.log(error);
		});

	}
}
