const inx = require('./../index');
const find = require('./../misc/redditfind');
const Discord = require('discord.js');
module.exports = {
    name: 'meme',
    help: {
        "usage": "meme `subreddit`",
        "desc": "Grabs a meme from Reddit\n`subreddit`: The name of the subreddit to fetch from, without the r/"
    },
    cool: 4500,
    execute: async (msg) => {
        let arg = inx.getAfter(msg.content, 6);
        if (!arg == "" && msg.member.permissions.any("ATTACH_FILES")) {
            let data = await find(arg);
            let emb = new Discord.MessageEmbed()
            .setColor("#f54275")
            .setTitle(data.title)
            .setURL('https://reddit.com' + data.permalink)
            .setImage(data.url)
            .setFooter("xd");
            msg.channel.send(emb);
        }
    },
};