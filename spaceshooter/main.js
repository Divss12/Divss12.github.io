const bg = new Background(ctx);
bg.init();

const score = new Score(sctx);

const projectiles = new ProjectileManager(ctx)
const enemies = new EnemyManager(ctx, projectiles, score);

const ship = new Ship(ctx, projectiles);
initControls(ship)




const draw = new Draw(ctx, bg, projectiles, ship, enemies, score);
draw.draw();
draw.director();
