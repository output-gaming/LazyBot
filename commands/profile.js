const { Command } = require('yamdbf');

module.exports = class extends Command
{
	constructor()
	{
		super({
			name: 'profile',
			desc: 'Lost your arma 3 KoTH profile?',
			usage: '<prefix>profile',
      aliases: ['backup','lostprofile']
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
          title: "Profile Restore",
          description: "Profile restore?! What is this v9? HA!",
          // image: {
          //    url: "https://i.imgur.com/j6YMTdL.png" //help image
          // },
          fields: [{
            name: "First",
            value: "V10 is now live, this is no longer possible."
          },
            {
              name: "Second",
              value: "Go level, or [read this0](https://blog.armakoth.com/rhs-king-of-the-hill-43a854a581d0)"
            },
            {
              name: "Third",
              value: "Track your stats [ArmaKoth BattleStats](https://stats.armakoth.com)."
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
