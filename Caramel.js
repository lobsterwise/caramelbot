//.load Documents\GitHub\logans-weird-bot\Caramel.js
//node Documents\GitHub\caramel\Caramel.js
/* cd Documents\Caramel\carameldiscord
 * heroku ps -a carameldiscord
 * heroku ps:kill <name of running dyno>
 * git add .
 * git commit -am "commit name"
 * git push heroku master
 * 
 * 
 */
const Discord = require('discord.js');
const client = new Discord.Client();
const sdclient = new Discord.Client();
const data = require('data-store')("loganbot");
const convert = require('color-convert');
const nostra = require('nostra');
const questionable = require('questionable');
const { evalExpression, tokenize, Token, evalTokens } = require('@hkh12/node-calc');
const translate = require('translate-google');
const morse = require('morse');
const Keyv = require('keyv');
const keyv = new Keyv('mongodb://cArAmElDbUsEr:thisisatestpasswordfortesting@carameldata-shard-00-00.dsyqd.mongodb.net:27017,carameldata-shard-00-01.dsyqd.mongodb.net:27017,carameldata-shard-00-02.dsyqd.mongodb.net:27017/?replicaSet=atlas-r86oxi-shard-0&ssl=true&tls=true&authSource=admin');
const ytdl = require('ytdl-core');
//const snoowrap = require('snoowrap');
//const misterSnoo = new snoowrap({
	//userAgent: 'A program used to download stuff from reddit for my discord bot',
	//clientId: 'vyD7iTW-cnZGTQ',
	//clientSecret: 'KcT-B8MVdSwzZapjzKgqTn5RTSQ',
	//refreshToken: '383793899427-gBydcCHfdMaFBm2gmRBl9csBaE8'
//}); 
//rrchance = 6;
prefix = "-";
cooldowns = {};
function clearCool(user,cmd) {
	cooldowns[user].splice(cooldowns[user].indexOf(cmd), 1);
}
class Command {
	constructor(name, disp, fun, helpdata, cool = 100) {
		this.name = name;
		this.disp = disp;
		this.fun = fun;
		this.helpdata = helpdata;
		this.cool = cool;
    }
}
class CommandsCl {
	constructor() {
		this.list = [
			new Command("help", "Help",
				function (msg) {
					let arg = getAfter(msg.content, 5 + prefix.length);
					let inp = commands.getHelpData(arg);
					let emb = new Discord.MessageEmbed();
					let sections = {
						"all": [["pfp", "help", "test", "covid", "ping", "echo", "**stop**", "changelog", "scroll", "rate", "coin", "vaporwave", "8ball", "fidgetspinner", "bottleflip/bf", "inst", "wikihow", "roll", "fortune", "qu", "bubblewrap", "who", "yell"], ["ytlink", "circle", "clap", "google", "embed", "face", "crate", "about", "calc", "typing", "invite", "poll", "servercount", "botinvite", "lovecalc", "slow", "morse", "tile", "allroles"]],
						"fun": [["rate", "coin", "vaporwave", "8ball", "fidgetspinner", "bottleflip/bf", "inst", "wikihow", "roll", "fortune", "qu", "bubblewrap", "circle", "clap", "ytlink", "face", "crate", "typing", "lovecalc", "morse", "tile"]],
						"utility": [["pfp", "help", "test", "covid", "ping", "echo", "**stop**", "changelog", "scroll", "rate", "vaporwave", "roll", "who", "google", "embed", "face", "about", "calc", "invite", "poll", "servercount", "botinvite", "slow", "kick"], ["ban", "allroles"]],
						"text": [["vaporwave", "yell", "morse", "clap"]],
						"moderation": [["slow", "kick", "ban"]]
					};
					if (!(inp == undefined)) {
						emb.setTitle(prefix + arg + " command help");
						emb.addField("Usage", prefix + inp["usage"]);
						emb.addField("Description", inp["desc"]);
						msg.channel.send(emb);
					} else {
						if (arg == "") {
							emb.setTitle("Help");
							emb.setColor("#581ef7");
							emb.addField("\:100: All", "`-help all`", true);
							emb.addField("\:wrench: Utility", "`-help utility`", true);
							emb.addField("\:smile: Fun", "`-help fun`", true);
							emb.addField("\:keyboard: Text", "`-help text`", true);
							emb.addField("\:scales: Moderation", "`-help moderation`", true);
							msg.channel.send(emb).catch("console.error");
						} else {
							if (Object.keys(sections).includes(arg)) {
								emb.setTitle(arg + " Commands");
								emb.setColor("#a832a6");
								emb.addField("Commands in **bold**", "Can only be used by admins", false);
								for (let i = 0; i < sections[arg].length; i++) {
									emb.addField("᲼᲼᲼᲼᲼᲼",sections[arg][i],true);
								}
								msg.channel.send(emb).catch("console.error");
							} else {
								msg.channel.send("Invalid command usage! Just do " + prefix + " help");
                            }
                        }
                    }
				},
				{
					"usage": "help `utility|fun|all`/`command`",
					"desc": "Gives you information about avaliable commands. Can also inform you about a specific command if you type it in"
				}, 2000
			),
			new Command("test", "Test",
				function (msg) {
				msg.channel.send('All systems operational');
				let args = getArgs(msg.content, "test", " ");
				},
				{
					"usage": "test",
					"desc": "Tells you if the bot is working"
				},
			),
			new Command("vaporwave", "Vaporwave",
				function (msg) {
					let arg = getAfter(msg.content, 10);
					if (!arg == "") {
						let out = "";
						for (let i = 0; i < arg.length; i++) {
							out = out + arg[i];
							out = out + " ";
						}
						msg.channel.send(out);
						msg.delete();
					}
				},
				{
					"usage": "vaporwave `text`",
					"desc": "Will make the bot repeat what you say in v a p o r w a v e\n`text`: The text for the bot to vaporize"
				}, 1000
			),
			new Command("coin", "Coin Flip",
				function (msg) {
					let choice = Math.random();
					if (choice > 0.5) {
						msg.channel.send("It's tails!");
					} else {
						msg.channel.send("It's heads!");
					}
				},
				{
					"usage": "coin",
					"desc": "Flips a coin"
				}
			),
			new Command("pfp", "Profile Picture",
				function (msg) {
					let user = msg.mentions.users.first();
					if (!(user == undefined)) {
						let pfp = user.avatarURL();
						msg.channel.send({ files: [pfp] });
					}
				},
				{
					"usage": "pfp @user",
					"desc": "Gets the profile picture of a user\n`user`: The user to fetch the profile picture of"
				}, 4000
			),
			new Command("rate", "Rate",
				function (msg) {
					let choice = Math.random();
					let arg = getAfter(msg.content, 6);
					if (!arg == "") {
						let stchoice = String(choice);
						let fchoice = stchoice.slice(4, 6);
						msg.channel.send("You are \`" + fchoice + "%\` **" + arg + "** \:timer:");
					}
				},
				{
					"usage": "rate `metric`",
					"desc": "Rates you from 0% to 100% on some metric\n`metric`: The metric to rate you on"
				}
			),
			new Command("ping", "Ping",
				function (msg) {
					msg.channel.send("\`" + client.ws.ping + "\` ms \:satellite:");
				},
				{
					"usage": "ping",
					"desc": "Tells you the bot's ping"
				}, 3000
			),
			new Command("8ball", "Magic 8 Ball",
				function (msg) {
					let phrases = ["As I see it, yes", "Ask again later", "Better not tell you now", "Cannot predict now",
						"Concentrate and ask again", "Don\'t count on it", "It is certain", "It is decidedly so", "Most likely", "My reply is no",
						"My sources say no", "Outlook not so good", "Outlook good", "Reply hazy, try again", "Signs point to yes", "Very doubtful",
						"Without a doubt", "Yes", "Yes - definitely", "You may rely on it"];
					let choice = phrases[Math.abs(Math.round(Math.random() * phrases.length) - 1)];
					msg.channel.send("\:8ball: " + choice).catch("console.error");
				},
				{
					"usage": "8ball",
					"desc": "A magic 8 ball"
				}, 1500
			),
			new Command("echo", "Echo",
				function (msg) {
					let arg = getAfter(msg.content, 6);
					if (!arg == "") {
						msg.channel.send(arg);
						msg.delete();
					}
				},
				{
					"usage": "echo `text`",
					"desc": "Will make the bot repeat what you say\n`text`: The text for the bot to repeat"
				}, 2500
			),
			new Command("covid", "COVID-19",
				function (msg) {
					let covmsg = new Discord.MessageEmbed();
					covmsg.setTitle("\:microbe:COVID-19 Rules");
					covmsg.setColor("#32a873");
					covmsg.addField("\`#1:\` Wear a mask when you are in public", "\:mask:", false);
					covmsg.addField("\`#2:\` Stay six feet away from others", "\:person_standing:\:foot:\:foot:\:foot:\:foot:\:foot:\:foot:\:woman_standing:", false);
					covmsg.addField("\`#3:\` Wash your hands frequently", "\:palms_up_together:\:soap:", false).setFooter("Stay safe peeps");
					msg.channel.send(covmsg).catch("console.error");
				},
				{
					"usage": "covid",
					"desc": "Shows guidelines for COVID-19"
				}, 5000
			),
			new Command("fidgetspinner", "Fidget Spinner",
				function (msg) {
					msg.channel.send({
						files: ["https://appstickers-cdn.appadvice.com/1232290671/822597518/eac8c272e23090335809d1236bd9d036-0.gif"]
					});
				},
				{
					"usage": "fidgetspinner",
					"desc": "Creates a fidget spinner for you to spin"
				}, 9000
			),
			new Command("bottleflip", "Bottle Flip",
				function (msg) {
					let choice = Math.random();
					if (choice > 0.70 && choice < 0.89) {
						msg.channel.send("You land the bottle!");
					} else {
						if (choice > 0.89) {
							msg.channel.send("You **cap** the bottle! Wow!");
						} else {
							msg.channel.send("You *fail*");
						}

					}
				},
				{
					"usage": "bottleflip",
					"desc": "flips a bottle; same as bf"
				}, 3000
			),
			new Command("bf", "Bottle Flip",
				function (msg) {
					let choice = Math.random();
					if (choice > 0.70 && choice < 0.89) {
						msg.channel.send("You land the bottle!");
					} else {
						if (choice > 0.89) {
							msg.channel.send("You **cap** the bottle! Wow!");
						} else {
							msg.channel.send("You *fail*");
						}

					}
				},
				{
					"usage": "bf",
					"desc": "flips a bottle; same as bottleflip"
				}, 2000
			),
			new Command("inst", "MyInstant",
				function (msg) {
					let arg = getAfter(msg.content, 6);
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
				{
					"usage": "inst `name`",
					"desc": "links to a myinstants file\n`name`: The name of the file"
				}, 45000
			),
			new Command("wikihow", "Wikihow",
				function (msg) {
					let articles = ["How to Avoid Being Affected by Insulting Commentary", "How to Walk Across the Brooklyn Bridge", "How to Chat",
						"How to Get Rid of the \'deja Vu\' Feeling", "How to Remove Blood from Hardwood Floors", "How to Befriend a Horse", "How to Do Variations of the Powerslam", "How to Go to Bed After Watching a Horror Movie", "How to Be a Contestant on The Price is Right", "How to Play Laser Tag", "How to Compete with Other Lemonade Stands", "How to Make a Wolverine Costume",
						"How to Seduce a Gemini", "How to Meet Donald Trump",
						"How to Tell Your Boyfriend He Needs to See a Dentist",
						"How to Become More Masculine when Feminine",
						"How to Handle a Child\'s Meltdown at the Store",
						"How to Make a Kid\'s Party Fun for Adults",
						"How to Convince your Pet Rock to Get Married", "How to Chew Gum", "How to Cope with a Fear of Tin Foil", "How to Take a Shower", "How to Take a Normal Shower", "How to Take a Shower Smoothly", "How to Be a Mystic",
						"How to Deal With Unruly Guests at Your Wedding", "How to Shoot Like Kevin Durant",
						"How to Have a Pet Cow", "How to Talk Loudly",
						"How to Join the US Secret Service", "How to Act Like You\'re Possessed", "How to Walk", "How to High Five", "How to Read a Book", "How to Make Ice Cubes with an Ice Tray", "How to Apologize to a Cat",
						"How to Sneak Your Cat Into Work", "How to Appreciate Death Metal",
						"How to Make Toast", "How to Know if You Are Drunk", "How to Rip Paper",
						"How to Be Random", "How to Convince Your Parents to Let You Buy a Nice Diary",
						"How to Prevent or Survive a Monkey Attack", "How to Safely Swim with Piranhas", "How to Dance at a Rave", "How to Survive an Encounter with an Ostrich", "How to Be Goth", "How to Be Awkward",
						"How to Cast a Love Spell", "How to Avoid Laughing at Obese Girls", "How to Calculate Pi by Throwing Frozen Hot Dogs",
						"How to Pronounce Meme", "How to Impress Middle School Boys with your Family Guy Knowledge", "How to be Okay with Having a Communist Friend", "How to Become a Bounty Hunter", "How to Mind Your Own Business",
						"How to Manipulate People", "How to Survive After a Shipwreck", "How to Work in Area 51",
						"How to Avoid Griefers in Your House in Minecraft Pocket Edition Lite", "How to Get Other Guys to Stop Staring at Your Pretty Wife",
						"How to Get Your Adult Children to Move Out", "How to Spy on People",
						"How to Use a Webcam to Spy on People", "How to Download Fortnite on Chromebook", "How to Play Papa\'s Pancakeria", "How to Play Papa\'s Wingeria", "How to Make Awesome Burgers on Papa\'s Burgeria", "How to Get 0 Points in Papa\'s Hot Doggeria",
						"How to Play Papa\'s Scooperia on PC or Mac", "How to Hide from a Murderer", "How to Speak Gibberish", "How to Make a Fist", "How to Draw Adolf Hitler", "How to Be a Cowboy",
						"How to Do Spiritual Warfare", "How to Make Fossils", "How to Resolve an Identity Crisis", "How to Install Car Mods in Grand Theft Auto San Andreas", "How to Feel Comfortable in a Swimsuit", "How to Use wikiHow",
						"How to Create your Own Country", "How to Color Chickens", "How to Pretend you are a Werewolf", "How to Get Evidence of Santa Claus", "How to Enjoy the Taste of Water", "How to Pretend you Have Ice Powers", "How to Look Like you are on Drugs", "How to Breathe",
						"How to Act Like a Mermaid at School", "How to Emulate Hannah Montana", "How to Make a Meme", "How to Plan Your Own Funeral", "How to Eat Carrots", "How to Be an Atheist", "How to Start a Preschool", "How to Be Strange", "How to Tell Someone at Work that They Smell Bad",
						"How to Make your own Holy Water", "How to Spot Fake Gucci Glasses", "How to Spot a Fake Gucci Belt",
						"How to Spot a Fake Gucci Bag", "How to Dress Like a Gangsta", "How to Take Care of your Carnival Goldfish", "How to Convince Your Mom to Say Yes",
						"How to Make a Peanut Butter and Jelly Sandwich", "How to Make a Website Using Google Sites",
						"How to Skin a Raccoon", "How to Make a Secret Hideout in your Closet", "How to Sneak Around", "How to Make Beats Like Kanye West",
						"How to Act Shy at School so People will Think You are Cool and You will Be the Best", "How to Appreciate Anime", "How to Keep Your Thoughts Inside Your Head", "How to Go to McDonalds",
						"How to Win an Argument When You Know You are Wrong", "How to Borrow Money From Your Parents Without Permission", "How to Take a Shower With a Lemon", "How to Take a Shower if You Don’t Want to",
						"How to Eat Pizza", "How to Tell Left from Right", "How to Accept that Your Computer is Slow", "How to Feel a Guy’s Muscle Without Looking Gay", "How to Remove Your Own Dental Work", "How to Make a Hamburger ",
						"How to Choose Between Paperback and Hardback Books", "How to Wear Ugg Boots",
						"How to Play Human Tic Tac Toe", "How to Make Your Own Wrestling Ring ", "How to Grow a Quality Medical Marijuana ", "How to Overcome Chatting Addiction ", "How to Make an Anime",
						"How to Build a Big Chest ", "How to Keep a Pet Fly", "How to Get Your Dog Paid TV Appearances", "How to Develop Personality", "How to Remove Blood Stains from Carpet ", "The Best Ways to Test for Asbestos",
						"How to Get a Tough Girl to Like You ", "How to Wear a Beanie ", "How to Stop Peeling Lips",
						"How to Survive Going Through Pregnancy Alone As a Teen", "How to Tape a Broken Pinky Toe",
						"How to Love Your Stuffed Animal ", "How to Hold a Hermit Crab", "How to Be a Popular Tomboy ", "How to Preserve a Severed Limb for Reattachment",
						"How to Cope With a Flirtatious Co Worker", "How to Stop Mouth Breathing",
						"How to Handle Smart People", "How to Spot Signs of Disease in Doves", "How to Get Slime Out of Hair", "How to Cook With Coca Cola", "How to Widen Your Logic and Knowledge",
						"How to Emulate Lana Del Rey", "How to Deal With Relatives You Hate ",
						"How to Meditate in a Labyrinth ", "How to Dress Emo in the Summer",
						"How to Take Group Photos", "How to Love a Married Man", "How to Clean Straw Hats",
						"How to Ask a Girl out in High School if You Are Shy and She Does Not Know You", "How to Take Care of Your Furby ",
						"How to Identify Different Types of Forklifts", "How to Make Fry Bread ", "How to Tell if You Have a Migraine", "How to Accept that Your Crush Doesn\'t Like You",
						"How to Purchase a Gas Station ", "How to Talk Faster ",
						"How to Massage Yourself", "How to Explain Photosynthesis", "How to Disagree With Your Doctor", "How to Use a Gun (Women) ",
						"How to Deal With a Cursing Person", "How to Talk Loudly ", "How to Deal With Bad News",
						"How to Avoid Going Over an Essay Word Limit",
						"How to Tell if Your Cat Is Blind", "How to Catch a Fly With Your Hands", "How to Play the Hunger Games Outdoor Game", "How to Get a Guy You Don\'t Like to Stop Liking You ", "How to Become More Intelligent Than You Are Now",
						"How to Be a Computer Genius", "How to Avoid Being an Obsessive Girlfriend",
						"How to Wash Eyes With Water", "How to Kill Herobrine in Minecraft ", "How to Sell Candy in School", "How to Pick Good Minecraft Servers",
						"How to Encourage Your Baby to Roll", "How to Avoid Skin Problems at Work ", "How to Compliment a Woman ",
						"How to Get Rid of Yellowness in Gray Hair", "How to Recognize Signs of Dyslexia", "How to Play SkyBlock in Minecraft", "How to Keep Discus", "How to Spot a Fake Coach Bag",
						"How to Make Colored Ice ", "How to Stop Finishing Other People\'s Sentences",
						"How to Become a Model if You\'re Short", "How to Find a Cave in Minecraft",
						"How to Get Your Dog to Stop Playing Fetch With You", "How to Determine Correct Primary Colors ",
						"How to Confront a Friend Whose Child Bullies Your Child", "How to Stop Kittens from Crying ",
						"How to Write a Great Christian Song ", "How to Train or Help a Puppy Stop Crying when Locked up or Outside",
						"How to Build an Underground House", "How to Get 360 Waves ",
						"How to Enjoy Your Holiday Alone", "How to Have a Pleasant Facial Expression",
						"How to Be a Modern Hippie", "How to Use Uber with an International Phone",
						"How to Get a Celebrity to Follow You on Twitter", "How to Escape Zombies in Minecraft PE",
						"How to Feed a Baby Pigeon ", "How to Ripen a Cantaloupe ", "How to Resell Dollar Store Goods ", "How to Get over Your Addiction to Mountain Dew", "How to Talk So Teens Will Listen", "How to Win a Nerf War ",
						"How to Cope when Your Teenager Falls in Love", "How to Help a Pecked Chicken with a Wound", "How to Date a Capricorn Man ", "How to Install Adobe Flash Player",
						"How to Dye Fabric With Tea ", "How to Stop Being Manipulative", "How to Help a Dog That May Have Been Poisoned",
						"How to Pretend You Are Not Sick", "How to Draw Squidward from SpongeBob SquarePants", "How to Stop Being Superstitious ",
						"How to Read an Aura ", "How to Get 8 Pack Abs",
						"How to Act Like a Rich Girl ", "How to Develop Telepathy ", "How to Beat Level 77 in Candy Crush Saga", "How to Understand Cockatiel Gestures ", "How to Act Like Jim Halpert ",
						"How to Feel Lucky", "How to Turn On Headlights ", "How to Eat Almonds",
						"How to Become a Psychic Medium", "How to Be Sassy ",
						"How to Quit Smoking Weed", "How to Not Pick a Scab ",
						"How to Be a Kid Actor ", "How to Look Sick with Makeup ",
						"How to Date a Millionaire ", "How to Contact Rihanna", "How to Give Your Hermit Crab a Bath ",
						"How to Travel to Antarctica", "How to Make an Atheist and Theist Relationship Work", "How to Manage a Nerf Team ",
						"How to Do the Russian Squat‐and‐Kick Dance", "How to Do a Scorpion in Cheerleading", "How to Stop Being Mean to People",
						"How to Punch Harder", "How to Make a Bucket Hat ", "How to Remove Eyelash Glue", "How to Communicate with Your Cat", "How to Use a Ruler", "How to Drop Items in Oblivion ",
						"How to Stop Fantasizing", "How to Not Pick a Scab ", "How to Do Toes to Bar ",
						"How to Tell Your Boss You\'ve Made a Major Mistake", "How to Make a Fireball",
						"How to Change Your Name on wikiHow", "How to Make a Calm Down Corner (9 15 Years Old)", "How to Make a Ninja Impact Smoke Bomb ", "How to Be Macho", "How to Use the Ouija Board Safely ", "How to Be Tolerant to People\'s Opinions ", "How to Make a Beaded Lizard",
						"How to Talk Like a Stereotypical New Yorker", "How to Convince Others That You Are Not Shy",
						"How to Hide a Big Nose", "How to Sell Firewood", "How to Be Cunning ", "How to Treat Diarrhea in Doves",
						"How to Take a Leap of Faith ", "How to Eat Like an Olympian ", "How to Win a Game of Clue Without Technically Cheating", "How to Build a Big Sandcastle ",
						"How to Say a Novena to St. Therese the Little Flower", "How to Make a Bouncy Egg ", "How to Show a Girl That You Care (for Guys)",
						"How to Answer the Question “Who Are You”", "How to Melt Nutella",
						"How to Show Chickens ", "How to Protect Yourself After Unknowingly Buying Stolen Property",
						"How to Use Bodywash ", "How to Blow Dry Your Hair Without Getting Damaged", "How to Be Stubborn ", "How to Become Pope ",
						"How to Be a Christian Teen Dealing With Non Christian Friends", "How to Become a Clown", "How to Find a Snail ", "How to Avoid \'New Tank\' Syndrome ",
						"How to Throw a Progressive Dinner Party ", "How to Remove Blood Stains from Wood",
						"How to Melt Coconut Oil", "How to Care for a Toy Poodle",
						"How to Protest Part of Your School\'s Student Code", "How to Sneak a Pad or Tampon to the Bathroom at School",
						"How to Stop Absorbing Other People\'s Emotions", "How to Make Apple Jello Shots"
					]
					let artchoice = articles[Math.abs(Math.round(Math.random() * articles.length) - 1)];
					msg.channel.send(artchoice).catch("console.error");
				},
				{
					"usage": "wikihow",
					"desc": "Gives you a random weird wikiHow article"
				}, 4000
			),
			new Command("roll", "Roll",
				function (msg) {
					let arg = getAfter(msg.content, 6);
					if (!arg == "") {
						if (arg < 100000000001) {
							let num = Math.round(Math.random() * parseInt(arg, 10));
							msg.channel.send("Rolled a **" + arg + "** sided die and got \`" + num + "\` \:game_die:").catch("console.error");
						} else {
							msg.channel.send("**Die is too big!** Please input a smaller number")
						}
					}
				},
				{
					"usage": "roll `size`",
					"desc": "Makes the bot roll a die\n`size`: The size of the die. Cannot be larger than 100 million"
				}, 2000
			),
			new Command("fortune", "Fortune",
				function (msg) {
					msg.channel.send(nostra.generate());
				},
				{
					"usage": "fortune",
					"desc": "Tells your fortune. *ooga booga*"
				}, 12000
			),
			new Command("changelog", "Changelog",
				function (msg) {
					let cl = new Discord.MessageEmbed();
					cl.setTitle("Changelog");
					cl.setColor("#f54275");
					cl.addField("\u2022 Added kick and ban commands", "Some simple moderation commands. Make sure to move Caramel\'s role up", false);
					cl.addField("\u2022 Added allroles command", "Lists all the roles in a guild", false);
					cl.addField("\u2022 Cleaner help", "Help commands now have a better looking layout, and there is now a moderation section", false);
					cl.addField("\u2022 Website!", "We have a website at https://carameldiscord.herokuapp.com", false);
					msg.channel.send(cl);
				},
				{
					"usage": "changelog",
					"desc": "Tells you about recent changes to the bot"
				}, 10000
			),
			new Command("qu", "Question",
				function (msg) {
					const words = ["spicy", "diet", "salty", "sugar-free", "microwaved", "baked", "dehydrated", "boiled", "stirred", "frozen", "chilled", "non-alchoholic", "nut-free", "gluten-free", "solidified",
						"sparkling", "distilled", "purified", "mountain spring", "non-GMO", "sweetened", "raspberry-infused", "blanched", "grilled", "organic", "caffeinated", "smoked", "creamy", "lava-hot", "cheesy",
						"aerated", "vanilla", "decaf", "cheap", "expensive", "fancy", "asbestos"];
					let arg = getAfter(msg.content, 4);
					let choice = words[Math.abs(Math.round(Math.random() * words.length) - 1)];
					questionable(arg, function (err, titles) {
						if (err) throw err;
						let choice2 = Math.abs(Math.round(Math.random() * titles.length) - 1);
						msg.channel.send(titles[choice2] + "?")
					});

				},
				{
					"usage": "qu `keyword`",
					"desc": "Generates a random question fom a keyword\n`keyword`: The keyword to use"
				}, 7000
			),
			new Command("scroll", "Scroll",
				function (msg) {
					let arg = parseInt(getAfter(msg.content, 7), 10);
					if (!(getAfter(msg.content,7) == "") && arg < 6) {
						let out = "";
						out = out + "  |\n";
						for (let i = 0; i < arg - 2; i++) {
							out = out + " |\n";
						}
						out = out + "V";
						msg.channel.send(out);
					}
				},
				{
					"usage": "scroll `lines`",
					"desc": "Scrolls the screen down a specified number of lines\n`lines`: The mumber of lines for the bot to scroll. Must be 5 or less"
				}, 60000
			),
			new Command("bubblewrap", "Bubble Wrap",
				function (msg) {
					let bub = new Discord.MessageEmbed();
					bub.setTitle("Bubblewrap");
					bub.setColor("#03bafc");
					bub.addField("Click to pop", "(||pop||)(||pop||)(||pop||)(||pop||)(||pop||)\n(||pop||)(||pop||)(||pop||)(||pop||)(||pop||)\n(||pop||)(||pop||)(||pop||)(||pop||)(||pop||)\n(||pop||)(||pop||)(||pop||)(||pop||)(||pop||)\n(||pop||)(||pop||)(||pop||)(||pop||)(||pop||)", false);
					msg.channel.send(bub).catch("console.error");
				},
				{
					"usage": "bubblewrap",
					"desc": "Gives you some bubblewrap to pop"
				}, 15000
			),
			new Command("quiz", "Quiz",
				function (msg) {
					let qu = new Discord.MessageEmbed();
					qu.setTitle("What is the capital of Italy?");
					qu.setColor("#03bafc");
					qu.addField("Click on the answer", "-------------", false);
					qu.addField("A: Spain", "||Wrong. The correct answer was B||", false);
					qu.addField("B: Rome", "||Correct!-----------------------------||", false);
					qu.addField("C: Paris", "||Wrong. The correct answer was B||", false);
					qu.addField("D: Trick question: Italy is a capital", "||Wrong. The correct answer was B||", false);
					msg.channel.send(qu);
				},
				{
					"usage": "quiz",
					"desc": "Shows a trivia question. (Currently there is only one question. Count on more in the future)"
				}, 15000
			),
			new Command("who", "Who",
				function (msg) {
					let user = msg.mentions.users.first();
					let member = msg.mentions.members.first();
					if (!(user == undefined) && msg.channel.type == "text") {
						let cl = new Discord.MessageEmbed();
						cl.setTitle("Who Is:");
						cl.setColor(member.displayHexColor);
						cl.addField(member.displayName, user.tag, false);
						cl.addField("Highest Role: ", member.roles.highest.name, false);
						cl.addField("Created at: ", user.createdAt.toString(), false);
						cl.addField("Joined guild at: ", member.joinedAt.toString(), false);
						cl.addField("ID: ", user.id, false);
						cl.addField("Bot:", user.bot, false);
						let avt = user.avatarURL();
						msg.channel.send(cl);
						msg.channel.send({ files: [avt] })
							.then(ms => {
								if (user.flags.any("HOUSE_BRILLIANCE")) {
									ms.react("750075000781799516");
								}
								if (user.flags.any("HOUSE_BRAVERY")) {
									ms.react("750074760444117083");
								}
								if (user.flags.any("HOUSE_BALANCE")) {
									ms.react("750074887510425601");
								}
								if (user.flags.any("VERIFIED_DEVELOPER")) {
									ms.react("750077845002256464");
								}
							});
					}
				},
				{
					"usage": "who @user",
					"desc": "Tells you information about a user, such as their id and profile picture\n`user`: The user to get info about"
				}, 12000
			),
			new Command("yell", "Yell",
				function (msg) {
					let arg = getAfter(msg.content, 6);
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
				{
					"usage": "yell `text`",
					"desc": "Makes the bot yell text in big letters\n`text`: The text for the bot to yell"
				}, 8000
			),
			new Command("clap", "Clap",
				function (msg) {
					let arg = getAfter(msg.content, 6);
					if (!arg == "") {
						msg.channel.send(arg.replace(/ /mg, " \:clap: ") + " \:clap:");
						msg.delete();
					}
				},
				{
					"usage": "clap `text`",
					"desc": "Makes :clap: your :clap: text :clap: have :clap: claps\n`text`: The text for the bot to c l a p"
				}, 2000
			),
			new Command("circle", "Circle",
				function (msg) {
					if (msg.member.permissions.any("MENTION_EVERYONE")) {
						msg.channel.send("\:ok_hand: " + msg.author.username + " now has permission to punch everyone @here in the arm");
					}
				},
				{
					"usage": "circle",
					"desc": "Made you look"
				}, 50000
			),
			new Command("ytlink", "Youtube Link",
				function (msg) {
					msg.channel.send("http://www.latlmes.com/arts/return-of-the-golden-age-of-comics-1");
				},
				{
					"usage": "ytlink",
					"desc": "Links a very interesting video"
				}, 15000
			),
			new Command("embed", "Embed",
				function (msg) {
					let args = getArgs(msg.content, "embed", ",");
					if (!args == []) {
						let emb = new Discord.MessageEmbed();
						emb.setTitle(args[0]);
						emb.setColor(convert.keyword.hex(args[1]));
						for (let i = 2; i < args.length; i = i + 3) {
							emb.addField(args[i], args[i + 1], args[i + 2] == "true");
						}
						msg.channel.send(emb);
						msg.delete();
					}
				},
				{
					"usage": "embed `title`,`color`,`header1`,`description1`,`header2`,`description2`...",
					"desc": "Used to create an embed message\n`title`: The title of the embed\n`color`: The color of the embed. Use any simple color name, in lowercase\n`header1` and `description1`: The header and description of a section of the embed. Can go on infinitely"
				}, 25000
			),
			new Command("google", "Google",
				function (msg) {
					let arg = getAfter(msg.content, 8);
					if (!arg == "") {
						msg.channel.send("https://www.google.com/search?q=" + arg);
					}
				},
				{
					"usage": "google `search`",
					"desc": "Gives you a link to a google search\n`text`: The term that the bot should search for"
				}, 1000
			),
			new Command("enchant", "Enchant",
				function (msg) {
					let arg = getAfter(msg.content, 9);
					if (!arg == "") {
						let conv = {
							"A": "ᔑ",
							"B": "ʖ",
							"C": "ᓵ",
							"D": "↸",
							"E": "ᒷ",
							"F": "⎓",
							"G": "⊣",
							"H": "⍑",
							"I": "╎",
							"J": "⋮",
							"K": "ꖌ",
							"L": "ꖎ",
							"M": "ᒲ",
							"N": "リ",
							"O": "𝙹",
							"P": "!¡",
							"Q": "ᑑ",
							"R": "∷",
							"S": "ᓭ",
							"T": "ℸ",
							"U": "⚍",
							"V": "⍊",
							"W": "∴",
							"X": "/",
							"Y": "||",
							"Z": "⨅"
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
				{
					"usage": "enchant `text`",
					"desc": "Enchants text\n`text`: The text to enchant"
				}, 2500
			),
			new Command("about", "About",
				function (msg) {
					let cl = new Discord.MessageEmbed();
					cl.setTitle("About **Caramel**");
					cl.setColor("#f54275");
					cl.addField("What", "Caramel is a bot for Discord that adds a ton of useful and fun commands for you to use", false);
					cl.addField("Who", "The bot was created by <@688453570173075534>", false);
					cl.addField("Why", "Just a fun project for me and a useful bot for you", false);
					cl.addField("How", "Use the `" + prefix + "help` command to get info on the commands avaliable", false);
					cl.setFooter("Use `" + prefix + "help`")
					msg.channel.send(cl);
				},
				{
					"usage": "about",
					"desc": "Tells you about the bot"
				}, 4500
			),
			new Command("calc", "Calculate",
				function (msg) {
					let arg = getAfter(msg.content, 5);
					if (!arg == "") {
						msg.channel.send(evalExpression(arg));
					}
				},
				{
					"usage": "calc `expression`",
					"desc": "Calculates basic math expressions\n`expression`: The expression for the bot to calculate. Use `*` for multiplication, `/` for division, and `^` for exponents"
				}, 7000
			),
			new Command("face", "Face",
				function (msg) {
					let arg = getAfter(msg.content, 6);
					if (!arg == "") {
						let faces = {
							"bear": "ʕ•ᴥ•ʔ",
							"lenny": "( ͡° ͜ʖ ͡°)",
							"glasses": "(▀̿Ĺ̯▀̿ ̿)",
							"fightme": "(ง ͠° ͟ل͜ ͡°)ง",
							"sparkle": "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ ✧ﾟ･: *ヽ(◕ヮ◕ヽ)",
						};
						if (faces[arg] == null) {
							msg.channel.send("Sorry, that face doesn't exist!");
						} else {
							msg.channel.send(faces[arg]);
						}
					}
				},
				{
					"usage": "face `type`",
					"desc": "Displays a text face\n`type`: The face for the bot to display. Valid faces are: `lenny`, `bear`, `sparkle`, `fightme`, `glasses`"
				}, 4000
			),
			new Command("crate", "Crate",
				function (msg) {
					const loot = ["\:key: Key to your neighbor\'s house", "Rusty nail", "\:blue_book: Sports Magazine", "\:pick: Diamond Pickaxe", "\:egg: Omelette"];
					let lootchoice = loot[Math.abs(Math.round(Math.random() * loot.length) - 1)];
					msg.channel.send("You found a **" + lootchoice + "**");
				},
				{
					"usage": "crate",
					"desc": "Gives you some random loot. Completely cosmetic"
				}, 3000
			),
			new Command("typing", "Typing",
				function (msg) {
					if (msg.member.permissions.any("MANAGE_CHANNELS")) {
						if (msg.channel.typing == false) {
							msg.channel.startTyping();
						} else {
							msg.channel.stopTyping(true);
						}
					}
				},
				{
					"usage": "typing",
					"desc": "Makes Caramel start or stop typing in the current channel"
				}, 35000
			),
			new Command("invite", "Invite",
				function (msg) {
					if (msg.member.permissions.any("CREATE_INSTANT_INVITE")) {
						msg.channel.createInvite({ unique: true })
							.then(inv => { msg.channel.send("https://discord.gg/" + inv) });
					}
				},
				{
					"usage": "invite",
					"desc": "Creates a unique invite link to the server"
				}, 15000
			),
			new Command("botinvite", "Bot Invite",
				function (msg) {
					msg.channel.send("https://discord.com/api/oauth2/authorize?client_id=736241828164141076&permissions=8&scope=bot");
				},
				{
					"usage": "botinvite",
					"desc": "Gives you the invite link for the bot"
				}, 6000
			),
			new Command("servercount", "Server Count",
				function (msg) {
					msg.channel.send(client.guilds.cache.size);
					let num = client.guilds.cache.size;
					client.user.setActivity(num + " servers", { type: "WATCHING" });
				},
				{
					"usage": "servercount",
					"desc": "Tells you how many servers Caramel is actively in"
				}, 10000
			),
			new Command("timewaster", "Time Waster",
				function (msg) {
					let bub = new Discord.MessageEmbed();
					bub.setTitle("Time Waster");
					bub.setColor("#03bafc");
					bub.addField("Click them all, I dare you", "||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||\n||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||\n||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||\n||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||\n", false);
					msg.channel.send(bub).catch("console.error");
				},
				{
					"usage": "timewaster",
					"desc": "Are you really gonna click them all?"
				}, 7000
			),
			new Command("lovecalc", "Love Calculate",
				function (msg) {
					let user = msg.mentions.users.first();
					if (!(user == undefined)) {
						let calc = Math.round((parseInt(msg.author.id, 10) + parseInt(user.id, 10)) / 999999999999999999 * 75);
						msg.channel.send("Love calc is: " + calc + "%");
					}
				},
				{
					"usage": "lovecalc @user",
					"desc": "Calculates the love between you and another user\n`user`: The user to calculate love with"
				}, 7000
			),
			new Command("slow", "Slow",
				function (msg) {
					let arg = getAfter(msg.content, 6);
					if (!arg == "" && msg.member.permissions.any("MANAGE_CHANNELS")) {
						msg.channel.setRateLimitPerUser(parseInt(arg, 10), msg.author.tag + " set the slowmode for this channel using the slow command from Caramel")
					}
				},
				{
					"usage": "slow `seconds`",
					"desc": "Sets the slowmode of a text channel\n`seconds`: The number of seconds for the slowmode to last"
				}, 3000
			),
			new Command("morse", "Morse",
				function (msg) {
					let arg = getAfter(msg.content, 7);
					if (!arg == "") {
						msg.channel.send(morse.encode(arg) + " || " + msg.author.tag);
						msg.delete();
					}
				},
				{
					"usage": "morse `text`",
					"desc": "Converts text to morse code\n`text`: The text to convert"
				}, 2000
			),
			new Command("tile", "Tile",
				function (msg) {
					let args = getArgs(msg.content, "tile", " ");
					let out = "";
					if (!args == []) {
						for (let i = 0; i < args.length; i++) {
							if (args[i] == "$n") {
								out = out + "\n";
							} else {
								if (!args[i].match(/-[0-9]/g) == null) {
									let num = args[i][args[i].length - 1];
									let clip = args[i].replace(num, "").replace("-", "");
									for (let a = 0; a < parseInt(num, 10); a++) {
										out = out + "\:" + clip + ":";
									}
								} else {
									out = out + "\:" + args[i] + ":";
								}
							}
						}
						msg.channel.send(out);
					}
				},
				{
					"usage": "tile `string`",
					"desc": "Allows you to easily create tiled emoji creations\n`string`: The options for the generator. for each emoji you want to use, just put the emoji name, and do $n for a new line. Example: \"-tile crying thumbsup $n eye\""
				}, 35000
			),
			new Command("poll", "Poll",
				function (msg) {
					let args = getArgs(msg.content, "vote", ",");
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
						let mess = "boop";
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
				{
					"usage": "poll `title`,`time`,`option1`,`option1emoji`,`option2`,`option2emoji`",
					"desc": "Starts a poll\n`title`: The title of the embed\n`time`: The time in seconds for the poll to last\n`option1`,`option2`: The names of the the two options\n`option1emoji`,`option2emoji`: The emojis used to vote"
				}, 120000
			),
			new Command("stop", "Stop",
				function (msg) {
					if (msg.author.id == "688453570173075534") {
						process.exit(0);
                    }
				},
				{
					"usage": "stop",
					"desc": "Bot-Owner command"
				}, 
			),
			new Command("bbcode", "BB Code",
				function (msg) {
					let arg = getAfter(msg.content, 8);
					if (!arg == "") {
						let escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
						let conv = {
							"[b]": "**",
							"[/b]": "**",
							"[i]": "*",
							"[/i]": "*",
							"[u]": "__",
							"[/u]": "__",
							"[s]": "~~",
							"[/s]": "~~",
							"[quote]": "> ",
							"[/quote]": "",
							"[spoiler]": "||",
							"[/spoiler]": "||",
							"[url]": "",
							"[/url]": "",
							"[code]": "```",
							"[/code]": "```"
						};
						let con = arg.toLowerCase();
						for (let i = 0; i < Object.keys(conv).length; i++) {
							console.log(new RegExp(Object.keys(conv)[i].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
							con.replace(new RegExp(Object.keys(conv)[i].replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),"imgu"), conv[i]);
						}
						msg.channel.send(con);
					}
				},
				{
					"usage": "bbcode `text`",
					"desc": "Translates BB Code into markdown for Discord. Go to https://www.bbcode.org/reference.php \n`text`: The BB Code text"
				}, 2500
			),
			new Command("kick", "Kick",
				function (msg) {
					let member = msg.mentions.members.first();
					if (!(member == undefined) && msg.channel.type == "text" && msg.member.permissions.any("KICK_MEMBERS")) {
						if (msg.guild.me.roles.highest.comparePositionTo(member.roles.highest) > 0) {
							member.kick("Banned by " + msg.author.tag + " using Caramel");
						} else {
							msg.channel.send("You must move my role higher than the user you are trying to kick!");
                        }
					}
				},
				{
					"usage": "kick @user",
					"desc": "Kicks a user\n`user`: The member to kick"
				}, 500
			),
			new Command("ban", "Ban",
				function (msg) {
					let member = msg.mentions.members.first();
					let user = msg.mentions.users.first();
					if (!(member == undefined) && msg.channel.type == "text" && msg.member.permissions.any("BAN_MEMBERS")) {
						if (msg.guild.me.roles.highest.comparePositionTo(member.roles.highest) > 0) {
							msg.guild.members.ban(user, { reason: "Banned by " + msg.author.tag + " using Caramel" });
						} else {
							msg.channel.send("You must move my role higher than the user you are trying to ban!");
						}
					}
				},
				{
					"usage": "ban @user",
					"desc": "Bans a user\n`user`: The member to ban"
				}, 500
			),
			new Command("allroles", "All Roles",
				function (msg) {
					if (msg.channel.type == "text") {
						let emb = new Discord.MessageEmbed();
						emb.setTitle("Roles for " + msg.guild.name);
						emb.setDescription(msg.guild.roles.cache.size + " roles:");
						msg.guild.roles.cache.each(role => emb.addField(role.name, role.hexColor));
						msg.channel.send(emb);
					}
				},
				{
					"usage": "allroles",
					"desc": "Lists all the roles in the guild"
				}, 10000
			),
			new Command("guilds", "Guilds",
				function (msg) {
					if (msg.author.id == "688453570173075534") {
						client.guilds.cache.each(user => msg.channel.send(user.name).catch(console.log('ok')));
                    }
				},
				{
					"usage": "guilds",
					"desc": "Bot-Owner command"
				}, 
			),
		];
	}
	getRawCmd(str) {
		let preclip = str.slice(prefix.length, str.length) + " ";
		let clip = preclip.split(" ");
		return clip[0];
	}
	run(name, msg) {
		let get = "";
		this.list.forEach(function (cmd) {
			if (cmd.name == name) {
				get = cmd;
			}
		});
		get.fun(msg);
	}
	getHelpData(name) {
		let get = [];
		this.list.forEach(function (cmd) {
			get.push(cmd.name);
		});
		if (get.includes(name)) {
			this.list.forEach(function (cmd) {
				if (cmd.name == name) {
					get = cmd;
				}
			});
			return get.helpdata;
		} else {
			return undefined;
        }
	}
	getCooldown(name) {
		let get = [];
		this.list.forEach(function (cmd) {
			get.push(cmd.name);
		});
		if (get.includes(name)) {
			this.list.forEach(function (cmd) {
				if (cmd.name == name) {
					get = cmd;
				}
			});
			return get.cool;
		} else {
			return undefined;
		}
	}
	isCmd(raw) {
		let get = [];
		this.list.forEach(function (cmd) {
			get.push(cmd.name);
		});
		return get.includes(raw);
    }
} 
commands = new CommandsCl();       
function getArgs(com, comst, sep) {
	let comsnip = com.replace(prefix + comst, "").trim();
	return (comsnip.split(sep));
}
function getAfter(com, start) {
	return (com.slice(start, com.length));
}
function cmdmsg(msg) {
	msg.channel.send("Incorrect command usage!");
}
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setStatus("online");
	let num = client.guilds.cache.size;
	client.user.setActivity(num + " servers", { type: "WATCHING" });
});
client.on('message', msg => {
	if (msg.content.startsWith(prefix) && msg.author.bot == false) {
		let rawcmd = commands.getRawCmd(msg.content);
		if (commands.isCmd(rawcmd)) {
			if (Object.keys(cooldowns).includes(msg.author.id) && !(msg.author.id == "688453570173075534")) {
				if (cooldowns[msg.author.id].includes(rawcmd)) {
					msg.channel.send("Slow down! You have to wait a bit before you can use this command again");
				} else {
					commands.run(rawcmd, msg);
					console.log("Command " + rawcmd + " used by " + msg.author.tag);
					cooldowns[msg.author.id].push(rawcmd);
					client.setTimeout(clearCool, commands.getCooldown(rawcmd), msg.author.id, rawcmd);
				}
			} else {
				commands.run(rawcmd, msg);
				console.log("Command " + rawcmd + " used by " + msg.author.tag);
				if (!(msg.author.id == "688453570173075534")) {
					cooldowns[msg.author.id] = [];
					cooldowns[msg.author.id].push(rawcmd);
					client.setTimeout(clearCool, commands.getCooldown(rawcmd), msg.author.id, rawcmd);
				}
			}
		}
	}
	if (!(msg.reference == null) && msg.content.includes(prefix + "save")) {
		msg.channel.messages.fetch(msg.reference.messageID)
			.then(mess => {
				mess.author.dmChannel.send(mess.author.name + " says " + mess.content);
			});
    }
});
function dummy() {
	if (msg.content.startsWith(prefix + 'test')) {
		msg.channel.send('All systems operational');
		let args = getArgs(msg.content, "test", " ");
		console.log(args);
		console.log(data.get("helpdata"));
	}//doc
	if (msg.content.startsWith(prefix + 'vaporwave')) {
		let arg = getAfter(msg.content, 10);
		if (!arg == "") {
			let out = "";
			for (i = 0; i < arg.length; i++) {
				out = out + arg[i];
				out = out + " ";
			}
			msg.channel.send(out);
			msg.delete();
		}
	}//doc
	if (msg.content.startsWith(prefix + 'coin')) {
		let choice = Math.random();
		if (choice > 0.5) {
			msg.channel.send("It's tails!");
		} else {
			msg.channel.send("It's heads!");
		}
	}//doc
	if (msg.content.startsWith(prefix + 'pfp')) {
		let user = msg.mentions.users.first();
		if (!(user == undefined)) {
			let pfp = user.avatarURL();
			msg.channel.send({ files: [pfp] });
		}
	}//doc
	if (msg.content.startsWith(prefix + 'rate')) {
		let choice = Math.random();
		let arg = getAfter(msg.content, 6);
		if (!arg == "") {
			let stchoice = String(choice);
			fchoice = stchoice.slice(4, 6);
			msg.channel.send("You are \`" + fchoice + "%\` **" + arg + "** \:timer:");
		}
	}//doc
	if (msg.content.startsWith(prefix + 'lorem')) {
		msg.channel.send("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ornare sapien non eros pulvinar, a gravida ligula interdum. Nunc sapien nunc, egestas non pulvinar sed, iaculis a neque. Ut varius eget nisl quis ultrices. Morbi aliquet justo et consectetur vehicula.");
	}//doc
	if (msg.content == prefix + 'help') { //basic help command
		helpmsg = new Discord.MessageEmbed();
		helpmsg.setTitle("Help");
		helpmsg.setColor("#581ef7");
		helpmsg.addField("\:wrench: Utility", "`-help utility`", true);
		helpmsg.addField("\:smile: Fun", "`-help fun`", true);
		helpmsg.addField("\:100: All", "`-help all`", true).setFooter("very cool");
		msg.channel.send(helpmsg).catch("console.error");
	}//doc
	if (msg.content === prefix + 'help fun') { //fun help command
		helpmsgfun = new Discord.MessageEmbed();
		helpmsgfun.setTitle("Fun Commands");
		helpmsgfun.setColor("#eb8015");
		helpmsgfun.addField("\:smile:", "`rate`,`lorem`,`coin`,`vaporwave`,`8ball`,`magictrick`,`fidgetspinner`,`bottleflip/bf`,`inst`,`count`,`wikihow`,`roll`,`fortune`,`qu`,`quiz`,`bubblewrap`,`lmeow`,`scream`,`circle`,`clap`,`ytlink`,`barrelroll`,`face`,`crate`,`typing`,`lovecalc`,`morse`,`tile`", true);
		msg.channel.send(helpmsgfun).catch("console.error");
	}//doc
	if (msg.content === prefix + 'help utility') { //info help command
		helpmsginf = new Discord.MessageEmbed();
		helpmsginf.setTitle("Utility Commands");
		helpmsginf.setColor("#a832a6");
		helpmsginf.addField("Commands in **bold**", "Can only be used by admins", false);
		helpmsginf.addField("\:wrench:", "`pfp`,`help`,`test`,`covid`,`ping`,`echo`,`statusannounce`,`censor`,`blockquote/bq`,**stop**,`feedback`,`changelog`,`scroll`,`reveal`,`who`,`yell`,`google`,`embed`,`note`,`about`,`calc`,`invite`,`vote`,`servercount`,`botinvite`,`text`,`slow`", true);
		msg.channel.send(helpmsginf).catch("console.error");
	}//doc
	if (msg.content === prefix + 'help all') { //info help command
		helpmsginf = new Discord.MessageEmbed();
		helpmsginf.setTitle("All Commands");
		helpmsginf.setColor("#a832a6");
		helpmsginf.addField("Commands in **bold**", "Can only be used by admins", false);
		helpmsginf.addField("\:wrench:", "`pfp`,`help`,`test`,`covid`,`ping`,`echo`,`statusannounce`,`censor`,`blockquote/bq`,**stop**,`feedback`,`changelog`,`scroll`,`reveal`,`rate`,`lorem`,`coin`,`vaporwave`,`8ball`,`magictrick`,`fidgetspinner`,`bottleflip/bf`,`inst`,`count`,`wikihow`,`roll`,`fortune`,`qu`,`quiz`,`bubblewrap`,`lmeow`,`who`,`yell`,`scream`,`ytlink`,`circle`,`clap`,`google`,`embed`,`barrelroll`,`face`,`crate`,`note`,`about`,`calc`,`typing`,`invite`,`vote`,`servercount`,`botinvite`,`text`,`lovecalc`,`slow`,`morse`,`tile`", true);
		msg.channel.send(helpmsginf).catch("console.error");
	}//doc
	if (msg.content.startsWith(prefix + 'ping')) {
		msg.channel.send("\`" + client.ws.ping + "\` ms \:satellite:");
	}//doc
	if (msg.content.startsWith(prefix + 'censor')) {
		let arg = getAfter(msg.content, 7);
		if (!arg == "") {
			ps1 = arg.replace(/heck/img, "%@^&");
			ps2 = ps1.replace(/frick/img, "&!#$%");
			ps3 = ps2.replace(/darn/img, "$^!!");
			msg.channel.send(ps3);
		}
	}//doc
	if (msg.content.startsWith(prefix + '8ball')) { //fun command for a random type of estice water
		let phrases = ["As I see it, yes", "Ask again later", "Better not tell you now", "Cannot predict now",
			"Concentrate and ask again", "Don\'t count on it", "It is certain", "It is decidedly so", "Most likely", "My reply is no",
			"My sources say no", "Outlook not so good", "Outlook good", "Reply hazy, try again", "Signs point to yes", "Very doubtful",
			"Without a doubt", "Yes", "Yes - definitely", "You may rely on it"];
		choice = phrases[Math.abs(Math.round(Math.random() * phrases.length) - 1)];
		msg.channel.send("\:8ball: " + choice).catch("console.error");
	}//doc
	if (msg.content.startsWith(prefix + 'echo')) {
		let arg = getAfter(msg.content, 6);
		if (!arg == "") {
			msg.channel.send(arg);
			msg.delete();
		}
	}//doc
	if (msg.content.startsWith(prefix + 'magictrick')) {
		chan = msg.channel;
		msg.delete();
		chan.send("\:cloud:*Poof!* Your message vanished! \:tophat:");
	}//doc
	if (msg.content.startsWith(prefix + 'covid')) {
		covmsg = new Discord.MessageEmbed();
		covmsg.setTitle("\:microbe:COVID-19 Rules");
		covmsg.setColor("#32a873");
		covmsg.addField("\`#1:\` Wear a mask when you are in public", "\:mask:", false);
		covmsg.addField("\`#2:\` Stay six feet away from others", "\:person_standing:\:foot:\:foot:\:foot:\:foot:\:foot:\:foot:\:woman_standing:", false);
		covmsg.addField("\`#3:\` Wash your hands frequently", "\:palms_up_together:\:soap:", false).setFooter("Stay safe peeps");
		msg.channel.send(covmsg).catch("console.error");
	}//doc
	if (msg.content.startsWith(prefix + 'blockquote')) {
		let arg = getAfter(msg.content, 11);
		if (!arg == "") {
			msg.channel.send(">>> " + arg);
		}
	}//doc
	if (msg.content.startsWith(prefix + 'bq')) {
		let arg = getAfter(msg.content, 3);
		if (!arg == "") {
			msg.channel.send(">>> " + arg);
		}
	}//doc
	if (msg.content.startsWith(prefix + 'fidgetspinner')) {
		msg.channel.send({
			files: ["https://appstickers-cdn.appadvice.com/1232290671/822597518/eac8c272e23090335809d1236bd9d036-0.gif"]
		});
	}//doc
	if (msg.content.startsWith(prefix + 'bottleflip')) {
		let choice = Math.random();
		if (choice > 0.70 && choice < 0.89) {
			msg.channel.send("You land the bottle!");
		} else {
			if (choice > 0.89) {
				msg.channel.send("You **cap** the bottle! Wow!");
			} else {
				msg.channel.send("You *fail*");
			}

		}
	}//doc
	if (msg.content.startsWith(prefix + 'bf')) {
		let choice = Math.random();
		if (choice > 0.70 && choice < 0.95) {
			msg.channel.send("You land the bottle!");
		} else {
			if (choice > 0.95) {
				msg.channel.send("You **cap** the bottle! Wow!");
			} else {
				msg.channel.send("You *fail*");
			}

		}
	}//doc
	if (msg.content.startsWith(prefix + 'inst')) {
		let arg = getAfter(msg.content, 6);
		if (!arg == "") {
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
	}//doc
	if (msg.content.startsWith(prefix + 'feedback12345654653')) {
		let arg = getAfter(msg.content, 10);
		if (!arg == "") {
			data.set("feedback", data.get("feedback") + arg);
			msg.channel.send("**Feedback saved.** Thanks for helping to make this bot better! \:ballot_box:");
		}
	}//doc
	if (msg.content.startsWith(prefix + 'count1234567876567')) {
		data.set("counter", data.get("counter") + 1);
		msg.channel.send("The counter is now at \`" + data.get("counter") + "\`");
		msg.delete();
	}//doc
	if (msg.content.startsWith(prefix + 'wikihow')) {
		const articles = ["How to Avoid Being Affected by Insulting Commentary", "How to Walk Across the Brooklyn Bridge", "How to Chat",
			"How to Get Rid of the \'deja Vu\' Feeling", "How to Remove Blood from Hardwood Floors", "How to Befriend a Horse", "How to Do Variations of the Powerslam", "How to Go to Bed After Watching a Horror Movie", "How to Be a Contestant on The Price is Right", "How to Play Laser Tag", "How to Compete with Other Lemonade Stands", "How to Make a Wolverine Costume",
			"How to Seduce a Gemini", "How to Meet Donald Trump",
			"How to Tell Your Boyfriend He Needs to See a Dentist",
			"How to Become More Masculine when Feminine",
			"How to Handle a Child\'s Meltdown at the Store",
			"How to Make a Kid\'s Party Fun for Adults",
			"How to Convince your Pet Rock to Get Married", "How to Chew Gum", "How to Cope with a Fear of Tin Foil", "How to Take a Shower", "How to Take a Normal Shower", "How to Take a Shower Smoothly", "How to Be a Mystic",
			"How to Deal With Unruly Guests at Your Wedding", "How to Shoot Like Kevin Durant",
			"How to Have a Pet Cow", "How to Talk Loudly",
			"How to Join the US Secret Service", "How to Act Like You\'re Possessed", "How to Walk", "How to High Five", "How to Read a Book", "How to Make Ice Cubes with an Ice Tray", "How to Apologize to a Cat",
			"How to Sneak Your Cat Into Work", "How to Appreciate Death Metal",
			"How to Make Toast", "How to Know if You Are Drunk", "How to Rip Paper",
			"How to Be Random", "How to Convince Your Parents to Let You Buy a Nice Diary",
			"How to Prevent or Survive a Monkey Attack", "How to Safely Swim with Piranhas", "How to Dance at a Rave", "How to Survive an Encounter with an Ostrich", "How to Be Goth", "How to Be Awkward",
			"How to Cast a Love Spell", "How to Avoid Laughing at Obese Girls", "How to Calculate Pi by Throwing Frozen Hot Dogs",
			"How to Pronounce Meme", "How to Impress Middle School Boys with your Family Guy Knowledge", "How to be Okay with Having a Communist Friend", "How to Become a Bounty Hunter", "How to Mind Your Own Business",
			"How to Manipulate People", "How to Survive After a Shipwreck", "How to Work in Area 51",
			"How to Avoid Griefers in Your House in Minecraft Pocket Edition Lite", "How to Get Other Guys to Stop Staring at Your Pretty Wife",
			"How to Get Your Adult Children to Move Out", "How to Spy on People",
			"How to Use a Webcam to Spy on People", "How to Download Fortnite on Chromebook", "How to Play Papa\'s Pancakeria", "How to Play Papa\'s Wingeria", "How to Make Awesome Burgers on Papa\'s Burgeria", "How to Get 0 Points in Papa\'s Hot Doggeria",
			"How to Play Papa\'s Scooperia on PC or Mac", "How to Hide from a Murderer", "How to Speak Gibberish", "How to Make a Fist", "How to Draw Adolf Hitler", "How to Be a Cowboy",
			"How to Do Spiritual Warfare", "How to Make Fossils", "How to Resolve an Identity Crisis", "How to Install Car Mods in Grand Theft Auto San Andreas", "How to Feel Comfortable in a Swimsuit", "How to Use wikiHow",
			"How to Create your Own Country", "How to Color Chickens", "How to Pretend you are a Werewolf", "How to Get Evidence of Santa Claus", "How to Enjoy the Taste of Water", "How to Pretend you Have Ice Powers", "How to Look Like you are on Drugs", "How to Breathe",
			"How to Act Like a Mermaid at School", "How to Emulate Hannah Montana", "How to Make a Meme", "How to Plan Your Own Funeral", "How to Eat Carrots", "How to Be an Atheist", "How to Start a Preschool", "How to Be Strange", "How to Tell Someone at Work that They Smell Bad",
			"How to Make your own Holy Water", "How to Spot Fake Gucci Glasses", "How to Spot a Fake Gucci Belt",
			"How to Spot a Fake Gucci Bag", "How to Dress Like a Gangsta", "How to Take Care of your Carnival Goldfish", "How to Convince Your Mom to Say Yes",
			"How to Make a Peanut Butter and Jelly Sandwich", "How to Make a Website Using Google Sites",
			"How to Skin a Raccoon", "How to Make a Secret Hideout in your Closet", "How to Sneak Around", "How to Make Beats Like Kanye West",
			"How to Act Shy at School so People will Think You are Cool and You will Be the Best", "How to Appreciate Anime", "How to Keep Your Thoughts Inside Your Head", "How to Go to McDonalds",
			"How to Win an Argument When You Know You are Wrong", "How to Borrow Money From Your Parents Without Permission", "How to Take a Shower With a Lemon", "How to Take a Shower if You Don’t Want to",
			"How to Eat Pizza", "How to Tell Left from Right", "How to Accept that Your Computer is Slow", "How to Feel a Guy’s Muscle Without Looking Gay", "How to Remove Your Own Dental Work", "How to Make a Hamburger ",
			"How to Choose Between Paperback and Hardback Books", "How to Wear Ugg Boots",
			"How to Play Human Tic Tac Toe", "How to Make Your Own Wrestling Ring ", "How to Grow a Quality Medical Marijuana ", "How to Overcome Chatting Addiction ", "How to Make an Anime",
			"How to Build a Big Chest ", "How to Keep a Pet Fly", "How to Get Your Dog Paid TV Appearances", "How to Develop Personality", "How to Remove Blood Stains from Carpet ", "The Best Ways to Test for Asbestos",
			"How to Get a Tough Girl to Like You ", "How to Wear a Beanie ", "How to Stop Peeling Lips",
			"How to Survive Going Through Pregnancy Alone As a Teen", "How to Tape a Broken Pinky Toe",
			"How to Love Your Stuffed Animal ", "How to Hold a Hermit Crab", "How to Be a Popular Tomboy ", "How to Preserve a Severed Limb for Reattachment",
			"How to Cope With a Flirtatious Co Worker", "How to Stop Mouth Breathing",
			"How to Handle Smart People", "How to Spot Signs of Disease in Doves", "How to Get Slime Out of Hair", "How to Cook With Coca Cola", "How to Widen Your Logic and Knowledge",
			"How to Emulate Lana Del Rey", "How to Deal With Relatives You Hate ",
			"How to Meditate in a Labyrinth ", "How to Dress Emo in the Summer",
			"How to Take Group Photos", "How to Love a Married Man", "How to Clean Straw Hats",
			"How to Ask a Girl out in High School if You Are Shy and She Does Not Know You", "How to Take Care of Your Furby ",
			"How to Identify Different Types of Forklifts", "How to Make Fry Bread ", "How to Tell if You Have a Migraine", "How to Accept that Your Crush Doesn\'t Like You",
			"How to Purchase a Gas Station ", "How to Talk Faster ",
			"How to Massage Yourself", "How to Explain Photosynthesis", "How to Disagree With Your Doctor", "How to Use a Gun (Women) ",
			"How to Deal With a Cursing Person", "How to Talk Loudly ", "How to Deal With Bad News",
			"How to Avoid Going Over an Essay Word Limit",
			"How to Tell if Your Cat Is Blind", "How to Catch a Fly With Your Hands", "How to Play the Hunger Games Outdoor Game", "How to Get a Guy You Don\'t Like to Stop Liking You ", "How to Become More Intelligent Than You Are Now",
			"How to Be a Computer Genius", "How to Avoid Being an Obsessive Girlfriend",
			"How to Wash Eyes With Water", "How to Kill Herobrine in Minecraft ", "How to Sell Candy in School", "How to Pick Good Minecraft Servers",
			"How to Encourage Your Baby to Roll", "How to Avoid Skin Problems at Work ", "How to Compliment a Woman ",
			"How to Get Rid of Yellowness in Gray Hair", "How to Recognize Signs of Dyslexia", "How to Play SkyBlock in Minecraft", "How to Keep Discus", "How to Spot a Fake Coach Bag",
			"How to Make Colored Ice ", "How to Stop Finishing Other People\'s Sentences",
			"How to Become a Model if You\'re Short", "How to Find a Cave in Minecraft",
			"How to Get Your Dog to Stop Playing Fetch With You", "How to Determine Correct Primary Colors ",
			"How to Confront a Friend Whose Child Bullies Your Child", "How to Stop Kittens from Crying ",
			"How to Write a Great Christian Song ", "How to Train or Help a Puppy Stop Crying when Locked up or Outside",
			"How to Build an Underground House", "How to Get 360 Waves ",
			"How to Enjoy Your Holiday Alone", "How to Have a Pleasant Facial Expression",
			"How to Be a Modern Hippie", "How to Use Uber with an International Phone",
			"How to Get a Celebrity to Follow You on Twitter", "How to Escape Zombies in Minecraft PE",
			"How to Feed a Baby Pigeon ", "How to Ripen a Cantaloupe ", "How to Resell Dollar Store Goods ", "How to Get over Your Addiction to Mountain Dew", "How to Talk So Teens Will Listen", "How to Win a Nerf War ",
			"How to Cope when Your Teenager Falls in Love", "How to Help a Pecked Chicken with a Wound", "How to Date a Capricorn Man ", "How to Install Adobe Flash Player",
			"How to Dye Fabric With Tea ", "How to Stop Being Manipulative", "How to Help a Dog That May Have Been Poisoned",
			"How to Pretend You Are Not Sick", "How to Draw Squidward from SpongeBob SquarePants", "How to Stop Being Superstitious ",
			"How to Read an Aura ", "How to Get 8 Pack Abs",
			"How to Act Like a Rich Girl ", "How to Develop Telepathy ", "How to Beat Level 77 in Candy Crush Saga", "How to Understand Cockatiel Gestures ", "How to Act Like Jim Halpert ",
			"How to Feel Lucky", "How to Turn On Headlights ", "How to Eat Almonds",
			"How to Become a Psychic Medium", "How to Be Sassy ",
			"How to Quit Smoking Weed", "How to Not Pick a Scab ",
			"How to Be a Kid Actor ", "How to Look Sick with Makeup ",
			"How to Date a Millionaire ", "How to Contact Rihanna", "How to Give Your Hermit Crab a Bath ",
			"How to Travel to Antarctica", "How to Make an Atheist and Theist Relationship Work", "How to Manage a Nerf Team ",
			"How to Do the Russian Squat‐and‐Kick Dance", "How to Do a Scorpion in Cheerleading", "How to Stop Being Mean to People",
			"How to Punch Harder", "How to Make a Bucket Hat ", "How to Remove Eyelash Glue", "How to Communicate with Your Cat", "How to Use a Ruler", "How to Drop Items in Oblivion ",
			"How to Stop Fantasizing", "How to Not Pick a Scab ", "How to Do Toes to Bar ",
			"How to Tell Your Boss You\'ve Made a Major Mistake", "How to Make a Fireball",
			"How to Change Your Name on wikiHow", "How to Make a Calm Down Corner (9 15 Years Old)", "How to Make a Ninja Impact Smoke Bomb ", "How to Be Macho", "How to Use the Ouija Board Safely ", "How to Be Tolerant to People\'s Opinions ", "How to Make a Beaded Lizard",
			"How to Talk Like a Stereotypical New Yorker", "How to Convince Others That You Are Not Shy",
			"How to Hide a Big Nose", "How to Sell Firewood", "How to Be Cunning ", "How to Treat Diarrhea in Doves",
			"How to Take a Leap of Faith ", "How to Eat Like an Olympian ", "How to Win a Game of Clue Without Technically Cheating", "How to Build a Big Sandcastle ",
			"How to Say a Novena to St. Therese the Little Flower", "How to Make a Bouncy Egg ", "How to Show a Girl That You Care (for Guys)",
			"How to Answer the Question “Who Are You”", "How to Melt Nutella",
			"How to Show Chickens ", "How to Protect Yourself After Unknowingly Buying Stolen Property",
			"How to Use Bodywash ", "How to Blow Dry Your Hair Without Getting Damaged", "How to Be Stubborn ", "How to Become Pope ",
			"How to Be a Christian Teen Dealing With Non Christian Friends", "How to Become a Clown", "How to Find a Snail ", "How to Avoid \'New Tank\' Syndrome ",
			"How to Throw a Progressive Dinner Party ", "How to Remove Blood Stains from Wood",
			"How to Melt Coconut Oil", "How to Care for a Toy Poodle",
			"How to Protest Part of Your School\'s Student Code", "How to Sneak a Pad or Tampon to the Bathroom at School",
			"How to Stop Absorbing Other People\'s Emotions", "How to Make Apple Jello Shots"
		]
		artchoice = articles[Math.abs(Math.round(Math.random() * articles.length) - 1)];
		msg.channel.send(artchoice).catch("console.error");
	}//doc
	if (msg.content.startsWith(prefix + 'roll')) {
		let arg = getAfter(msg.content, 6);
		if (!arg == "") {
			if (arg < 100000000001) {
				let num = Math.round(Math.random() * parseInt(arg, 10));
				msg.channel.send("Rolled a **" + arg + "** sided die and got \`" + num + "\` \:game_die:").catch("console.error");
			} else {
				msg.channel.send("**Die is too big!** Please input a smaller number")
			}
		}
	}//doc
	if (msg.content.startsWith(prefix + 'fortune')) {
		msg.channel.send(nostra.generate());
	}//doc
	if (msg.content.startsWith(prefix + 'changelog')) {
		let cl = new Discord.MessageEmbed();
		cl.setTitle("Changelog");
		cl.setColor("#f54275");
		cl.addField("\u2022 Added the `slow` command", "Change the slowmode of a text channel", false);
		cl.addField("\u2022 Added the `morse` command", "Create morse code!", false);
		cl.addField("\u2022 Tweaked the `who` command", "Now shows the Hypesquad house of the user, and if the user is a verified developer", false);
		cl.addField("\u2022 Tweaked the `inst` command", "Now plays the audio in a voice channel", false);
		cl.addField("\u2022 Tweaked the `tile` command", "Create tiled emoji!", false);
		msg.channel.send(cl);
	}//doc
	if (msg.content.startsWith(prefix + 'qu') && !(msg.content.startsWith(prefix + "quiz"))) { //fun command for a random type of estice water
		const words = ["spicy", "diet", "salty", "sugar-free", "microwaved", "baked", "dehydrated", "boiled", "stirred", "frozen", "chilled", "non-alchoholic", "nut-free", "gluten-free", "solidified",
			"sparkling", "distilled", "purified", "mountain spring", "non-GMO", "sweetened", "raspberry-infused", "blanched", "grilled", "organic", "caffeinated", "smoked", "creamy", "lava-hot", "cheesy",
			"aerated", "vanilla", "decaf", "cheap", "expensive", "fancy", "asbestos"];
		let arg = getAfter(msg.content, 4);
		let choice = words[Math.abs(Math.round(Math.random() * words.length) - 1)];
		questionable(arg, function (err, titles) {
			if (err) throw err;
			let choice2 = Math.abs(Math.round(Math.random() * titles.length) - 1);
			msg.channel.send(titles[choice2] + "?")
		});

	}//doc
	if (msg.content.startsWith(prefix + 'scroll')) {
		let arg = parseInt(getAfter(msg.content, 7), 10);
		if (!arg == "") {
			let out = "";
			out = out + "  |\n";
			for (i = 0; i < arg - 2; i++) {
				out = out + " |\n";
			}
			out = out + "V";
			msg.channel.send(out);
		}
	}//doc
	if (msg.content.startsWith(prefix + 'reveal')) {
		let arg = getAfter(msg.content, 7);
		if (!arg == "") {
			msg.channel.send("||" + arg + "||");
			msg.delete();
		}
	}//doc
	if (msg.content.startsWith(prefix + 'bubblewrap')) {
		let bub = new Discord.MessageEmbed();
		bub.setTitle("Bubblewrap");
		bub.setColor("#03bafc");
		bub.addField("Click to pop", "(||pop||)(||pop||)(||pop||)(||pop||)(||pop||)\n(||pop||)(||pop||)(||pop||)(||pop||)(||pop||)\n(||pop||)(||pop||)(||pop||)(||pop||)(||pop||)\n(||pop||)(||pop||)(||pop||)(||pop||)(||pop||)\n(||pop||)(||pop||)(||pop||)(||pop||)(||pop||)", false);
		msg.channel.send(bub).catch("console.error");
	}//doc
	if (msg.content.startsWith(prefix + 'quiz')) {
		let qu = new Discord.MessageEmbed();
		qu.setTitle("What is the capital of Italy?");
		qu.setColor("#03bafc");
		qu.addField("Click on the answer", "-------------", false);
		qu.addField("A: Spain", "||Wrong. The correct answer was B||", false);
		qu.addField("B: Rome", "||Correct!-----------------------------||", false);
		qu.addField("C: Paris", "||Wrong. The correct answer was B||", false);
		qu.addField("D: Trick question: Italy is a capital", "||Wrong. The correct answer was B||", false);
		msg.channel.send(qu);
	}//doc
	if (msg.content.startsWith(prefix + 'lmeow')) {
		msg.channel.send("\:joy_cat: **lmeow** \:joy_cat:");
	}//doc
	if (msg.content.startsWith(prefix + 'who')) {
		let user = msg.mentions.users.first();
		if (!(user == undefined)) {
			let cl = new Discord.MessageEmbed();
			cl.setTitle("Who Is:");
			cl.setColor("#f54275");
			cl.addField(user.username, user.tag, false);
			cl.addField("Created at: ", user.createdAt.toString(), false);
			cl.addField("ID: ", user.id, false);
			cl.addField("Bot:", user.bot, false);
			let avt = user.avatarURL();
			msg.channel.send(cl);
			msg.channel.send({ files: [avt] })
				.then(ms => {
					if (user.flags.any("HOUSE_BRILLIANCE")) {
						ms.react("750075000781799516");
					}
					if (user.flags.any("HOUSE_BRAVERY")) {
						ms.react("750074760444117083");
					}
					if (user.flags.any("HOUSE_BALANCE")) {
						ms.react("750074887510425601");
					}
					if (user.flags.any("VERIFIED_DEVELOPER")) {
						ms.react("750077845002256464");
					}
				});
		}
	}//doc
	if (msg.content.startsWith(prefix + 'yell')) {
		let arg = getAfter(msg.content, 6);
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
			for (i = 0; i < con.length; i++) {
				if (Object.keys(conv).includes(con[i])) {
					out = out + conv[con[i]];
				} else {
					out = out + con[i];
				}
			}
			msg.channel.send(out);
		}
	}//doc
	if (msg.content.startsWith(prefix + 'scream')) {
		msg.channel.send('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHHHHHHHHHHHHHHHH');
	}//doc
	if (msg.content.startsWith(prefix + 'clap')) {
		let arg = getAfter(msg.content, 6);
		if (!arg == "") {
			msg.channel.send(arg.replace(/ /mg, " \:clap: ") + " \:clap:");
			msg.delete();
		}
	}//doc
	if (msg.content.startsWith(prefix + 'circle')) {
		msg.channel.send("\:ok_hand: " + msg.author.username + " now has permission to punch everyone @here in the arm");
	}//doc
	if (msg.content.startsWith(prefix + 'ytlink')) {
		msg.channel.send("http://www.latlmes.com/arts/return-of-the-golden-age-of-comics-1");
	}//doc
	if (msg.content.startsWith(prefix + 'embed')) {
		let args = getArgs(msg.content, "embed", ",");
		if (!args == []) {
			let emb = new Discord.MessageEmbed();
			emb.setTitle(args[0]);
			emb.setColor(convert.keyword.hex(args[1]));
			for (i = 2; i < args.length; i = i + 3) {
				emb.addField(args[i], args[i + 1], args[i + 2] == "true");
			}
			msg.channel.send(emb);
			msg.delete();
		}
	}//doc
	if (msg.content.startsWith(prefix + 'google')) {
		let arg = getAfter(msg.content, 8);
		if (!arg == "") {
			msg.channel.send("https://www.google.com/search?q=" + arg);
		}
	}//doc
	if (msg.content.startsWith(prefix + 'barrelroll')) {
		msg.channel.send("z r z r");
	}//doc
	if (msg.content.startsWith(prefix + 'cry')) {
		msg.channel.send("\:cry: **this is so sad** \:cry:");
		msg.react("😢");
	}//doc
	if (msg.content.startsWith(prefix + 'enchant')) {
		let arg = getAfter(msg.content, 9);
		if (!arg == "") {
			let conv = {
				"A": "ᔑ",
				"B": "ʖ",
				"C": "ᓵ",
				"D": "↸",
				"E": "ᒷ",
				"F": "⎓",
				"G": "⊣",
				"H": "⍑",
				"I": "╎",
				"J": "⋮",
				"K": "ꖌ",
				"L": "ꖎ",
				"M": "ᒲ",
				"N": "リ",
				"O": "𝙹",
				"P": "!¡",
				"Q": "ᑑ",
				"R": "∷",
				"S": "ᓭ",
				"T": "ℸ",
				"U": "⚍",
				"V": "⍊",
				"W": "∴",
				"X": "/",
				"Y": "||",
				"Z": "⨅"
			};
			let out = "";
			let con = arg.toUpperCase();
			for (i = 0; i < con.length; i++) {
				if (Object.keys(conv).includes(con[i])) {
					out = out + conv[con[i]];
				} else {
					out = out + con[i];
				}
			}
			msg.channel.send(out);
		}
	}//doc
	if (msg.content.startsWith(prefix + 'note834292384989234490238')) {
		let arg = getAfter(msg.content, 6);
		if (!arg == "") {
			if (arg == "" || arg == " ") {
				msg.channel.send("Your note says: `" + data.get(msg.author.id + "note") + "`");
			} else {
				data.set(msg.author.id + "note", arg);
			}
		}
	}//doc
	if (msg.content.startsWith(prefix + 'about')) {
		let cl = new Discord.MessageEmbed();
		cl.setTitle("About **Caramel**");
		cl.setColor("#f54275");
		cl.addField("What", "Caramel is a bot for Discord that adds a ton of useful and fun commands for you to use", false);
		cl.addField("Who", "The bot was created by <@688453570173075534>", false);
		cl.addField("Why", "Just a fun project for me and a useful bot for you", false);
		cl.addField("How", "Use the `" + prefix + "help` command to get info on the commands avaliable", false);
		cl.setFooter("Use `" + prefix + "help`")
		msg.channel.send(cl);
	}//doc
	if (msg.content.startsWith(prefix + 'calc')) {
		let arg = getAfter(msg.content, 5);
		if (!arg == "") {
			msg.channel.send(evalExpression(arg));
		}
	}//doc
	if (msg.content.startsWith(prefix + 'face')) {
		let arg = getAfter(msg.content, 6);
		if (!arg == "") {
			let faces = {
				"bear": "ʕ•ᴥ•ʔ",
				"lenny": "( ͡° ͜ʖ ͡°)",
				"glasses": "(▀̿Ĺ̯▀̿ ̿)",
				"fightme": "(ง ͠° ͟ل͜ ͡°)ง",
				"sparkle": "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ ✧ﾟ･: *ヽ(◕ヮ◕ヽ)",
			};
			if (faces[arg] == null) {
				msg.channel.send("Sorry, that face doesn't exist!");
			} else {
				msg.channel.send(faces[arg]);
			}
		}
	}//doc
	if (msg.content.startsWith(prefix + 'crate')) {
		const loot = ["\:key: Key to your neighbor\'s house", "Rusty nail", "\:blue_book: Sports Magazine", "\:pick: Diamond Pickaxe", "\:egg: Omelette"];
		let lootchoice = loot[Math.abs(Math.round(Math.random() * loot.length) - 1)];
		msg.channel.send("You found a **" + lootchoice + "**");
	}//doc
	if (msg.content.startsWith(prefix + 'typing')) {
		if (msg.channel.typing == false) {
			msg.channel.startTyping();
		} else {
			msg.channel.stopTyping(true);
		}
	}//doc
	if (msg.content.startsWith(prefix + 'invite')) {
		msg.channel.createInvite({ unique: true })
			.then(inv => { msg.channel.send("https://discord.gg/" + inv) });
	}//doc
	if (msg.content.startsWith(prefix + 'botinvite')) {
		msg.channel.send("https://discord.com/api/oauth2/authorize?client_id=736241828164141076&permissions=8&scope=bot");
	}//doc
	if (msg.content.startsWith(prefix + 'servercount')) {
		msg.channel.send(client.guilds.cache.size);
		let num = client.guilds.cache.size;
		client.user.setActivity(num + " servers", { type: "WATCHING" });
	}//doc
	if (msg.content.startsWith(prefix + 'help ' + prefix)) {
		let arg = getAfter(msg.content, 6 + prefix.length)
		helpdata = {
			"cry": {
				"usage": "cry",
					"desc": "Types `This is so sad` into chat"
			},
			"lmeow": {
				"usage": "lmeow",
					"desc": "Types `lmeow` into chat"
			},
			"test": {
				"usage": "test",
					"desc": "Tells you if the bot is working"
			},
			"embed": {
				"usage": "embed `title`,`color`,`header1`,`description1`,`header2`,`description2`...",
					"desc": "Used to create an embed message\n`title`: The title of the embed\n`color`: The color of the embed. Use any simple color name, in lowercase\n`header1` and `description1`: The header and description of a section of the embed. Can go on infinitely"
			},
			"echo": {
				"usage": "echo `text`",
					"desc": "Will make the bot repeat what you say\n`text`: The text for the bot to repeat"
			},
			"vaporwave": {
				"usage": "vaporwave `text`",
					"desc": "Will make the bot repeat what you say in v a p o r w a v e\n`text`: The text for the bot to vaporize"
			},
			"ping": {
				"usage": "ping",
					"desc": "Tells you the bot's ping"
			},
			"roll": {
				"usage": "roll `size`",
					"desc": "Makes the bot roll a die\n`size`: The size of the die. Cannot be larger than 100 million"
			},
			"yell": {
				"usage": "yell `text`",
					"desc": "Makes the bot yell text in big letters\n`text`: The text for the bot to yell"
			},
			"lorem": {
				"usage": "lorem",
					"desc": "Lorem ipsum dolor sit amet"
			},
			"ytlink": {
				"usage": "ytlink",
					"desc": "Links a very interesting video"
			},
			"scream": {
				"usage": "scream",
					"desc": "AAAAAHHHH!"
			},
			"clap": {
				"usage": "clap `text`",
					"desc": "Makes :clap: your :clap: text :clap: have :clap: claps\n`text`: The text for the bot to c l a p"
			},
			"inst": {
				"usage": "inst `name`",
					"desc": "links to a myinstants file\n`name`: The name of the file"
			},
			"coin": {
				"usage": "coin",
					"desc": "Flips a coin"
			},
			"invite": {
				"usage": "invite",
					"desc": "Creates a unique invite link to the server"
			},
			"feedback": {
				"usage": "feedback `text`",
					"desc": "Send feedback, suggestions, or bug reports about the bot\n`text`: Your feedback"
			},
			"botinvite": {
				"usage": "botinvite",
					"desc": "Gives you the invite link for the bot"
			},
			"changelog": {
				"usage": "changelog",
					"desc": "Tells you about recent changes to the bot"
			},
			"about": {
				"usage": "about",
					"desc": "Tells you about the bot"
			},
			"pfp": {
				"usage": "pfp @user",
					"desc": "Gets the profile picture of a user\n`user`: The user to fetch the profile picture of"
			},
			"who": {
				"usage": "who @user",
					"desc": "Tells you information about a user, such as their id and profile picture\n`user`: The user to get info about"
			},
			"rate": {
				"usage": "rate `metric`",
					"desc": "Rates you from 0% to 100% on some metric\n`metric`: The metric to rate you on"
			},
			"bottleflip": {
				"usage": "bottleflip",
					"desc": "flips a bottle; same as bf"
			},
			"bf": {
				"usage": "bf",
					"desc": "flips a bottle; same as bottleflip"
			},
			"bubblewrap": {
				"usage": "bubblewrap",
					"desc": "Gives you some bubblewrap to pop"
			},
			"wikihow": {
				"usage": "wikihow",
					"desc": "Gives you a random weird wikiHow article"
			},
			"note": {
				"usage": "note `text`",
					"desc": "Saves a text note for you to read later\n`text`: The text for the bot to save. Leave blank if you want to read what your note says instead of changing it"
			},
			"calc": {
				"usage": "calc `expression`",
					"desc": "Calculates basic math expressions\n`expression`: The expression for the bot to calculate. Use `*` for multiplication, `/` for division, and `^` for exponents"
			},
			"face": {
				"usage": "face `type`",
					"desc": "Displays a text face\n`type`: The face for the bot to display. Valid faces are: `lenny`, `bear`, `sparkle`, `fightme`, `glasses`"
			},
			"crate": {
				"usage": "crate",
					"desc": "Gives you some random loot. Completely cosmetic"
			},
			"servercount": {
				"usage": "servercount",
					"desc": "Tells you how many servers Caramel is actively in"
			},
			"fidgetspinner": {
				"usage": "fidgetspinner",
					"desc": "Creates a fidget spinner for you to spin"
			},
			"reveal": {
				"usage": "reveal `text`",
					"desc": "Creates spoiler text\n`text`: The text for the bot to hide"
			},
			"scroll": {
				"usage": "scroll `lines`",
					"desc": "Scrolls the screen down a specified number of lines\n`lines`: The mumber of lines for the bot to scroll. Must be 5 or less"
			},
			"quiz": {
				"usage": "quiz",
					"desc": "Shows a trivia question. (Currently there is only one question. Count on more in the future)"
			},
			"google": {
				"usage": "google `search`",
					"desc": "Gives you a link to a google search\n`text`: The term that the bot should search for"
			},
			"barrelroll": {
				"usage": "barrelroll",
					"desc": "barrlroll"
			},
			"circle": {
				"usage": "circle",
					"desc": "Made you look"
			},
			"help": {
				"usage": "help `utility|fun|all`",
					"desc": "Gives you information about avaliable commands. Can also inform you about a specific command if you do help (prefix)(commandname)"
			},
			"typing": {
				"usage": "typing",
					"desc": "Makes Caramel start or stop typing in the current channel"
			},
			"stop": {
				"usage": "stop",
					"desc": "Stops the bot. Can only be used by the bot owner"
			},
			"8ball": {
				"usage": "8ball",
					"desc": "A magic 8 ball"
			},
			"timewaster": {
				"usage": "timewaster",
					"desc": "Are you really gonna click them all?"
			},
			"censor": {
				"usage": "censor `text`",
					"desc": "Censors some evil words like frick and heck\n`text`: The tecxt to censor"
			},
			"covid": {
				"usage": "covid",
					"desc": "Shows guidelines for COVID-19"
			},
			"magictrick": {
				"usage": "magictrick",
					"desc": "Tada!"
			},
			"bq": {
				"usage": "bq `text`",
					"desc": "Creates a blockquote\n`text`: The text to blockquote"
			},
			"blockquote": {
				"usage": "blockquote `text`",
					"desc": "Creates a blockquote\n`text`: The text to blockquote"
			},
			"fortune": {
				"usage": "fortune",
					"desc": "Tells your fortune. *ooga booga*"
			},
			"qu": {
				"usage": "qu `keyword`",
					"desc": "Generates a random question fom a keyword\n`keyword`: The keyword to use"
			},
			"enchant": {
				"usage": "enchant `text`",
					"desc": "Enchants text\n`text`: The text to enchant"
			},
			"text": {
				"usage": "text `text` @user",
				"desc": "DMs a user\n`text`: The text to DM to the user\n`user`: The user to DM"
			},
			"vote": {
				"usage": "vote `title`,`time`,`option1`,`option1emoji`,`option2`,`option2emoji`",
				"desc": "Starts a poll\n`title`: The title of the embed\n`time`: The time in seconds for the vote to last\n`option1`,`option2`: The names of the the two options\n`option1emoji`,`option2emoji`: The emojis used to vote"
			},
			"lovecalc": {
				"usage": "lovecalc @user",
				"desc": "Calculates the love between you and another user\n`user`: The user to calculate love with"
			},
			"slow": {
				"usage": "slow `seconds`",
				"desc": "Sets the slowmode of a text channel\n`seconds`: The number of seconds for the slowmode to last"
			},
			"morse": {
				"usage": "morse `text`",
				"desc": "Converts text to morse code\n`text`: The text to convert"
			},
			"tile": {
				"usage": "tile `string`",
				"desc": "Allows you to easily create tiled emoji creations\n`string`: The options for the generator. for each emoji you want to use, just put the emoji name, and do $n for a new line. Example: \"-tile crying thumbsup $n eye\""
			}
		}
		if (!arg == "" && Object.keys(helpdata).includes(arg)) {
			let entry = helpdata[arg];
			let emb = new Discord.MessageEmbed();
			emb.setTitle(prefix + arg + " command help");
			emb.addField("Usage", prefix + entry["usage"]);
			emb.addField("Description", entry["desc"]);
			msg.channel.send(emb);
		}
	}//doc
	if (msg.content.startsWith(prefix + 'timewaster')) {
		let bub = new Discord.MessageEmbed();
		bub.setTitle("Time Waster");
		bub.setColor("#03bafc");
		bub.addField("Click them all, I dare you", "||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||\n||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||\n||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||\n||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||||.||\n", false);
		msg.channel.send(bub).catch("console.error");
	}//doc//doc
	if (msg.content.startsWith(prefix + 'lovecalc')) {
		let user = msg.mentions.users.first();
		if (!(user == undefined)) {
			let calc = Math.round((parseInt(msg.author.id, 10) + parseInt(user.id, 10)) / 999999999999999999 * 75);
			msg.channel.send("Love calc is: " + calc + "%");
		}
	}//doc
	if (msg.content.startsWith(prefix + 'slow')) {
		let arg = getAfter(msg.content, 6);
		if (!arg == "" && msg.member.permissions.any("MANAGE_CHANNELS")) {
			msg.channel.setRateLimitPerUser(parseInt(arg,10), msg.author.tag + " set the slowmode for this channel using the slow command from Caramel")
		}
	}//doc
	if (msg.content.startsWith(prefix + 'morse')) {
		let arg = getAfter(msg.content, 7);
		if (!arg == "") {
			msg.channel.send(morse.encode(arg) + " || " + msg.author.tag);
			msg.delete();
		}
	}//doc
	//if (msg.content.startsWith(prefix + 'ytdl')) {
	//	let arg = getAfter(msg.content, 6);
	//	if (!arg == "") {
	//		let voiceChannel = msg.member.voice.channel;

	//		if (!voiceChannel) {
	//			return msg.reply('please join a voice channel first!');
	//		}

	//		voiceChannel.join().then(connection => {
	//			let stream = ytdl(arg, { filter: 'audioonly' });
	//			let dispatcher = connection.play(stream);
	//			dispatcher.on('finish', () => voiceChannel.leave());
	//		});
	//	}
	//}//doc
	if (msg.content.startsWith(prefix + 'tile')) {
		let args = getArgs(msg.content, "tile", " ");
		let out = "";
		if (!args == []) {
			for (i = 0; i < args.length; i++) {
				if (args[i] == "$n") {
					out = out + "\n";
				} else {
					if (!args[i].match(/-[0-9]/g) == null) {
						let num = args[i][args[i].length - 1];
						let clip = args[i].replace(num, "").replace("-","");
						for (a = 0; a < parseInt(num, 10); a++) {
							out = out + "\:" + clip + ":";
						}
					} else {
						out = out + "\:" + args[i] + ":";
                    }
                }
			}
			msg.channel.send(out);
		}
	}//doc
}
client.on('message', async msg => {
	// Join the same voice channel of the author of the message
	if (msg.member.voice.channel && msg.content.startsWith(prefix + "miccheck3198137981379138789")) {
		const connection = await msg.member.voice.channel.join();
		function micCheck() {
			if (msg.member.voice.speaking == true) {
				msg.channel.send("Your microphone is working! \:microphone2:");
			} else {
				msg.channel.send("Your microphone is not working; I can\'t hear you! \:no_entry_sign:\:microphone2:");
			}
		}
		await micCheck();
		connection.disconnect();
	}
	if (msg.content.startsWith(prefix + 'translate128731893173178783198379813')) {
		let arg = getAfter(msg.content, 11);
		translate('arg', { to: 'es' })
			.then(trans => { msg.channel.send(trans) });
	}
	if (msg.content.startsWith(prefix + 'voteaaaaaaaa12263772367623')) {
		let args = getArgs(msg.content, "vote", ",");
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
			mess = "boop";
			msg.channel.send(emb)
				.then(ms => {
					let filter1 = (reaction) => {
						return reaction.emoji.name === opt1e;
					};
					let filter2 = (reaction) => {
						return reaction.emoji.name === opt2e;
					};
					sco1 = 0;
					sco2 = 0;
					collector1 = ms.createReactionCollector(filter1, { time: parseInt(time * 1000, 10) });
					collector2 = ms.createReactionCollector(filter2, { time: parseInt(time * 1000, 10) });
					collector1.on('collect', (reaction, user) => {
						console.log(`Collected ${opt1} from ${user.tag}`);
						sco1++;
					});
					collector2.on('collect', (reaction, user) => {
						console.log(`Collected ${opt2} from ${user.tag}`);
						sco2++;
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
	}
});
//why
function tokens() {
	testingtoken = "";
	token = "";
}
tokens();
client.login(token);
sdclient.on('ready', () => {
	console.log(`Sidekick logged in as ${sdclient.user.tag}!`);
	sdclient.user.setStatus("invisible");
	//sdclient.user.setAvatar("https://upload.wikimedia.org/wikipedia/en/thumb/9/97/Robin_%28Tim_Drake_-_circa_1990%29.png/170px-Robin_%28Tim_Drake_-_circa_1990%29.png");
	let guild1 = sdclient.guilds.cache.find(gd => gd.id === '720385327209906257');
	guild1.me.setNickname("LWB-Sidekick");
});
sdclient.on('message', msg => {
	if (msg.content.startsWith(prefix + 'steph')) {
		//replySteph(msg);
	}
});
function replySteph(msg) {
	let guild1 = sdclient.guilds.cache.find(gd => gd.id === '720385327209906257');
	guild1.me.setNickname("Steph Curry");
	sdclient.user.setAvatar("https://image-cdn.essentiallysports.com/wp-content/uploads/20200711202001/Steph-curryy.jpg");
	msg.channel.send("basketball");
}
function sdtokendo() {
	sdclient.login('');
}
sdtokendo();
function website() {
	const http = require('http');
	const fs = require('fs');
	const port = 80;
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
					console.log('caught :)');
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
	console.log("yes");
}
website();
//node Documents\GitHub\logans-weird-bot\Caramel.js
