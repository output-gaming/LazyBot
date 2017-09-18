# LazyBot

Our Discord bot, built with discord.js and nodejs 8.0.0

`npm install` will install the dependences

`node app.js` will run the bot

Make sure you have nodejs 8.0.0 installed I recommend using [nvm](https://github.com/creationix/nvm)

Add your tokens for both discord & battle metrics

Invite bot to servers

# How do I add my bot account to a server?

Note: You can only add a bot account to a server that you have Manage Server permissions on.
The link to add your bot account to a server is provided in the console window when you run the bot and it is not on any servers.

To get this link manually, go to the Discord developers page and click on your application. At the top, you will find the bot account's Client ID.

`https://discordapp.com/oauth2/authorize?&client_id=<CLIENT ID>&scope=bot&permissions=0`

Replace `<CLIENT ID>` in the link above with the Client ID from your application page, and then go to the URL on a browser. There, you'll be able to add it to servers.
