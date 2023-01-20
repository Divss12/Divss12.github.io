class Draw{
    constructor(ctx, bg, projectiles, ship, enemies, score){
        this.ctx = ctx;
        this.bg = bg;
        this.projectiles = projectiles;
        this.ship = ship;
        this.enemies = enemies;
        this.score = score;
    }

    draw(){
        this.bg.draw();
        this.projectiles.draw();
        this.ship.drawProjectiles();
        this.ship.draw();
        this.enemies.draw(this.ship.getX());

        this.score.draw();
        //window.requestAnimationFrame(this.draw.bind(this));
        setTimeout(this.draw.bind(this), 10);
    }
}