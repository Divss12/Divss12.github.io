class Powerups {
    constructor (ship, ctx) {
        this.ship = ship;
        this.ctx = ctx;

        this.active = false;
        this.x = 100;
        this.y = -10;

        this.type = 2;

        this.sprite = new Image();
        this.sprite.src = "assets/pickups/pickup.png";

        this.frame = 0;
        this.ticker = 0;

        this.cd1 = 0; 
        this.cd2 = 0; 
    }

    spawnPowerUp(type, x, y){
        this.active = true;
        this.type = type;
        this.x = x;
        this.y = y;
    }

    checkShip(){
        let shipX = this.ship.getX();
        let shipY = this.ship.getY();
        if(this.x-12 < shipX && shipX < this.x+36 && this.y-12 < shipY && shipY < this.y+36){
            return true;
        }
        return false;
    }

    draw (frame) {
        if(this.active){
            if(this.checkShip()){
                this.ship.addPwrup(this.type);
                this.active = false;

                switch(this.type){
                    case 1: this.cd1 = 32000; break;
                    case 2: this.cd2 = 32000; break;
                }
            }

            this.y += 0.125*frame;
            this.ctx.drawImage(this.sprite, 0, 0, 24, 24, this.x, this.y, 24, 24);
        }

        if(this.cd1 > 0){this.cd1 -= frame;}
        if(this.cd2 > 0){this.cd2 -= frame;}

        if(this.cd1 <= 0){this.ship.rmvPwrup(1)}
        if(this.cd2 <= 0){this.ship.rmvPwrup(2)}
    }
}