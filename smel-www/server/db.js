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

        //run a stupid test query to check the database connection
        client.query("SELECT $1::int AS number", ["1"], function(error, result) {
            done();

            if (error) {
                return console.error("ERROR running query", error);
            }

            console.log("Postgres database check succeeded");
            conn = client;
            cb();
        });
    });
};

export {pgCheck, conn};
