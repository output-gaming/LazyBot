const { Command } = require('yamdbf');

module.exports = class extends Command
{
	constructor()
	{
		super({
			name: 'help',
			desc: 'Just a general help response!',
            usage: '<prefix>help',
            aliases: ['helpme','lost','admin', 'hd']
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
        let helpMessage = 'Help is very contextual, let me help you as much as I can! **Report a player or Appeal a ban ** • If you are looking to report a player use **!report** for more information • If you are looking to appeal a ban use **!ban** for more information **GENERAL SUPPORT** We run a ticketed support system to make it easier for both you and our admin team. If you are looking for support email **help@ogoc.in** Being specific in your request will make sure it goes to the correct people Eg if KoTH or Exile releated mention this in the subject or email body. Same goes for contributions if you are looking for support for this.';
		message.reply(helpMessage);
	}
}
