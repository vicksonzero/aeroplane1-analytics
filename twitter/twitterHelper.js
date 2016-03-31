var Twitter = require('twitter');
var twitterKeys = require('./twitterKeys');


;(function () {
	function TwitterHelper() {

		this.client = new Twitter(twitterKeys);

		var params = {screen_name: 'vicksonzerobot'};
		// this.client.get('statuses/user_timeline', params, function(error, tweets, response){
		// 	if (!error) {
		// 		console.log(tweets);
		// 	}
		// });
	}

	var p = TwitterHelper.prototype;

	p.tweet = function tweet(msg, callback){
		this.client.post('statuses/update', {status: msg},  function(error, tweet, response){
			if(error) {
				console.log(error);
				throw error;
			}
			// console.log(tweet);  // Tweet body.
			// console.log(response);  // Raw response object.
			callback(error, tweet, response);
		});
	};

	module.exports = new TwitterHelper();
})();
