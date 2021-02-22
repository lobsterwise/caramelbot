module.exports = {
	name: 'ban',
	help: {
		"usage": "ban @user",
		"desc": "Bans a user\n`user`: The member to ban"
	},
	cool: 2000,
	execute(msg) {
		let member = msg.mentions.members.first();
		let user = msg.mentions.users.first();
		if (!(member == undefined) && msg.channel.type == "text" && msg.member.permissions.any("BAN_MEMBERS")) {
			if (msg.guild.me.roles.highest.comparePositionTo(member.roles.highest) > 0) {
				msg.guild.members.ban(user, { reason: "Banned by " + msg.author.tag + " using Caramel" });
			} else {
				msg.channel.send("You must move my role higher than the user you are trying to ban!");
			}
		}
	},
};