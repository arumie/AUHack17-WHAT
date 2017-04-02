class GeoService extends EventEmitter {

	constructor(){
		super();

		this.lat =  0;
		this.long = 0;

		this.init();
	}

	init () {
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

	removeObject(id){
		var elem = document.getElementById(id);
		if(elem){
			elem.parentNode.removeChild(elem);
		}		
	}

	calcDistance(lat1, lon1, lat2, lon2) {
		var R = 6371; // Radius of the earth in km
		
		var dLat = this._deg2rad(lat2-lat1);  // deg2rad below
		var dLon = this._deg2rad(lon2-lon1); 
		
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
				Math.cos(this._deg2rad(lat1)) * Math.cos(this._deg2rad(lat2)) * 
				Math.sin(dLon/2) * Math.sin(dLon/2); 
	
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		var d = R * c; // Distance in km
		
		return d;
	}

	calcBearing (lat1, lng1, lat2, lng2) {
		var dLon = (lng2-lng1);
		var y = Math.sin(dLon) * Math.cos(lat2);
		var x = Math.cos(lat1)*Math.sin(lat2) - Math.sin(lat1)*Math.cos(lat2)*Math.cos(dLon);
		var brng = this._rad2deg(Math.atan2(y, x));
		return 360 - ((brng + 360) % 360);
	}

	getPosition(){
		return {
			lat: this.lat,
			long: this.long
		}
	}
	
	_deg2rad(deg) {
		return deg * (Math.PI/180)
	}

	_rad2deg(rad) {
		return rad * 180 / Math.PI;
	}
}