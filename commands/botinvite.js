module.exports = {
	name: 'botinvite',
	help: {
		"usage": "botinvite",
		"desc": "Gives you the invite link for the bot"
	},
	cool: 6000,
	execute(msg) {
		msg.channel.send("https://discord.com/api/oauth2/authorize?client_id=736241828164141076&permissions=8&scope=bot");
	},
};