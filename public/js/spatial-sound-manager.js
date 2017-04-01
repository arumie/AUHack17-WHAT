class SpatialSoundManager {
	constructor() {
		this.checkSupport();
		
		this.soundSources = {};
		this.soundListener = {};

		this.audioContext = new AudioContext();

		this.initSoundListener();
	}

	checkSupport(){
		window.AudioContext = (window.AudioContext||window.webkitAudioContext||null);
		
		if(!AudioContext)
			throw new Error("SOUND-CONVERTER: Not supported AudioContext");
	}
	 
	initSoundListener(){
		this.soundListener = this.audioContext.listener;
		this.soundListener.setOrientation(0,0,-1,0,1,0);
	}

	addSoundSource(id, mediaStream){
		var sound = {};

		sound.source = this.audioContext.createMediaStreamSource(mediaStream);

		sound.volume = this.audioContext.createGain();
		sound.source.connect(sound.volume);

		sound.panner = this.audioContext.createPanner();
		sound.volume.connect(sound.panner);

		sound.panner.connect(this.audioContext.destination);

		sound.panner.panningModel = 'HRTF';
		sound.panner.distanceModel = 'inverse';

		sound.panner.maxDistance = 1000;
		sound.panner.rolloffFactor = 0.5;
		sound.panner.coneInnerAngle = 360;
		sound.panner.coneOuterAngle = 0;
		sound.panner.coneOuterGain = 0;

		this.soundSources[id] = sound;

		this.setSourcePosition(id, 0, 0, 0);

		console.log("Added stream for peer " + id);
	}

	setSourceOrientation(id, x,y,z){
		var sound = this.soundSources[id];

		if(sound.panner.orientationX) {
			sound.panner.orientationX.value = x;
			sound.panner.orientationY.value = y;
			sound.panner.orientationZ.value = z;
		} else
			sound.panner.setOrientation(x,y,z);
	}

	setSourcePosition(id, x, y, z){
		var sound = this.soundSources[id];

		if(sound.panner.positionX){
			sound.panner.positionX.value = x;
			sound.panner.positionY.value = y;
			sound.panner.positionZ.value = z;
		} else 
			sound.panner.setPosition(x,y,z);      
	}

	setListenerPosition(x,y,z){
		if(this.soundListener.positionX){
			this.soundListener.positionX.value = x;
			this.soundListener.positionY.value = y;
			this.soundListener.positionZ.value = z;
		} else 
			this.soundListener.setPosition(x,z,y);
		     
	}

	setListenerOrientation(x,y,z,l){
		if(this.soundListener.orientationX) {
			this.soundListener.orientationX.value = x;
			this.soundListener.orientationY.value = y;
			this.soundListener.orientationZ.value = z;
		} else 		
			this.soundListener.setOrientation(x,y,z);
	}

		getRandomInt(min, max) {
  		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}