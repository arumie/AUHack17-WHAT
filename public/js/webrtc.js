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
			// local p2p/ice failure
		});

		webrtc.on('connectivityError', function (peer) {
			// remote p2p/ice failure
		});
}

document.addEventListener('DOMContentLoaded', function() {
	new VoiceChat();
});