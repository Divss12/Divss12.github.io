backButton = new Clickable();
nextButton = new Clickable();
clearButton = new Clickable();
playButton = new Clickable();
aboutButton = new Clickable();

var gridSize = 100;
var grid =  new Array(gridSize);

var running = false;
var t;

function drawGrid(){
    /*
    for(let i = 50; i < Math.min(width-100, 50*gridSize); i += 50){
        line(i,0,i,height);
    }
    
    for(let j = 50; j < Math.min(height, 50*gridSize); j += 50){
        line(0,j,width-100 - (width%50),j);
    }*/
}


function setup(){
    createCanvas(windowWidth, windowHeight);
    background(256);

    //back button
    backButton.y = 25;
    backButton.x = width-125;
    backButton.text = "Back to Home";

    //next button
    nextButton.y = 85;
    nextButton.x = width-125;
    nextButton.text = "Next";

    //Start/Stop button
    playButton.y = 145;
    playButton.x = width-125;
    playButton.text = "Start";

    //clear button
    clearButton.y = 205;
    clearButton.x = width-125;
    clearButton.text = "Clear";

    //about button
    aboutButton.y = 265;
    aboutButton.x = width-125;
    aboutButton.text = "About";


    drawGrid();


    //set everything to 0
    for(var i = 0; i < gridSize; i++){
        grid[i] = new Array(gridSize);
        for(var j = 0; j < gridSize; j++){
            grid[i][j] = 0;
        }
    }
    
}

function windowResized(){
    clear();

    resizeCanvas(windowWidth, windowHeight);

    drawGrid();

    //button
    backButton.x = width-125;
    nextButton.x = width-125;
    playButton.x = width-125;
    clearButton.x = width-125;
    aboutButton.x = width-125;
}

function draw(){

    for(let i = 0; i < Math.min(height/50, gridSize); i++){
        for(let j = 0; j < Math.min(width/50 - 2, gridSize); j++){
            if(grid[i][[j]]){
                fill(0);
                square(j*50, i*50, 50);
            }
        }
    }

    backButton.draw();
    nextButton.draw();
    playButton.draw();
    clearButton.draw();
    //aboutButton.draw();

}

backButton.onPress = function(){
    window.location.href = "../#game";
}

clearButton.onPress = function(){
    for(let i = 0; i < 100; i++){
        for(let j = 0; j < 100; j++){
            grid[i][j] = 0;
        }
    }
    console.log(grid[0][0]);
    clear();
    drawGrid();
}

function nextGeneration(){
    console.log("nextgen called");
    let temp = new Array(gridSize);
    for(let i = 0; i < gridSize; i++){
        temp[i] = new Array(gridSize);

        for(let j = 0; j < gridSize; j++){
            let numNeighbors = 0;
            //up
            if(i != 0){if(grid[i-1][j]){numNeighbors++;}}
            //upper left
            if(i != 0 && j != 0){if(grid[i-1][j-1]){numNeighbors++;}}
            //left
            if(j != 0){if(grid[i][j-1]){numNeighbors++;}}
            //bottom left
            if(i != gridSize-1 && j != 0){if(grid[i+1][j-1]){numNeighbors++}}
            //bottom
            if(i != gridSize-1){if(grid[i+1][j]){numNeighbors++}}
            //bottom right
            if(i != gridSize-1 && j != gridSize-1){if(grid[i+1][j+1]){numNeighbors++}}
            //right
            if(j != gridSize-1){if(grid[i][j+1]){numNeighbors++}}
            //upper right
            if(i != 0 && j != gridSize-1){if(grid[i-1][j+1]){numNeighbors++}}

            if(grid[i][j]){
                if(numNeighbors == 2 || numNeighbors == 3){temp[i][j] = 1;}
                else{temp[i][j] = 0;}
            }
            else{
                if(numNeighbors == 3){temp[i][j] = 1;}
                else{temp[i][j] = 0;}
            }
        }
    }
    grid = temp;
    clear();

    drawGrid();
}

nextButton.onPress = nextGeneration;

playButton.onPress = function(){
    running = !running;

    if(running){
        t = setInterval(nextGeneration, 1000);
        playButton.text = "Stop";
    }
    else{
        clearInterval(t)
        playButton.text = "Start";
    }
}

function mousePressed(){
    gridX = Math.floor(mouseX/50);
    gridY = Math.floor(mouseY/50);
    if(mouseX < width-150  && !running){
        grid[gridY][gridX] = 1;
    }
}