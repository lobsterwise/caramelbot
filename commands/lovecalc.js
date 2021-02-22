module.exports = {
	name: 'lovecalc',
	help: {
		"usage": "lovecalc @user",
		"desc": "Calculates the love between you and another user\n`user`: The user to calculate love with"
	},
	cool: 5400,
	execute(msg) {
		let user = msg.mentions.users.first();
		if (!(user == undefined)) {
			let calc = parseInt(msg.author.id[16] + msg.author.id[17], 10) / 2 + parseInt(user.id[16] + user.id[17], 10) / 2;
			msg.channel.send("Love calc is: " + calc + "%");
		}
	},
};