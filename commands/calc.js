const inx = require('./../index');
const { evalExpression, tokenize, Token, evalTokens } = require('@hkh12/node-calc');
module.exports = {
	name: 'calc',
	help: {
		"usage": "calc `expression`",
		"desc": "Calculates basic math expressions\n`expression`: The expression for the bot to calculate. Use `*` for multiplication, `/` for division, and `^` for exponents"
	},
	cool: 5600,
	execute(msg) {
		let arg = inx.getAfter(msg.content, 5);
		if (!arg == "" && arg.length < 100) {
			msg.channel.send(evalExpression(arg));
		}
	},
};