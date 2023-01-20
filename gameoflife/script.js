const gridHeight = 30
const gridWidth = 40

var grid = new Array(gridHeight)
for(var i = 0; i < gridHeight; i++){
    grid[i] = new Array(gridWidth);
    for(var j = 0; j < gridWidth; j++){
        grid[i][j] = 0;
        if(i == j){grid[i][j] = 1;}
    }
}

function nextGeneration(){
    let temp = new Array(gridHeight);
    for(let i = 0; i < gridHeight; i++){
        temp[i] = new Array(gridWidth);

        for(let j = 0; j < gridWidth; j++){
            let numNeighbors = 0;
            //up
            if(i != 0){if(grid[i-1][j]){numNeighbors++;}}
            //upper left
            if(i != 0 && j != 0){if(grid[i-1][j-1]){numNeighbors++;}}
            //left
            if(j != 0){if(grid[i][j-1]){numNeighbors++;}}
            //bottom left
            if(i != gridHeight-1 && j != 0){if(grid[i+1][j-1]){numNeighbors++}}
            //bottom
            if(i != gridHeight-1){if(grid[i+1][j]){numNeighbors++}}
            //bottom right
            if(i != gridHeight-1 && j != gridWidth-1){if(grid[i+1][j+1]){numNeighbors++}}
            //right
            if(j != gridWidth-1){if(grid[i][j+1]){numNeighbors++}}
            //upper right
            if(i != 0 && j != gridWidth-1){if(grid[i-1][j+1]){numNeighbors++}}

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
}

function drawGrid(n, m, grid) {
    // create the table element
    const table = document.createElement('table');
  
    // create n rows
    for (let i = 0; i < n; i++) {
      const row = document.createElement('tr');
  
      // create m cells
      for (let j = 0; j < m; j++) {
        const cell = document.createElement('td');
        cell.style.backgroundColor = grid[i][j] ? 'black' : 'white';
        row.appendChild(cell);
      }
  
      table.appendChild(row);
    }
  
    return table;
  }

const table = drawGrid(gridHeight, gridWidth, grid);
document.body.appendChild(table);