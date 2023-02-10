class AudioManager {
    constructor(){
        this.pew1 = new Audio("assets/audio/Laser_shoot 66 (1).wav")
        this.pew1.volume = 0.2
        this.pew2 = new Audio("assets/audio/Laser_shoot 66 (1).wav") 
        this.pew2.volume = 0.2

        this.music = new Audio("assets/audio/music.ogg")
        this.music.loop = true;
    } 

    playPew1(){
        //this.pew1.play()
    }

    playPew2(){
        //this.pew2.play()
    }

    playMusic(){
        this.music.play();
    }
}