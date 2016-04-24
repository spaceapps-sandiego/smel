'use strict';

const Natural = require('./natural');
const request = require('request');

var API_SLEEP_RELIEF=15*60*1000; // 15 minutes

if (process.env.API_SLEEP_RELIEF !== undefined){
	API_SLEEP_RELIEF = parseInt(process.env.API_SLEEP_RELIEF)*1000;
}

var type_code_map = {
	FL: "flood",
	FF: "flood",
	TS: "flood",
	EQ: "earthquake",
	MS: "landslide",
	LS: "landslide",
	AV: "landslide",
	TC: "severestorm",
	ST: "severestorm",
	SS: "severestorm",
	VO: "volcano",
	WF: "fire",
};

class NaturalRelief extends Natural{
	constructor(db){
		super(db, API_SLEEP_RELIEF);
	}

	run(){
		var url = "http://api.rwlabs.org/v1/disasters/?limit=100";
		var source = "ReliefWeb";
		
		request(url, function(error, response, body){

			var update_count = 0;

			var response_data = JSON.parse(body);
			var response_features = response_data["data"];


			for (var i = response_features.length - 1; i >= 0; i--) {

				var feature = response_features[i];
				var feature_id = feature["id"];
				var feature_href = feature["href"].replace("\/", "/");
				var feature_name = feature["fields"]["name"];
				
				request(feature_href, (error, response, body) => {

					var feature_details = JSON.parse(body);
					var feature_details_data = feature_details["data"];

					for (var i = feature_details_data.length - 1; i >= 0; i--) {
						var feature_fields = feature_details_data[i]["fields"];

						var feature_date = feature_fields["description"];
						var feature_type_name = feature_fields["primary_type"]["name"];
						var feature_type_code = feature_fields["primary_type"]["code"];
						var feature_location_name = feature_fields["primary_location"] && feature_fields["primary_location"]["name"];
						var feature_location_location = feature_fields["primary_location"] && feature_fields["primary_location"]["location"];
						var feature_location_country_name = feature_fields["primary_country"] && feature_fields["primary_country"]["name"];
						var feature_location_country = feature_fields["primary_country"] && feature_fields["primary_country"]["location"];
						var feature_date = feature_fields["date"]["created"];
						var feature_updated = feature_fields["date"]["updated"];

						if(type_code_map[feature_type_code] !== undefined){
							var location = (feature_location_location !== undefined) ? feature_location_location : feature_location_country;
							var location_name = (feature_location_name !== undefined) ? feature_location_name : feature_location_country_name;
							var geojson = `{"type":"Point","coordinates":${location}}`;
							
							this.insertOrUpdate(feature_id, source, feature_date, feature_updated, type_code_map[feature_type_code], location_name, feature_location, feature_title);

							update_count += 1;
						}
					};

					console.log(`Natural "${source}": processed ${update_count} values`);
				});


				
			};
		});

	}
}

module.exports = NaturalRelief;