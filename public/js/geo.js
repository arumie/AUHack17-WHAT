class GeoService extends EventEmitter {

	constructor(){
		super();

		this.lat =  0;
		this.long = 0;

		this.startLocator();
	}

	startLocator () {
		if (navigator.geolocation)
			navigator.geolocation.watchPosition(this.updatePosition.bind(this));
		else
			console.error("GEOSERIVCE: Geolocation not supported");
	}

	updatePosition (position) {
		this.lat = parseFloat(position.coords.latitude);
		this.long = parseFloat(position.coords.longitude);

		this.emit("update", {
			lat: this.lat, 
			long: this.long
		});
	}

	getPostion(){
		return {
			lat: this.lat,
			long: this.long
		}
	}

	getXYZFromCartesianPosition(dist, lat, long){
		var x = dist * Math.cos(lat) * Math.cos(long);
		var y = dist * Math.cos(lat) * Math.sin(long);
		var z = dist * Math.sin(lat);
		var position = {pX: x, pY: y, pZ: z };

		return position;
	}

	calcDistance(lat1, lon1, lat2, lon2) {
		var R = 6371; // Radius of the earth in km
		
		var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
		var dLon = this.deg2rad(lon2-lon1); 
		
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
				Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
				Math.sin(dLon/2) * Math.sin(dLon/2); 
	
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		var d = R * c; // Distance in km
		
		return d;
	}

	deg2rad(deg) {
		return deg * (Math.PI/180)
	}
}