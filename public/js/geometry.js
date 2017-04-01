class PositionHelper extends EventEmitter
{
	constructor (camera_id) {
		super();
		this.camera = document.getElementById(camera_id);
		this.cam_rotation = new THREE.Euler();    // These are read-only.
		this.cam_position = new THREE.Vector3();  //

		this.rad_deg = 57.295779513;
		this.deg_rad = 0.01745329252;

		//Origin position as [lat,long]
		this.init_x = 0;
		this.init_z = 0;
		//Position in meters from origin.
		this.pos_x  = 0;
		this.pos_z  = 0;

		this.lat;
		this.long;
		
		//this.updateCameraValues();
		
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(this.initPosition.bind(this));
			navigator.geolocation.watchPosition(this.updatePosition.bind(this));
		}
		else
			alert("Geolocation not supported");
	}

	getPosition () {
		return [this.lat, this.long];
	}

	//InitPosition, used by geolocation. Don't use directly.
	initPosition (position) {
		this.init_x = parseFloat(position.coords.latitude);
		this.init_z = parseFloat(position.coords.longitude);
		this.lat  = this.init_x;
		this.long = this.init_z;
		this.camera.setAttribute("position", this.generatePosition(this.init_x, this.init_z));
		console.log("Home is: ["+this.init_x + "," + this.init_z+"]");
		this.emit("update", {
			lat: this.init_x, 
			long: this.init_z
		});
	}


	// ShowPosition, used by geolocation to update by event. Don't use directly.
	updatePosition (position) {
		this.lat   = position.coords.latitude;
		this.long  = position.coords.longitude;
		this.pos_x = (this.long-this.init_z) * (40000000/360);
		this.pos_z = (this.lat-this.init_x) * (40000000/360) * Math.cos(this.long*this.deg_rad);
		this.camera.setAttribute("position", this.pos_x+" 2 "+this.pos_z);
		console.log("lat and long: ", this.lat, this.long, "x and z: ", this.pos_x, this.pos_z);
		this.emit("update", {
			lat: this.lat, 
			long: this.long
		});
	}

	removeObject(id){
		if(document.getElementById(id)){
			var sphere = document.getElementById(id);
			sphere.parentNode.removeChild(sphere);
		}		
	}

	generatePosition (lat, long) {
		var pos_x = (long-this.init_z) * (40000000/360);
		var pos_z = (lat-this.init_x) * (40000000/360) * Math.cos(long*this.deg_rad);
		return pos_x + " 2 " + pos_z;
	}

	clamp (x,y, limit) {
		if (x> limit) x =  limit;
		if (x<-limit) x = -limit;
		if (y> limit) y =  limit;
		if (y<-limit) y = -limit;
		return [x,y];		
	}

	/*updateCameraValues () {
		this.cam_position.setFromMatrixPosition(this.camera.object3D.matrixWorld);
		this.cam_rotation.setFromQuaternion(this.camera.object3D.quaternion);
	}*/

	relativeRotation (camera_id, obj_x, obj_z) {
		var rot;
		if (x2<x1 && y2<y1)
			rot = Math.atan( (x2-x1)/(y2-y1) ) * this.rad_deg;
		else if (x2<x1 && y2>=y1)
			rot = 90 - Math.atan( (y2-y1)/(x2-x1) ) * this.rad_deg;
		else if (x2>=x1 && y2>=y1)
			rot = -180 + Math.atan( (x2-x1)/(y2-y1) ) * this.rad_deg;
		else
			rot = Math.atan( (x2-x1)/(y2-y1) ) * this.rad_deg;

		return rot - (cam_rotation.z*this.rad_deg);
	}

	addObject (id) {
		var scene = document.getElementById("main-scene");
		var element = document.createElement("a-sphere");
		element.setAttribute("position", "0 0 0");
		element.setAttribute("radius", "1.25");
		element.setAttribute("color", "#FF88AA");
		element.setAttribute("id", id); //this sets the id of the object.
		scene.appendChild(element);
		console.log("SPHERE: ", element);
	}

	updateObject (id, lat, long) {
		console.log("FUCK", id);
		var per = document.getElementById(id);
		if (per == null) {
			this.addObject(id);
		}
		else {
			per.setAttribute("position", this.generatePosition(lat, long));	
		}
		console.log(this.generatePosition(lat,long));
	}
}