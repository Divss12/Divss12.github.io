const bg = new Background(ctx);
bg.init();

const audio = new AudioManager();



const score = new Score(sctx, audio);

const projectiles = new ProjectileManager(ctx)

const ship = new Ship(ctx, projectiles, score, audio);

const enemies = new EnemyManager(ctx, projectiles, score, ship, audio);
initControls(ship)

const pwrups = new Powerups(ship, ctx);


const draw = new Draw(ctx, sctx, ctxl, ctxr, bg, projectiles, ship, enemies, score, pwrups, audio);
initMouse(draw)
initFocus(draw)
draw.importSettings();
draw.draw();