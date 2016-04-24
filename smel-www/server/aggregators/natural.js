

class Natural{
	constructor(){
		this.API_SLEEP = 60;
		this.start();
	}

	start(){
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