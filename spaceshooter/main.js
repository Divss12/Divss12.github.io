const bg = new Background(ctx);
bg.init();

const score = new Score(sctx);

const projectiles = new ProjectileManager(ctx)

const ship = new Ship(ctx, projectiles, score);

const enemies = new EnemyManager(ctx, projectiles, score, ship);
initControls(ship)

const pwrups = new Powerups(ship, ctx);


const draw = new Draw(ctx, sctx, bg, projectiles, ship, enemies, score, pwrups);
initMouse(draw)
initFocus(draw)
draw.draw();
//draw.director();
