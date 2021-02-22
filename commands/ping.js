const inx = require('./../index');
module.exports = {
	name: 'ping',
	help: {
		"usage": "ping",
		"desc": "Tells you the bot's ping"
	},
	cool: 9000,
	execute(msg) {
		msg.channel.send("\`" + inx.client.ws.ping + "\` ms \:satellite:");
	},
};