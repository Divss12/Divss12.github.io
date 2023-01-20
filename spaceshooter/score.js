class Score {
    constructor (ctx) {
        this.ctx = ctx;

        this.sprite = {
            portrait: new Image(),
            hearts: new Image(),
            radar: new Image(),
        }
        this.sprite.portrait.src = "assets/icons/portrait.png"
        this.sprite.hearts.src = "assets/icons/hearts.png"
        this.sprite.radar.src = "assets/icons/radar.png"
    }

    drawHealth () {
        this.ctx.drawImage(this.sprite.hearts, 0, 5);
    }

    drawScore (dist, score) {
        this.ctx.font = "14px font1";
        this.ctx.fillStyle = "#ffecd6";
        this.ctx.fillText("DISTANCE", 5, 36);
        this.ctx.fillText("COVERED", 5, 46);

        this.ctx.fillText("ENEMIES", 5, 60);
        this.ctx.fillText("SLAIN", 5, 70);

        this.ctx.fillText("(PLACEHOLDER UI)", 15, 90);

        this.ctx.font = "28px font1";
        this.ctx.fillText(dist, 60, 44);
        this.ctx.fillText(score, 60, 68)
        //this.ctx.fillText("ENEMIES SLAIN", 5, 60);
        //this.ctx.fillText(score, 5, 72);
    }

    drawRadar () {
        this.ctx.drawImage(this.sprite.radar, 0, 70);
    }

    drawDialogue () {
        this.ctx.drawImage(this.sprite.portrait, 7, 225);
        this.ctx.font = "16px font1";
        this.ctx.fillStyle = "#ffecd6";
        this.ctx.fillText("GREETINGS,", 50, 245)
        this.ctx.fillText("CAPTAIN", 56, 255)
    }

    draw () {
        this.drawScore(9999, 9999);
        this.drawDialogue();
        this.drawHealth();
    }

}