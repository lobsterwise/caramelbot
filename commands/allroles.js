const Discord = require('discord.js');
module.exports = {
	name: 'allroles',
	help: {
		"usage": "allroles",
		"desc": "Lists all the roles in the guild"
	},
	cool: 54000,
	execute(msg) {
		if (msg.channel.type == "text") {
			let emb = new Discord.MessageEmbed();
			emb.setTitle("Roles for " + msg.guild.name);
			emb.setDescription(msg.guild.roles.cache.size + " roles:");
			msg.guild.roles.cache.each(role => emb.addField(role.name, role.hexColor));
			msg.channel.send(emb);
		}
	},
};