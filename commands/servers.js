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
		message.author.sendFile('https://cdn.battlemetrics.com/b/horizontal500x80px/238223.png?foreground=%23EEEEEE&background=%23222222&lines=%23333333&linkColor=%231185ec&chartColor=%23FF0700', 'AU1.jpg', 'ARMAKOTH.COM - King Of The Hill - AU#1 NOJETS - teamrevolt.org');
		message.author.sendFile('https://cdn.battlemetrics.com/b/horizontal500x80px/238225.png?foreground=%23EEEEEE&background=%23222222&lines=%23333333&linkColor=%231185ec&chartColor=%23FF0700', 'AU2.jpg', 'ARMAKOTH.COM - King Of The Hill - AU#2 LV - teamrevolt.org');
		message.author.sendFile('https://cdn.battlemetrics.com/b/horizontal500x80px/238222.png?foreground=%23EEEEEE&background=%23222222&lines=%23333333&linkColor=%231185ec&chartColor=%23FF0700', 'AU3.jpg', 'ARMAKOTH.COM - King Of The Hill - AU#3 INF HC - teamrevolt.org');
		message.author.sendFile('https://cdn.battlemetrics.com/b/horizontal500x80px/1606046.png?foreground=%23EEEEEE&background=%23222222&lines=%23333333&linkColor=%231185ec&chartColor=%23FF0700', 'AU1-1.jpg', 'ARMAKOTH.COM - King Of The Hill 1944 - AU#1 - teamrevolt.org');
		message.author.sendFile('https://cdn.battlemetrics.com/b/horizontal500x80px/1400569.png?foreground=%23EEEEEE&background=%23222222&lines=%23333333&linkColor=%231185ec&chartColor=%23FF0700', 'EXILE.jpg', 'Team Revolt Exile NEW|CHERNO|BOUNTIES|TOWING|LOADING|VG|HACK|GR');
		message.author.sendFile('https://cdn.battlemetrics.com/b/horizontal500x80px/1714063.png?foreground=%23EEEEEE&background=%23222222&lines=%23333333&linkColor=%231185ec&chartColor=%23FF0700', 'sdtd.jpg', 'Team Revolt - Can you Survive? | 7days to die');
	}
}
