const inx = require('./../index');
module.exports = {
	name: 'yell',
	help: {
		"usage": "yell `text`",
		"desc": "Makes the bot yell text in big letters\n`text`: The text for the bot to yell"
	},
	cool: 8900,
	execute(msg) {
		let arg = inx.getAfter(msg.content, 6);
		if (!arg == "") {
			let conv = {
				"A": "\:regional_indicator_a:",
				"B": "\:regional_indicator_b:",
				"C": "\:regional_indicator_c:",
				"D": "\:regional_indicator_d:",
				"E": "\:regional_indicator_e:",
				"F": "\:regional_indicator_f:",
				"G": "\:regional_indicator_g:",
				"H": "\:regional_indicator_h:",
				"I": "\:regional_indicator_i:",
				"J": "\:regional_indicator_j:",
				"K": "\:regional_indicator_k:",
				"L": "\:regional_indicator_l:",
				"M": "\:regional_indicator_m:",
				"N": "\:regional_indicator_n:",
				"O": "\:regional_indicator_o:",
				"P": "\:regional_indicator_p:",
				"Q": "\:regional_indicator_q:",
				"R": "\:regional_indicator_r:",
				"S": "\:regional_indicator_s:",
				"T": "\:regional_indicator_t:",
				"U": "\:regional_indicator_u:",
				"V": "\:regional_indicator_v:",
				"W": "\:regional_indicator_w:",
				"X": "\:regional_indicator_x:",
				"Y": "\:regional_indicator_y:",
				"Z": "\:regional_indicator_z:"
			};
			let out = "";
			let con = arg.toUpperCase();
			for (let i = 0; i < con.length; i++) {
				if (Object.keys(conv).includes(con[i])) {
					out = out + conv[con[i]];
				} else {
					out = out + con[i];
				}
			}
			msg.channel.send(out);
		}
	},
};