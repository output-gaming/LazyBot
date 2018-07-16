const { Command } = require('yamdbf');

module.exports = class extends Command
{
	constructor()
	{
		super({
			name: 'og',
			desc: 'returns a general response about og',
			usage: '<prefix>og',
			aliases: ['ogoc','outputgaming']
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
		message.reply("OG aka output gaming are a gaming community that is communtiy run, find more information at https://ogoc.in");
	}
}
