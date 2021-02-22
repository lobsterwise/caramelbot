const inx = require('./../index');
const questionable = require('questionable');
module.exports = {
	name: 'qu',
	help: {
		"usage": "qu `keyword`",
		"desc": "Generates a random question fom a keyword\n`keyword`: The keyword to use"
	},
	cool: 8000,
	execute(msg) {
		const words = ["spicy", "diet", "salty", "sugar-free", "microwaved", "baked", "dehydrated", "boiled", "stirred", "frozen", "chilled", "non-alchoholic", "nut-free", "gluten-free", "solidified",
		"sparkling", "distilled", "purified", "mountain spring", "non-GMO", "sweetened", "raspberry-infused", "blanched", "grilled", "organic", "caffeinated", "smoked", "creamy", "lava-hot", "cheesy",
		"aerated", "vanilla", "decaf", "cheap", "expensive", "fancy", "asbestos"];
		let arg = inx.getAfter(msg.content, 4);
		let choice = words[Math.abs(Math.round(Math.random() * words.length) - 1)];
		questionable(arg, function (err, titles) {
			if (err) throw err;
			let choice2 = Math.abs(Math.round(Math.random() * titles.length) - 1);
			msg.channel.send(titles[choice2] + "?")
		});
	},
};