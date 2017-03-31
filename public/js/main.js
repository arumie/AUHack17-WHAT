class Main {
	constructor() {
		this.voiceChat = new VoiceChat();
		this.geolocation = new GeoService();
	}

	
}

//init voicechat when dom is loaded
document.addEventListener('DOMContentLoaded', function() {
	new Main();
});