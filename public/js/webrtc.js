const dataType = {
	geodata: 0,
	other: 1 	
}

class VoiceChat {
	constructor(){
		this.room = "auhack-what";
		this.peerStreams = {};

		this.createAudioElement();
		this.initWebRTC();
		this.joinRoom(this.room);
	}

	createAudioElement(){
		var audio = document.createElement('audio');
		audio.id = 'webrtc-audio';
		audio.controls = 'controls';
		audio.style = 'display: none;';
		document.body.appendChild(audio);
		this.audio = document.getElementById('webrtc-audio');
	}

	initWebRTC(){
		const self = this;

		this.webrtc = new SimpleWebRTC({
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
			console.log("WEBRTC: Local stream started!");
		});

		this.webrtc.on('createdPeer', function (peer) {
			//Called when a peer is created
			console.log(peer);

			if (peer && peer.pc) {
				peer.pc.on('iceConnectionStateChange', function (event) {
					var state = peer.pc.iceConnectionState;
					switch (state) {
					case 'connected':
						console.log("WEBRTC: " + event);
					case 'completed':
						console.log("WEBRTC: " + event);
						self.audio.srcObject = peer.stream;
						self.peerStreams[peer.stream.id] = peer.stream;
					}
				});
			}
		});

		this.webrtc.connection.on('message', function (message) {
			//Message received
			console.log("WEBRTC: Message", message);
		});

		this.webrtc.on('iceFailed', function (peer) {
			//Local p2p/ice failure
			console.error("WEBRTC: local p2p/ice failure");
		});

		this.webrtc.on('connectivityError', function (peer) {
			//Remote p2p/ice failure
			console.error("WEBRTC: remote p2p/ice failure");
		});
	}

	broadcastData(datatype, data) {
		if(!this.webrtc) {
			console.error("WEBRTC: error webrtc not initialized!");
			return;
		}

		this.webrtc.sendToAll(datatype, data);
	}

	joinRoom(room){
		console.log("WEBRTC: joining room " + room);

		this.webrtc.joinRoom(room, function (err, res) {
			// TODO
			console.log("WEBRTC: Joined " + room);
			console.log(err, res);
		});
	}

	getStreams() {
		return Object.values(this.peerStreams);
	}
}

var voiceChat = null;

//init voicechat when dom is loaded
document.addEventListener('DOMContentLoaded', function() {
	voiceChat = new VoiceChat();
});