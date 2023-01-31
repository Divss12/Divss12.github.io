class Draw{
    constructor(ctx, bg, projectiles, ship, enemies, score){
        this.ctx = ctx;
        this.bg = bg;
        this.projectiles = projectiles;
        this.ship = ship;
        this.enemies = enemies;
        this.score = score;

        this.menuPos = -270;
        this.menu = false;
        this.menuImg = new Image();
        this.menuImg.src = "assets/icons/title.png"
    }

    director(){
        this.enemies.testing_gen();
    }

    draw(){
        this.bg.draw();
        this.ship.draw();
        this.score.draw(!this.menu);

        if(this.menu){
            if(this.menuPos < 0){this.menuPos += 2.5;}

            this.ctx.drawImage(this.menuImg, 0, this.menuPos);
        }else{
            this.projectiles.draw(this.enemies.lst);
            this.enemies.draw(this.ship.getX());
        }
        setTimeout(this.draw.bind(this), 12);
    }
}