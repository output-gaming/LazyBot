const { Command } = require('yamdbf');

module.exports = class extends Command
{
	constructor()
	{
		super({
			name: 'reset',
			desc: 'Been banned for Multi X server or profile cheating',
			usage: '<prefix>reset',
      aliases: ['profilecheating','wsban']
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

		message.author.sendMessage({embed:{
          color: 3447003,
          // author: {
          //   name: bot.user.username,
          //   icon_url: bot.user.avatarURL
          // },
          title: "Reset & Unban - WS Ban",
          description: "Oh no, you have been caught profile cheating or playing on a Multi X server.....",
          // image: {
          //    url: "https://i.imgur.com/j6YMTdL.png" //help image
          // },
          fields: [{
            name: "READ",
            value: "Do NOT play on ANY modded/pirated bonus xp servers again, or your ban will be permanent. To make sure you are playing on the Official KotH servers, consider downloading the launcher (https://www.a3cdn.com/) Type !launcher for more details." 
          },
            {
              name: "RESET",
              value: "In order to be unbanned, please head to your documents folder and delete the Arma 3 and Arma 3 - Other Profiles folders Seen in gif below https://i.imgur.com/FxiD3o1.gif."
            },
            {
              name: "Wait",
              value: "This will reset you back to level 1. If you join a server and are not level 1, something didn't work! You need to come back to discord and let us know ASAP before you get banned again.Ensure your game is CLOSED before deleting these files. When you have time, you are eligible to get a restore in #koth-profile-restore to the last legit level, if we have any data on you.Finally please wait for an admin to confirm that you have been unbanned by him or her."
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