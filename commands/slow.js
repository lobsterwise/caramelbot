const inx = require('./../index');
module.exports = {
	name: 'slow',
	help: {
		"usage": "slow `seconds`",
		"desc": "Sets the slowmode of a text channel\n`seconds`: The number of seconds for the slowmode to last"
	},
	cool: 4500,
	execute(msg) {
		let arg = inx.getAfter(msg.content, 6);
		if (!arg == "" && msg.member.permissions.any("MANAGE_CHANNELS")) {
			msg.channel.setRateLimitPerUser(parseInt(arg, 10), msg.author.tag + " set the slowmode for this channel using the slow command from Caramel")
		}
	},
};