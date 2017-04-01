class SoundConverter {
  constructor() {   
      const self = this;
      this.listener = {};
      this.init();
  }
   
   init(){
       window.AudioContext = ( window.AudioContext||window.webkitAudioContext||null);
       if(!AudioContext){
           throw new Error("Not supported AudioContext");
       }

       var ctx = new AudioContext();
       var mainVolume = ctx.createGain();

       mainVolume.connect(ctx.destination);

       var sound = {};
       sound.source = ctx.createBufferSource();
       sound.source.loop = true;
       sound.volume = ctx.createGain();
       sound.source.connect(sound.volume);


       sound.panner = ctx.createPanner();
       sound.volume.connect(sound.panner);
       sound.panner.connect(mainVolume);

       sound.panner.panningModel = 'HRTF';
       sound.panner.distanceModel = 'inverse';
       sound.panner.refDistance = 1;
       sound.panner.maxDistance = 10000;
       sound.panner.rolloffFactor = 1;
       sound.panner.coneInnerAngle = 360;
       sound.panner.coneOuterAngle = 0;
       sound.panner.coneOuterGain = 0;

       if(sound.panner.orientationX) {
             sound.panner.orientationX.value = 1;
             sound.panner.orientationY.value = 0;
             sound.panner.orientationZ.value = 0;
        } else {
             sound.panner.setOrientation(1,0,0);
        }
        

       this.listener = ctx.listener;

        if(this.listener.forwardX) {
           this.listener.forwardX.value = 0;
           this.listener.forwardY.value = 0;
           this.listener.forwardZ.value = -1;
           this.listener.upX.value = 0;
           this.listener.upY.value = 1;
           this.listener.upZ.value = 0;
        } else {
            this.listener.setOrientation(0,0,-1,0,1,0);
        }

         this.setListenerPosition(-50,100,10,this.listener);

        var request = new XMLHttpRequest();
        request.open("GET", "../assets/ringetone.mp3", true);
        request.responseType = "arraybuffer";
        request.onload = function(e) {

        // Create a buffer from the response ArrayBuffer.
        ctx.decodeAudioData(this.response, function onSuccess(buffer) {
            sound.buffer = buffer;

            // Make the sound source use the buffer and start playing it.
            sound.source.buffer = sound.buffer;
            sound.source.start(ctx.currentTime);
        }, function onFailure() {
            alert("Decoding the audio buffer failed");
        });
        };
        request.send();
   }

   setPannerOrientation(x,y,z,p){
       if(p.orientationX) {
            p.orientationX.value = x;
            p.orientationY.value = y;
            p.orientationZ.value = z;
        } else {
            p.setOrientation(x,y,z);
        }
   }
   

   setPannerPosition(x, y, z, p){
       if(p.positionX){
           p.positionX.value = x;
           p.positionY.value = y;
           p.positionZ.value = z;
       } else {
           p.setPosition(x,y,z);
       }       
   }

   setListenerPosition(x,y,z){
       if(this.listener.positionX){
           this.listener.positionX.value = x;
           this.listener.positionY.value = y;
           this.listener.positionZ.value = z;
       } else {
           this.listener.setPosition(x,z,y);
       }       
   }

   setListenerOrientation(x,y,z,l){
       if(this.listener.orientationX) {
            this.listener.orientationX.value = x;
            this.listener.orientationY.value = y;
            this.listener.orientationZ.value = z;
        } else {
            this.listener.setOrientation(x,y,z);
        }
   }
   


}