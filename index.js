const Discord = require('discord.js');
const client = new Discord.Client();
//const data = require('data-store')("loganbot");
//const convert = require('color-convert');
const nostra = require('nostra');
const questionable = require('questionable');
const { evalExpression, tokenize, Token, evalTokens } = require('@hkh12/node-calc');
require('dotenv').config()
//const translate = require('translate-google');
//const morse = require('morse');
//const Keyv = require('keyv');
//const keyv = new Keyv('mongodb://cArAmElDbUsEr:thisisatestpasswordfortesting@carameldata-shard-00-00.dsyqd.mongodb.net:27017,carameldata-shard-00-01.dsyqd.mongodb.net:27017,carameldata-shard-00-02.dsyqd.mongodb.net:27017/?replicaSet=atlas-r86oxi-shard-0&ssl=true&tls=true&authSource=admin');
//const ytdl = require('ytdl-core');

function clearCool(user,cmd) {
	cooldowns[user].splice(cooldowns[user].indexOf(cmd), 1);
}

function getArgs(com, comst, sep) {
	let comsnip = com.replace(prefix + comst, "").trim();
	return (comsnip.split(sep));
}
function getAfter(com, start) {
	return (com.slice(start, com.length));
}
function getRawCmd(str) {
	let preclip = str.slice(prefix.length, str.length) + " ";
	let clip = preclip.split(" ");
	return clip[0];
}


client.commands = new Discord.Collection();
const botCommands = require('./commands');
Object.keys(botCommands).map(key => {
	client.commands.set(botCommands[key].name, botCommands[key]);
});

exports.client = client;
exports.getRawCmd = getRawCmd;
exports.getAfter = getAfter;
exports.getArgs = getArgs;
exports.stop = () => {process.exit(0)};

client.on('message', msg => {
	if (msg.content.startsWith(prefix) && msg.author.bot == false) {
		let rawcmd = getRawCmd(msg.content);
		if (client.commands.has(rawcmd)) {
			if (Object.keys(cooldowns).includes(msg.author.id) && !(msg.author.id == "688453570173075534")) {
				if (cooldowns[msg.author.id].includes(rawcmd)) {
					msg.channel.send("Slow down! You have to wait a bit before you can use this command again");
				} else {
					client.commands.get(rawcmd).execute(msg);
					console.log("Command " + rawcmd + " used by " + msg.author.tag);
					cooldowns[msg.author.id].push(rawcmd);
					client.setTimeout(clearCool, client.commands.get(rawcmd).cool, msg.author.id, rawcmd);
				}
			} else {
				client.commands.get(rawcmd).execute(msg);
				console.log("Command " + rawcmd + " used by " + msg.author.tag);
				if (!(msg.author.id == "688453570173075534")) {
					cooldowns[msg.author.id] = [];
					cooldowns[msg.author.id].push(rawcmd);
					client.setTimeout(clearCool, client.commands.get(rawcmd).cool, msg.author.id, rawcmd);
				}
			}
		}
	}
});
prefix = "-";
cooldowns = {};


client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setStatus("online");
	let num = client.guilds.cache.size;
	client.user.setActivity(num + " servers", { type: "WATCHING" });
});
function tokens() {
	testingtoken = process.env.TESTKENDO;
	token = process.env.TOKENDO;
}
tokens();
client.login(testingtoken);

function website() {
	const http = require('http');
	const fs = require('fs');
	http.createServer((req, res) => {
		let responseCode = 404;
		let content = '404 Error';
		let cleanurl = req.url;
		if (req.url.includes('?')) {
			cleanurl = req.url.slice(0, req.url.lastIndexOf('?'));
		}
		let found = false;
		let foundNonIndex = false;
		if (cleanurl === '/') {
			responseCode = 200;
			found = true;
			content = fs.readFileSync('./Website/index.html');
		} else {
			try {
				fs.readFileSync('./Website' + cleanurl + '.html');
				foundNonIndex = true;
				found = true;
			} catch (error) {
				if (error.code === 'ENOENT') {
					console.log('caught :), wrong page');
				} else {
					console.log(error.lineNumber);
					throw error.message;
				}
			}
		}
		if (foundNonIndex) {
			responseCode = 200;
			content = fs.readFileSync('./Website' + cleanurl + '.html');
		}

		res.writeHead(responseCode, {
			'content-type': 'text/html;charset=utf-8',
			'set-cookie': ['test=bar']
		});

		res.write(content);
		res.end();
	})
		.listen(process.env.PORT || 80);
	console.log("Server run");
}
website();