const gameBoard = (function(){
    let board = Array(9).fill('')

    const getBoard = function (){
    return board;
    }

    const updateBoard = function (index, symbol){
        if (index >= 0 && index < 9 && board[index] === '') {
            board[index] = symbol;
            return true;
        }
        return false;
    }

    const clearBoard = function (){
         board = Array(9).fill('')
    }

    const isCellEmpty = function(index){
        //
        if(boardGrid[index]===''){
            return true
        }else{
            return false
        }
    }

    const isBoardFull = function(){
        return !board.includes('');
     
    }
    return {
        getBoard,
        updateBoard,
        clearBoard,
        isBoardFull,
        isCellEmpty
    };


})();

const player = (function(){
    let currentPlayer = 'X';

    const getCurrentPlayer = () => currentPlayer;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    };
    const resetPlayer = () => {
        currentPlayer = 'X';
    };

    return {
        getCurrentPlayer,
        switchPlayer,
        resetPlayer
    };
    
    
})();

const GameLogic = (function() {
    'use strict';

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    const checkWin = (board) => {
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a]; // Returns 'X' or 'O' if winner
            }
        }
        return null;
    };

    const checkDraw = (board) => {
        return !board.includes('');
    };

    return {
        checkWin,
        checkDraw
    };
})();

const gameFlow =(function(){

    // const game = gameBoard(playerSelection)
    // const playerX = player(name)
    // const playerO = player(name)
    const currentPlayerIndex = 0
    // 

    const start = function(){
        const game = gameBoard()

        
        //display grid on console log
        console.log ()


    }

    // const switchPlayer = function(){
    //     return function toggle(){
    //         currentPlayerIndex = currentPlayerIndex = 0 ? 1 : 0;
    //         console.log("It is Player" + currentPlayerIndex+ "turn; ")
    //         return currentPlayerIndex
    //     }

    // }

    const makeMove = function(cellIndex){
        if (gameActive !=true || game.boardGrid[cellIndex]!=''){
            return
        }

    }

    return {
        makeMove,
        resetGame,
        getState
    };
    





})();
