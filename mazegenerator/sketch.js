function generateGraph(w,h){
    graph  = new Array(h);
    for(let i = 0; i < h; i++){
        graph[i] = [];
        if((i+1)%w){graph[i].push(i+1)} //right
        if(i+w+1 < w*h){graph[i].push(i+w)} //below
        if(i%w){graph[i].push(i-1)} //left
        if(i-w+1 > 0){graph[i].push(i-w)} //above
    }
}


function setup(){

}

function draw(){

}