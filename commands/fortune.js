const nostra = require('nostra');
module.exports = {
	name: 'fortune',
	help: {
		"usage": "fortune",
		"desc": "Tells your fortune. *ooga booga*"
	},
	cool: 12000,
	execute(msg) {
		msg.channel.send(nostra.generate());
	},
};