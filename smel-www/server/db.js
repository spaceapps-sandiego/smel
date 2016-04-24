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
		`CREATE TABLE IF NOT EXISTS twitter (
			id				serial PRIMARY KEY,
			screen_name		varchar(100) NOT NULL,
			user_id			integer NOT NULL,
			weight			integer NOT NULL,
			term_matched	integer NOT NULL,
			time			date NOT NULL,
			text			varchar(140) NOT NULL,
			location		varchar(100),
			place_id		integer
		);
		CREATE TABLE IF NOT EXISTS twitter_hashtags (
			id				serial PRIMARY KEY,
			text			varchar(100) UNIQUE NOT NULL
		);
		CREATE TABLE IF NOT EXISTS twitter_users (
			id				serial PRIMARY KEY,
			id_string		varchar(32) NOT NULL,
			screen_name		varchar(100) NOT NULL,
			weight			integer NOT NULL,
			followers_count	integer NOT NULL,
			location		varchar(100)
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

			insertHashtags(cb);
		}
	);
};

//inserts our list of desired hashtags
var insertHashtags = function(cb) {
	console.log("Inserting hashtag values...");

	conn.query(
		`INSERT INTO twitter_hashtags (text) VALUES
		('earthquake'),
		('avalanche'),
		('flood'),
		('volcano'),
		('tornado'),
		('sandstorm'),
		('hurricane'),
		('cyclone'),
		('typhoon'),
		('monsoon'),
		('thunderstorm'),
		('elnino'),
		('landslide'),
		('heatwave'),
		('tsunami'),
		('tidalwave'),
		('wildfire'),
		('firestorm'),
		('terremoto'),
		('diluvio'),
		('incendio')
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

export {pgCheck, conn};
