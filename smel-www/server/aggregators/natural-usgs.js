'use strict';

const Natural = require('./natural');
const request = require('request');

var API_SLEEP_USGS=15*60*1000; // 15 minutes

if (process.env.API_SLEEP_USGS !== undefined){
	API_SLEEP_USGS = parseInt(process.env.API_SLEEP_USGS)*1000;
}

class NaturalUSGS extends Natural{
	constructor(db){
		super(db, API_SLEEP_USGS);
	}

	run(){
		var url = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";
		var source = "USGS";
		request(url, (error, response, body) => {

			var update_count = 0;

			var response_usgs = JSON.parse(body);
			var response_features = response_usgs["features"];

			for (var i = response_features.length - 1; i >= 0; i--) {
				
				var feature_type = "earthquake";

				var feature = response_features[i];
				var feature_place = feature["properties"]["place"];
				var feature_time = feature["properties"]["time"];
				var feature_time_updated = feature["properties"]["time_updated"];
				var feature_details = feature["properties"]["detail"];
				var feature_location = feature["geometry"];
				var feature_id = feature["id"];
				var feature_title = feature["properties"]["title"];
				
				// Check id against database and insert/update if necessary
				var date = (new Date(feature_time)).toISOString();
				var date_updated = (feature_time_updated !==  undefined) ? (new Date(feature_time_updated)).toISOString(): null;
				this.insertOrUpdate(feature_id, source, date, date_updated, "earthquake", feature_place, feature_location, feature_title);
				update_count += 1;
			};

		});

	}
}

module.exports = NaturalUSGS;