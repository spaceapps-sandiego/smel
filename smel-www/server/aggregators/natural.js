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
		this.db.query( `INSERT INTO natural_disaster(source_id, source, time_created, time_updated, disaster_type, location_name, location_coord, description)
						VALUES ($1, $2, $3, $4, $5, $6, ST_GeomFromGeoJSON($7), $8)
						ON CONFLICT 
						ON CONSTRAINT natural_disaster_u
						DO UPDATE set 
							time_created = $3,
							time_updated = $4,
							disaster_type = $5,
							location_coord = ST_GeomFromGeoJSON($7),
							description = $8
						WHERE natural_disaster.source_id = $1 AND 
							natural_disaster.source = $2 AND 
							natural_disaster.location_name = $6`,
			[source_id, source, time_created, time_updated, disaster_type, location_name, location_geojson, description], function(error, result) {

            if (error) {
				console.log(location_geojson);
                return console.error(`ERROR running query for Natural ${source}`, error);
            }else{
            	// Ensure that the update was effective.
            	if(result.rowCount > 0){
            		console.log(`Natural: record updated for ${source}, and ${source_id}. Row Count:${result["rowCount"]}`);
            	}else{ 
            		console.log(`Natural: NO record was updated for ${source}, and ${source_id}. Row Count:${result["rowCount"]}`);
            	}
            }

        });
	}
}

module.exports = Natural;