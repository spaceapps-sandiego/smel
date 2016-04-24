
import TwiterFilterInfo from './twitterFilterInfo';

var debug = 1;
var Twitter = require('twitter');

var client = new Twitter({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});


var initTwitter = function(conn) {
  console.log("Initializing Twitter aggregator...");

	var tFilterInfo = new TwiterFilterInfo();
	tFilterInfo.queryData(conn, function() {
    //var tUsers = new twitterUsers(conn);
    var hashtags = tFilterInfo.getStrArrayOfHashtags();
    var hashterms = tFilterInfo.getStrArrayOfHashterms();
    var powerUsers = tFilterInfo.getIntArrayOfPowerUsers();

    console.log("-- Twitter hashtags: ", hashtags.join(','));
    console.log("-- Twitter powerUsers: ", powerUsers.join(','));

    /**
     * Stream statuses filtered by keyword
     * number of tweets per second depends on topic popularity
     **/
    //client.stream('statuses/filter', {track: 'earthquake,flood,volcano,eruption,lava,storm,tornado,hail,landslide,tsunami,tidalwave,wildfire,firestorm,terremoto,diluvio,incendio'},  function(stream){
    client.stream('statuses/filter', { track: hashtags.join(','), follow: powerUsers.join(',') },  function(stream) {
        //client.stream('statuses/filter', {track: 'spaceapps,nasa,space,spaceapps_sd'},  function(stream){
  	    stream.on('data', function(tweet) {
					if (debug == 1)
					{
	    	    console.log("TWEET:", tweet.user.screen_name, " *********************\n");
	    			//console.log("TWEET-GEO=", tweet.text, "\nUSER=", tweet.user.name, "\nLOCATION=", tweet.user.location, "\nGEO=", tweet.user.geo_enabled, "\nPLACE=", tweet.place, "\n");
	    		}

			    if (tweet.retweeted == false)
			    {
			    		var n;
			    		var i;
			    		var tweet_text = tweet.text;
			    		var weight = tFilterInfo.getPowerUserWeight(tweet.user.id_str);
			    		var date = (new Date(parseInt(tweet.timestamp_ms))).toISOString();

			    		for (i = 0; i < hashterms.length; i++) {
			    			var matched_term = hashterms[i];
				    		if (n = tweet_text.indexOf(matched_term) >= 0) {
				    			var natural_disaster = tFilterInfo.getNaturalDisaster(matched_term);

			    				if (debug == 1) {
					    	    console.log("\nSQL INSERT: ", tweet.user.screen_name, tweet.user.id, weight, matched_term, natural_disaster, date, tweet_text, tweet.user.location, tweet.user.place);
					    	  }

				    			// insert into database
				    			var query_text = 'INSERT INTO twitter_tweets(screen_name, user_id, weight, term_matched, nat_distr, time, text, location, place_id) values($1, $2, $3, $4, $5, $6, $7, $8, $9)';
	        				conn.query(query_text, 
	        					[tweet.user.screen_name, tweet.user.id, weight, matched_term, natural_disaster, date, tweet_text, tweet.user.location, tweet.user.place ],
	        					function(err, result) {
	        						if (err) {
		    	 							console.error('error inserting tweet: ', err);
	        						}
	        						else {
	        							if (debug == 1) {
	        								//console.log("\mSQL INSERT OK, id=", result.rows[0].id);
	        							}
	        						}
	        					}
	        				);
				    		}
			    		}
	    		}
		    	else
			    {
	  	  		if (debug == 1) {
					    console.log("*********************\n");
	    				console.log("RETWEET: COUNT=", tweet.retweet_count, ", TEXT=", tweet.text, "\nLOCATION=", tweet.user.location, "\nGEO=", tweet.user.geo_enabled, "\nPLACE=", tweet.place, "\n");
	    			}
	    		}
	    });

    	stream.on('error', function(error) {
				console.log("ERROR!!!! twitter stream issue");
	    	console.log("ERROR: ", error);
    	});

      stream.on('end', function(response) {
        console.log('END!!!! twitter stream ended - needs restart!');
        //console.log("END: ", response);
      });
    });
	});
};

//var params = {screen_name: 'earthquake'};
//client.get('statuses/user_timeline', params, function(error, tweets, response){
//  if (!error) {
//    console.log(tweets);
//  }
//});

module.exports = initTwitter;
