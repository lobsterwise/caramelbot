const inx = require('./../index');
module.exports = {
	name: 'rate',
	help: {
		"usage": "rate `metric`",
		"desc": "Rates you from 0% to 100% on some metric\n`metric`: The metric to rate you on"
	},
	cool: 6700,
	execute(msg) {
		let choice = Math.random();
		let arg = inx.getAfter(msg.content, 6);
		if (!arg == "") {
			let stchoice = String(choice);
			let fchoice = stchoice.slice(4, 6);
			msg.channel.send("You are \`" + fchoice + "%\` **" + arg + "** \:timer:");
		}
	},
};