
var Twitter = require('twitter');
var FS = require ('fs');
FS.writeFile("fulloutput.txt", "START:\n", function(err){
  // nothing to do
});
 
var client = new Twitter({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

var keywords = [
	'earthquake',
	'flood',
	'volcano',
	'eruption',
	'lava',
	'storm',
	'tornado',
	'hail',
	'landslide',
	'tsunami',
	'tidalwave',
	'wildfire',
	'firestorm',
	'terremoto',
	'diluvio',
	'incendio'
];


/**
 * Stream statuses filtered by keyword
 * number of tweets per second depends on topic popularity
 **/
client.stream('statuses/filter', { track: keywords.join(',') },  function(stream) {
	//client.stream('statuses/filter', {track: 'spaceapps,nasa,space,prince'},  function(stream){
  	stream.on('data', function(tweet) {
		if (tweet.retweeted == false)
		{
				if (tweet.place != null)
				{
			  		console.log("*********************\n");
					console.log("TWEET-GEO=", tweet.text, "\nLOCATION=", tweet.user.location, "\nGEO=", tweet.user.geo_enabled, "\nPLACE=", tweet.place, "\n");

					// client.get('users/lookup', {"screen_name": tweet.user.screen_name}, function(error, user, response){
					//  if (!error) {
					//      console.log("\nUSER INFO: \n", user, "\n");
					//  }
					//  return;
					// });
  					var tweetString = JSON.stringify(tweet);
					FS.appendFile("fulloutput.txt", "\n\n***********************\n\n", function(err){
						// nothing to do
					});

					FS.appendFile("fulloutput.txt", tweetString, function(err){
						// nothing to do
					});
				}
				else
				{
			  		// console.log("*********************\n");
					//console.log("TWEET-no-GEO=", tweet.text, "\nLOCATION=", tweet.user.location, "\nGEO=", tweet.user.geo_enabled, "\nPLACE=", tweet.place, "\n");
				}
		}
		else
		{
			console.log("*********************\n");
			console.log("RETWEET: COUNT=", tweet.retweet_count, ", TEXT=", tweet.text, "\nLOCATION=", tweet.user.location, "\nGEO=", tweet.user.geo_enabled, "\nPLACE=", tweet.place, "\n");
		}

	});

	stream.on('error', function(error) {
		console.log(error);
	});
});


//var params = {screen_name: 'earthquake'};
//client.get('statuses/user_timeline', params, function(error, tweets, response){
//  if (!error) {
//    console.log(tweets);
//  }
//});

