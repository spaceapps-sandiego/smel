'use strict';

class TwiterFilterInfo {

	queryData(conn, cb) {
		this.conn = conn;

		var self = this;
		// populate the terms/hashtag/natural disaster table here locally
    conn.query("SELECT term,tag,nat_distr FROM twitter_hashtags", function(err, result) {
    	if (err) {
      	return console.error('error running query to get twitter hashtags: ', err);
    	}
    	var rows = result.rows;

    	//console.log("DB QUERY: twitter_hashtags #rows: ", rows.length, ", contents:", rows);

    	var hashtags_array = [];
    	var hashterms_array = [];
    	var hashtag_map = {};
     	var i;
    	for (i = 0; i < rows.length; i++)
    	{
    		hashtags_array.push(rows[i].tag);
    		hashterms_array.push(rows[i].term);
    		hashtag_map[rows[i].term] = rows[i].nat_distr;
    	}

    	self.hashtags_array = hashtags_array;
    	self.hashterms_array = hashterms_array;
    	self.hashtag_map = hashtag_map;

		  // populate the power users table
		  conn.query("SELECT user_id,weight FROM twitter_users", function(err, result) {
		  	if (err) {
		    	return console.error('error running query to get twitter power users: ', err);
		  	}
	    	var rows = result.rows;
	    	//console.log("DB QUERY: twitter_users #rows: ", rows.length, ", contents:", rows);

		  	var poweruser_id_array = [];
		  	var poweruser_weight_map = {};
		   	var i;
		  	for (i = 0; i < rows.length; i++)
		  	{
		  		poweruser_id_array.push(rows[i].user_id);
		  		var user_id_str = rows[i].user_id.toString();
		  		poweruser_weight_map[user_id_str] = rows[i].weight;
		  	}

		  	self.poweruser_id_array = poweruser_id_array;
		  	self.poweruser_weight_map = poweruser_weight_map;

		 		cb();
			});
	 	});
	}
	
	getStrArrayOfHashtags() {
		return this.hashtags_array;
	}

	getStrArrayOfHashterms() {
		return this.hashterms_array;
	}

	getNaturalDisaster(matched_term) {
		if (matched_term in this.hashtag_map)
		{
			return this.hashtag_map[matched_term];
		}
		else
		{
			return "term undef: error!";			
		}
	}

	getIntArrayOfPowerUsers() {
		return this.poweruser_id_array;
	}

	getPowerUserWeight(user_id_str) {
		if (user_id_str in this.poweruser_weight_map)
		{
			return this.poweruser_weight_map[user_id_str];
		}
		else
		{
			return 1;			
		}
	}

}

module.exports = TwiterFilterInfo;

