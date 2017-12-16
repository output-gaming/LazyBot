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
          description: "Oh no, someone didnt back up did they.....",
          // image: {
          //    url: "https://i.imgur.com/j6YMTdL.png" //help image
          // },
          fields: [{
            name: "First",
            value: "Profiles can only presently be done via Discord. Restores can happen at anytime around the clock, and are done by random community members. We don't organise any Restorations"
          },
            {
              name: "Second",
              value: "Join the [WS Discord](https://discord.gg/T7QP6cJ)"
            },
            {
              name: "Third",
              value: "Read WS Discord & Do what they request & wait."
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
