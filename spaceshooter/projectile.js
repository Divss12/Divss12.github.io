class ProjectileManager {
    constructor (ctx) {
        this.ctx = ctx;

        this.lst = [];
        this.alst = [];
    }

    clear(){
        this.lst = [];
        this.alst = [];
    }

    newProjectile(x, y, type, team, speed, dmg){
        if(team){
            this.lst.push(
                new Projectile(x, y, type, team, speed, dmg, this.ctx)
            );
        }else{
            this.alst.push(
                new Projectile(x, y, type, team, speed, dmg, this.ctx)
            );
        }
    }

    removeLaser(){
        for(var i = 0; i < this.lst.length; i++){
            if(this.lst[i].type == 4){//there should only be 1 laser at any time;
                this.lst.splice(i, 1);
            }
        }
    }

    draw(frame, enemlst){
        for(var i = 0; i < this.lst.length; i++){
            this.lst[i].draw(frame);

            if(this.lst[i].delete){
                this.lst.splice(i, 1);
                i--;
            }
        }

        for(var i = 0; i < this.alst.length; i++){
            this.alst[i].draw(frame, enemlst);

            if(this.alst[i].delete){
                this.alst.splice(i, 1);
                i--;
            }
        }

        //window.requestAnimationFrame(this.draw.bind(this));
    }
}

class Projectile {
    constructor (x, y, type, team, speed, dmg, ctx) {
        this.ctx = ctx;

        this.x = x;
        this.y = y;
        this.team = team;
        this.speed = speed/16;
        this.dmg = dmg

        this.type = type;

        switch (type){
            case 0: //TORPEDO
                this.sprite = new Image();
                this.sprite.src = "assets/enemies/torpedoship/projectile.png";
                this.frame = 0;

                this.swerve = 0.00625*randRange(-3,4);
                break;
            case 1: //BIG BULLET
                this.sprite = new Image();
                this.sprite.src = "assets/enemies/frigate/bullet1.png";
                this.frame = 1;

                break;
            case 2: //SMALL BULLET
                this.sprite = new Image();
                this.sprite.src = "assets/enemies/frigate/bullet0.png";
                this.frame = 0;

                break;
            case 3: //PLAYER BULLET
                this.sprite = new Image();
                this.sprite.src = "assets/ship/newbullet.png";
                this.frame = 0;
                break;
            case 4: //DREADNOUGHT LASER
                this.sprite = new Image();
                this.sprite.src = "assets/enemies/dreadnought/ray.png";
                this.frame = 0;
                this.lifeCounter = 0;
                break;
            
            case 5: //RAY THAT COMES FROM BEHIND
                this.sprite = new Image();
                this.sprite.src = "assets/enemies/alert/wave.png";
                this.frame = 0;
                break;
            
            case 6: //unused bomb
                this.sprite = new Image();
                this.sprite.src = "assets/ship/bomb.png";
                this.frame = 0;
                break;
            
            case 7: //PLAYERS HOMING BULLET
                this.sprite = new Image();
                this.sprite.src = "assets/ship/spbullet.png";
                this.spritec = new Image();
                this.spritec.src = "assets/ship/spbulletc.png";
                this.frame = 0;
                this.tick = 0;
                this.headingVect = {x: 0, y:-1};
                this.headingMag = 0.1875;
                this.cover = false;
                break;

            case 8: //HORIZONTAL LASER
                this.sprite = new Image();
                this.sprite.src = "assets/enemies/alert/rayhorizontal.png";
                this.frame = 0;
                this.lifeCounter = 0;
                break;
        }

        this.tickCounter = 0;
        this.delete = false;
    }

    updatePos (frame, enemlst) {
        if(this.type != 7){
            if(this.type == 0){this.x += frame*this.swerve;}
            
            if  (this.team == 1) {this.y += frame*this.speed;}
            else if(this.team==0){this.y -= frame*this.speed;}
        }
        else{//homing bullet code:
            let closestEnemyX = Infinity;
            let closestEnemyY = Infinity;
            let closestEnemyDist = Infinity;

            for(var i = 0; i < enemlst.length; i++){
                const e = enemlst[i]

                if(e.type == 5 || e.type == 6){continue;}

                let xDiff = e.x + e.w2 - this.x;
                let yDiff = e.y + e.h2 - this.y;
                let dist = Math.sqrt(xDiff*xDiff + yDiff*yDiff);
                if(dist < closestEnemyDist && dist < 120){
                    closestEnemyDist = dist;
                    closestEnemyX = e.x + e.w2;
                    closestEnemyY = e.y + e.h2;
                }
            }

            if(closestEnemyDist != Infinity){
                let yDiff = closestEnemyY - this.y;
                let xDiff = closestEnemyX - this.x;
                if(yDiff < 50){//beeline it
                    let magn = Math.sqrt(xDiff*xDiff + yDiff*yDiff);
                    this.headingVect = {x: xDiff/magn, y: yDiff/magn};
                    this.headingMag = 0.125;
                }else{
                    let magn = Math.sqrt(xDiff*xDiff + yDiff*yDiff);
                    let newX = xDiff/(magn*3)
                    let newY = -1*Math.sqrt(1 - newX*newX);
                    this.headingVect = {x: newX, y: newY}
                    this.headingMag = 0.15625;
                }
            }else{
                this.headingMag = 0.1875;
            }

            this.x += this.headingVect.x*this.headingMag*frame;
            this.y += this.headingVect.y*this.headingMag*frame;

            this.tick++;
        }
    }

    draw (frame, enemlst) {
        this.updatePos(frame, enemlst);

        switch(this.type){
            case 0:
                if(this.tickCounter > 160){
                    this.tickCounter -= 160;
                    this.frame = (this.frame+1)%3;
                }
                this.ctx.drawImage(this.sprite, 22-11*this.frame, 0, 6, 21, this.x, this.y, 6, 21)
                break;
            case 1:
                if(this.tickCounter > 80){
                    this.tickCounter -= 80;
                    this.frame = (this.frame+1)%4;
                }
                this.ctx.drawImage(this.sprite, this.frame*8, 0, 7, 13, this.x, this.y, 7, 13);
                break;
            case 2:
                if(this.tickCounter > 48){
                    this.tickCounter -= 48;
                    this.frame = (this.frame+1)%4;
                }
                this.ctx.drawImage(this.sprite, this.frame*4, 0, 3, 12, this.x, this.y, 3, 12);
                break;
            case 3:
                if(this.tickCounter > 80){
                    this.tickCounter -= 80;
                    this.frame = (this.frame+1)%4;
                }
                this.ctx.drawImage(this.sprite, this.frame*7, 0, 6, 12, this.x, this.y, 6, 12);
                break;
            case 4:
                if(this.tickCounter > 112){
                    this.tickCounter -= 112;
                    this.frame = (this.frame+1)%4;
                }
                
                this.ctx.drawImage(this.sprite, 18*this.frame + 1, 0, 17, 38, this.x-7, this.y-1, 17, 38);
                this.ctx.drawImage(this.sprite, 18*((this.frame+1)%4) + 1, 0, 17, 38, this.x-7, this.y+35, 17, 38);
                this.ctx.drawImage(this.sprite, 18*((this.frame+2)%4) + 1, 0, 17, 38, this.x-7, this.y+71, 17, 38);
                this.ctx.drawImage(this.sprite, 18*((this.frame+3)%4) + 1, 0, 17, 38, this.x-7, this.y+107, 17, 38);
                this.ctx.drawImage(this.sprite, 18*this.frame + 1, 0, 17, 38, this.x-7, this.y+143, 17, 38);
                
                this.lifeCounter += frame;
                if(this.lifeCounter > 3584){this.delete = true}
                break;
            case 5:
                if(this.tickCounter > 80){
                    this.tickCounter -= 80;
                    this.frame = (this.frame+1)%6;
                }
                this.ctx.drawImage(this.sprite, 15+this.frame*64, 0, 34, 17, this.x, this.y, 34, 17);
                break;
            case 6:
                if(this.tickCounter > 80){
                    this.tickCounter -= 80;
                    this.frame = (this.frame+1)%16;
                }
                this.ctx.drawImage(this.sprite, 3+this.frame*16, 0, 10, 10, this.x, this.y, 10, 10);
                break;
            case 7:
                if(this.tickCounter > 80){
                    this.tickCounter -= 80;
                    this.frame = (this.frame+1)%8;
                    if(this.frame == 2){this.cover = true}
                }
                if(this.cover){
                    this.ctx.drawImage(this.sprite, this.frame*8, 0, 8, 8, this.x-2, this.y, 8, 8);
                }else{
                    this.ctx.drawImage(this.spritec, 2+this.frame*8, 2, 4, 4, this.x, this.y, 4, 4);
                }
                break;
            case 8:                
            if(this.tickCounter > 112){
                this.tickCounter -= 112;
                this.frame--;
                if(this.frame == -1){this.frame = 3;}
            }
            this.ctx.drawImage(this.sprite, 0, 18*this.frame + 1, 38, 17, 0, this.y, 38, 17);
            this.ctx.drawImage(this.sprite, 0, 18*((this.frame+1)%4) + 1, 38, 17, 36, this.y, 38, 17);
            this.ctx.drawImage(this.sprite, 0, 18*((this.frame+2)%4) + 1, 38, 17, 72, this.y, 38, 17);
            this.ctx.drawImage(this.sprite, 0, 18*((this.frame+3)%4) + 1, 38, 17, 108, this.y, 38, 17); 
            this.ctx.drawImage(this.sprite, 0, 18*this.frame + 1, 38, 17, 144, this.y, 38, 17);
            this.ctx.drawImage(this.sprite, 0, 18*((this.frame+1)%4) + 1, 38, 17, 180, this.y, 38, 17);
            this.ctx.drawImage(this.sprite, 0, 18*((this.frame+2)%4) + 1, 38, 17, 216, this.y, 38, 17);
            this.ctx.drawImage(this.sprite, 0, 18*((this.frame+3)%4) + 1, 38, 17, 252, this.y, 38, 17);
            this.ctx.drawImage(this.sprite, 0, 18*this.frame + 1, 38, 17, 288, this.y, 38, 17);
            this.ctx.drawImage(this.sprite, 0, 18*((this.frame+1)%4) + 1, 38, 17, 324, this.y, 38, 17)

            this.lifeCounter += frame
            if(this.lifeCounter > 3584){this.delete = true}
            break;
        }

        if(this.y > 300 || this.y < -20 || this.x > 375 || this.x < -20){this.delete = true}
        this.tickCounter += frame;
        //window.requestAnimationFrame(this.draw.bind(this));
    }
}