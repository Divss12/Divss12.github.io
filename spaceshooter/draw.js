class Draw{
    constructor(ctx, bg, projectiles, ship, enemies, score, pwrups){
        this.ctx = ctx;
        this.bg = bg;
        this.projectiles = projectiles;
        this.ship = ship;
        this.enemies = enemies;
        this.score = score;
        this.pwrups = pwrups;

        this.menuPos = -270;
        this.menu = true;
        this.buttonPress = -1;

        this.menuImg = new Image();
        this.playButtonImg = new Image();
        this.playButtonDownImg = new Image();

        this.menuImg.src = "assets/icons/title.png"
        this.playButtonImg.src = "assets/icons/playbutton1.png"
        this.playButtonDownImg.src = "assets/icons/playbutton2.png"
    }

    director(){
        this.pwrups.spawnPowerUp(2, 100, -10)
        this.enemies.testing_gen();
    }

    mouseMove(x, y){
        
    }

    mouseClick(x, y){
        //play button;
        if(this.menu && this.menuPos == 0){
            if(140<x && x<212 && 183<y && y<219){
                this.buttonPress = 15;
            }
        }
    }

    draw(){
        this.bg.draw();
        this.ship.draw();
        this.score.draw(!this.menu);

        if(this.menu){
            if(this.menuPos < 0){this.menuPos += 2.5;}
                
            if(this.buttonPress == -1){this.ctx.drawImage(this.playButtonImg, 140, this.menuPos+183);}
            else  {this.buttonPress--; this.ctx.drawImage(this.playButtonDownImg, 140, this.menuPos+183);}
            if(this.buttonPress == 0){this.menu = false; this.director();}
            

            this.ctx.drawImage(this.menuImg, 0, this.menuPos);
            
        }else{
            this.projectiles.draw(this.enemies.lst);
            this.enemies.draw(this.ship.getX());
            this.pwrups.draw();
        }
        setTimeout(this.draw.bind(this), 12);
    }
}