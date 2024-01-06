

class Chess{
    constructor(conn, isblack){
        this.c = conn;
        this.isblack = isblack??false

        this.board = [
            ["r", "n", "b", "q", "k", "b", "n", "r"],
            ["p", "p", "p", "p", "p", "p", "p", "p"],
            ["o", "o", "o", "o", "o", "o", "o", "o"],
            ["o", "o", "o", "o", "o", "o", "o", "o"],
            ["o", "o", "o", "o", "o", "o", "o", "o"],
            ["o", "o", "o", "o", "o", "o", "o", "o"],
            ["P", "P", "P", "P", "P", "P", "P", "P"],
            ["R", "N", "B", "Q", "K", "B", "N", "R"]
        ]

        this.whitePoints = -1;
        this.blackPoints = -1;
        this.topBar1 = document.getElementById("player-1-movepoints0")
        this.topBar2 = document.getElementById("player-1-movepoints1")
        this.botBar1 = document.getElementById("player-2-movepoints0")
        this.botBar2 = document.getElementById("player-2-movepoints1")
        
        this.graveyard = [];

    }

    start(){
        setInterval(this.addPoints.bind(this), 1500)
    }

    addPoints(){
        if(this.blackPoints < 10){this.blackPoints++}
        if(this.whitePoints < 10){this.whitePoints++}

        this.updateBars(true);
    }

    updateBars(anim){
        if(!anim){
            this.botBar1.style.transition = "none"
            this.botBar2.style.transition = "none"
            this.topBar1.style.transition = "none"
            this.topBar2.style.transition = "none"
        }

        if(this.isblack){
            this.botBar1.style.width = `${Math.min(100, (this.blackPoints+1) * 10)}%`; 
            this.botBar2.style.width = `${this.blackPoints * 10}%`; 
            this.topBar1.style.width = `${Math.min(100, (this.whitePoints+1) * 10)}%`;
            this.topBar2.style.width = `${this.whitePoints * 10}%`;
        }else{
            this.botBar1.style.width = `${Math.min(100, (this.whitePoints+1) * 10)}%`; 
            this.botBar2.style.width = `${this.whitePoints * 10}%`; 
            this.topBar1.style.width = `${Math.min(100, (this.blackPoints+1) * 10)}%`;
            this.topBar2.style.width = `${this.blackPoints * 10}%`;
        }

        if(!anim){
            setTimeout(this.resetAnim.bind(this), 10)
        }


    }

    resetAnim(){
        this.botBar2.style.transition = "width 0.5s ease"
        this.botBar1.style.transition = "width 1.5s linear"
        this.topBar2.style.transition = "width 0.5s ease"
        this.topBar1.style.transition = "width 1.5s linear"
    }

    findRookMoves(x, y){
        var moveList = []
        //find horizontal left
        for(var i = 1; i < x+1; i++){
            if(this.board[x-i][y] == "o"){
                moveList.push({x: x-i, y: y})
            } else {break} 
        }
        //find horizontal right
        for(var i = 1; i < 8-x; i++){
            if(this.board[x+i][y] == "o"){
                moveList.push({x: x+i, y: y})
            } else {break}
        }
        //find vertical up
        for(var i = 1; i < y+1; i++){
            if(this.board[x][y-i] == "o"){
                moveList.push({x: x, y: y-i})
            } else {break}
        }
        //find vertical down
        for(var i = 1; i < 8-y; i++){
            if(this.board[x][y+i] == "o"){
                moveList.push({x: x, y: y+i})
            } else {break}
        }
        return moveList;
    }

    findRookCaptures(x, y, w){
        var captureList = []
        for(var i = 1; i < x+1; i++){
            if(isLower(this.board[x-i][y])  == w && this.board[x-i][y] !== "o"){
                captureList.push({x: x-i, y: y});
                break;
            }
        }
        //find horizontal right
        for(var i = 1; i < 8-x; i++){
            if(isLower(this.board[x+i][y])  == w && this.board[x+i][y] !== "o"){
                captureList.push({x: x+i, y: y})
                break;
            }
        }
        //find vertical up
        for(var i = 1; i < y+1; i++){
            if(isLower(this.board[x][y-i])  == w && this.board[x][y-i] !== "o"){
                captureList.push({x: x, y: y-i})
                break;
            }
        }
        //find vertical down
        for(var i = 1; i < 8-y; i++){
            if(isLower(this.board[x][y+i])  == w && this.board[x][y+i] !== "o"){
                captureList.push({x: x, y: y+i})
                break;
            }
        }
        return captureList;
    }

    findBishopMoves(x, y){
        var moveList = [];
        var m;
        //find up and left
        m = Math.min(x, y) + 1;
        for(var i = 1; i < m; i++){
            if(this.board[x-i][y-i] == "o"){
                moveList.push({x: x-i, y: y-i})
            } else {break}
        }
        //find up and right
        m = Math.min(7-x, y) + 1;
        for(var i = 1; i < m; i++){
            if(this.board[x+i][y-i] == "o"){
                moveList.push({x: x+i, y: y-i})
            } else {break}
        }
        //find down and right
        m = Math.min(7-x, 7-y) + 1;
        for(var i = 1; i < m; i++){
            if(this.board[x+i][y+i] = "o"){
                moveList.push({x: x+i, y: y+i})
            } else {break}
        }
        //find down and left
        m = Math.min(x, 7-y) + 1;
        for(var i = 1; i < m; i++){
            if(this.board[x-i][y+i] == "o"){
                moveList.push({x: x-i, y: y+i})
            } else {break}
        }
        return moveList;
    }

    findBishopCaptures(x, y, w){
        var captureList = [];
        var m;
        //find up and left
        m = Math.min(x, y) + 1;
        for(var i = 1; i < m; i++){
            if(isLower(this.board[x-i][y-i])  == w && this.board[x-i][y-i] !== "o"){
                captureList.push({x: x-i, y: y-i})
                break;
            }
        }
        //find up and right
        m = Math.min(7-x, y) + 1;
        for(var i = 1; i < m; i++){
            if(isLower(this.board[x+i][y-i])  == w && this.board[x+i][y-i] !== "o"){
                captureList.push({x: x+i, y: y-i})
                break;
            }
        }
        //find down and right
        m = Math.min(7-x, 7-y) + 1;
        for(var i = 1; i < m; i++){
            if(isLower(this.board[x+i][y+i])  == w && this.board[x+i][y+i] !== "o"){
                captureList.push({x: x+i, y: y+i})
                break;
            }
        }
        //find down and left
        m = Math.min(x, 7-y) + 1;
        for(var i = 1; i < m; i++){
            if(isLower(this.board[x-i][y+i])  == w && this.board[x-i][y+i] !== "o"){
                captureList.push({x: x-i, y: y+i})
                break;
            }
        }
        return captureList;
    }


    findMoves(x, y){ //returns list of possible squares that the piece on [x,y] can move to. [0,0] is top left corner; black's queen's rook in the starting position
                    // and also returns a list of pieces that can be captured
        var moveList = []
        var captureList = []
        //NOTE: REMEMBER TO HANDLE PAWN PROMOTION
        switch(this.board[x][y]){
            case "o": break;
            case "r":
                moveList = this.findRookMoves(x, y);
                captureList = this.findRookCaptures(x, y, false);
                break;
            case "R":
                moveList = this.findRookMoves(x, y);
                captureList = this.findRookCaptures(x, y, true);
                break;
            case "b":
                moveList = this.findBishopMoves(x, y);
                captureList = this.findBishopCaptures(x, y, false);
                break;
            case "B":
                moveList = this.findBishopMoves(x, y);
                captureList = this.findBishopCaptures(x, y, true);
                break;
            case "n":
            case "N":
                if(x<6 && y<7){if(this.board[x+2][y+1] == "o"){moveList.push({x: x+2, y: y+1})}} 
                if(x<6 && y>0){if(this.board[x+2][y-1] == "o"){moveList.push({x: x+2, y: y-1})}}
                if(x>1 && y>0){if(this.board[x-2][y-1] == "o"){moveList.push({x: x-2, y: y-1})}}
                if(x>1 && y<7){if(this.board[x-2][y+1] == "o"){moveList.push({x: x-2, y: y+1})}}
                if(x<7 && y>1){if(this.board[x+1][y-2] == "o"){moveList.push({x: x+1, y: y+2})}}
                if(x<7 && y<6){if(this.board[x+1][y+2] == "o"){moveList.push({x: x+1, y: y-2})}}
                if(x>0 && y>1){if(this.board[x-1][y-2] == "o"){moveList.push({x: x-1, y: y-2})}}
                if(x>0 && y<6){if(this.board[x-1][y+2] == "o"){moveList.push({x: x-1, y: y+2})}}
                var w = !isLower(this.board[x][y]);
                if(x<6 && y<7){if(isLower(this.board[x+2][y+1]) == w && this.board[x+2][y+1] !== "o"){captureList.push({x: x+2, y: y+1})}} 
                if(x<6 && y>0){if(isLower(this.board[x+2][y-1]) == w && this.board[x+2][y-1] !== "o"){captureList.push({x: x+2, y: y-1})}}
                if(x>1 && y>0){if(isLower(this.board[x-2][y-1]) == w && this.board[x-2][y-1] !== "o"){captureList.push({x: x-2, y: y-1})}}
                if(x>1 && y<7){if(isLower(this.board[x-2][y+1]) == w && this.board[x-2][y+1] !== "o"){captureList.push({x: x-2, y: y+1})}}
                if(x<7 && y>1){if(isLower(this.board[x+1][y-2]) == w && this.board[x+1][y-2] !== "o"){captureList.push({x: x+1, y: y+2})}}
                if(x<7 && y<6){if(isLower(this.board[x+1][y+2]) == w && this.board[x+1][y+2] !== "o"){captureList.push({x: x+1, y: y-2})}}
                if(x>0 && y>1){if(isLower(this.board[x-1][y-2]) == w && this.board[x-1][y-2] !== "o"){captureList.push({x: x-1, y: y-2})}}
                if(x>0 && y<6){if(isLower(this.board[x-1][y+2]) == w && this.board[x-1][y+2] !== "o"){captureList.push({x: x-1, y: y+2})}}
                break;
            case "p": //no double move
                if(this.board[x+1][y] === "o"){moveList.push({x: x+1, y: y})}
                if(y>0){if(!isLower(this.board[x+1][y-1]) && this.board[x+1][y-1] !== "o"){captureList.push({x: x+1, y: y-1})}}
                if(y<7){if(!isLower(this.board[x+1][y+1]) && this.board[x+1][y+1] !== "o"){captureList.push({x: x+1, y: y+1})}}
                break;
            case "P":
                if(this.board[x-1][y] === "o"){moveList.push({x: x-1, y: y})}
                if(y>0){if(isLower(this.board[x-1][y-1]) && this.board[x-1][y-1] !== "o"){captureList.push({x: x-1, y: y-1})}}
                if(y<7){if(isLower(this.board[x-1][y+1]) && this.board[x-1][y+1] !== "o"){captureList.push({x: x-1, y: y+1})}}
                break;
            case "q":
                moveList = this.findBishopMoves(x,y);
                moveList.push(...this.findRookMoves(x,y));
                captureList = this.findBishopCaptures(x, y, false);
                captureList.push(...this.findRookCaptures(x,y, false));
                break;
            case "Q":
                moveList = this.findBishopMoves(x,y);
                moveList.push(...this.findRookMoves(x,y));
                captureList = this.findBishopCaptures(x, y, true);
                captureList.push(...this.findRookCaptures(x,y,true));
                break;
            case "k":
            case "K":
                if(y<7){if(this.board[x][y+1] == "o"){moveList.push({x: x, y: y+1})}}
                if(y>0){if(this.board[x][y-1] == "o"){moveList.push({x: x, y: y-1})}}
                if(x<7){if(this.board[x+1][y] == "o"){moveList.push({x: x+1, y: y})}}
                if(x>0){if(this.board[x-1][y] == "o"){moveList.push({x: x-1, y: y})}}
                if(x<7 && y<7){if(this.board[x+1][y+1] == "o"){moveList.push({x: x+1, y: y+1})}}
                if(x<7 && y>0){if(this.board[x+1][y-1] == "o"){moveList.push({x: x+1, y: y-1})}}
                if(x>0 && y<7){if(this.board[x-1][y+1] == "o"){moveList.push({x: x-1, y: y+1})}}
                if(x>0 && y>0){if(this.board[x-1][y-1] == "o"){moveList.push({x: x-1, y: y-1})}}
                var w = !isLower(this.board[x][y])
                if(y<7){if(isLower(this.board[x][y+1]) == w && this.board[x][y+1] !== "o"){captureList.push({x: x, y: y+1})}}
                if(y>0){if(isLower(this.board[x][y-1]) == w && this.board[x][y-1] !== "o"){captureList.push({x: x, y: y-1})}}
                if(x<7){if(isLower(this.board[x+1][y]) == w && this.board[x+1][y] !== "o"){captureList.push({x: x+1, y: y})}}
                if(x>0){if(isLower(this.board[x-1][y]) == w && this.board[x-1][y] !== "o"){captureList.push({x: x-1, y: y})}}
                if(x<7 && y<7){if(isLower(this.board[x+1][y+1]) == w && this.board[x+1][y+1] !== "o"){captureList.push({x: x+1, y: y+1})}}
                if(x<7 && y>0){if(isLower(this.board[x+1][y-1]) == w && this.board[x+1][y-1] !== "o"){captureList.push({x: x+1, y: y-1})}}
                if(x>0 && y<7){if(isLower(this.board[x-1][y+1]) == w && this.board[x-1][y+1] !== "o"){captureList.push({x: x-1, y: y+1})}}
                if(x>0 && y>0){if(isLower(this.board[x-1][y-1]) == w && this.board[x-1][y-1] !== "o"){captureList.push({x: x-1, y: y-1})}}
                break;
        }

        return [moveList, captureList];
    }

    move(start, end, received){
        let sx = +start[0]
        let sy = +start[1]
        let ex = +end[0]
        let ey = +end[1]

        var moves, captures;
        [moves, captures] = this.findMoves(sx, sy);

        if(sx == ex && sy == ey){
            this.display(this.board, this.isblack, moves, captures);
            return;
        }

        var flag = false;
        for(var i = 0; i < moves.length; i++){
            if(moves[i].x == ex && moves[i].y == ey){
                flag = true;
                break;
            }
        }
        if(!flag){for(var i = 0; i < captures.length; i++){
            if(captures[i].x == ex && captures[i].y == ey){
                flag = true;
                break;
            }
        }}

        if(flag){
            
            if(!received){this.c.send(start+end)} 

            var startPiece = this.board[sx][sy]
            var endPiece = this.board[ex][ey]
            if(startPiece == "o"){return}
            if(endPiece != "o"){if(isLower(startPiece) == isLower(endPiece)){return}}
            //if(isLower(startPiece))

            if(this.subPoints(startPiece)){
                this.board[ex][ey] = startPiece;
                this.board[sx][sy] = "o";
            }
            this.display(this.board, this.isblack)
        }
    }

    subPoints(piece){
        var cost = 0;
        switch(piece){
            case "p":
            case "P": cost = 2; break;
            case "r":
            case "R":
            case "k":
            case "K": cost = 4; break;
            case "b":
            case "B":
            case "n":
            case "N": cost = 3; break;
            case "q":
            case "Q": cost = 5; break;
        }
                                                       
        if(isLower(piece) == this.isblack){
            if(this.blackPoints < cost){return false}
            this.blackPoints -= cost
        }else{
            if(this.whitePoints < cost){return false}
            this.whitePoints -= cost
        }
        this.updateBars(false);                                                                           
        return true;
    }

    showMoves(x,y){
        var moves, captures;
        [moves, captures] = this.findMoves(x,y);
        this.display(this.board, this.black, moves, captures)
    }
    
    display(board, flip, moves=[], captures=[]) {
        document.getElementById('board').innerHTML = ""

        // Create a container element for the board
        const container = document.createElement('div');
        container.classList.add('chess-board');
    
        // Loop through the rows and create a div for each row
        for (let i = 0; i < board.length; i++) {
            let row;
            if(flip){row = board[7-i]}
            else    {row = board[i];}
            const rowElement = document.createElement('div');
            rowElement.classList.add('chess-row');
    
            // Loop through the characters in the row and create a div for each square
            for (let j = 0; j < row.length; j++) {
                const square = row[j];
                const squareElement = document.createElement('div');
                squareElement.classList.add('chess-square');
                
                if(flip){squareElement.id = ""+(7-i)+j}
                else{squareElement.id = ""+i+j}
    
                // Set the background color of the square based on its position
                if ((i + j) % 2 === 0) {
                    squareElement.classList.add('chess-square-white');
                } else {
                    squareElement.classList.add('chess-square-black');
                }
                if(square !== "o"){
                    const img = document.createElement("img");
                    img.src = "assets/"+square+(0+isLower(square))+".svg";
                    img.setAttribute("width", "64px")
                    img.setAttribute("height", "64px")
                    img.setAttribute("draggable", "true")
                    if(flip){img.id = ""+(7-i)+j}
                    else{img.id = ""+i+j}
                    img.addEventListener("dragstart", event => {
                        event.dataTransfer.setData("text/plain", event.target.id)
                    })

                    img.addEventListener("click", event => {
                        if(flip){this.showMoves(7-i,j)}
                        else{this.showMoves(i,j)}
                    })
                    img.addEventListener("dragover", event => {event.preventDefault();});
                    img.addEventListener("drop", event => {
                        let startSq = event.dataTransfer.getData("text/plain");
                        let endSq = event.target.id;
                        this.move(startSq, endSq, false);
                    })

                    squareElement.appendChild(img);
                }
                squareElement.addEventListener("dragover", event => {event.preventDefault();});
                squareElement.addEventListener("drop", event => {
                    let startSq = event.dataTransfer.getData("text/plain");
                    let endSq = event.target.id;
                    this.move(startSq, endSq, false);
                })
    
                // Add the square to the row
                rowElement.appendChild(squareElement);
            }
    
            // Add the row to the board
            container.appendChild(rowElement);
        }

        document.getElementById('board').appendChild(container);

        for(var i = 0; i < moves.length; i++){
            const mSquare = document.getElementById(""+moves[i].x+moves[i].y);
            const img = document.createElement("img");
            img.id = mSquare.id;
            img.src = "assets/o.svg"
            img.setAttribute("width", "64px")
            img.setAttribute("height", "64px")
            img.addEventListener("dragover", event => {event.preventDefault();});
            img.addEventListener("drop", event => {
                let startSq = event.dataTransfer.getData("text/plain");
                let endSq = event.target.id;
                this.move(startSq, endSq, false);
            })

            mSquare.appendChild(img);
        }

        for(var j = 0; j < captures.length; j++){
            console.log(captures[j].x, captures[j].y)
        }
    }
}


let chess = new Chess();
chess.display(chess.board, false)
//temp
chess.start();