class soundConverter {
  constructor() {   
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

       if(panner.orientationX) {
             sound.panner.orientationX.value = 1;
             sound.panner.orientationY.value = 0;
             sound.panner.orientationZ.value = 0;
        } else {
             sound.panner.setOrientation(1,0,0);
        }

       var listener = audioCtx.listener;

        if(listener.forwardX) {
           listener.forwardX.value = 0;
           listener.forwardY.value = 0;
           listener.forwardZ.value = -1;
           listener.upX.value = 0;
           listener.upY.value = 1;
           listener.upZ.value = 0;
        } else {
            listener.setOrientation(0,0,-1,0,1,0);
        }
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

   setListenerPosition(x,y,z,l){
       if(l.positionX){
           l.positionX.value = x;
           l.positionY.value = y;
           l.positionZ.value = z;
       } else {
           l.setPosition(x,z,y);
       }       
   }

   setListenerOrientation(x,y,z,l){
       if(l.orientationX) {
            l.orientationX.value = x;
            l.orientationY.value = y;
            l.orientationZ.value = z;
        } else {
            l.setOrientation(x,y,z);
        }
   }
   


}