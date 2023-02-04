class Score {
    constructor (ctx) {
        this.ctx = ctx;

        this.health = 8;
        this.engine = false;
        this.hsm = false;
        this.shield = 0;

        this.sprite = {
            main: new Image(),
            nums: new Image(),
            eng: new Image(),
            gun: new Image(),
            shield: new Image(),
            cell: new Image(),
            health: new Image(),
        }
        this.sprite.main.src = "assets/icons/dashboard.png";
        this.sprite.nums.src = "assets/fonts/numbers.png";
        this.sprite.eng.src = "assets/icons/afterburner.png";
        this.sprite.gun.src = "assets/icons/cannon.png";
        this.sprite.shield.src = "assets/icons/shield.png";
        this.sprite.cell.src = "assets/icons/shieldcell.png";
        this.sprite.health.src = "assets/icons/health.png"

        this.distTick = 0;
        this.distFrame = [0,0,0,0];
        this.distVal = [0,0,0,0];
        this.distChanging = [false, false, false, false];

        this.enemFrame = [0,0,0,0];
        this.enemVal = [0,0,0,0];
        this.enemChanging = [false, false, false, false];

        this.dialog = [];
        this.dialogCurLine = 0;
        this.dialogF = 0;
        this.dialogFinished = true;
        this.dialogTick = 0;
    }

    drawHealth (h) {
        if(h>0){
            this.ctx.drawImage(this.sprite.health, 0, 0, 13, 13, 2, 20, 13, 13);
        }
        for(let i = 1; i < h; i++){
            this.ctx.drawImage(this.sprite.health, 14, 0, 13, 13, 2+14*i, 20, 13, 13);
        }
    }

    addDist() {
        let flag = true;
        for(var i = 3; i > -1; i--){
            if(flag){this.distVal[i]++; this.distChanging[i] = true;}
            if(this.distVal[i] == 10){this.distVal[i] = 0;}
            else {flag = false;}
        }
    }
    
    addEnemy() {
        let flag = true;
        for(var i = 3; i > -1; i--){
            if(flag){this.enemVal[i]++; this.enemChanging[i] = true;}
            if(this.enemVal[i] == 10){this.enemVal[i] = 0;}
            else {flag = false;}
        }
    }

    drawScore () {
        //dist
        for(let i = 0; i < 4; i++){
            if(this.distChanging[i]){
                let nxt = this.distVal[i];
                let pre;
                if(nxt == 0){pre = 9} else {pre = nxt-1}
                this.ctx.drawImage(this.sprite.nums, pre*8, 0, 7, 17-(this.distFrame[i]), 65+13*i, 41+(this.distFrame[i]), 7, 17-(this.distFrame[i]));
                this.ctx.drawImage(this.sprite.nums, nxt*8, 13-this.distFrame[i], 7, 17, 65+13*i, 35, 7, 17);

                this.distFrame[i]++;
                if(this.distFrame[i] == 17){this.distFrame[i] = 0; this.distChanging[i] = false}

            } else {
                this.ctx.drawImage(this.sprite.nums, this.distVal[i]*8, 0, 7, 13, 65 + 13*i, 41, 7, 13);
            }
        }

        //enem
        for(let i = 0; i < 4; i++){
            if(this.enemChanging[i]){
                let nxt = this.enemVal[i];
                let pre;
                if(nxt == 0){pre = 9} else {pre = nxt-1}
                this.ctx.drawImage(this.sprite.nums, pre*8, 0, 7, 17-(this.enemFrame[i]), 65+13*i, 67+(this.enemFrame[i]), 7, 17-(this.enemFrame[i]));
                this.ctx.drawImage(this.sprite.nums, nxt*8, 13-this.enemFrame[i], 7, 17, 65+13*i, 61, 7, 17);

                this.enemFrame[i]++;
                if(this.enemFrame[i] == 17){this.enemFrame[i] = 0; this.enemChanging[i] = false}

            } else {
                this.ctx.drawImage(this.sprite.nums, this.enemVal[i]*8, 0, 7, 13, 65 + 13*i, 67, 7, 13);
            }
        }
       

    }

    drawPowerUps (eng, hsm, shield) {
        if(eng){
            this.ctx.drawImage(this.sprite.eng, 10, 159)
        } else {
            this.ctx.drawImage(this.sprite.eng, 0, 6, 44, 5, 10, 159, 44, 5);
        }

        if(hsm){
            this.ctx.drawImage(this.sprite.gun, 0, 12, 44, 17, 52, 149, 44, 17);
        }else{
            this.ctx.drawImage(this.sprite.gun, 0, 0, 29, 11, 57, 149, 29, 11);
        }

        if(shield == 0){
            this.ctx.drawImage(this.sprite.shield, 0, 11, 48, 5, 34, 106, 48, 5)
        }else{
            this.ctx.drawImage(this.sprite.shield, 15, 94);
        }

        for(let i = 1; i < shield; i++){
            this.ctx.drawImage(this.sprite.cell, 108, 95+17*i)
        }

    }

    addDialog (text){
        if(!this.dialogFinished) {return false;}

        this.dialog = [];
        this.dialogCurLine = 0;
        this.dialogF = 0;
        this.dialogFinished = false;
        this.dialogTick = 0;

        this.ctx.font = "15px font1";
        this.ctx.fillStyle = "#fbf5ef";
        
        let flag = false;
        let p=0;
        
        text += " ";
        while(true){
            let i = p;
            let j = p;
            while(true){
                if(text.charAt(i) == " "){
                    if(this.ctx.measureText(text.slice(p, i), 0, 0).width > 103){break;}
                    j = i;
                }
                i++;
                if(i == text.length){flag = true; break;}
            }
            this.dialog.push(text.slice(p,j))
            p = j+1;
            if(flag){break}
        }

        return true;
    }

    drawDialogue () {
        if(this.dialog.length == 0){return;}

        this.ctx.font = "15px font1";
        this.ctx.fillStyle = "#fbf5ef";

        for(let i = 0; i < this.dialogCurLine+1; i++){
            let w;
            if(i < 3){w = 5} else {w = 45}

            if(i == this.dialogCurLine){
                this.ctx.fillText(this.dialog[i].slice(0, this.dialogF), w, 197+ i*10)
            }else{
                this.ctx.fillText(this.dialog[i], w, 197+ i*10);
            }
        }

        if(!this.dialogFinished){
            this.dialogTick++
            if(this.dialogTick == 3){ this.dialogTick = 0;
                if(this.dialogF < this.dialog[this.dialogCurLine].length) {this.dialogF++}
                else if(this.dialogCurLine < this.dialog.length-1) {this.dialogCurLine++; this.dialogF = 0;}
                else{this.dialogFinished = true}
            }
        }
    }

    draw (ticking) {
        this.ctx.fillStyle = "#141D27";
        this.ctx.fillRect(0, 0, 114, 264);

        this.drawHealth(this.health);
        this.drawScore();

        this.ctx.drawImage(this.sprite.main, 0, 0);

        this.drawPowerUps(this.engine, this.hsm, this.shield);      
        this.drawDialogue();

        if(ticking){
            this.distTick++;        
            if(this.distTick == 100){this.addDist(); this.distTick = 0;}
        }
        //this.addDialog("WATCH OUT! ASTEROIDS INCOMING")

    }

}