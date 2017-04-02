class Main {
	constructor() {
		const self = this;

		this.peerId = {id: 0};
		this.oldPeerPos = {};

		this.doStuffElem = document.getElementById("do-stuff");
		this.spatialSoundManager = new SpatialSoundManager();

		this.sounds = new Sounds();
		this.voiceChat = new VoiceChat();

		this.geolocation = new GeoService();

		this.doStuffArr = doStuffArray;

		this.doStuffElem.innerHTML = 'Welcome!'

		this.camera = document.getElementById("camera");

		//setTimeout(this.removeInitializationScreen, 4000);
		setInterval(function(){
			var elem = document.getElementById("do-stuff");
			var randomNr =   self.getRandomInt(0,self.doStuffArr.length-1);
			self.doStuffElem.innerHTML = self.doStuffArr[randomNr];
		}, 2000);

		this.bindWebrtcEvent();
		this.bindGeoEvents();
	}

	updatePeerPosition(id, data){
		this.removeInitializationScreen();

		console.log("HIS POS!: ", data);

		var factor = 500;

		var myData = this.geolocation.getPosition();

		console.log("MY POS!: ", myData);

		var myLat = myData.lat;
		var myLong = myData.long;

		var dist = this.geolocation.calcDistance(myLat, myLong, data.lat, data.long);
		var bear = this.geolocation.calcBearing(myLat, myLong, data.lat, data.long);



		var x = factor * (dist * Math.cos(bear));
		var y = factor * (dist * Math.sin(bear));

		var per = document.getElementById(id);

		if (!per) {
			var scene = document.getElementById("main-scene");
			var element = document.createElement("a-sphere");
			element.setAttribute("position", "0 0 0");
			element.setAttribute("radius", "1.25");
			element.setAttribute("color", "#FF88AA");
			element.setAttribute("id", id);
			scene.appendChild(element);
			per = element;
		}

		per.setAttribute("position", x + " 2 " + y);

		this.oldPeerPos = {lat: data.lat, long: data.long};
		this.peerId = {id: id};

		console.log("new pos: " + x + "," + y);	
	}

	updateMyPosition(data){
		if(this.peerId.length != 0 || this.oldPeerPos.length != 0){
			this.updatePeerPosition(this.peerId.id, this.oldPeerPos);
		}
	}

	bindWebrtcEvent(){
		const self = this;

		this.voiceChat.on("newPeer", function(peer){
			self.sounds.error();
			self.spatialSoundManager.addSoundSource(peer.id, peer.stream);
		});

		this.voiceChat.on("disconnectedPeer", function(peer){
			console.log("DIS!", peer);
			self.sounds.error();
			self.geolocation.removeObject(peer.id);
		});


		this.voiceChat.on("data", function(data){
			self.updatePeerPosition(data.from, data.payload);
		});
	}

	bindGeoEvents(){
		const self = this;

		this.geolocation.on("update", function(data) {
			self.voiceChat.broadcastData("data", data)
			if(self.peerId.id != 0){
				self.updateMyPosition(data);
			}			
		});
	}

	removeInitializationScreen() {
		document.getElementById("loading-screen").style = "opacity: 0;";
		document.getElementById("main-scene").style = "opacity: 1";
	}


	getRandomInt(min, max) {
  		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

//init voicechat when dom is loaded
document.addEventListener('DOMContentLoaded', function() {
	new Main();
});