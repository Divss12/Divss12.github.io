const bg = new Background(ctx);
bg.init();

const ship = new Ship(ctx);
initControls(ship)


const projectiles = new ProjectileManager(ctx)
const enemies = new EnemyManager(ctx, projectiles);
enemies.testing_gen();

const draw = new Draw(ctx, bg, projectiles, ship, enemies);
draw.draw();