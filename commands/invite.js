module.exports = {
	name: 'invite',
	help: {
		"usage": "invite",
		"desc": "Creates a unique invite link to the server"
	},
	cool: 7000,
	execute(msg) {
		if (msg.member.permissions.any("CREATE_INSTANT_INVITE")) {
			msg.channel.createInvite({ unique: true })
			.then(inv => { msg.channel.send("https://discord.gg/" + inv) });
		}
	},
};