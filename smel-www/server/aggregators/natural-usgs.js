import Natural from 'natural';
let request = require('request');

var API_SLEEP_USGS=15*60; // 15 minutes

if (process.env.API_SLEEP_USGS !== undefined){
	API_SLEEP_USGS = parseInt(process.env.API_SLEEP_USGS);
}

class NaturalUSGS extends Natural{
	constructor(){
		this.API_SLEEP = API_SLEEP_USGS;
		super();
	}

	run(){
		var url = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
		request(url, function(error, response, body){
			
		});

	}
}