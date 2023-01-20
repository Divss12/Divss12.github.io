class Ship{
    constructor(ctx){
        this.ctx = ctx;

        this.x = 176;
        this.y = 134;

        this.downPressed = false;
        this.upPressed = false;
        this.leftPressed = false;
        this.rightPressed = false;

        this.i = 0;
        this.frameCount = 0;


        this.sprites = {
            center: [new Image(), new Image(), new Image()],
            left: [new Image(), new Image(), new Image()],
            right: [new Image(), new Image(), new Image()],
            back: new Image()
        }
        this.sprites.center[0].src = "assets/ship/center0.png";
        this.sprites.center[1].src = "assets/ship/center1.png";
        this.sprites.center[2].src = "assets/ship/center2.png";
        this.sprites.left[0].src = "assets/ship/left0.png";
        this.sprites.left[1].src = "assets/ship/left1.png";
        this.sprites.left[2].src = "assets/ship/left2.png";
        this.sprites.right[0].src = "assets/ship/right0.png";
        this.sprites.right[1].src = "assets/ship/right1.png";
        this.sprites.right[2].src = "assets/ship/right2.png";
        this.sprites.back.src = "assets/ship/back.png";

        this.projectileSprite = new Image();
        this.projectileSprite.src = "assets/ship/weap0.png"
        this.projectiles = [];
        this.leftGunCounter = 0;
        this.rightGunCounter = 9;
    }

    draw(){
        if(this.leftPressed && !this.rightPressed){
            this.ctx.drawImage(this.sprites.left[this.i], this.x-15, this.y-10);
            if(this.x > 0){this.x-=3}
        }
        else if(this.rightPressed && !this.leftPressed){
            this.ctx.drawImage(this.sprites.right[this.i], this.x-15, this.y-10);
            if(this.x < 352){this.x+=3}
        }
        else if(this.downPressed && !this.leftPressed && !this.rightPressed && !this.upPressed){
            this.ctx.drawImage(this.sprites.back, this.x-15, this.y-10);
        }
        else{
            this.ctx.drawImage(this.sprites.center[this.i], this.x-15, this.y-10);
        }

        if(this.upPressed && !this.downPressed){
            if(this.y > 0){this.y -= 2}
        }
        else if(this.downPressed && !this.upPressed){
            if(this.y < 264){this.y += 2}
        } 

        this.frameCount++;
        if(this.frameCount == 10){
            this.i = (this.i+1)%3;
            this.frameCount = 0;
        }
        
        this.leftGunCounter++;
        this.rightGunCounter++;
        if(this.leftGunCounter > 17){
            this.leftGunCounter = 0;
            this.projectiles.push({
                x: this.x - 9,
                y: this.y
            });
        }
        if(this.rightGunCounter > 17){
            this.rightGunCounter = 0;
            this.projectiles.push({
                x: this.x + 8,
                y: this.y
            });
        }

        //window.requestAnimationFrame(this.draw.bind(this));
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

    drawProjectiles() {
        for(var i = 0; i < this.projectiles.length; i++){
            this.ctx.drawImage(this.projectileSprite, this.projectiles[i].x - 1, this.projectiles[i].y);
            this.projectiles[i].y -= 4; 
        }
        if(this.projectiles.length > 0){if(this.projectiles[0].y < -10){this.projectiles.shift()}}
        //window.requestAnimationFrame(this.drawProjectiles.bind(this));
    }
}
