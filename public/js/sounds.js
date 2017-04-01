class Sounds {
  error(){
    var audio = new Audio('../assets/error.mp3');
    audio.play();
  }
  
  entering(){
    var audio = new Audio('../assets/entering.mp3');
    audio.play();
  }

  leaving(){
    var audio = new Audio('../assets/leaving.mp3');
    audio.play();
  }

  ringtone(){
    var audio = new Audio('../assets/ringetone.mp3');
    audio.play();
  }
}
