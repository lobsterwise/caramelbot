const Discord = require('discord.js');
module.exports = {
	name: 'changelog',
	help: {
		"usage": "changelog",
		"desc": "Tells you about recent changes to the bot"
	},
	cool: 3400,
	execute(msg) {
		let cl = new Discord.MessageEmbed();
		cl.setTitle("Changelog");
		cl.setColor("#f54275");
		cl.addField("\u2022 -meme command", "kinda buggy, doesn\'t work with video, sometimes breaks, still in beta", false);
		cl.addField("\u2022 Website!", "We have a website at https://carameldiscord.herokuapp.com", false);
		msg.channel.send(cl);
	},
};