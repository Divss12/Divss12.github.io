class Background {
    constructor (ctx) {
        this.ctx = ctx;

        //DUST
        this.dustbgs = [];
        this.curdst = [];
        this.yd = [];

        //STARS
        this.starbgs = [];
        this.curbgs = [];
        this.y = [];
    }

    init () {
        //DUST
        for(var i = 0; i < 8; i++){
            this.dustbgs.push(new Image());
            this.dustbgs[i].src = "assets/bg/dust"+i+".png";
        }
        this.curdst.push(this.dustbgs[randRange(0,8)]);
        this.curdst.push(this.dustbgs[randRange(0,8)]);
        this.yd.push(-264);
        this.yd.push(-968);

        //STARS
        for(var i = 0; i < 16; i++){
            this.starbgs.push(new Image());
            this.starbgs[i].src = "assets/bg/star"+i+".png";
        }
        this.curbgs.push(this.starbgs[randRange(0,16)]);
        this.curbgs.push(this.starbgs[randRange(0,16)]);
        this.y.push(0);
        this.y.push(-352);
    }

    newStarBG () {
        this.curbgs.shift();
        this.curbgs.push(this.starbgs[randRange(0,16)]);

        this.y.shift();
        this.y.push(this.y[0]-352);
    }

    newDustBG () {
        this.curdst.shift();
        this.curdst.push(this.dustbgs[randRange(0,8)]);

        this.yd.shift();
        this.yd.push(this.yd[0]-704);
    }

    draw (frame) {
        this.ctx.fillStyle = "#00172B";
        this.ctx.fillRect(0, 0, 352, 264);
    
        this.ctx.drawImage(this.curdst[0], 0, this.yd[0]-440);
        this.ctx.drawImage(this.curdst[1], 0, this.yd[1]-440);
    
        this.ctx.drawImage(this.curbgs[0], 0, this.y[0]-88);
        this.ctx.drawImage(this.curbgs[1], 0, this.y[1]-88);
    
        this.y[0] += 0.03*frame;
        this.y[1] += 0.03*frame;
        this.yd[0] += 0.09*frame;
        this.yd[1] += 0.09*frame;
    
        if(this.y[0] > 352){this.newStarBG();}
        if(this.yd[0] > 704){this.newDustBG();}
        
        //window.requestAnimationFrame(this.draw.bind(this));
    }
}