const { Command } = require('yamdbf');

module.exports = class extends Command
{
	constructor()
	{
		super({
			name: 'report',
			desc: 'Someone cheaing? find out how to report them',
			usage: '<prefix>report',
			aliases: ['hacker','cheater']
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
			title: "Report Player",
			description: "Oh no, someone breaking the rules??, Please email **report@ogoc.in** using the following format",
			fields: [{
				name: "The player you wish to report",
				value: "The name of the player"
			},
				{
					name: "The server the player is on (and if possible the team the player is on)",
					value: "Any of our Arma servers, AU#1,2 or Exile"
				},
				{
					name: "The rule they are breaking",
					value: "Please state the rule they broke or you belive they were breaking."
				},
				{
					name: "Proof (Screenshots/Video)",
					value: "Please link your evidence"
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
