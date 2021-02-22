module.exports = {
	name: 'kick',
	help: {
		"usage": "kick @user",
		"desc": "Kicks a user\n`user`: The member to kick"
	},
	cool: 2300,
	execute(msg) {
		let member = msg.mentions.members.first();
		if (!(member == undefined) && msg.channel.type == "text" && msg.member.permissions.any("KICK_MEMBERS")) {
			if (msg.guild.me.roles.highest.comparePositionTo(member.roles.highest) > 0) {
				member.kick("Banned by " + msg.author.tag + " using Caramel");
			} else {
				msg.channel.send("You must move my role higher than the user you are trying to kick!");
			}
		}
	},
};