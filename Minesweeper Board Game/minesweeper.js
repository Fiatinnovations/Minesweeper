//The game is better refactored using the javascript class. Thus far the game can be played but still limited in its functionality.

class Game{
    constructor(numberOfRows, numberOfColumns, numberOfBombs){
        this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
    }

playMove(rowIndex, columnIndex){
    this._board.flipTile(rowIndex, columnIndex);
        if(this._board.playerBoard[rowIndex][columnIndex] === 'B'){
        console.log('Game Over');
        this._board.print();
    }   else if (this._board.noMoreFlipTiles()) {
        return ('you won');
    }   else {
        console.log('Current Board : ');
        return this._board.print();
    }
  }
}




class Board {
    constructor(numberOfRows,numberOfColumns, numberOfBombs){
        this._numberOfRows = numberOfRows;
        this._numberOfColumns = numberOfColumns;
        this._numberOfBombs = numberOfBombs;
        this._numberOfTiles = numberOfRows * numberOfColumns;
        this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
        this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
         
    }

    get playerBoard(){
        return this._playerBoard;
    }

    flipTile(rowIndex, columnIndex){
         if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
        console.log('This tile has already been flipped!');
        return;
    } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
        this._playerBoard[rowIndex][columnIndex] = 'B';
    } else {
        this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }
       
    this._numberOfTiles--;
    }


    getNumberOfNeighborBombs (rowIndex, columnIndex){
    const neighborOffsets = [[-1,-1], [-1,0], [-1,1],
                             [0, -1],         [0, 1],
                             [1, -1], [1, 0], [1, 1]];
    const numberOfRows = this._bombBoard.length;
//still
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;

    neighborOffsets.forEach(offset => {
        const neighborRowIndex = [rowIndex + offset[0]];
        const neighborColumnIndex = [columnIndex + offset[1]];
    if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows &&
        neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
            numberOfBombs++;
            }
        }
    });
return numberOfBombs;
};

noMoreFlipTiles(){
    return this._numberOfTiles === this._numberOfBombs;
}

print(){

    console.log(this.playerBoard.map(row =>row.join(' | ')).join('\n'));
};


static generatePlayerBoard(numberOfRows, numberOfColumns) {
    let board = [];
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
        let row = [' '];        /// add each row to a larger game board
            for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
                row.push(' ');  /// add empty space (' ') to each column at each row
            }
        board.push(row);
    }
    return board;
};

static generateBombBoard (numberOfRows, numberOfColumns, numberOfBombs) {
    let board = [];
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
        let row = [' '];        /// add each row to a larger game board
            for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
                row.push(null);  /// add empty space (' ') to each column at each row
            }
        board.push(row);
    }

    let numberOfBombsPlaced = 0;
    while (numberOfBombsPlaced < numberOfBombs) {
        let randomRowIndex = Math.floor(Math.random()*numberOfRows);
        let randomColumnIndex = Math.floor(Math.random()*numberOfColumns);
            if (board[randomRowIndex][randomColumnIndex] !== 'B') {
                board[randomRowIndex][randomColumnIndex] = 'B'
                numberOfBombsPlaced++;
            };
    }
    return board;
};




};

/*
let playerBoard = generatePlayerBoard(3, 4);
let bombBoard = generateBombBoard(3, 4, 2);*/

g = new Game(4,5,9);
g.playMove(2,2);






/*
console.log('Player Board: ');
printBoard(playerBoard);

console.log('Bomb Board: ');
printBoard(bombBoard);

flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board: ');
printBoard(playerBoard);

flipTile(playerBoard, bombBoard, 0, 1);
console.log('Updated Player Board: ');
printBoard(playerBoard);*/
