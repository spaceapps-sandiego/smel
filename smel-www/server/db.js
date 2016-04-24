var pg = require('pg');
const {POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_DB} = process.env;

var connString = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}/${POSTGRES_DB}`;
var check_count = 0;

//connects to the database
var conn;
var pgCheck = function(cb) {
	pg.connect(connString, function(error, client, done) {
		if (error) {
			if (check_count++ < 10) {
				setTimeout(function() {
					pgCheck(cb);
				}, 5000);
			}

			return console.error("ERROR connecting to postgres database", error);
		}

		//run some test queries to check the database connection and schema
		conn = client;
		schemaCheck(cb);
	});
};

//creates the database schema
var schemaCheck = function(cb) {
	console.log("Checking database schema and inserting tables...");

	conn.query(
		`CREATE TABLE IF NOT EXISTS twitter_tweets (
			id						serial PRIMARY KEY,
			screen_name		varchar(100) NOT NULL,
			user_id				bigint NOT NULL,
			weight				integer NOT NULL,
			term_matched	varchar(100) NOT NULL,
			nat_distr 		varchar(100) NOT NULL,
			time					date NOT NULL,
			text					varchar(150) NOT NULL,
			location			varchar(100),
			place_id			integer
		);
		CREATE TABLE IF NOT EXISTS twitter_hashtags (
			id						serial PRIMARY KEY,
			term					varchar(100) UNIQUE NOT NULL,
			tag						varchar(100) UNIQUE NOT NULL,
			nat_distr 		varchar(100) NOT NULL
		);
		CREATE TABLE IF NOT EXISTS twitter_users (
			id						serial PRIMARY KEY,
			user_id				bigint UNIQUE NOT NULL,
			screen_name		varchar(100) NOT NULL,
			weight				integer NOT NULL,
			followers			integer NOT NULL,
			location			varchar(100)
		);
		CREATE TABLE IF NOT EXISTS natural_disaster (
			id 				serial PRIMARY KEY,
			source 			varchar(16),
			source_id		integer,
			time_created 	date not null,
			time_updated	date,
			disaster_type	varchar(64),
			location_name	varchar(128) not null,
			location_coord	geometry,
			description		text
		);`,
		[ ],
		function(error, result) {
			// TODO figure out where this goes/what it does?
			// done();

			if (error) {
				return console.error("ERROR creating schema", error);
			}

			insertHashtags(function() {
				insertPowerUsers(cb);
			});
		}
	);
};

//inserts our list of desired hashtags
var insertHashtags = function(cb) {
	console.log("Inserting hashtag values...");

	conn.query(
		`INSERT INTO twitter_hashtags (term,tag,nat_distr) VALUES
		('earthquake','#earthquake','earthquake'),
		('avalanche','#avalanche','landslide'),
		('flood','#flood','flood'),
		('volcano','#volcano','volcano'),
		('tornado','#tornado','severestorm'),
		('severestorm','#SevereStorm','severestorm'),
		('sandstorm','#sandstorm','severestorm'),
		('hurricane','#hurricane','severestorm'),
		('cyclone','#cyclone','severestorm'),
		('typhoon','#typhoon','severestorm'),
		('monsoon','#monsoon','severestorm'),
		('thunderstorm','#thunderstorm','severestorm'),
		('elnino','#elnino','severestorm'),
		('landslide','#landslide','landslide'),
		('tsunami','#tsunami','flood'),
		('tidalwave','#tidalwave','flood'),
		('wildfire','#wildfire','fire'),
		('firestorm','#firestorm','fire'),
		('terremoto','#terremoto','earthquake'),
		('diluvio','#diluvio','flood'),
		('volkan','#volkan','volcano'),
		('incendio','#incendio','fire')
		ON CONFLICT DO NOTHING`,
		[ ],
		function(error, result) {
			// TODO figure out where this goes/what it does?
			// done();

			if (error) {
				return console.error("ERROR inserting hashtags", error);
			}

			//call the callback from app.js now that everything checks out
			console.log("Postgres database check succeeded");
			cb();
		}
	);
};

//inserts our list of desired hashtags
var insertPowerUsers = function(cb) {
	console.log("Inserting power users...");

	conn.query(
		`INSERT INTO twitter_users (user_id,screen_name,weight,followers,location) VALUES
		(14505838,'USGS',100,523000,'Reston, VA'),
		(18736652,'NASAHurricane',100,376734,'Greenbelt, MD'),
		(116559622,'twcbreaking',25,413823,'Atlanta, GA'),
		(133225023,'VolcanoAlert',25,10689,''),
		(2170342764,'VolcanoWatching',25,500,'Brighton & Hove, England'),
		(51241574,'AP',25,7535213,'New York, NY'),
		(612473,'BBCNews',25,6560141,'Tadworth, England'),
		(1652541,'Reuters',25,12827015,'London, England'),
		(64643056,'RT_com',25,2035589,'Manassas, VA'),
		(3386439610,'NPRNews',25,1497,'Washington, DC'),
		(15108702,'ReutersLive',25,329827,'London, England'),
		(267061897,'JapanQuakeAlert',100,2709,'Japan'),
		(403539516,'Disaster_Report',75,1702,null),
		(108543358,'InfoBMKG',95,2512716,'Indonesia'),
		(454313925,'NWS',95,334071,'Silver Spring, MD'),
		(2544227706,'NWSTornado',100,32088,'Silver Spring, MD'),
		(586909317,'NWSSPC',100,62597,'Norman, OK'),
		(19215993,'Firewise',50,8197,'Boston, MA'),
		(212499070,'CAL_FIRE',75,94700,'Sacramento, CA'),
		(226409689,'operacoesrio',100,310854,'Rio de Janeiro, Brasil'),
		(10926873,'nswrfs',100,66066,'New South Wales, Australia'),
		(19282280,'metoffice',75,347948,'Exeter, England'),
		(36711678,'noaasatellites',100,121409,'Silver Spring, MD')
		ON CONFLICT DO NOTHING`,
		[ ],
		function(error, result) {
			// TODO figure out where this goes/what it does?
			// done();

			if (error) {
				return console.error("ERROR inserting power users", error);
			}

			//call the callback from app.js now that everything checks out
			console.log("Postgres database check succeeded");
			cb();
		}
	);
};


export {pgCheck, conn};
