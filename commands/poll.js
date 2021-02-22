const Discord = require('discord.js');
const inx = require('./../index');
module.exports = {
	name: 'poll',
	help: {
		"usage": "poll `title`, `time`, `option1`, `option1emoji`, `option2`, `option2emoji`",
		"desc": "Starts a poll\n`title`: The title of the embed\n`time`: The time in seconds for the poll to last\n`option1`, `option2`: The names of the the two options\n`option1emoji`, `option2emoji`: The emojis used to vote"
	},
	cool: 75000,
	execute(msg) {
		let args = inx.getArgs(msg.content, "poll", ", ");
		if (!args == []) {
			let text = args[0];
			let time = args[1];
			let opt1 = args[2];
			let opt1e = args[3];
			let opt2 = args[4];
			let opt2e = args[5];
			let emb = new Discord.MessageEmbed();
			emb.setTitle(text);
			emb.addField(opt1, "React with " + opt1e + " to vote");
			emb.addField(opt2, "React with " + opt2e + " to vote");
			msg.channel.send(emb)
			.then(ms => {
				let filter1 = (reaction) => {
					return reaction.emoji.name === opt1e;
				};
				let filter2 = (reaction) => {
					return reaction.emoji.name === opt2e;
				};
				let sco1 = 0;
				let sco2 = 0;
				let collector1 = ms.createReactionCollector(filter1, { time: parseInt(time * 1000, 10), dispose: true });
				let collector2 = ms.createReactionCollector(filter2, { time: parseInt(time * 1000, 10), dispose: true });
				collector1.on('collect', (reaction, user) => {
					sco1++;
				});
				collector1.on('remove', (reaction, user) => {
					sco1--;
				});
				collector2.on('collect', (reaction, user) => {
					sco2++;
				});
				collector2.on('remove', (reaction, user) => {
					sco2--;
				});
				collector1.on('end', collected => {
					if (sco1 > sco2) {
						ms.channel.send("**" + opt1 + "** won by `" + (sco1 - sco2) + "` votes with a total of `" + sco1 + "` votes!");
					} else {
						if (sco2 > sco1) {
							ms.channel.send("**" + opt2 + "** won by `" + (sco2 - sco1) + "` votes with a total of `" + sco2 + "` votes!");
						} else {
							ms.channel.send("It's a tie! Neither **" + opt1 + "** or **" + opt2 + "** won the vote!");
						}
					}
				});
			});
		}
	},
};