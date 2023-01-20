class ProjectileManager {
    constructor (ctx) {
        this.ctx = ctx;

        this.lst = []
    }

    newProjectile(x, y, type, team, speed, dmg){
        this.lst.push(
            new Projectile(x, y, type, team, speed, dmg, this.ctx)
        );
    }

    draw(){
        for(var i = 0; i < this.lst.length; i++){
            this.lst[i].draw();

            if(this.lst[i].delete){
                this.lst.splice(i, 1);
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
                this.sprite.src = "assets/enemies/torpedoship/projectile.png"
                this.frame = 0;

                this.swerve = randRange(-3,4);
                break;
            case 1:
                this.sprite = new Image();
                this.sprite.src = "assets/enemies/frigate/bullet1.png"
                this.frame = 1;

                break;
            case 2:
                this.sprite = new Image();
                this.sprite.src = "assets/enemies/frigate/bullet0.png"
                this.frame = 0;

                break;      
        }

        this.tickCounter = 0;
        this.delete = false;
    }

    updatePos () {
        if(this.type == 0){this.x += 0.1*this.swerve;}
        this.y += this.speed;
    }

    getXY () {
        return [this.x, this.y];
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
        }

        if(this.y > 300 || this.y < -20){this.delete = true}
        this.tickCounter++;
        //window.requestAnimationFrame(this.draw.bind(this));
    }
}