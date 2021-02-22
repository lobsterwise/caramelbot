const inx = require('./../index');
const Discord = require('discord.js');
module.exports = {
	name: 'help',
	help: {
		"usage": "help `utility|fun|all`/`command`",
		"desc": "Gives you information about avaliable commands. Can also inform you about a specific command if you type it in"
	},
	execute(msg) {
		let arg = inx.getAfter(msg.content, 5 + prefix.length);
		let inp = inx.client.commands.get(arg);
		let emb = new Discord.MessageEmbed();
		let sections = {
			"all": [["help", "test", "ping", "echo", "**stop**", "changelog", "rate", "8ball", "inst", "wh", "roll", "fortune", "qu", "bubblewrap", "who", "yell"], ["face", "about", "calc", "invite", "poll", "botinvite", "lovecalc", "slow", "tile", "allroles"]],
			"fun": [["rate", "8ball", "inst", "wh", "roll", "fortune", "qu", "bubblewrap", "lovecalc", "tile"]],
			"utility": [["help", "test", "ping", "echo", "**stop**", "changelog", "rate", "roll", "who", "face", "about", "calc", "invite", "poll", "botinvite", "slow", "kick"], ["ban", "allroles"]],
			"text": [["yell"]],
			"moderation": [["slow", "kick", "ban"]]
		};
		if (arg == "") {
			emb.setTitle("Help");
			emb.setColor("#581ef7");
			emb.addField("\:100: All", "`-help all`", true);
			emb.addField("\:wrench: Utility", "`-help utility`", true);
			emb.addField("\:smile: Fun", "`-help fun`", true);
			emb.addField("\:keyboard: Text", "`-help text`", true);
			emb.addField("\:scales: Moderation", "`-help moderation`", true);
			msg.channel.send(emb).catch("console.error");
		} else {
			if (!(inp == undefined)) {
				emb.setTitle(prefix + arg + " command help");
				emb.addField("Usage", prefix + inp.help.usage);
				emb.addField("Description", inp.help.desc);
				msg.channel.send(emb);
			} else {
				if (Object.keys(sections).includes(arg)) {
					emb.setTitle(arg + " Commands");
					emb.setColor("#a832a6");
					emb.addField("Commands in **bold**", "Can only be used by admins", false);
					for (let i = 0; i < sections[arg].length; i++) {
						emb.addField("᲼᲼᲼᲼᲼᲼",sections[arg][i],true);
					}
					msg.channel.send(emb).catch("console.error");
				} else {
					msg.channel.send("Invalid command usage! Just do " + prefix + "help");
				}
			}
		}
	},
};