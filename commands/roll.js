const inx = require('./../index');
module.exports = {
	name: 'roll',
	help: {
		"usage": "roll `size`",
		"desc": "Makes the bot roll a die\n`size`: The size of the die. Cannot be larger than 100 million"
	},
	cool: 3400,
	execute(msg) {
		let arg = inx.getAfter(msg.content, 6);
		if (!arg == "") {
			if (arg < 100000000001) {
				let num = Math.round(Math.random() * parseInt(arg, 10));
				msg.channel.send("Rolled a **" + arg + "** sided die and got \`" + num + "\` \:game_die:").catch("console.error");
			} else {
				msg.channel.send("**Die is too big!** Please input a smaller number")
			}
		}
	},
};