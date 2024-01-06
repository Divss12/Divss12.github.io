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

        this.settingsOpen = false;
        this.hiscoreOpen = false;

        this.difficulty = 0;
        this.gameOver = 0;

        this.menuPos = -300;
        this.menu = true;
        this.buttonPress = -1;

        this.musicVolume = 99;
        this.sfxVolume = 99;
        this.godmode = false;
        this.displayFPS = false;
        this.mobileControls = false

        this.menuImg = new Image();
        this.playButtonImg = new Image();
        this.playButtonDownImg = new Image();
        this.gameOverScreen = new Image();
        this.settingsMenu = new Image();
        this.onoff = new Image();
        this.nums = new Image();
        this.hiscorescreen = new Image();
        this.menuImg.src = "assets/icons/title.png"
        this.playButtonImg.src = "assets/icons/playbutton1.png"
        this.playButtonDownImg.src = "assets/icons/playbutton2.png"
        this.gameOverScreen.src = "assets/icons/gameover.png"
        this.settingsMenu.src = "assets/icons/settingspage.png"
        this.onoff.src = "assets/icons/onoff.png"
        this.nums.src = "assets/fonts/numbers.png"
        this.hiscorescreen.src = "assets/icons/hiscorescreen.png"

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

    importSettings(){
        this.musicVolume = window.localStorage.getItem("musicvolume") ?? 99;
        this.sfxVolume = window.localStorage.getItem("sfxvolume") ?? 99;
        this.godmode = (window.localStorage.getItem("godmode") === 'true');
        this.displayFPS = (window.localStorage.getItem("displayfps") === 'true');
        this.mobileControls = (window.localStorage.getItem("mobilecontrols") === 'true');
        this.score.audioMuted = (window.localStorage.getItem("audiomuted") === 'true');
    
        if(this.score.audioMuted){
            this.audio.setMute(true);
        }
    }

    exportSettings(){
        window.localStorage.setItem("musicvolume", this.musicVolume);
        window.localStorage.setItem("sfxvolume", this.sfxVolume);
        window.localStorage.setItem("godmode", this.godmode);
        window.localStorage.setItem("displayfps", this.displayFPS);
        window.localStorage.setItem("mobilecontrols", this.mobileControls);
        window.localStorage.setItem("audiomuted", this.score.audioMuted);
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

                if(this.difficulty > 2 && this.difficulty%3 == 0){
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
        if(this.menu && this.menuPos >= 0 && !this.settingsOpen && !this.hiscoreOpen){
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

        if(this.settingsOpen){
            if(198 < x&&x < 205 && 71 < y&&y < 82 && this.musicVolume > 0){
                this.musicVolume--;
                //this.audio.
            }else if(225 < x&&x < 232 && 71 < y&&y < 82 && this.musicVolume < 99){
                this.musicVolume++;
            }else if(198 < x&&x < 205 && 87 < y&&y < 98 && this.sfxVolume > 0){
                this.sfxVolume--;
            }else if(225 < x&&x < 232 && 87 < y&&y < 98 && this.sfxVolume < 99){
                this.sfxVolume++;
            }
            if(199 < x&&x < 218 && 102 < y&&y < 114){this.godmode = !this.godmode}
            if(199 < x&&x < 218 && 118 < y&&y < 130){this.displayFPS = !this.displayFPS}
            if(199 < x&&x < 218 && 150 < y&&y < 162){this.mobileControls = !this.mobile}

            this.exportSettings();
        }

        if(this.hiscoreOpen){
            if(162 < x&&x < 190 && 191 < y&&y < 203){
                this.hiscoreOpen = false;
                this.score.hiscoreDown = false;
            }
        }
    }

    scoreMouseMove(x, y){
        if(96 < x&&x < 110 && 1 < y&&y < 16){
            this.score.settingsHover = true;
        }else{
            this.score.settingsHover = false;
        }

        if(79 < x&&x < 93 && 1 < y&&y < 16){
            this.score.audioHover = true;
        }else{
            this.score.audioHover = false;
        }

        if(62 < x&&x < 76 && 1 < y&&y < 16){
            this.score.hiscoreHover = true;
        }else{
            this.score.hiscoreHover = false;
        }
    }

    scoreMouseClick(x, y){
        if(96 < x&&x < 110 && 1 < y&&y < 16){
            this.score.settingsOpen = !this.score.settingsOpen;
            this.settingsOpen = !this.settingsOpen;

            if(this.settingsOpen){this.hiscoreOpen = false; this.score.hiscoreDown = false;}
        }

        if(79 < x&&x < 93 && 1 < y&&y < 16){
            
            this.score.audioMuted = !this.score.audioMuted;
            this.audio.setMute(this.score.audioMuted);
            this.exportSettings();
        }

        if(62 < x&&x < 76 && 1 < y&&y < 16){
            this.score.hiscoreDown = !this.score.hiscoreDown;
            this.hiscoreOpen = !this.hiscoreOpen;

            if(this.hiscoreOpen){this.settingsOpen = false; this.score.settingsOpen = false;}
        }
    }

    tabOut(){
        this.pauseAnimation = true;
        this.audio.setMute(true);
    }

    tabIn(){
        this.pauseAnimation = false;
        this.audio.setMute(this.score.audioMuted);
    }

    draw(timestamp){

        var frame = timestamp - this.lastTimeStamp;
        if(isNaN(frame)){frame = 0}

        if(this.hiscoreOpen){
            this.bg.draw(frame, this.difficulty, this.gameOver);
            this.score.draw(frame, false);
            this.ctx.drawImage(this.hiscorescreen, 0, 0);

            //hiscore distance covered;
            this.ctx.font = "32px font1"
            this.ctx.fillStyle = "#bab7b3"
            this.ctx.fillText(hiscore, 270, 118);
            
            this.ctx.fillStyle = "#fbf5ef"
            this.ctx.fillText(hiscore, 270, 117);

            //hiscore enemies killed;
            this.ctx.fillStyle = "#bab7b3"
            this.ctx.fillText(hienemies, 270, 150);
            
            this.ctx.fillStyle = "#fbf5ef"
            this.ctx.fillText(hienemies, 270, 149);

            this.lastTimeStamp = timestamp
            window.requestAnimationFrame(this.draw.bind(this));
            return;            
        }

        if(this.settingsOpen){
            this.bg.draw(frame, this.difficulty, this.gameOver);
            this.ctx.drawImage(this.settingsMenu, 0, 0);
            this.score.draw(frame, false);

            //musicVolume
            this.ctx.drawImage(this.nums, 8*Math.floor(this.musicVolume/10), 0, 7, 13, 207, 69, 7, 13);
            this.ctx.drawImage(this.nums, 8*(this.musicVolume%10), 0, 7, 13, 216, 69, 7, 13);

            //sfxVolume
            this.ctx.drawImage(this.nums, 8*Math.floor(this.sfxVolume/10), 0, 7, 13, 207, 86, 7, 13);
            this.ctx.drawImage(this.nums, 8*(this.sfxVolume%10), 0, 7, 13, 216, 86, 7, 13);

            //godmode
            if(this.godmode){this.ctx.drawImage(this.onoff, 0, 0, 16, 8, 200, 104, 16, 8)}
            else{this.ctx.drawImage(this.onoff, 16, 0, 18, 8, 200, 104, 18, 8)}

            //fps display
            if(this.displayFPS){this.ctx.drawImage(this.onoff, 0, 0, 16, 8, 200, 120, 16, 8)}
            else{this.ctx.drawImage(this.onoff, 16, 0, 18, 8, 200, 120, 18, 8)}

            //mobile controls
            if(this.mobileControls){this.ctx.drawImage(this.onoff, 0, 0, 16, 8, 200, 152, 16, 8)}
            else{this.ctx.drawImage(this.onoff, 16, 0, 18, 8, 200, 152, 18, 8)}

            this.lastTimeStamp = timestamp
            window.requestAnimationFrame(this.draw.bind(this));
            return;
        }

        if(this.pauseAnimation){
            this.lastTimeStamp = timestamp;
            window.requestAnimationFrame(this.draw.bind(this));
            return;
        }

        if(this.gameOver){
            this.bg.draw(frame, 0, true)
            this.score.draw(frame, false)
            this.ctx.drawImage(this.gameOverScreen, 0, 0);
            this.lastTimeStamp = timestamp;
            window.requestAnimationFrame(this.draw.bind(this));
            return;
        }
         
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
            this.enemies.draw(frame, this.ship.getX(), this.godmode);
            this.pwrups.draw(frame);

            this.ship.checkCollisions(this.projectiles.lst, this.godmode);
            this.ship.checkEnemyCollisions(this.enemies.lst, this.godmode);
            
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

            hiscore = window.localStorage.getItem('hiscore');
            if(hiscore === null){hiscore = 0}
            if(this.score.distActualVal > hiscore){
                window.localStorage.removeItem('hiscore');
                window.localStorage.setItem('hiscore', this.score.distActualVal)
                hiscore = this.score.distActualVal;
            }

            hienemies = window.localStorage.getItem('hienemies');
            if(hienemies === null){hienemies = 0}
            if(this.score.enemActualVal > hienemies){
                window.localStorage.removeItem('hienemies');
                window.localStorage.setItem('hienemies', this.score.enemActualVal)
                hienemies = this.score.enemActualVal;
            }
        }




        this.lastTimeStamp = timestamp;
        window.requestAnimationFrame(this.draw.bind(this))
    }
}
