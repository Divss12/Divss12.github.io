class EnemyManager {
    constructor(ctx, projectiles){
        this.ctx = ctx;
        this.projectiles = projectiles;
        
        this.lst = [];
    }
    
    genEnemy(type){
        //const type = randRange(0,5);
        switch(type){
            case 0: //torpedoShip
                const a = randRange(0,2);
                if(a == 0){
                    this.lst.push(    
                        new Enemy(this.ctx, -56, 40, 0, this.projectiles)
                    );
                } else {
                    this.lst.push(    
                        new Enemy(this.ctx, 352, 40, 0, this.projectiles)
                    );
                }
                break;
            case 1: //frigate
                this.lst.push(
                    new Enemy(this.ctx, randRange(80, 237), -90, 1, this.projectiles)
                );
                break;
        }
    }
    
    checkCollisions(){
        for(p of this.projectiles.lst){
            for(e of this.lst){
                e.checkCollision(p.x, p.y);
            }
        }
    }
    
    draw(shipX){
        for(var i = 0; i < this.lst.length; i++){
            this.lst[i].draw(shipX);

            if(this.lst[i].delete){
                this.lst.splice(i, 1);
                i--;
            }
        }


        //window.requestAnimationFrame(this.draw.bind(this));
    }

    testing_gen(){
        this.genEnemy(1);
        //window.setInterval(this.genEnemy.bind(this), 3000, 0);
    }
}


class Enemy {
    constructor(ctx, x, y, type, projectiles){
        this.ctx = ctx;
        this.projectiles = projectiles;
    
        this.x = x;
        this.y = y;

        this.type = type;

        this.tickCounter = 0;
        
        
        
        switch (type) {
            case 0: //torpedoship
                this.sprite = {
                    base: new Image(),
                    engine: new Image(),
                    weapons: new Image(),
                    shield0: new Image(),
                    shield1: new Image(),
                    destruction: new Image(),
                }
                this.sprite.base.src = "assets/enemies/torpedoship/base.png";
                this.sprite.engine.src = "assets/enemies/torpedoship/engine.png";
                this.sprite.weapons.src = "assets/enemies/torpedoship/weapons.png";
                this.sprite.shield0.src = "assets/enemies/torpedoship/shield0.png";
                this.sprite.shield1.src = "assets/enemies/torpedoship/shield1.png";
                this.sprite.destruction.src = "assets/enemies/torpedoship/destruction.png";

                this.frame = 0;
                this.ecounter = 0;
                this.eframe = 0;

                this.randomN = randRange(8,14);

                if(x == 352) {this.heading = -2}
                else {this.heading = 2}
                break;

            case 1: //frigate
                this.sprite = {
                    base: new Image(),
                    weapons: new Image(),
                    bullet0: new Image(),
                    bullet1: new Image(),
                    engine: new Image(),
                }
                this.sprite.base.src = "assets/enemies/frigate/base.png";
                this.sprite.weapons.src = "assets/enemies/frigate/weapons.png";
                this.sprite.bullet0.src = "assets/enemies/frigate/bullet0.png";
                this.sprite.bullet1.src = "assets/enemies/frigate/bullet1.png";
                this.sprite.engine.src = "assets/enemies/frigate/engine.png";

                this.idle = true;
                this.frame = 0;
                this.cycle = 0;
                this.ecounter = 0;
                this.eframe = 0;
                break;
        }
        
        

        this.destroy = false;
        this.delete = false;
    }
    
    checkCollision(x, y){
        return false
    }
    
    updatePos(shipX){
        switch(this.type) {
            case 0:
                this.x += this.heading;
                this.y -= 0.3;
                break;
            case 1:
                if(this.idle){
                    if(this.y < 10){this.y++; break;}

                    if(this.x+17 < shipX-1){this.x++;}
                    else if (this.x+17 > shipX+1){this.x--;}
                    else if (this.tickCounter > 150){
                        this.idle = false; 
                        this.tickCounter = 0;
                    }
                }
                break;
        }
    }

    shoot(gun){
        switch(this.type){
            case 0:
                var xOffset;
                if(gun < 3){xOffset = gun*6 + 5}
                else {xOffset = gun*6 + 16}
                this.projectiles.newProjectile(this.x + xOffset, this.y + 15, 0, 1, 3, 1);
                break;
            case 1:
                switch(gun){
                    case 0:
                        this.projectiles.newProjectile(this.x, this.y + 15, 1, 1, 4, 2);
                        break;
                    case 1:
                        this.projectiles.newProjectile(this.x + 8, this.y + 21, 2, 1, 4, 1);
                        break;
                    case 2:
                        this.projectiles.newProjectile(this.x + 26, this.y + 21, 2, 1, 4, 1);
                        break;
                    case 3:
                        this.projectiles.newProjectile(this.x + 30, this.y + 15, 1, 1, 4, 2);
                        break;
                }
                break;
        }
    }
    
    draw(shipX){

        this.updatePos(shipX);

        switch(this.type) {
            case 0:
                if(this.destroy){
                    if(this.tickCounter == 5){
                        this.tickCounter = 0;
                        this.frame++;
                    }
                    this.ctx.drawImage(this.sprite.destruction, 512 - this.frame*64, 0, 56, 50, this.x, this.y-12, 56, 50);
                }
                else{
                    var flag = false;
                    if(this.tickCounter == this.randomN){
                        this.tickCounter = 0;
                        this.frame++;
                        flag = true;
                        this.randomN = randRange(8,14);
                    }
                    if(this.frame < 16){
                        this.ctx.drawImage(this.sprite.weapons, 964 - 64*this.frame, 21, 56, 27, this.x, this.y, 56, 27);
                        //this.ctx.drawImage(this.sprite.shield0, this.x-2, this.y + 17);
                        if(flag){
                            switch(this.frame){
                                case 5: this.shoot(2); break;
                                case 7: this.shoot(3); break;
                                case 9: this.shoot(1); break;
                                case 11: this.shoot(4); break;
                                case 13: this.shoot(0); break;
                                case 15: this.shoot(5); break;
                            }
                        }
                    }
                    else {
                        this.ctx.drawImage(this.sprite.base, this.x, this.y);
                        //this.ctx.drawImage(this.sprite.shield1, this.x-2, this.y + 17);
                    }
                
                    if(this.ecounter == 4){
                        this.ecounter = 0;
                        this.eframe = (this.eframe+1)%10;
                    }
                    this.ctx.drawImage(this.sprite.engine, 64*this.eframe + 4, 13, 56, 11, this.x, this.y-9, 56, 11);

                    this.ecounter++;

                    //if(this.frame > 17){this.destroy = true; this.frame = 0; this.tickCounter = 0;}
                }
                break;
            case 1:
                if(this.destroy){

                }else if(this.idle){
                    this.ctx.drawImage(this.sprite.base, this.x, this.y);
                    //if(this.tickCounter == 100){this.tickCounter = 0; this.idle = !this.idle}
                }else{//weapons firing
                    var flag = false;
                    if(this.tickCounter == 10){this.tickCounter = 0; this.frame = (this.frame+1)%6; flag = true;}
                    this.ctx.drawImage(this.sprite.weapons, 64*this.frame, 0, 36, 40, this.x, this.y, 36, 40);
                    if(flag){
                        if(this.frame == 2){this.shoot(0); this.shoot(3)}
                        if(this.frame == 5){this.shoot(1); this.shoot(2);
                            this.cycle++;
                        }
                    }
                }

                if(this.ecounter == 4){
                    this.ecounter = 0;
                    this.eframe = (this.eframe+1)%12;
                }
                this.ctx.drawImage(this.sprite.engine, 25+64*this.eframe, 8, 14, 6, this.x + 11, this.y-4, 14, 6);
                this.ecounter++;

                if(this.cycle == 5){this.cycle = 0; this.idle = !this.idle}
                break;
        }


        if(this.x < -100 || this.x > 367 || this.y < -100){this.delete = true;}
        this.tickCounter++
        //window.requestAnimationFrame(this.draw.bind(this));
    }
}
