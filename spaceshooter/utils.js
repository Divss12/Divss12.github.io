//Initialising some stuff and settings
const canvas = document.querySelector(".game-canvas");
const ctx = canvas.getContext("2d");

const scanvas = document.querySelector(".score-canvas");
const sctx = scanvas.getContext("2d");

const ccanvasl = document.querySelector(".control-canvas-l");
const ctxl = ccanvasl.getContext("2d");
const ccanvasr = document.querySelector(".control-canvas-r");
const ctxr = ccanvasr.getContext("2d")

var scale = 1;
var topLeftX = 0;
var topLeftY = 0;
var topLeftXs = 0;
var topLeftYs = 0;
var topLeftXl = 0;
var topLeftYl = 0;
var topLeftXr = 0;
var topLeftYr = 0;

var isMobileControls = false;
screen.orientation.lock('landscape');   
canvas.requestFullscreen()

function scaleCanvas(){
    //console.log("scaleCanvas called with isMobileControls", isMobileControls)
    
    var wHeight = window.innerHeight;
    var wWidth = window.innerWidth;
    
    if(wHeight > wWidth){
        let temp = wHeight;
        wHeight = wWidth;
        wWidth = temp;
    }
    
    var scaleFactor;
    if(isMobileControls){
        if(wHeight * 19 > wWidth * 9){ //width constricts
            scale = (wWidth-20)/525; 
            scaleFactor = Math.floor((wWidth-20)/52.5)/10;
            canvas.width = scaleFactor*352;
            canvas.height = scaleFactor*264;
            scanvas.width = scaleFactor*115;
            scanvas.height = scaleFactor*264;
            ccanvasl.width = scaleFactor*43;
            ccanvasl.height = scaleFactor*264;
            ccanvasr.width = scaleFactor*43;
            ccanvasr.height = scaleFactor*264;
        }else{ // height constricts
            scale = (wHeight-20)/264;
            scaleFactor = Math.floor((wHeight-20)/26.4)/10;
            canvas.width = scaleFactor*352;
            canvas.height = scaleFactor*264; 
            scanvas.width = scaleFactor*115;
            scanvas.height = scaleFactor*264;
            ccanvasl.width = scaleFactor*43;
            ccanvasl.height = scaleFactor*264;
            ccanvasr.width = scaleFactor*43;
            ccanvasr.height = scaleFactor*264;
        }
        ctxl.scale(scaleFactor, scaleFactor);
        ctxr.scale(scaleFactor, scaleFactor);
    }
    else{
        if(wHeight * 16 > wWidth * 9){ //width constricts
            scale = (wWidth-20)/466; 
            scaleFactor = Math.floor((wWidth-20)/46.6)/10;
            canvas.width = scaleFactor*352;
            canvas.height = scaleFactor*264;
            scanvas.width = scaleFactor*115;
            scanvas.height = scaleFactor*264;
        }else{ // height constricts
            scale = (wHeight-20)/264;
            scaleFactor = Math.floor((wHeight-20)/26.4)/10;
            canvas.width = scaleFactor*352;
            canvas.height = scaleFactor*264; 
            scanvas.width = scaleFactor*115;
            scanvas.height = scaleFactor*264;
        }

        ccanvasl.width = 0;
        ccanvasl.height = 0;
        ccanvasr.width = 0;
        ccanvasr.height = 0;
        //ccanvasl.style.border = "0px";
        //ccanvasr.style.border = "0px";
    }
    ctx.webkitImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    sctx.webkitImageSmoothingEnabled = false;
    sctx.imageSmoothingEnabled = false;
    
    ctxl.webkitImageSmoothingEnabled = false;
    ctxl.imageSmoothingEnabled = false;
    ctxr.webkitImageSmoothingEnabled = false;
    ctxr.imageSmoothingEnabled = false;

    ctx.scale(scaleFactor, scaleFactor);
    sctx.scale(scaleFactor, scaleFactor);

    //console.log(scaleFactor)

    var rect = canvas.getBoundingClientRect();
    topLeftX = rect.left;
    topLeftY = rect.top;

    var srect = scanvas.getBoundingClientRect();
    topLeftXs = srect.left;
    topLeftYs = srect.top;

    var rectl = ccanvasl.getBoundingClientRect();
    topLeftXl = rectl.left;
    topLeftYl = rectl.top;

    var rectr = ccanvasr.getBoundingClientRect();
    topLeftXr = rectr.left;
    topLeftYr = rectr.top;
}

scaleCanvas();
window.onresize = scaleCanvas;

var hiscore = window.localStorage.getItem('hiscore');
var hienemies = window.localStorage.getItem('hienemies');

if(hiscore === null){
    hiscore = 0;
    window.localStorage.setItem('hiscore', 0);
}
if(hienemies === null){
    hienemies = 0;
    window.localStorage.setItem('hienemies', 0);
}

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