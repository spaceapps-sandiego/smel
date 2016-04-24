
var Twitter = require('twitter');
var FS = require ('fs');

var debug = 0;
if (debug == 1)
{
	FS.writeFile("fulloutput.txt", "START:\n", function(err) {
	  // nothing to do
	});
}

var client = new Twitter({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

// this list can be up to 25 hashtags to filter on
var hashtags = [
	'#earthquake',
	'#avalanche',
	'#flood',
	'#volcano',
	'#tornado',
	'#sandstorm',
	'#hurricane',
	'#cyclone',
	'#typhoon',
	'#monsoon',
	'#thunderstorm',
	'#elnino',
	'#landslide',
	'#heatwave',
	'#tsunami',
	'#tidalwave',
	'#wildfire',
	'#firestorm',
	'#terremoto',
	'#diluvio',
	'#incendio'
];

// this list can be up to 100 users to follow, and must be user ID(s), not handles. Easy to convert at tweeterid.com
var masterusers = [
	133225023, 		//'@VolcanoAlert',		
	2170342764, 	//'@VolcanoWatching',
	14505838, 		//'@USGS' => Earthquakes
	90954365,			//'@earthquakejapan'
	267061897,		//'@japanquakealert'
	403539516,		//'@Disaster_Update'
	108543358,		//'@InfoBMKG'						// Australian/South Asia Tsunami Warnings
	454313925,		//'@NWS',								// National Weather Service
	2544227706,		//'@NWStornado',				// National Weather Service: Tornados
	586909317,		//'@NWSSPC',						// National Weather Service: Storm Prediction Center
	19215993,			//'@Firewise',					// fire service
	21249970,			//'@CAL_FIRE',					// California Fire
	18736652			//'@NASAHurricane'
];

var initTwitter = function(conn) {
    console.log("Initializing Twitter aggregator...");

    /**
     * Stream statuses filtered by keyword
     * number of tweets per second depends on topic popularity
     **/
    //client.stream('statuses/filter', {track: 'earthquake,flood,volcano,eruption,lava,storm,tornado,hail,landslide,tsunami,tidalwave,wildfire,firestorm,terremoto,diluvio,incendio'},  function(stream){
    client.stream('statuses/filter', { track: hashtags.join(','), follow: masterusers.join(',') },  function(stream) {
        //client.stream('statuses/filter', {track: 'spaceapps,nasa,space,spaceapps_sd'},  function(stream){
  	    stream.on('data', function(tweet) {
console.log("DATA!!!!");
		    if (tweet.retweeted == false)
		    {
			    	if (1) //if (tweet.user.location != null && tweet.user.geo_enabled == true)
				    {
		    	    console.log("*********************\n");
		    			console.log("TWEET-GEO=", tweet.text, "\nUSER=", tweet.user.name, "\nLOCATION=", tweet.user.location, "\nGEO=", tweet.user.geo_enabled, "\nPLACE=", tweet.place, "\n");

			    		// client.get('users/lookup', {"screen_name": tweet.user.screen_name}, function(error, user, response){
				    	//  if (!error) {
					    //      console.log("\nUSER INFO: \n", user, "\n");
					    //  }
					    //  return;
				    	// });
      				if (debug == 1)
      				{
    	  				var tweetString = JSON.stringify(tweet);
    						FS.appendFile("fulloutput.txt", "\n\n***********************\n\n", function(err){
    							// nothing to do
    						});

    						FS.appendFile("fulloutput.txt", tweetString, function(err){
	    						// nothing to do
		    				});
			    		}
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
console.log("ERROR!!!!");
	    	console.log("ERROR: ", error);
    	});

        stream.on('end', function(response) {
            console.log('END!');
            console.log(response);
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
