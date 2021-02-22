const inx = require('./../index');
module.exports = {
	name: 'face',
	help: {
		"usage": "face `type`",
		"desc": "Displays a text face\n`type`: The face for the bot to display. Valid faces are: `lenny`, `bear`, `sparkle`, `fightme`, `glasses`"
	},
	cool: 3000,
	execute(msg) {
		let arg = inx.getAfter(msg.content, 6);
		if (!arg == "") {
			let faces = {
				"bear": "ʕ•ᴥ•ʔ",
				"lenny": "( ͡° ͜ʖ ͡°)",
				"glasses": "(▀̿Ĺ̯▀̿ ̿)",
				"fightme": "(ง ͠° ͟ل͜ ͡°)ง",
				"sparkle": "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ ✧ﾟ･: *ヽ(◕ヮ◕ヽ)",
			};
			if (faces[arg] == null) {
				msg.channel.send("Sorry, that face doesn't exist!");
			} else {
				msg.channel.send(faces[arg]);
			}
		}
	}
};