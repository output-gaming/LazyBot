const { Command } = require('yamdbf');

module.exports = class extends Command
{
	constructor()
	{
		super({
			name: 'servers',
			desc: 'returns all our game server details',
			usage: '<prefix>servers',
			aliases: ['arma3','sv']
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
		message.reply('Sending you a DM with our current game servers.')
		message.author.sendMessage("Retrieving our current games servers now.")
		message.author.sendMessage('You can always find our ArmaKoth Server at https://servers.armakoth.com, search **output**.')
		message.author.sendFile('https://cdn.battlemetrics.com/b/horizontal500x80px/2122705.png?foreground=%23EEEEEE&background=%23222222&lines=%23333333&linkColor=%231185ec&chartColor=%23FF0700', 'AU1.jpg', 'ARMAKOTH.COM - King Of The Hill - AU#1 INF - outputgaming.org');
		message.author.sendFile('https://cdn.battlemetrics.com/b/horizontal500x80px/238225.png?foreground=%23EEEEEE&background=%23222222&lines=%23333333&linkColor=%231185ec&chartColor=%23FF0700', 'AU2.jpg', 'ARMAKOTH.COM - King Of The Hill - AU#2 LV - outputgaming.org');
		message.author.sendFile('https://cdn.battlemetrics.com/b/horizontal500x80px/2122752.png?foreground=%23EEEEEE&background=%23222222&lines=%23333333&linkColor=%231185ec&chartColor=%23FF0700', 'EXILE.jpg', 'Output Gaming Exile NEW|CHERNO|BOUNTIES|TOWING|LOADING|VG|HACK|GR');
		message.author.sendFile('https://minecraft-mp.com/regular-banner-179387.png', 'OG - Engimatica [Minecraft]');
		message.author.sendFile('https://minecraft-mp.com/regular-banner-145526-3.png', 'OG - Presents FTB Continuum [Minecraft]');
	}
}
