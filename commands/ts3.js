const { Command } = require('yamdbf');

module.exports = class extends Command
{
	constructor()
	{
		super({
			name: 'ts3',
			desc: 'returns our teamspeak server details!',
			usage: '<prefix>ts3',
      aliases: ['teamspeak']
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
		message.reply("Join our teamspeak - ts3.teamrevolt.org");
	}
}
