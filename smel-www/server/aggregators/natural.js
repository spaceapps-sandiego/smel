'use strict';



class Natural{
	constructor(db, sleep){
		this.API_SLEEP = sleep;
		this.db = db;
		this.start();
	}

	start(){
		this.run();
		setTimeout(() => {
			this.run();
			this.start();
		}, this.API_SLEEP);
	}

	run(){
		// Get data source
		// Override in implementation
		throw new TypeError("Do not call the super method run() from a child.");
	}

	insertOrUpdate(source_id, source, time_created, time_updated, disaster_type, location_name, location_geojson, description){
		// location_geojson = '{"type":"Point","coordinates":[-48.23456,20.12345]}';
		// ST_GeomFromGeoJSON()
		this.db.query(`UPDATE natural_disaster set 
							source_id = $1,
							source = $2,
							time_created = $3,
							time_updated = $4,
							disaster_type = $5,
							location_name = $6,
							location_coord = ST_GeomFromGeoJSON($6),
							description = $7
						WHERE source_id = $8 AND 
							source = $9 AND 
							location_name = $10 `, 
			[source_id, source, time_created, time_updated, disaster_type, location_name, location_geojson, description], function(error, result) {

            if (error) {
                return console.error("ERROR running query", error);
            }

            console.log("Updating the record...");
            // cb();
        });
	}
}

module.exports = Natural;