class Ship{
    constructor(ctx, projectiles, score, audio){
        this.ctx = ctx;
        this.audio = audio;

        this.projectile = projectiles;
        this.score = score;

        this.x = 177;
        this.y = 236;

        this.lastX = 176;
        this.lastY = 236;

        this.downPressed = false;
        this.upPressed = false;
        this.leftPressed = false;
        this.rightPressed = false;

        this.gunTick = 0;
        this.storedGunFrames = 0;

        this.shieldTick = 0;

        this.health = 16;
        this.invulFrames = 0;

        this.destroyFrame = 0;
        this.destroyTick = 0;
        this.destroy = false;
        this.gameOver = false;

        this.bulletType = 3;
        this.bulletSpeed = 4;
        this.bulletDmg = 4;

        this.sprites = {
            center: new Image(),
            left: new Image(),
            right: new Image(),
            //back: new Image()
            engine: new Image(),
            enginep: new Image(),
            shield: new Image(),
            destroy: new Image(),
        }
        this.sprites.center.src = "assets/ship/center.png";
        this.sprites.left.src = "assets/ship/left.png";
        this.sprites.right.src = "assets/ship/right.png";
        this.sprites.engine.src = "assets/ship/engine0.png";
        this.sprites.enginep.src = "assets/ship/engine1.png";
        this.sprites.shield.src = "assets/ship/shield.png";
        this.sprites.destroy.src = "assets/ship/destroy.png";

        this.engineSupercharged = 0;
        this.shield = false;
        this.shieldHealth = 0;

        this.eframe = 0;
        this.etick = 0;
        this.erandom = 0;
    }

    clear(){
        this.x = 176;
        this.y = 236;

        this.lastX = 176;
        this.lastY = 236;

        this.gunTick = 0;
        this.storedGunFrames = 0;

        this.shieldTick = 0;

        this.health = 16;
        this.invulFrames = 0;

        this.destroyFrame = 0;
        this.destroyTick = 0;
        this.destroy = false;
        this.gameOver = false;

        this.bulletType = 3;
        this.bulletSpeed = 4;
        this.bulletDmg = 4;

        this.engineSupercharged = 0;
        this.shield = false;
        this.shieldHealth = 0;

        this.eframe = 0;
        this.etick = 0;
        this.erandom = 0;

    }

    addPwrup(type){
        switch(type){
            case 0: //health pickup
                this.health += 2;
                if(this.health > 16){this.health = 16}
                this.score.health += 2;
                if(this.score.health > 16){this.score.health = 16}
                break;
            case 1: //supercharged engine pickup
                this.audio.playPowerup();
                this.engineSupercharged = 1;
                this.score.engine = true;
                break;
            case 2: //homing bullets pickup
                this.audio.playPowerup();
                this.bulletType = 7;
                this.bulletDmg = 3;
                this.score.hsm = true;
                break;
            case 3: //energy shield pick up
                if(this.shieldHealth == 0){this.audio.playPowerup();}
                this.shield = true;
                if(this.shieldHealth < 5){
                    this.shieldHealth += 1;
                    this.score.shield += 1;
                }
                break;
        }
    }

    rmvPwrup(type){
        switch(type){
            case 1: //supercharged engine pickup
                this.engineSupercharged = 0;
                this.score.engine = false;
                break;
            case 2: //homing bullets pickup
                this.bulletType = 3;
                this.bulletDmg = 4;
                this.score.hsm = false;
                break;
            case 3: //energy shield pick up
                this.shieldHealth--;
                this.score.shield--;
                if(this.shieldHealth == 0){this.shield = false;}
                break;
        }
    }

    move(frame){
        if(this.upPressed && !this.downPressed){
            if(this.y > 0){this.y -= (0.12+0.06*this.engineSupercharged)*frame}
        }
        else if(this.downPressed && !this.upPressed){
            if(this.y < 264){this.y += (0.12+0.06*this.engineSupercharged)*frame}
        }

        if(this.leftPressed && !this.rightPressed){
            if(this.x > 0){this.x -= (0.18+0.06*this.engineSupercharged)*frame}
            return -1;
        }
        else if(this.rightPressed && !this.leftPressed){
            if(this.x < 352){this.x += (0.18+0.06*this.engineSupercharged)*frame}
            return 1;
        }

        return 0;
    }

    shoot(gun){
        if(gun){
            this.projectile.newProjectile(this.x-13, this.y, this.bulletType, 0, this.bulletSpeed, this.bulletDmg);
        }else{
            this.projectile.newProjectile(this.x+10, this.y, this.bulletType, 0, this.bulletSpeed, this.bulletDmg);
        }
    }

    draw(frame, menu){
        if(this.destroy){
            this.y -= 0.1*frame;
            this.destroyTick += frame;
            if(this.destroyTick > 80){
                this.destroyTick -= 80;
                this.destroyFrame++;
                if(this.destroyFrame > 10){this.gameOver = true;}
            }
            this.ctx.drawImage(this.sprites.destroy, 1+32*this.destroyFrame, 0, 30, 30, this.x-15, this.y-12, 30, 30);
            return;
        }

        if(menu){
            //add code to display during the menu here
            return;
        }

        let dir = this.move(frame);
        switch(dir){
            case -1:
                this.ctx.drawImage(this.sprites.left, this.x-15, this.y-10);
                break;
            case 0:
                this.ctx.drawImage(this.sprites.center, this.x-15, this.y-10);
                break;
            case 1:
                this.ctx.drawImage(this.sprites.right, this.x-15, this.y-10);
        }

        this.etick++;
        if(this.etick == 7){
            this.etick = 0;
            this.eframe = (this.eframe+1)%4;
            this.erandom = randRange(0,2)
        }
        if(this.engineSupercharged){
            this.ctx.drawImage(this.sprites.enginep, this.eframe*8, this.erandom*14, 7, 12, this.x-3, this.y+13, 7, 12);
        } else {
            this.ctx.drawImage(this.sprites.engine, this.eframe*8, this.erandom*14, 7, 12, this.x-3, this.y+13, 7, 12);
        }

        if(this.shield){
            this.ctx.drawImage(this.sprites.shield, this.lastX-16, this.lastY-18);
        }

        this.storedGunFrames += frame;
        if(this.storedGunFrames > 250){
            this.gunTick = (this.gunTick+1)%2;
            this.storedGunFrames -= 250;

            if(this.gunTick == 0){this.shoot(0)}
            if(this.gunTick == 1){this.shoot(1)}
        }

        this.lastX = this.x;
        this.lastY = this.y;

        if(this.invulFrames > 0){
            this.invulFrames-= frame
            this.ctx.strokeStyle = "#ac3232";
            this.ctx.lineWidth = 3;
            this.ctx.strokeRect(0,0,352,264);
        }

        if(this.health < 0){
            if(!this.destroy){this.audio.playLoss()}
            this.destroy = true;
        }
    }

    takeDmg(dmg, godmode){
        if(this.invulFrames > 0){return;}
        
        this.audio.playHit();
        

        if(godmode){
            this.health -= dmg/1.5;
            this.score.health -= dmg/1.5;
            this.invulFrames = 1350;
        }else{
            this.health -= dmg;
            this.score.health -= dmg;
            this.invulFrames = 1000;
        }
    }

    checkCollisions(plst, godmode){
        for(var i = 0; i < plst.length; i++){
            switch(plst[i].type){
                case 0:
                case 1:
                case 2:
                    if(this.shield){
                        if(plst[i].x+18 > this.x && this.x > plst[i].x-14
                        && plst[i].y+35  > this.y && this.y > plst[i].y+30){
                            console.log(plst[i].y, this.y)
                            this.rmvPwrup(3);
                            plst[i].delete = true;
                        }
                    }else if(plst[i].x+18 > this.x && this.x > plst[i].x-14
                    && plst[i].y+8  > this.y && this.y > plst[i].y){
                        this.takeDmg(plst[i].dmg, godmode);
                        plst[i].delete = true;
                    }
                    break;
                case 5: //big wave
                    if(plst[i].x+46 > this.x && this.x > plst[i].x-12
                    && plst[i].y  > this.y && this.y > plst[i].y-8){
                        this.takeDmg(plst[i].dmg, godmode);
                        plst[i].delete = true;
                    }
                    break;
                case 4: //vertical laser
                    if(plst[i].x+17 > this.x && this.x > plst[i].x-16){
                        this.takeDmg(plst[i].dmg, godmode);
                    }

                    break;
                case 8: //horizontal laser
                    if(plst[i].y+19 > this.y && this.y > plst[i].y-7){
                        this.takeDmg(plst[i].dmg, godmode);
                    }

                    break;
            }
        }
    }

    checkEnemyCollisions(elst){

    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    pressUp(){
        this.upPressed = true;
    }

    releaseUp(){
        this.upPressed = false;
    }

    pressDown(){
        this.downPressed = true;
    }

    releaseDown(){
        this.downPressed = false;
    }

    pressLeft(){
        this.leftPressed = true;
    }

    releaseLeft(){
        this.leftPressed = false;
    }

    pressRight(){
        this.rightPressed = true;
    }

    releaseRight(){
        this.rightPressed = false;
    }
}
