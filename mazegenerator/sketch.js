var sqSize = 50;

var maze = [];

var visited = [];

var curSq;

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
    //uses an iterative version of randomised DFS to create the maze
    for(let i = 0; i < graph.length; i++){visited[i] = false}
    stack = new Stack();

    visited[start] = true;
    stack.push(start);
    let current;
    let nxt;
    while(stack.isNotEmpty()){
        current = stack.pop();

        await sleep(100);
        curSq = current;
        redraw();

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

}

function drawMaze(graph, w, h){
    
    let xOff = 25;
    let yOff = 15;

    line(xOff + sqSize, yOff, w*sqSize + xOff, yOff);
    line(xOff, yOff, xOff, h*sqSize + yOff);
    line(xOff, h*sqSize + yOff, (w-1)*sqSize + xOff, h*sqSize + yOff);
    line(xOff + w*sqSize, yOff, xOff + w*sqSize, yOff + h*sqSize);


    let k, lx, ly;
    for(let i = 0; i < graph.length; i++){
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
        if(!visited[i]){
            eks = (i%w)*sqSize;
            why = Math.floor(i/w) * sqSize;
            fill(0);
            square(eks+xOff, why+yOff, sqSize);
        }
    }
}

function drawcurSq(w, h){
        
    let xOff = 25;
    let yOff = 15;

    eks = (curSq%w)*sqSize;
    why = Math.floor(curSq/w) * sqSize;
    fill(60);
    noStroke();
    square(eks+xOff+1, why+yOff+1, sqSize-2);
    stroke(0);

}


function setup(){
    createCanvas(windowWidth, windowHeight);
    background(256);



    maze = generateGraph(40,20);
    generateVisited(40,20);
    generateMazeDFS(maze);

    noLoop();
}

function draw(){
    clear();
    drawMaze(maze, 40, 20);
    drawcurSq(40, 20);
}