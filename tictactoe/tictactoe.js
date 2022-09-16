class TicTacToe{
    constructor(width = 7, height = 6, gravity = false, players = 2, win = 4){
        this.gravity = gravity;
        this.game = players - 1;
        this.width = width;
        this.height = height;
        this.cur = 0;
        this.players = players;
        this.win = win;
        this.winner = [];
        this.windir = [];
        this.winsq = [];
        this.symbols = ['X', 'O', 'C', 'D', 'E']

        this.board = Array(height).fill().map(() => Array(width).fill().map(() => " "))
 
        if(gravity){
            this.validMoves = Array(width).fill().map((x,i) => i)
        } else{
            this.validMoves = Array(width*height).fill().map((x,i) => [Math.floor(i/width), i%width])
        }
    }
    move(moveX, moveY){
        if(!this.game){return}

        if(this.gravity){
            if(this.validMoves.includes(moveX)){
                if(this.board[1][moveX] != " "){this.validMoves = this.validMoves.filter((x) => x != moveX)}
                let flag = true;
                let i = 0
                for(i = 0; i < this.height; i++){
                    if(this.board[i][moveX] != " "){
                        flag = false;
                        break;
                    }
                }
                if(flag){i = this.height}

                this.board[i-1][moveX] = this.symbols[this.cur]

            }else{
                console.log("Invalid Move");
                return;
            }
            
        }else{
            let valid = false
            let i
            for(i = 0; i < this.validMoves.length; i++){
                if(this.validMoves[i][0] == moveX && this.validMoves[i][1] == moveY){valid = true; break}
            }
            if(valid){
                this.validMoves.splice(i,1)
                this.board[moveX][moveY] = this.symbols[this.cur]
            }else{
                console.log("Invalid Move");
                return;
            }
        }

        this.checkWin(this.cur);
        this.checkDraw();

        if(this.game){
            this.cur = (this.cur + 1)%this.players
            while(this.winner.includes(this.cur)){
                this.cur = (this.cur + 1)%this.players
            }
        }
    }

    checkWin(p){
        let s = this.symbols[p];
        let flag = false
        for(let y = 0; y < this.height; y++){
            for(let x = 0; x < this.width; x++){
                if(this.board[y][x] == s){
                    let v = this.height - this.win >= y
                    let h = this.width - this.win >= x
                    let e = (x > this.win - 2)&&(this.height - this.win >= y)
                    let d = v&&h

                    if(v||h){
                        for(let i = 1; i < this.win; i++){
                            if(v){if(this.board[y+i][x] != s){v = false}}
                            if(h){if(this.board[y][x+i] != s){h = false}}
                            if(d){if(this.board[y+i][x+i] != s){d = false}}
                            if(e){if(this.board[y+i][x-i] != s){e = false}}
                        }
                    }
                    
                    switch(true){
                        case v:
                            this.windir.push('v')
                            this.winsq.push([x,y])
                            flag = true
                            break
                        case h:
                            this.windir.push('h')
                            this.winsq.push([x,y])
                            flag = true
                            break
                        case d:
                            this.windir.push('d')
                            this.winsq.push([x,y])
                            flag = true
                            break
                        case e:
                            this.windir.push('e')
                            this.winsq.push([x,y])
                            flag = true
                            break
                    }
                }
                if(flag){break}
            }
            if(flag){break}
        }
        if(flag){
            this.game--
            this.winner.push(this.cur)
        }
    }

    checkDraw(){
        let flag = false
        for(let i; i < this.height; i++){
            for(let j; j < this.height; j++){
                if(this.board[i][j] == " "){
                    flag = true
                    break
                }
            }
            if(flag){break}
        }
        if(flag){this.game = 0}
    }
}

function printboard(board){
    for(let i = 0; i < board.length; i++){
        console.log(JSON.stringify(board[i])    )
    }
}
/*
let t = new TicTacToe(7, 6, true, 2, 4)
let moves = [[5,3], [5,2], [4,3], [3,3], [5,4], [4,2], [3,2], [5,1], [4,1], [3,1], [2,1], [5,1], [5,1], [5,1]]
for(let i = 0; i < moves.length; i++){
    console.log(t.validMoves)
    printboard(t.board)
    console.log(t.game)
    t.move(moves[i][0], moves[i][1])
    console.log("------------------------------------------------------------")
}
console.log(t.validMoves)
printboard(t.board)
console.log(t.game)
console.log(t.winner)
console.log(t.windir)
console.log(t.winsq)*/

