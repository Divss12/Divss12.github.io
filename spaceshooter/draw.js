class Draw{
    constructor(ctx, sctx, bg, projectiles, ship, enemies, score, pwrups, audio){
        this.ctx = ctx;
        this.sctx = sctx;
        this.bg = bg;
        this.projectiles = projectiles;
        this.ship = ship;
        this.enemies = enemies;
        this.score = score;
        this.pwrups = pwrups;
        this.audio = audio;

        this.pauseAnimation = false;

        this.difficulty = 0;
        this.gameOver = 0;

        this.menuPos = -300;
        this.menu = true;
        this.buttonPress = -1;

        this.displayFPS = true;

        this.menuImg = new Image();
        this.playButtonImg = new Image();
        this.playButtonDownImg = new Image();
        this.gameOverScreen = new Image();
        this.menuImg.src = "assets/icons/title.png"
        this.playButtonImg.src = "assets/icons/playbutton1.png"
        this.playButtonDownImg.src = "assets/icons/playbutton2.png"
        this.gameOverScreen.src = "assets/icons/gameover.png"

        this.dialogueCD = 0;
        this.dialogueN = 0;

        this.enem0CD = 5000;
        this.enem1CD = 5000;
        this.enem3CD = 10000;
        this.enem4CD = 15000;
        this.enem5CD = 0;
        this.enem6CD = 10000;
        this.pwrupCD = 1000;

        this.lastTimeStamp = 0;
        this.gameTicks = 0;
    }

    director(frame){        

        if(this.difficulty == 0){
            if(this.dialogueCD <= 0){
                switch(this.dialogueN){
                    case 0: 
                        this.score.addDialogue("Captain! We're about to enter a dangerous part of space"); 
                        this.dialogueCD += 3500;
                        this.dialogueN++;
                        break;
                    case 1: 
                        this.score.addDialogue("Fleets of dangerous space pirates patrol these parts"); 
                        this.dialogueCD += 3500;
                        this.dialogueN++;
                        break;
                    case 2: 
                        this.score.addDialogue("You pilot the ship with WASD/Arrow keys, and I'll be on the lookout!"); 
                        this.dialogueCD += 3500;
                        this.difficulty++;
                        break;
                }
            }
        } else {
            if(this.score.enemiesToNextDiff < 0){
                this.score.enemiesToNextDiff = 12;
                this.difficulty++
                if(this.difficulty > 3 && this.difficulty%3==1){
                    this.enemies.genEnemy(2)
                }
            }

            if(this.enem0CD <= 0){
                this.enemies.genEnemy(0);
                this.enem0CD += 60000/(this.difficulty+4); 
            }
            if(this.enem1CD <= 0){
                this.enemies.genEnemy(1);
                this.enem1CD += 125000/(this.difficulty+5); 
            }
            if(this.enem3CD <= 0){
                this.enemies.genEnemy(3);
                this.enem3CD += 100000/(this.difficulty+4);
            }
            if(this.enem4CD <= 0){
                this.enemies.genEnemy(4);
                this.enem4CD += 100000/(this.difficulty+4);
            }
            if(this.enem5CD <= 0){
                this.enemies.genEnemy(5);
                this.enem5CD += 50000/(this.difficulty+5);
            }
            if(this.enem6CD <= 0){
                this.enemies.genEnemy(6, this.ship.getY())
                this.enem6CD += 100000/(this.difficulty+4);
            }
            if(this.pwrupCD <= 0){
                var type;
                if(this.score.health > 14){type = randRange(1,4)}
                else{type = randRange(-2,4);}
                if(type<0){type=0}
                var x = randRange(100, 236)
                this.pwrups.spawnPowerUp(type, x, -20);
                this.pwrupCD += 40000
            }
            

            this.enem0CD -= frame;
            this.enem1CD -= frame;
            this.enem3CD -= frame;
            this.enem4CD -= frame;
            this.enem5CD -= frame;
            this.enem6CD -= frame;
            this.pwrupCD -= frame;
        }

        this.gameTicks += frame;
        this.dialogueCD -= frame;
        
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

        //play again
        if(this.gameOver){
            this.difficulty = 1;
            this.dialogueCD = 0;
            this.dialogueN = 0;

            this.enem0CD = 5000;
            this.enem1CD = 5000;
            this.enem3CD = 10000;
            this.enem4CD = 15000;
            this.enem5CD = 0;
            this.enem6CD = 10000;
            this.pwrupCD = 1000;

            this.gameTicks = 0;

            this.enemies.clear();
            this.projectiles.clear();
            this.ship.clear();
            this.score.clear();

            this.gameOver = false;
        }
    }

    scoreMouseMove(x, y){
        if(96 < x&&x < 110 && 1 < y&&y < 16){
            this.score.settingsHover = true;
        }
        else{
            this.score.settingsHover = false;
        }
    }

    tabOut(){
        this.pauseAnimation = true;
    }

    tabIn(){
        this.pauseAnimation = false;
    }

    draw(timestamp){
        if(this.pauseAnimation){
            window.requestAnimationFrame(this.draw.bind(this));
            
            this.lastTimeStamp = timestamp;
            return;
        }

        if(this.gameOver){
            this.ctx.drawImage(this.gameOverScreen, 0, 0);
            this.lastTimeStamp = timestamp;
            window.requestAnimationFrame(this.draw.bind(this));
            return;
        }

        var frame = timestamp - this.lastTimeStamp;
        if(isNaN(frame)){frame = 0}

         
        this.bg.draw(frame, this.difficulty, this.ship.destroy);
        this.score.draw(frame, !this.menu);

        if(this.menu){
            if(this.menuPos < 0){this.menuPos += frame*0.15;}
                
            if(this.buttonPress == -1){this.ctx.drawImage(this.playButtonImg, 140, this.menuPos+183);}
            else  {this.buttonPress--; this.ctx.drawImage(this.playButtonDownImg, 140, this.menuPos+183);}
            if(this.buttonPress == 0){this.menu = false; this.audio.playMusic();}
            

            this.ctx.drawImage(this.menuImg, 0, this.menuPos);
            
        }else{
            this.projectiles.draw(frame, this.enemies.lst);
            this.enemies.draw(frame, this.ship.getX());
            this.pwrups.draw(frame);

            this.ship.checkCollisions(this.projectiles.lst);
            this.ship.checkEnemyCollisions(this.enemies.lst);
            
            this.director(frame);
        }
        
        this.ship.draw(frame, this.menu);
        
        if(this.displayFPS){
            var framerate = Math.round(1000/frame);
            this.sctx.font = "8px monospace"
            this.sctx.fillStyle = "#99e550"
            this.sctx.fillText("fps: " + framerate, 60, 260)
        }

        if(this.ship.gameOver){
            this.gameOver = true;
            var hiscore = window.localStorage.getItem('hiscore');
            if(hiscore === null){hiscore = 0}
            if(this.score.distActualVal > hiscore){
                window.localStorage.removeItem('hiscore');
                window.localStorage.setItem('hiscore', this.score.distActualVal)
            }

            console.log('hiscore = ', window.localStorage.getItem('hiscore'));
        }




        this.lastTimeStamp = timestamp;
        window.requestAnimationFrame(this.draw.bind(this))
    }
}