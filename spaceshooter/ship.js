class Ship{
    constructor(ctx, projectiles){
        this.ctx = ctx;

        this.projectile = projectiles;

        this.x = 176;
        this.y = 212;

        this.downPressed = false;
        this.upPressed = false;
        this.leftPressed = false;
        this.rightPressed = false;

        this.i = 0;
        this.frameCount = 0;

        this.bulletType = 7;
        this.bulletSpeed = 4;
        this.bulletDmg = 4;

        this.sprites = {
            center: new Image(),
            left: new Image(),
            right: new Image(),
            //back: new Image()
            cannons: new Image(),
        }
        this.sprites.center.src = "assets/ship/center.png";
        this.sprites.left.src = "assets/ship/left.png";
        this.sprites.right.src = "assets/ship/right.png";
  
    }

    move(){
        if(this.upPressed && !this.downPressed){
            if(this.y > 0){this.y -= 2}
        }
        else if(this.downPressed && !this.upPressed){
            if(this.y < 264){this.y += 2}
        }

        if(this.leftPressed && !this.rightPressed){
            if(this.x > 0){this.x-=3}
            return -1;
        }
        else if(this.rightPressed && !this.leftPressed){
            if(this.x < 352){this.x+=3}
            return 1;
        }

        return 0;
    }

    shoot(gun){
        if(gun){
            this.projectile.newProjectile(this.x-13, this.y, this.bulletType, 0, this.bulletSpeed, this.bulletDmg);
        }else{
            this.projectile.newProjectile(this.x+9, this.y, this.bulletType, 0, this.bulletSpeed, this.bulletDmg);
        }
    }

    draw(){
        let dir = this.move();
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

        this.frameCount++;
        if(this.frameCount == 10){
            this.i = (this.i+1)%4;
            this.frameCount = 0;

            if(this.i == 1){this.shoot(0)}
            if(this.i == 3){this.shoot(1)}
        }

    }

    getX(){
        return this.x;
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
