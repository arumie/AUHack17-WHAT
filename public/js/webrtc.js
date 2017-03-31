const dataType = {
	geodata: 0,
	other: 1 	
}

class VoiceChat {
	constructor(){
		this.initWebRTC();
	}

	initWebRTC(){
		this.webrtc = new SimpleWebRTC({
			// we don't do video
			localVideoEl: '',
			remoteVideosEl: '',
			autoRequestMedia: true,
			enableDataChannels: false,
			media: {
			    audio: true,
			    video: false
			},
			receiveMedia: {
			    offerToReceiveAudio: 1,
			    offerToReceiveVideo: 0
			}
		});

		this.webrtc.on('localStream', function(stream) {
			//Called when a localstream is available
		});

		this.webrtc.on('createdPeer', function (peer) {
			//Called when a peer is created
		});

		this.webrtc.connection.on('message', function (message) {
			//Message received
		});

		this.webrtc.on('iceFailed', function (peer) {
			//Local p2p/ice failure
		});

		this.webrtc.on('connectivityError', function (peer) {
			//Remote p2p/ice failure
		});
	}

	broadcastData(datatype, data) {
		if(!this.webrtc)
			return;

		//TODO
	}
}

//init voicechat when dom is loaded
document.addEventListener('DOMContentLoaded', function() {
	new VoiceChat();
});