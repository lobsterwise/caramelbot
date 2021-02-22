const Discord = require('discord.js');
module.exports = {
	name: 'about',
	help: {
		"usage": "about",
		"desc": "Tells you about the bot"
	},
	cool: 6000,
	execute(msg) {
		let cl = new Discord.MessageEmbed();
		cl.setTitle("About **Caramel**");
		cl.setColor("#f54275");
		cl.addField("What", "Caramel is a bot for Discord that adds a ton of useful and fun commands for you to use", false);
		cl.addField("Who", "The bot was created by <@688453570173075534>", false);
		cl.addField("Why", "Just a fun project for me and a useful bot for you", false);
		cl.addField("How", "Use the `" + '-' + "help` command to get info on the commands avaliable", false);
		cl.setFooter("Use `" + '-' + "help`")
		msg.channel.send(cl);
	},
};