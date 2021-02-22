module.exports = {
	name: '8ball',
	help: {
		"usage": "8ball",
		"desc": "A magic 8 ball"
	},
	cool: 5000,
	execute(msg) {
		let phrases = ["As I see it, yes", "Ask again later", "Better not tell you now", "Cannot predict now",
		"Concentrate and ask again", "Don\'t count on it", "It is certain", "It is decidedly so", "Most likely", "My reply is no",
		"My sources say no", "Outlook not so good", "Outlook good", "Reply hazy, try again", "Signs point to yes", "Very doubtful",
		"Without a doubt", "Yes", "Yes - definitely", "You may rely on it"];
		let choice = phrases[Math.abs(Math.round(Math.random() * phrases.length) - 1)];
		msg.channel.send("\:8ball: " + choice).catch("console.error");
	},
};