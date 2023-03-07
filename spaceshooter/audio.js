class AudioManager {
    constructor(){
        this.hit = new Audio("assets/audio/hit.wav");
        this.beeps1 = new Audio("assets/audio/beeps1.wav");

        this.musicMuted = false;
        this.music = new Audio("assets/audio/music.ogg");
        this.music.loop = true;
    } 

    playHit(){
        this.hit.play();
    }

    playMusic(){
        this.music.play();
    }

    playBeeps1(){
        this.beeps1.play();
    }

    setMute(bool){
        this.musicMuted = bool;
        this.music.muted = bool;
    }
}
