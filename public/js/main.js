class Main {
	constructor() {
		const self = this;

		this.doStuffElem = document.getElementById("do-stuff");
		this.voiceChat = new VoiceChat();
		this.geolocation = new GeoService();
		this.sounds = new Sounds();
		
		this.doStuffArr = doStuffArray;

		this.sounds.ringtone();
		setTimeout(this.removeInitializationScreen, 5000);
		this.doStuffElem.innerHTML = 'Welcome!'
		setInterval(function(){
			var elem = document.getElementById("do-stuff");
			var randomNr =   self.getRandomInt(0,self.doStuffArr.length-1);
			self.doStuffElem.innerHTML = self.doStuffArr[randomNr];
		}, 1000);
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