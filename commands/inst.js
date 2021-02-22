const inx = require('./../index');
module.exports = {
	name: 'inst',
	help: {
		"usage": "inst `name`",
		"desc": "links to a myinstants file\n`name`: The name of the file"
	},
	cool: 34000,
	execute(msg) {
		let arg = inx.getAfter(msg.content, 6);
		if (!(arg == "") && msg.member.permissions.any("SPEAK")) {
			let sound = "https://myinstants.com/media/sounds/" + arg + ".mp3";
			let voiceChannel = msg.member.voice.channel;
			if (!voiceChannel) {
				return msg.reply('please join a voice channel first!');
			}
			voiceChannel.join().then(connection => {
				let dispatcher = connection.play(sound);
				dispatcher.on('finish', () => voiceChannel.leave());
			});
		}
	},
};