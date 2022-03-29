var maze = [];
var visited = [];
var parent = [];
var curSq = -1;
var path = [];
var frontier = [];

var gridX = 45;
var gridY = 25;

var sqSize = 18;
var xOff = 25;
var yOff = 15

//buttons
backButton = new Clickable();
generateButton = new Clickable();
clearButton = new Clickable();
skipButton = new Clickable();
solveButton = new Clickable();


var generating = false;
var solving = false;
var showAnimation = true;

function resize(width, height){
    sqSize = Math.floor(min((width-150)/gridX, (height-20)/gridY));
    xOff = (width-125-(sqSize*gridX))/2;
    yOff = (height-(sqSize*gridY))/2;
}

function generateVisited(w, h){
    for(let i = 0; i < w*h; i++){visited[i] = false}
}

function generateGraph(w, h){
    //creates a graph of a tesselated square grid and stores it into an adjacency list

    var graph  = [];
    for(let i = 0; i < w*h; i++){
        graph.push([]);
        if((i+1)%w){graph[i].push(i+1)} //right
        if(i+w < w*h){graph[i].push(i+w)} //below
        if(i%w){graph[i].push(i-1)} //left
        if(i-w+1 > 0){graph[i].push(i-w)} //above
    }
    return graph;
}

async function generateMazeDFS(graph, start = 0){
    generating = true;

    //uses an iterative version of randomised DFS to create the maze
    for(let i = 0; i < graph.length; i++){visited[i] = false}
    stack = new Stack();

    visited[start] = true;
    stack.push(start);
    let current;
    let nxt;
    while(stack.isNotEmpty()){
        current = stack.pop();

        if(showAnimation){
            await sleep(50);
            curSq = current;
            redraw();
        }



        //see if there are any unvisited neighbors
        hasUnvisitedNeighbors = false;
        for(let i = 0; i < graph[current].length; i++){
            if(!visited[graph[current][i]]){
                hasUnvisitedNeighbors = true;
                break;
            }
        }

        if(hasUnvisitedNeighbors){
            stack.push(current);

            unvisitedNeighbors = [];

            for(let i = 0; i < graph[current].length; i++){
                if(!visited[graph[current][i]]){
                    unvisitedNeighbors.push(graph[current][i]);
                }
            }

            nxt = unvisitedNeighbors[getRandInt(0, unvisitedNeighbors.length)];

            //remove the wall = dont have the edge in the graph

            remItem(graph[current], nxt);
            remItem(graph[nxt], current);

            //console.log(current);
            

            visited[nxt] = true
            stack.push(nxt);
        }

    }
    if(showAnimation){await sleep(50);}
    curSq = -1;
    redraw();

    generating = false;
    loop();
}

function convMazeToGraph(maze, w, h){
    //convert the maze into a navigable graph
    graph = new Array(maze.length);

    for(let i = 0; i < maze.length; i++){
        graph[i] = [];

        if((i+1)%w && !maze[i].includes(i+1)){graph[i].push(i+1)} //right
        if(i+w < w*h && !maze[i].includes(i+w)){graph[i].push(i+w)} //below
        if(i%w && !maze[i].includes(i-1)){graph[i].push(i-1)} //left
        if(i-w+1 > 0 && !maze[i].includes(i-w)){graph[i].push(i-w)} //above
    }

    return graph;
}

async function solveBFS(graph, start, goal){
    solving = true;

    //q = new Queue();
    for(let i = 0; i < graph.length; i++){visited[i] = false}
    for(let i = 0; i < graph.length; i++){parent[i] = -1}
    visited[start] = true; 
    //q.enqueue(start);
    frontier.push(start);
    let v = -1;
    while(v != goal){

        if(showAnimation){
            await sleep(50);
            redraw();
        }

        let temp = [];

        for(let j = 0; j < frontier.length; j++){
            v = frontier[j];
            if(v == goal){
                break;
            }
            for(let i = 0; i < graph[v].length; i++){
                w = graph[v][i];
                if(!visited[w]){
                    visited[w] = true;
                    temp.push(w);
                    parent[w] = v;
                }
            }
        }

        frontier = temp;
    }

    curSq = goal;
    while(curSq != -1){
        if(showAnimation){
            await sleep(50);
            redraw();
        }
        path.push(curSq);
        curSq = parent[curSq];
    }

    solving = false;
    loop();

}

function clearPath(w, h){
    path = [];
}

function drawMaze(graph, w, h){

    line(xOff + sqSize, yOff, w*sqSize + xOff, yOff);
    line(xOff, yOff, xOff, h*sqSize + yOff);
    line(xOff, h*sqSize + yOff, (w-1)*sqSize + xOff, h*sqSize + yOff);
    line(xOff + w*sqSize, yOff, xOff + w*sqSize, yOff + h*sqSize);


    let k, lx, ly;
    for(let i = 0; i < graph.length; i++){

        if(generating && !visited[i]){
            eks = (i%w)*sqSize;
            why = Math.floor(i/w) * sqSize;
            fill(0);
            square(eks+xOff, why+yOff, sqSize);
        }
        if(solving && visited[i] && !path.includes(i) && !frontier.includes(i)){

            eks = (i%w)*sqSize;
            why = Math.floor(i/w) * sqSize;
            fill(64, 235, 52);
            noStroke();
            square(eks+xOff, why+yOff, sqSize+1);
            stroke(0);
        }


        for(let j = 0; j < graph[i].length; j++){
            k = graph[i][j];
            //only need to draw right and bottom
            //this doesnt work if w = 1 but that should never happen
            if(k-i == 1){
                lx = (k%w)*sqSize + xOff;
                ly = Math.floor(i/w)*sqSize + yOff;
                line(lx, ly, lx, ly+sqSize);

            }
            if(k-i == w){
                //line is below the sq
                lx = (i%w)*sqSize + xOff;
                ly = Math.floor(k/w)*sqSize + yOff;
                line(lx, ly, lx+sqSize, ly);
            }
        }
    }
}

function drawcurSq(w, h){

    if(curSq != -1){  

        eks = (curSq%w)*sqSize;
        why = Math.floor(curSq/w) * sqSize;
        fill(235, 64, 52);
        noStroke();
        square(eks+xOff, why+yOff, sqSize);
        stroke(0);
    }
}

function drawPath(w, h){
    for(let i = 0; i < path.length; i++){
        eks = (path[i]%w)*sqSize;
        why = Math.floor(path[i]/w) * sqSize;
        fill(52, 64, 235);
        noStroke();
        square(eks+xOff, why+yOff, sqSize+1);
        stroke(0);
    }
    
}

function drawFrontier(w, h){
    for(let i = 0; i < frontier.length; i++){
        console.log(i);
        eks = (frontier[i]%w)*sqSize;
        why = Math.floor(frontier[i]/w) * sqSize;
        fill(235, 64, 52);
        noStroke();
        square(eks+xOff, why+yOff, sqSize+1);
        stroke(0);
    }
}


function setup(){
    createCanvas(windowWidth, windowHeight);
    background(256);
    //strokeWeight(2);

    resize(width, height);

    //buttons
    backButton.y = 25;
    backButton.x = width-125;
    backButton.text = "Back to Home";

    generateButton.y = 85;
    generateButton.x = width-125
    generateButton.text = "Generate (DFS)";

    clearButton.y = 145;
    clearButton.x = width-125;
    clearButton.text = "Clear Maze";

    skipButton.y = 205;
    skipButton.x = width-125;
    skipButton.text = "Skip Animation";

    solveButton.y = 265;
    solveButton.x = width-125;
    solveButton.text = "Solve (BFS)";

}

function windowResized(){
    clear();
    resizeCanvas(windowWidth, windowHeight);
    resize(width, height);

    backButton.x = width-125;
    generateButton.x = width-125;
    clearButton.x = width-125;
    skipButton.x = width-125;
    solveButton.x = width-125;
}

function draw(){
    clear();

    //buttons
    backButton.draw();
    generateButton.draw();
    clearButton.draw();
    skipButton.draw();
    solveButton.draw();

    drawPath(gridX, gridY);
    drawFrontier(gridX, gridY);
    drawMaze(maze, gridX, gridY);
    drawcurSq(gridX, gridY);
}

backButton.onPress = function(){
    window.location.href = "../#game";
}

generateButton.onPress = function(){
    if(!generating && !solving){
        noLoop();
        clearPath(gridX, gridY);
        maze = generateGraph(gridX, gridY);
        generateMazeDFS(maze);
    }
}

clearButton.onPress = function(){
    window.location.href = ".";
}

skipButton.onPress = function(){
    showAnimation = !showAnimation;
    if(showAnimation){skipButton.text = "Skip Animation";}
    else{skipButton.text = "Show Animation";}
}

solveButton.onPress = function(){
    if(!generating && !solving){
        noLoop();
        clearPath(gridX, gridY);
        let graph = convMazeToGraph(maze, gridX, gridY);
        solveBFS(graph, 0, graph.length-1);
    }
}
