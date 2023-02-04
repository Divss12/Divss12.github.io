class Draw{
    constructor(ctx, sctx, bg, projectiles, ship, enemies, score, pwrups){
        this.ctx = ctx;
        this.sctx = sctx;
        this.bg = bg;
        this.projectiles = projectiles;
        this.ship = ship;
        this.enemies = enemies;
        this.score = score;
        this.pwrups = pwrups;

        this.menuPos = -300;
        this.menu = true;
        this.buttonPress = -1;

        this.displayFPS = true;

        this.menuImg = new Image();
        this.playButtonImg = new Image();
        this.playButtonDownImg = new Image();

        this.menuImg.src = "assets/icons/title.png"
        this.playButtonImg.src = "assets/icons/playbutton1.png"
        this.playButtonDownImg.src = "assets/icons/playbutton2.png"

        this.lastTimeStamp = 0;
    }

    director(){
        this.pwrups.spawnPowerUp(2, 100, -10)
        this.enemies.testing_gen();
    }

    mouseMove(x, y){
        
    }

    mouseClick(x, y){
        //play button;
        if(this.menu && this.menuPos >= 0){
            if(140<x && x<212 && 183<y && y<219){
                this.buttonPress = 15;
            }
        }
    }

    draw(timestamp){
        var frame = timestamp - this.lastTimeStamp;
        if(isNaN(frame)){frame = 0}

        this.bg.draw(frame);
        this.ship.draw(frame, this.menu);
        this.score.draw(frame, !this.menu);

        if(this.menu){
            if(this.menuPos < 0){this.menuPos += frame*0.15;}
                
            if(this.buttonPress == -1){this.ctx.drawImage(this.playButtonImg, 140, this.menuPos+183);}
            else  {this.buttonPress--; this.ctx.drawImage(this.playButtonDownImg, 140, this.menuPos+183);}
            if(this.buttonPress == 0){this.menu = false; this.director();}
            

            this.ctx.drawImage(this.menuImg, 0, this.menuPos);
            
        }else{
            this.projectiles.draw(frame, this.enemies.lst);
            this.enemies.draw(frame, this.ship.getX());
            this.pwrups.draw(frame);
        }
        
        //setTimeout(this.draw.bind(this), 12);
        
        if(this.displayFPS){
            var framerate = Math.round(1000/frame);
            this.sctx.font = "8px monospace"
            this.sctx.fillStyle = "#99e550"
            this.sctx.fillText("fps: " + framerate, 80, 260)
        }

        this.lastTimeStamp = timestamp;
        window.requestAnimationFrame(this.draw.bind(this))
    }
}