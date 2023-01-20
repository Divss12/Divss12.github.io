//Initialising some stuff and settings
const canvas = document.querySelector(".game-canvas");
const ctx = canvas.getContext("2d");

ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

ctx.scale(3.5,3.5);

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