class ProjectileManager {
    constructor (ctx) {
        this.ctx = ctx;

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

    draw(){
        for(var i = 0; i < this.lst.length; i++){
            this.lst[i].draw();

            if(this.lst[i].delete){
                this.lst.splice(i, 1);
                i--;
            }
        }

        for(var i = 0; i < this.alst.length; i++){
            this.alst[i].draw();

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
        this.speed = speed;
        this.dmg = dmg

        this.type = type;

        switch (type){
            case 0:
                this.sprite = new Image();
                this.sprite.src = "assets/enemies/torpedoship/projectile.png";
                this.frame = 0;

                this.swerve = randRange(-3,4);
                break;
            case 1:
                this.sprite = new Image();
                this.sprite.src = "assets/enemies/frigate/bullet1.png";
                this.frame = 1;

                break;
            case 2:
                this.sprite = new Image();
                this.sprite.src = "assets/enemies/frigate/bullet0.png";
                this.frame = 0;

                break;
            case 3:
                this.sprite = new Image();
                this.sprite.src = "assets/ship/weap0.png";
                break;
            case 4:
                this.sprite = new Image();
                this.sprite.src = "assets/enemies/dreadnought/ray.png";
                this.frame = 0;
                this.lifeCounter = 0;
                break;
            
            case 5:
                this.sprite = new Image();
                this.sprite.src = "assets/enemies/alert/wave.png";
                this.frame = 0;
                break;
        }

        this.tickCounter = 0;
        this.delete = false;
    }

    updatePos () {
        if(this.type == 0){this.x += 0.1*this.swerve;}
        
        if  (this.team == 1) {this.y += this.speed;}
        else if(this.team==0){this.y -= this.speed;}
    }

    draw () {
        this.updatePos();

        //console.log("drawing at x =", this.x);

        switch(this.type){
            case 0:
                if(this.tickCounter == 10){
                    this.tickCounter = 0;
                    this.frame = (this.frame+1)%3;
                }
                this.ctx.drawImage(this.sprite, 22-11*this.frame, 0, 6, 21, this.x, this.y, 6, 21)
                break;
            case 1:
                if(this.tickCounter == 5){
                    this.tickCounter = 0;
                    this.frame = (this.frame+1)%4;
                }
                this.ctx.drawImage(this.sprite, this.frame*8, 0, 7, 13, this.x, this.y, 7, 13);
                break;
            case 2:
                if(this.tickCounter == 3){
                    this.tickCounter = 0;
                    this.frame = (this.frame+1)%4;
                }
                this.ctx.drawImage(this.sprite, this.frame*4, 0, 3, 12, this.x, this.y, 3, 12);
                break;
            case 3:
                this.ctx.drawImage(this.sprite, this.x, this.y);
                break;
            case 4:
                if(this.tickCounter == 7){
                    this.tickCounter = 0;
                    this.frame = (this.frame+1)%4;
                }
                
                this.ctx.drawImage(this.sprite, 18*this.frame + 1, 0, 17, 38, this.x-7, this.y-1, 17, 38);
                this.ctx.drawImage(this.sprite, 18*((this.frame+1)%4) + 1, 0, 17, 38, this.x-7, this.y+35, 17, 38);
                this.ctx.drawImage(this.sprite, 18*((this.frame+2)%4) + 1, 0, 17, 38, this.x-7, this.y+71, 17, 38);
                this.ctx.drawImage(this.sprite, 18*((this.frame+3)%4) + 1, 0, 17, 38, this.x-7, this.y+107, 17, 38);
                this.ctx.drawImage(this.sprite, 18*this.frame + 1, 0, 17, 38, this.x-7, this.y+143, 17, 38);
                
                this.lifeCounter++
                if(this.lifeCounter > 224){this.delete = true}
                break;
            case 5:
                console.log("a")
                if(this.tickCounter == 5){
                    this.tickCounter = 0;
                    this.frame = (this.frame+1)%6;
                }
                this.ctx.drawImage(this.sprite, 16+this.frame*64, 0, 34, 17, this.x, this.y, 34, 17);
                break;
        }

        if(this.y > 300 || this.y < -20){this.delete = true}
        this.tickCounter++;
        //window.requestAnimationFrame(this.draw.bind(this));
    }

    delete () {
        this.delete = true;
    }
}