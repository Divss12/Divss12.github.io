class Score {
    constructor (ctx) {
        this.ctx = ctx;

        this.sprite = {
            main: new Image(),
        }

        this.sprite.main.src = "assets/icons/dashboard.png";
    }

    drawHealth () {
    }

    drawScore (dist, score) {
    }

    drawRadar () {
        
    }

    drawDialogue () {
    }

    draw () {
        this.ctx.fillStyle = "#141D27";
        this.ctx.fillRect(0, 0, 114, 264);
        this.ctx.drawImage(this.sprite.main, 0, 0);

        this.drawScore(9999, 9999);
        this.drawDialogue();
        this.drawHealth();
    }

}