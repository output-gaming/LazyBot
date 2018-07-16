const { Command } = require('yamdbf');

module.exports = class extends Command
{
	constructor()
	{
		super({
			name: 'donate',
			desc: 'donate response',
            usage: '<prefix>contribute',
            aliases: ['vip','slots','donate']
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
        let donateMessage = 'Output Gaming offers players the ability to contribute towards items like reserved slots on our ARMA3, in-game VIP on KoTH and Donator status on our discord and TS3. **Unfortunately in-game bonuses on eXile are not possible due to licensing restrictions with CUP Mods** If you would contribute, you can visit https://www.outputgaming.org/contribute and it is recommended using the **Sign in with STEAM** method to contribute to ensure you have the correct GUID. Donations are as little as $5 per month, and go towards upkeep/upgrades of our servers, and Licensing, and Development costs (We do on forward a portion of donations to Sa-Matra for his awesome work on KoTH too!) An additional bonus to being a donator, is that you are able to get yourself the snazzy "Yellow Tag" on our Discord and also gain access to the donator discussion room, plus a "Contributor" tag on Teamspeak3 (And optional private channel) . Occasionally we do offer pre-tests, etc to contributors where we need more than just admins to fill up the numbers. If you contribute with **Sign in with STEAM**, it should be attributed in 30 - 60 minutes, and be active on all servers. It is recommended you use this method unless you know what you are doing to avoid mistakes! To get the Discord tag, please follow the below steps: 1) Go to User Settings -> Connections, and click on the STEAM Icon 2) Sign in with STEAM, and connect your account 3) In the "#general-discussion" channel, type !ihavedonated, and an admin will review, and verify you when available. 4) Follow the instructions found in the new #pending-donator lobby If you choose to contribute. Thanks for helping us keep up the servers! **NB: It can take 24-48 hours to apply in-game VIP if you contribute using GUID only. If you contribute using "Login with STEAM" this may be reduced to 12-24 hours** **If you require help regarding a payment please email *help@ogoc.in* **';
		message.reply(donateMessage);
	}
}
