const dataType = {
	geodata: 0,
	other: 1 	
}

class VoiceChat extends EventEmitter {
	constructor(){
		super();

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
			enableDataChannels: true,
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
			if (peer && peer.pc) {
				peer.pc.on('iceConnectionStateChange', function (event) {
					var state = peer.pc.iceConnectionState;

					if (state == 'completed') {
						if(!self.peerStreams[peer.stream.id]) {
							console.log("WEBRTC: new peer " + peer.id);
							self.emit("newPeer", peer);
						}

						self.audio.srcObject = peer.stream;
						self.peerStreams[peer.stream.id] = peer.stream;
					}
				});
			}

			this.id = self.webrtc.connection.connection.id;
		});

		this.webrtc.connection.on('message', function (message) {
			//Message received
			if(message.type == "data")
				self.emit("data", message);
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
			console.log("WEBRTC: Joined room " + room);
		});
	}

	getStreams() {
		return Object.values(this.peerStreams);
	}

	getId(){
		return this.id;
	}
}