class AudioManager {
    constructor(){
        this.hit = new Audio("assets/audio/hit.wav");
        this.beeps1 = new Audio("assets/audio/beeps1.wav");
        this.beeps2 = new Audio("assets/audio/beeps2.wav");
        this.lasers = new Audio("assets/audio/lasers.wav");
        this.loss = new Audio("assets/audio/loss.wav");
        this.pwrup = new Audio("assets/audio/pwrup.wav");
        this.beeboop = new Audio("assets/audio/beeboop.wav");
        this.dreadnought = new Audio("assets/audio/dreadnought.wav");
        this.bhit = new Audio("assets/audio/bullethit.wav")

        this.soundMuted = false;
        this.music = new Audio("assets/audio/music.ogg");
        this.music.loop = true;
    } 

    playHit(){
        if(!this.soundMuted){
            this.hit.play();
        }
    }

    playMusic(){
        this.music.play();
    }

    playBeeps1(){
        if(!this.soundMuted){
            this.beeps1.play();
        }
    }

    playBeeps2(){
        if(!this.soundMuted){
            this.beeps2.play();
        }
    }

    playLaser(){
        if(!this.soundMuted){
            this.lasers.play();
        }
    }

    playPowerup(){
        if(!this.soundMuted){
            this.pwrup.play();
        }
    }

    playBeeboop(){
        if(!this.soundMuted){
            this.beeboop.play();
        }
    }

    playDreadnought(){
        if(!this.soundMuted){
            this.dreadnought.play();
        }
    }

    playHit(){
        if(!this.soundMuted){
            this.bhit.play();
        }
    }

    playLoss(){
        if(!this.soundMuted){
            //stop all other audio NOTE: should it be stop instead?;
            this.hit.pause();
            this.beeps1.pause();
            this.beeps2.pause();
            this.lasers.pause();
            this.pwrup.pause();
            this.beeboop.pause();
            this.dreadnought.pause();
            this.loss.play();
        }
    }

    setMute(bool){
        this.soundMuted = bool;
        //this.music.muted = bool;
        this.music.muted = true;
        if(bool){
            this.hit.pause();
            this.beeps1.pause();
            this.beeps2.pause();
            this.lasers.pause();
            this.pwrup.pause();
            this.beeboop.pause();
            this.dreadnought.pause();
        }
    }

    unpause(){
        //TODO
    }
}

