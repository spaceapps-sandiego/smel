'use strict';

class twitterUsers{
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



	function constructor(conn){
		this.db = conn;
		allusers = conn.query("SELECT User from TWITTER_USERS");
		if (allusers == null)
			for (user in masterusers)
				conn.insert("INSERT user into TWITTER_USERS");

	}

	getWeight(user){
		weight = 1;
		weight = db.query("SELECT weight from TWITTER_USERS WHERE User=user");
		return weight;
	}

}

module.exports = twitterUsers;