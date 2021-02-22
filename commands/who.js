const Discord = require('discord.js');
module.exports = {
	name: 'who',
	help: {
		"usage": "who @user",
		"desc": "Tells you information about a user, such as their id and profile picture\n`user`: The user to get info about"
	},
	cool: 8900,
	execute(msg) {
		let user = msg.mentions.users.first();
		let member = msg.mentions.members.first();
		if (!(user == undefined) && msg.channel.type == "text") {
			let cl = new Discord.MessageEmbed();
			cl.setTitle("Who Is:");
			cl.setColor(member.displayHexColor);
			cl.addField(member.displayName, user.tag, false);
			cl.addField("Highest Role: ", member.roles.highest.name, false);
			cl.addField("Created at: ", user.createdAt.toString(), false);
			cl.addField("Joined guild at: ", member.joinedAt.toString(), false);
			cl.addField("ID: ", user.id, false);
			cl.addField("Bot:", user.bot, false);
			let avt = user.avatarURL();
			msg.channel.send(cl);
			msg.channel.send({ files: [avt] })
			.then(ms => {
				if (user.flags.any("HOUSE_BRILLIANCE")) {
					ms.react("750075000781799516");
				}
				if (user.flags.any("HOUSE_BRAVERY")) {
					ms.react("750074760444117083");
				}
				if (user.flags.any("HOUSE_BALANCE")) {
					ms.react("750074887510425601");
				}
				if (user.flags.any("VERIFIED_DEVELOPER")) {
					ms.react("750077845002256464");
				}
			});
		}
	},
};