//Initialising some stuff and settings
const canvas = document.querySelector(".game-canvas");
const ctx = canvas.getContext("2d");

const scanvas = document.querySelector(".score-canvas");
const sctx = scanvas.getContext("2d");

function scaleCanvas(){
    const wHeight = window.innerHeight;
    const wWidth = window.innerWidth;
    
    var scaleFactor;
    if(wHeight * 16 > wWidth * 9){ //width constricts 
        scaleFactor = Math.floor((wWidth-20)/46.6)/10;
        canvas.width = scaleFactor*352;
        canvas.height = scaleFactor*264;
        scanvas.width = scaleFactor*114;
        scanvas.height = scaleFactor*264;
    }else{ // height constricts
        scaleFactor = Math.floor((wHeight-20)/26.4)/10;
        canvas.width = scaleFactor*352;
        canvas.height = scaleFactor*264; 
        scanvas.width = scaleFactor*114;
        scanvas.height = scaleFactor*264;
    }
    
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    sctx.webkitImageSmoothingEnabled = false;
    sctx.mozImageSmoothingEnabled = false;
    sctx.imageSmoothingEnabled = false;
    
    ctx.scale(scaleFactor, scaleFactor);
    sctx.scale(scaleFactor, scaleFactor);

    //temporary
    sctx.fillStyle = "#141D27";
    sctx.fillRect(0, 0, 114, 264);
}

scaleCanvas();
window.onresize = scaleCanvas;


// let canvasWidth = canvas.width;
// let canvasHeight = canvas.height;
// let parent = canvas.parentNode;
// let parentWidth = parent.clientWidth;
// let parentHeight = parent.clientHeight;

// canvas.style.position = "absolute";
// canvas.style.left = (parentWidth - canvasWidth) / 2 + "px";
// canvas.style.top = (parentHeight - canvasHeight) / 2 + "px";

/**
 * Returns a random integer between min (inclusive) and max (exclusive)
 */
function randRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}