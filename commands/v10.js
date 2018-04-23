const { Command } = require('yamdbf');

module.exports = class extends Command
{
	constructor()
	{
		super({
			name: 'v10',
			desc: 'V10! info',
			usage: '<prefix>v10',
      aliases: ['wipe']
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
	}

	action(message, args)
	{
		message.reply({embed:{
			color: 3447003,
			// author: {
			//   name: bot.user.username,
			//   icon_url: bot.user.avatarURL
			// },
			title: "V10 is now live!",
			description: "V9 is behind us and v10 is the new black.",
			// image: {
			//    url: "https://i.imgur.com/j6YMTdL.png" //help image
			// },
			fields: [{
			  name: "My stats are wiped?",
			  value: "V10 is now live, due to the large mismatch in data it wasn't feasible to migrate player data."
			},
			  {
				name: "ArmaKoth Battle Stats",
				value: "With the welcome of V10 ArmaKoth are able to track player stats and make loosing profiles a thing of the past. View global stats, leaderboards and player stats at [ArmaKoth BattleStats](https://stats.armakoth.com)" 
			  },
			  {
				name: "I'm not convienced!!",
				value: "Read the offical launch blog post [Here](https://blog.armakoth.com/rhs-king-of-the-hill-43a854a581d0) or the post about the wipe [here](https://blog.armakoth.com/important-community-restructure-8aeb0f8ec3ac)"
			  }
			],
			timestamp: new Date(),
			footer: {
			  text: "©LazyBot, The Revolt Slave"
			}
		  }
		});
  
	}
}
