class Main {
	constructor() {
		const self = this;

		this.doStuffElem = document.getElementById("do-stuff");
		this.soundConverter = new SoundConverter();
		setInterval(function() {
		  self.soundConverter.setListenerPosition(self.getRandomInt(-100,100),self.getRandomInt(-100,100), self.getRandomInt(-100,100));
      }, 2000);
		// this.voiceChat = new VoiceChat();
		// this.geolocation = new GeoService();
		this.doStuffArr = ["Stacking crates...", "Feeding the pet rock...", "Brewing coffee...", "Giving the browser a motivational speech...", "Having a blast...", "Deleting random stuff...", "Eating chips...", "Eating shit...", "WHAT...!? WHERE...!?", "Looking for a girlfriend..."];
		// this.sounds = new Sounds();

		// this.sounds.ringtone();
		setTimeout(this.removeInitializationScreen, 4000);
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