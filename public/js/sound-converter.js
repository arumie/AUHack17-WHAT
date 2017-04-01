class SoundConverter {
  constructor() {   
      const self = this;
      this.listener = {};
      this.sound = {};
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

       this.sound.source = ctx.createBufferSource();
       this.sound.source.loop = true;
       this.sound.volume = ctx.createGain();
       this.sound.source.connect(this.sound.volume);


       this.sound.panner = ctx.createPanner();
       this.sound.volume.connect(this.sound.panner);
       this.sound.panner.connect(mainVolume);

       this.sound.panner.panningModel = 'HRTF';
       this.sound.panner.distanceModel = 'inverse';
       this.sound.panner.refDistance = 1;
       this.sound.panner.maxDistance = 1000;
       this.sound.panner.rolloffFactor = 0.6;
       this.sound.panner.coneInnerAngle = 360;
       this.sound.panner.coneOuterAngle = 0;
       this.sound.panner.coneOuterGain = 0;

       if(this.sound.panner.orientationX) {
             this.sound.panner.orientationX.value = 1;
             this.sound.panner.orientationY.value = 0;
             this.sound.panner.orientationZ.value = 0;
        } else {
             this.sound.panner.setOrientation(1,0,0);
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
        request.open("GET", "../assets/error.mp3", true);
        request.responseType = "arraybuffer";
        request.onload = function(e) {
            ctx.decodeAudioData(this.response, function onSuccess(buffer) {
                self.sound.buffer = buffer;
                self.sound.source.buffer = self.sound.buffer;
                self.sound.source.start(ctx.currentTime);
            }, function onFailure() {
                alert("Decoding the audio buffer failed");
            });
        };
        request.send();
   }

   setPannerOrientation(x,y,z){
       if(this.sound.panner.orientationX) {
            this.sound.panner.orientationX.value = x;
            this.sound.panner.orientationY.value = y;
            this.sound.panner.orientationZ.value = z;
        } else {
            this.sound.panner.setOrientation(x,y,z);
        }
   }
   

   setPannerPosition(x, y, z, p){
       if(this.sound.panner.positionX){
           this.sound.panner.positionX.value = x;
           this.sound.panner.positionY.value = y;
           this.sound.panner.positionZ.value = z;
       } else {
           this.sound.panner.setPosition(x,y,z);
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