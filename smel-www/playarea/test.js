
var Twitter = require('twitter');
var FS = require ('fs');
FS.writeFile("fulloutput.txt", "START:\n", function(err){
  // nothing to do
});
 
var client = new Twitter({
  consumer_key: 'zhNACyr8Nc9s55IP6BikEfH20',
  consumer_secret: 'yylXfyr4g3QhgnG5LiJZAvIrxzdNpfYrMXPI98QRCX2COghx8p',
  access_token_key: '3148300003-J577lb1PMVFPQspUvKN9P9dwhL1YxxD64PvRnzA',
  access_token_secret: 'IPYSNMsAzKBBctRB6uJue8noL8TrA3hJjaJUucepB7mZR'
});

//twitFile.open("w"); 

/**
 * Stream statuses filtered by keyword
 * number of tweets per second depends on topic popularity
 **/
client.stream('statuses/filter', {track: 'earthquake,flood,volcano,eruption,lava,storm,tornado,hail,landslide,tsunami,tidalwave,wildfire,firestorm,terremoto,diluvio,incendio'},  function(stream){
//client.stream('statuses/filter', {track: 'spaceapps,nasa,space,prince'},  function(stream){
  stream.on('data', function(tweet) {

  	if (tweet.retweeted == false)
  	{
  			if (tweet.place != null)
  			{
          console.log("*********************\n");
			    console.log("TWEET-GEO=", tweet.text, "\nLOCATION=", tweet.user.location, "\nGEO=", tweet.user.geo_enabled, "\nPLACE=", tweet.place, "\n");

			    // client.get('users/lookup', {"screen_name": tweet.user.screen_name}, function(error, user, response){
			    // 	if (!error) {
			    // 		console.log("\nUSER INFO: \n", user, "\n");
			    // 	}
			    // 	return;
			    // });
					FS.appendFile("fulloutput.txt", "\n\n***********************\n\n", function(err){
						// nothing to do
					});
					FS.appendFile("fulloutput.txt", JSON.stringify(tweet), function(err){
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

