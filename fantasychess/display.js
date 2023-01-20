
function createChessBoard(boardString) {
    // Create a container element for the board
    const container = document.createElement('div');
    container.classList.add('chess-board');
  
    // Split the board string into an array of rows
    const rows = boardString.split('\n');
  
    // Loop through the rows and create a div for each row
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const rowElement = document.createElement('div');
      rowElement.classList.add('chess-row');
  
      // Loop through the characters in the row and create a div for each square
      for (let j = 0; j < row.length; j++) {
        const square = row[j];
        const squareElement = document.createElement('div');
        squareElement.classList.add('chess-square');
  
        // Set the background color of the square based on its position
        if ((i + j) % 2 === 0) {
          squareElement.classList.add('chess-square-white');
        } else {
          squareElement.classList.add('chess-square-black');
        }
  
        // Set the content of the square based on the character in the input string
        switch (square) {
          case 'o':
            // Empty square, do nothing
            break;
          case 'n':
            squareElement.innerHTML = '&#9822;';
            break;
          case 'b':
            squareElement.innerHTML = '&#9821;';
            break;
          case 'r':
            squareElement.innerHTML = '&#9820;';
            break;
          case 'q':
            squareElement.innerHTML = '&#9819;';
            break;
          case 'k':
            squareElement.innerHTML = '&#9818;';
            break;
          case 'p':
            squareElement.innerHTML = '&#9823;';
            break;
          case 'N':
            squareElement.innerHTML = '&#9816;';
            break;
          case 'B':
            squareElement.innerHTML = '&#9815;';
            break;
          case 'R':
            squareElement.innerHTML = '&#9814;';
            break;
          case 'Q':
            squareElement.innerHTML = '&#9813;';
            break;
          case 'K':
            squareElement.innerHTML = '&#9812;';
            break;
          case 'P':
            squareElement.innerHTML = '&#9817;';
            break;
        }
  
        // Add the square to the row
        rowElement.appendChild(squareElement);
      }
  
      // Add the row to the board
      container.appendChild(rowElement);
    }
  
    return container;
  }

const boardString = 'rnbqkbnr\npppppppp\noooooooo\noooooooo\noooooooo\noooooooo\nPPPPPPPP\nRNBQKBNR';
const boardElement = createChessBoard(boardString);
document.getElementById('board').appendChild(boardElement);