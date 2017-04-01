class Main {
	constructor() {
		const self = this;

		this.doStuffElem = document.getElementById("do-stuff");
		this.spatialSoundManager = new SpatialSoundManager();

		this.sounds = new Sounds();
		this.voiceChat = new VoiceChat();

		this.geolocation = new GeoService()

		this.doStuffArr = doStuffArray;
		this.doStuffElem.innerHTML = 'Welcome!'

		setTimeout(this.removeInitializationScreen, 4000);
		setInterval(function(){
			var elem = document.getElementById("do-stuff");
			var randomNr =   self.getRandomInt(0,self.doStuffArr.length-1);
			self.doStuffElem.innerHTML = self.doStuffArr[randomNr];
		}, 1000);

		navigator.getUserMedia({video: false, audio: true}, function(localMediaStream) {
			console.log("Sound!", localMediaStream);

			self.spatialSoundManager.addSoundSource("id1", localMediaStream);
			self.spatialSoundManager.setSourcePosition("id1", 300, 0, 0);

			self.spatialSoundManager.addSoundSource("id2", localMediaStream);
			self.spatialSoundManager.setSourcePosition("id2", -300, 0, 0);
		});

		this.bindWebrtcEvent();
		this.bindGeoEvents();
	}

	bindWebrtcEvent(){
		const self = this;

		this.voiceChat.on("newPeer", function(data){
			console.log("newPeer", data);
			self.sounds.error();
		});

		this.voiceChat.on("data", function(data){
			console.log("message", data);
		});
	}

	bindGeoEvents(){
		const self = this;

		this.geolocation.on("update", function(data){
			console.log("GEO: ", data);
		});
	}

	removeInitializationScreen() {
		document.getElementById("loading-screen").style = "display: none";
		document.getElementById("main-scene").style = "display: block";
	}


	getRandomInt(min, max) {
  		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}

//init voicechat when dom is loaded
document.addEventListener('DOMContentLoaded', function() {
	new Main();
});