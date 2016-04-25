'use strict';

const Natural = require('./natural');
const request = require('request');

var API_SLEEP_RELIEF=15*60*1000; // 15 minutes

if (process.env.API_SLEEP_RELIEF !== undefined){
	API_SLEEP_RELIEF = parseInt(process.env.API_SLEEP_RELIEF)*1000;
}

var type_code_map = {
	9:  "flood",
	16: "earthquake",
	14: "landslide",
	10: "severestorm",
	12: "volcano",
	8:  "fire"
};

class NaturalEONET extends Natural{
	constructor(db){
		super(db, API_SLEEP_RELIEF);
	}

	run(){
		var urls = ["http://eonet.sci.gsfc.nasa.gov/api/v2.1/events?status=open",
					"http://eonet.sci.gsfc.nasa.gov/api/v2.1/events?status=closed"];
		var source = "EONET";
		
		for (var i = urls.length - 1; i >= 0; i--) {

			var url = urls[i];
			request(url, (error, response, body) => {

				var update_count = 0;

				var response_data = JSON.parse(body);
				var response_events = response_data["events"];


				for (var i = response_events.length - 1; i >= 0; i--) {

					var evt = response_events[i];
					var evt_id = evt["id"];
					var evt_title = evt["title"];
					var evt_code = evt["categories"][0] && evt["categories"][0]["id"];
					var evt_href = evt["sources"][0] && evt["sources"][0]["url"];

					var evt_date_created = evt["geometries"][0] && evt["geometries"][0]["date"];
					var evt_date_updated = evt["geometries"][evt["geometries"].length-1] && evt["geometries"][evt["geometries"].length-1]["date"];

					// { "type": "GeometryCollection",
					//     "geometries": [
					//       { "type": "Point",
					//         "coordinates": [100.0, 0.0]
					//         },
					//       { "type": "LineString",
					//         "coordinates": [ [101.0, 0.0], [102.0, 1.0] ]
					//         }
					//     ]
					//   }

					var evt_location = { "type": "GeometryCollection",
					    "geometries": evt["geometries"]
					  }

					if(type_code_map[evt_code] !== undefined){
						
						this.insertOrUpdate(evt_id, source, evt_date_created, evt_date_updated, type_code_map[evt_code], evt_title, evt_location, evt_title);

						update_count += 1;
					}					

					
				};
			});

		};
		

	}
}

module.exports = NaturalEONET;