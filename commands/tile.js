const inx = require('./../index');
module.exports = {
	name: 'tile',
	help: {
		"usage": "tile `string`",
		"desc": "Allows you to easily create tiled emoji creations\n`string`: The options for the generator. for each emoji you want to use, just put the emoji name, and do $n for a new line. Example: \"-tile crying thumbsup $n eye\""
	},
	cool: 6000,
	execute(msg) {
		let args = inx.getArgs(msg.content, "tile", " ");
		let out = "";
		if (!args == []) {
			for (let i = 0; i < args.length; i++) {
				if (args[i] == "$n") {
					out = out + "\n";
				} else {
					if (!args[i].match(/-[0-9]/g) == null) {
						let num = args[i][args[i].length - 1];
						let clip = args[i].replace(num, "").replace("-", "");
						for (let a = 0; a < parseInt(num, 10); a++) {
							out = out + "\:" + clip + ":";
						}
					} else {
						out = out + "\:" + args[i] + ":";
					}
				}
			}
			msg.channel.send(out);
		}
	}
};