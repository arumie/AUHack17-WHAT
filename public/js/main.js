class Main {
	constructor() {
		this.voiceChat = new VoiceChat();
		this.geolocation = new GeoService();

		setTimeout(this.removeInitializationScreen, 4000);
	}

	removeInitializationScreen() {
		document.getElementById("loading-screen").style = "display: none";
		document.getElementById("main-scene").style = "display: block";
	}
}

//init voicechat when dom is loaded
document.addEventListener('DOMContentLoaded', function() {
	new Main();
});