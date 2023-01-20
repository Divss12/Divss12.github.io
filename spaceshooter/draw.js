class Draw{
    constructor(ctx, bg, projectiles, ship, enemies){
        this.ctx = ctx;
        this.bg = bg;
        this.projectiles = projectiles;
        this.ship = ship;
        this.enemies = enemies;
    }

    draw(){
        this.bg.draw();
        this.projectiles.draw();
        this.ship.drawProjectiles();
        this.ship.draw();
        this.enemies.draw(this.ship.getX());

        window.requestAnimationFrame(this.draw.bind(this));
    }
}