const inx = require('./../index');
module.exports = {
	name: 'echo',
	help: {
		"usage": "echo `text`",
		"desc": "Will make the bot repeat what you say\n`text`: The text for the bot to repeat"
	},
	cool: 6400,
	execute(msg) {
		let arg = inx.getAfter(msg.content, 6);
		if (!arg == "") {
			msg.delete();
			msg.channel.send(arg);
		}
	},
};