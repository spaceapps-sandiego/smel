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
}

module.exports = Natural;