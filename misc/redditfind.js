const got = require('got');
//i stole this from teak lmao
async function find(subreddit, i) {
	try {
		let raw = await got(`https://www.reddit.com/r/${subreddit}/random/.json`);
		let parsed = JSON.parse(raw.body);
		let data = parsed[0].data.children[0].data;
		if (data.over_18) find();
		return data;
	}
	catch (err) {
		if (err.name == "TypeError" && i < 1) {
			return find(subreddit, i + 1);
		} else {
			return {
				title: 'error',
				permalink: "error",
				url: ''
			};
		}
	}
}

module.exports = find;