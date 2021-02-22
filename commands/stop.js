const inx = require('./../index');
module.exports = {
	name: 'stop',
	help: {
		"usage": "stop",
		"desc": "Bot-Owner command"
	},
	cool: 0,
	execute(msg) {
		if (msg.author.id == "688453570173075534") {
			inx.stop();
		}
	},
};