function preload(){
	X = loadImage('assets/x.png')
	O = loadImage('assets/o.png')
}

let inMenu = true
let game = new TicTacToe()

function setup() {
	createCanvas(960,960)
	background(220)
}

function drawMenu(){
	rect(width/2-100,height/2-50,200,100,15)
}

function drawGame(){
	for(let i = 0; i < game.width+1; i++){
		line(100 + 100*i, 100, 100 + 100*i, 100*(game.height+1))
	}
	for(let i = 0; i < game.height+1; i++){
		line(100, 100+100*i, 100*(game.width+1), 100+100*i)
	}
	for(let y = 0; y < game.height; y++){
		for(let x = 0; x < game.width; x++){
			if(game.board[y][x] == "X"){
				image(X,118+100*x,118+100*y)
			}
			if(game.board[y][x] == "O"){
				image(O,118+100*x,118+100*y)
			}
		}
	}
}

function draw() {
	if(inMenu){
		drawMenu();	
	}
	else{
		drawGame();
	}
}

function menuButtons(){
	if(mouseX < width/2+100 && mouseX > width/2-100 && mouseY < height/2+50 && mouseY > height/2-50){
		inMenu = false;
		background(220)
		game = new TicTacToe()
	}
}

function moves(){
	game.move(Math.floor((mouseY-100)/100), Math.floor((mouseX-100)/100))
}


function mousePressed(){
	if(inMenu){	
		menuButtons();
		
	}else{
		moves();
	}
}
