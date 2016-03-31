var twitterHelper = require('./twitterHelper');

twitterHelper.tweet("@vicksonzero hello from nodejs!", function (error, tweet, response) {
	console.log("Done tweeting:" + tweet);
})
