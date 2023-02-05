class EnemyManager {
    constructor(ctx, projectiles, score){
        this.ctx = ctx;
        this.projectiles = projectiles;
        this.score = score;
        this.enemHitCounter = 0;
        this.lst = [];
    }
    
    genEnemy(type, arg){
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

            case 2: //dreadnought
                this.lst.push(
                    new Enemy(this.ctx, randRange(80,216), -100, 2, this.projectiles)
                );
                break;

            case 3: //fighter
                this.lst.push(
                    new Enemy(this.ctx, -20, 12, 3, this.projectiles)
                );
                break;
            case 4: //scout
                this.lst.push(
                    new Enemy(this.ctx, 360, 24, 4, this.projectiles)
                );
                break;
            case 5: //alerter
                this.lst.push(
                    new Enemy(this.ctx, randRange(24, 304), 235, 5, this.projectiles)
                );
                break;
            
            case 6: //horizontal alerter
                this.lst.push(
                    new Enemy(this.ctx, 5, arg, 6, this.projectiles)
                );
                break;
        }
    }
    
    checkCollisions(){
        for(var i = 0; i < this.projectiles.alst.length; i++){
            for(var j = 0; j < this.lst.length; j++){
                if(this.lst[j].checkCollision(this.projectiles.alst[i])){
                    this.projectiles.alst[i].delete = true;
                    if(this.score.shield > 0){
                        this.enemHitCounter++;
                        if(this.enemHitCounter == 7){
                            this.enemHitCounter = 0;
                            if(this.shield < 5){this.score.shield++};
                        }
                    }
                }
            }
        }
    }
    
    draw(frame, shipX){
        this.checkCollisions();

        for(var i = 0; i < this.lst.length; i++){
            this.lst[i].draw(frame, shipX); //call the draw method of every enemy
            //and give them ship X coordinate so that they can track the player

            if(this.lst[i].delete){//check for enemies to be deleted
                //if enemy has been destroyed
                if(this.lst[i].destroy){this.score.addEnemy();} //add to scoreboard

                this.lst.splice(i, 1);//delete the enemy
                i--; //decrement i because we just removed this element
            }
        }
    }

    testing_gen(){
        this.score.addDialog("This is the first playable version, there is no dmg taken!");

        this.genEnemy(5);
        window.setInterval(this.genEnemy.bind(this), 4500, 5);
        window.setInterval(this.genEnemy.bind(this), 9000, 0);
        window.setInterval(this.genEnemy.bind(this), 18000, 1);
        window.setInterval(this.genEnemy.bind(this), 54000, 2);
        window.setInterval(this.genEnemy.bind(this), 10000, 4);
        window.setInterval(this.genEnemy.bind(this), 12000, 6);
        window.setTimeout(window.setInterval, 5000, this.genEnemy.bind(this), 10000, 3);
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

                this.randomN = randRange(128,224);

                if(x == 352) {this.heading = -0.12}
                else {this.heading = 0.12}
                
                this.w2 = 28;
                this.h2 = 11;
                this.health = 12;
                break;

            case 1: //frigate
                this.sprite = {
                    base: new Image(),
                    weapons: new Image(),
                    bullet0: new Image(),
                    bullet1: new Image(),
                    engine: new Image(),
                    destruction: new Image(),
                }
                this.sprite.base.src = "assets/enemies/frigate/base.png";
                this.sprite.weapons.src = "assets/enemies/frigate/weapons.png";
                this.sprite.bullet0.src = "assets/enemies/frigate/bullet0.png";
                this.sprite.bullet1.src = "assets/enemies/frigate/bullet1.png";
                this.sprite.engine.src = "assets/enemies/frigate/engine.png";
                this.sprite.destruction.src = "assets/enemies/frigate/destruction.png";

                this.idle = true;
                this.frame = 0;
                this.cycle = 0;
                this.ecounter = 0;
                this.eframe = 0;

                this.w2 = 18;
                this.h2 = 20;
                this.health = 20;
                break;

            case 2: //dreadnought
                this.sprite = {
                    base: new Image(),
                    destruction: new Image(),
                    weapons: new Image(),
                    engine: new Image(),
                }
                this.sprite.base.src = "assets/enemies/dreadnought/base.png";
                this.sprite.destruction.src = "assets/enemies/dreadnought/destruction.png";
                this.sprite.weapons.src = "assets/enemies/dreadnought/weapons.png";
                this.sprite.engine.src = "assets/enemies/dreadnought/engine.png"

                this.idle = true;
                this.frame = 0;
                this.cycle = 0;
                this.ecounter = 0;
                this.eframe = 0;
                this.w2 = 36;
                this.h2 = 50;
                this.health = 100;
                break;
            
            case 3: //fighter 
                this.sprite = {
                    base: new Image(),
                    weapons: new Image(),
                    destruction: new Image(),
                    engine: new Image(),
                }    
                this.sprite.base.src = "assets/enemies/fighter/base.png";
                this.sprite.weapons.src = "assets/enemies/fighter/weapons.png";
                this.sprite.destruction.src = "assets/enemies/fighter/destruction.png";
                this.sprite.engine.src = "assets/enemies/fighter/engine.png";

                this.frame = 0;
                
                this.ecounter = 0;
                this.eframe = 0;
                this.heading = 1;

                this.w2 = 12;
                this.h2 = 11;
                this.health = 8;
                break;
            
            case 4: //scout
                this.sprite = {
                    base: new Image(),
                    weapons: new Image(),
                    destruction: new Image(),
                    engine: new Image(),
                }
                this.sprite.base.src = "assets/enemies/scout/base.png";
                this.sprite.weapons.src = "assets/enemies/scout/weapons.png";
                this.sprite.destruction.src = "assets/enemies/scout/destruction.png";
                this.sprite.engine.src = "assets/enemies/scout/engine.png";

                this.frame = 0;
                
                this.ecounter = 0;
                this.eframe = 0;
                this.heading = -1;

                this.w2 = 11;
                this.h2 = 11;
                this.health = 8;
                

                break;
            
            case 5: //wave alert
                this.sprite = {
                    base: new Image(),
                }
                this.sprite.base.src = "assets/enemies/alert/alert.png";

                this.health = 1;
                break;

            case 6: //ray alert
                this.sprite = {
                    left: new Image(),
                    right: new Image(),
                }
                this.sprite.left.src = "assets/enemies/alert/alertL.png"
                this.sprite.right.src = "assets/enemies/alert/alertR.png"

                this.health = 1;
                break;
        }
        
        

        this.destroy = false;
        this.delete = false;
    }
    
    checkCollision(projectile){
        if(this.destroy){return false;}

        switch(this.type){
            case 0:
                if(this.x-1 < projectile.x && projectile.x < this.x+57 && this.y-1 < projectile.y && projectile.y < this.y+13){
                    this.health -= projectile.dmg;
                    return true;
                }
                break;
            case 1:
                if(this.x-1 < projectile.x && projectile.x < this.x+37 && this.y-1 < projectile.y && projectile.y < this.y+34){
                    this.health -= projectile.dmg;
                    return true;
                }
                break;
            case 2:
                if(this.x-1 < projectile.x && projectile.x < this.x+72 && this.y-1 < projectile.y && projectile.y < this.y+80){
                    this.health -= projectile.dmg;
                    return true;
                }
                break;
            case 3:
                if(this.x-1 < projectile.x && projectile.x < this.x+25 && this.y-1 < projectile.y && projectile.y < this.y+23){
                    this.health -= projectile.dmg;
                    return true;
                }
                break;
            case 4:
                if(this.x-1 < projectile.x && projectile.x < this.x+23 && this.y-1 < projectile.y && projectile.y < this.y+23){
                    this.health -= projectile.dmg;
                    return true;
                }
                break;
            case 5:
            case 6:
                return false;
        }

        return false
    }
    
    updatePos(frame, shipX){
        switch(this.type) {
            case 0:
                this.x += frame*this.heading;
                this.y -= 0.018*frame;
                break;
            case 1:
                if(this.idle){
                    if(this.y < 10){this.y += 0.06*frame; break;}

                    if(this.x+17 < shipX-1){this.x += 0.06*frame;}
                    else if (this.x+17 > shipX+1){this.x -= 0.06*frame;}
                    else if (this.tickCounter > 100){
                        this.idle = false; 
                        this.tickCounter = 0;
                    }
                }
                break;
            case 2:
                if(this.idle){
                    if(this.y < 5){this.y += 0.06*frame; break;}

                    if(this.x+36 < shipX-1){this.x += 0.03*frame;}
                    else if (this.x+36 > shipX+1){this.x -= 0.03*frame;}
                    else if (this.tickCounter > 100){
                        this.idle = false; 
                        this.tickCounter = 0;
                    }
                }
                break;
            case 3:            
            case 4:
                if(this.x > 302){this.heading = -0.06}
                if(this.x < 26){this.heading = 0.06}

                this.x += this.heading*frame;
                break;
            case 5:
            case 6:
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
                        this.projectiles.newProjectile(this.x + 30, this.y + 15, 1, 1, 4, 2)
                        break;
                }
                break;
            case 2:
                if(gun == -1){this.projectiles.removeLaser();}
                else{this.projectiles.newProjectile(this.x+35,this.y+99, 4, 1, 0, 16);}
                break;
            case 3:
                if(gun == 0){this.projectiles.newProjectile(this.x+5, this.y+7, 2, 1, 4, 1)}
                if(gun == 1){this.projectiles.newProjectile(this.x+17, this.y+7, 2, 1, 4, 1)}
                break;
            case 4:
                this.projectiles.newProjectile(this.x+8, this.y+16, 1, 1, 4, 1);
                break;
            case 5:
                this.projectiles.newProjectile(this.x-11, 270, 5, 1, -3, 3);
                break;
            case 6:
                this.projectiles.newProjectile(0, this.y, 8, 1, 0, 16);
                break;
        }
    }
    
    draw(frame, shipX){

        this.updatePos(frame, shipX);

        switch(this.type) {
            case 0:
                if(this.destroy){
                    if(this.tickCounter > 80){
                        this.tickCounter -= 80;
                        this.frame++;
                    }
                    this.ctx.drawImage(this.sprite.destruction, 512 - this.frame*64, 0, 56, 50, this.x, this.y-12, 56, 50);
                }
                else{
                    var flag = false;
                    if(this.tickCounter > this.randomN){
                        this.tickCounter = 0;
                        this.frame++;
                        flag = true;
                        this.randomN = randRange(128,224);
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

                    this.ecounter += frame;
                    if(this.ecounter > 64){
                        this.ecounter -= 64;
                        this.eframe = (this.eframe+1)%10;
                    }
                    this.ctx.drawImage(this.sprite.engine, 64*this.eframe + 4, 13, 56, 11, this.x, this.y-9, 56, 11);
                }
                break;
            case 1:
                if(this.destroy){
                    if(this.tickCounter > 80){
                        this.tickCounter -= 80;
                        this.frame++;
                        if(this.frame > 9){this.delete = true;}
                    }
                    this.ctx.drawImage(this.sprite.destruction, 1 + this.frame*64, 0, 62, 64, this.x-13, this.y-14, 62, 64);
                }else if(this.idle){
                    this.ctx.drawImage(this.sprite.base, this.x, this.y);
                }else{//weapons firing
                    var flag = false;
                    if(this.tickCounter > 160){this.tickCounter -= 160; this.frame = (this.frame+1)%6; flag = true;}
                    this.ctx.drawImage(this.sprite.weapons, 64*this.frame, 0, 36, 40, this.x, this.y, 36, 40);
                    if(flag){
                        if(this.frame == 2){this.shoot(0); this.shoot(3)}
                        if(this.frame == 5){this.shoot(1); this.shoot(2);
                            this.cycle++;
                        }
                    }
                }

                if(!this.destroy){
                    this.ecounter += frame;
                    if(this.ecounter > 64){
                        this.ecounter -= 64;
                        this.eframe = (this.eframe+1)%12;
                    }
                    this.ctx.drawImage(this.sprite.engine, 25+64*this.eframe, 8, 14, 6, this.x + 11, this.y-4, 14, 6);
                }

                if(this.cycle == 5){this.cycle = 0; this.idle = !this.idle}
                break;
            case 2:
                if(!this.destroy){
                    this.ecounter += frame;
                    if(this.ecounter > 192){
                        this.ecounter -= 192;
                        this.eframe = (this.eframe+1)%12;
                    }
                    this.ctx.drawImage(this.sprite.engine, 28+128*this.eframe, 12, 72, 20, this.x, this.y-3, 72, 20);
                }

                if(this.destroy){
                    if(this.tickCounter > 80){
                        this.tickCounter -= 80;
                        this.frame++;
                        if(this.frame > 11){this.delete = true;}
                    }
                    this.ctx.drawImage(this.sprite.destruction, 1 + this.frame*128, 11, 126, 104, this.x-27, this.y-4, 126, 104);
                }else if(this.idle){
                    this.ctx.drawImage(this.sprite.base, this.x, this.y);
                }else{
                    var flag = false;
                    if(this.tickCounter > 80){this.tickCounter -= 80; this.frame = (this.frame+1)%60; flag = true;}
                    this.ctx.drawImage(this.sprite.weapons, 128*this.frame + 28, 15, 72, 100, this.x, this.y, 72, 100);

                    if(flag){
                        if(this.frame == 12){this.shoot(1);}
                        if(this.frame == 59){this.idle = !this.idle;}
                    }
                }
                break;
            case 3:
                if(this.destroy){
                    if(this.tickCounter > 80){this.tickCounter -= 80; this.frame++; if(this.frame>8){this.delete = true;}}
                    this.ctx.drawImage(this.sprite.destruction, 1+this.frame*64, 6, 61, 56, this.x-19, this.y-15, 61, 56);
                }else{
                    if(this.tickCounter > 160){this.tickCounter -= 160; this.frame = (this.frame+1)%6; flag = true;}
                    this.ctx.drawImage(this.sprite.weapons, 20+this.frame*64, 21, 24, 22, this.x, this.y, 24, 22);

                    if(flag){
                        if(this.frame == 0){this.shoot(0);}
                        if(this.frame == 3){this.shoot(1);}
                    }
                }

                if(!this.destroy){
                    this.ecounter += frame;
                    if(this.ecounter > 64){
                        this.ecounter -= 64;
                        this.eframe = (this.eframe+1)%10;
                    }
                    this.ctx.drawImage(this.sprite.engine, 29+64*this.eframe, 0, 6, 12, this.x+9, this.y-9, 6, 12);
                }
                break;
            case 4:
                if(this.destroy){
                    if(this.tickCounter > 80){this.tickCounter -= 80; this.frame++; if(this.frame>9){this.delete = true;}}
                    this.ctx.drawImage(this.sprite.destruction, 1+this.frame*64, 0, 64, 44, this.x-19, this.y-10, 64, 44);
                }else{
                    if(this.tickCounter > 160){this.tickCounter -= 160; this.frame = (this.frame+1)%6; flag = true;}
                    this.ctx.drawImage(this.sprite.weapons, 20+this.frame*64, 0, 24, 24, this.x, this.y, 24, 24);

                    if(flag){
                        if(this.frame == 2){this.shoot();}
                    }
                }

                if(!this.destroy){
                    this.ecounter += frame;
                    if(this.ecounter > 64){
                        this.ecounter -= 64;
                        this.eframe = (this.eframe+1)%10;
                    }
                    this.ctx.drawImage(this.sprite.engine, 29+64*this.eframe, 0, 6, 12, this.x+9, this.y-7, 6, 12);
                }
                break;
            case 5:
                if(this.tickCounter < 800){this.ctx.drawImage(this.sprite.base, this.x, this.y);}
                else if(this.tickCounter < 3200 && Math.floor(this.tickCounter/156)%3){
                    this.ctx.drawImage(this.sprite.base, this.x, this.y);
                }else if(this.tickCounter < 4800 && Math.floor(this.tickCounter/156)%2){
                    this.ctx.drawImage(this.sprite.base, this.x, this.y);
                }
                if(this.tickCounter > 4799){this.shoot(), this.delete = true;}
                break;
            case 6:
                if(this.tickCounter < 800){
                    this.ctx.drawImage(this.sprite.left, this.x, this.y);
                    this.ctx.drawImage(this.sprite.right, this.x+329, this.y);
                }else if(this.tickCounter < 3200 && Math.floor(this.tickCounter/156)%3){
                    this.ctx.drawImage(this.sprite.left, this.x, this.y);
                    this.ctx.drawImage(this.sprite.right, this.x+329, this.y);
                }else if(this.tickCounter < 4800 && Math.floor(this.tickCounter/156)%2){
                    this.ctx.drawImage(this.sprite.left, this.x, this.y);
                    this.ctx.drawImage(this.sprite.right, this.x+329, this.y);
                }else if(4960 < this.tickCounter){this.shoot(), this.delete = true;}
                break;
        }


        if(this.x < -100 || this.x > 367 || this.y < -100){this.delete = true;}
        if(this.health < 1 && !this.destroy){this.destroy = true; this.frame = 0; this.tickCounter = 0;
            if(this.type == 2){this.shoot(-1)}}
        
        this.tickCounter += frame;
        //window.requestAnimationFrame(this.draw.bind(this));
    }
}
