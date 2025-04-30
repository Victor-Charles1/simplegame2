const GameBoard = (function(){
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

const Player = (function(){
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

const gameLogic = (function() {
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
        return !board.includes('');//If board is full
    };

    return {
        checkWin,
        checkDraw
    };
})();

const DisplayController = (function(){
    'use strict';

    const elements = {
        board: document.getElementById('board'),
        status: document.getElementById('status'),
        resetButton: document.getElementById('reset')
    };

    const gameStateMessage = {
        win: (player) => `Player ${player} has won!`,
        draw: 'Game ended in a draw!',
        currentTurn: (player) => `It's ${player}'s turn`
    };

    const createBoard = () => {
        elements.board.innerHTML = '';
        GameBoard.getBoard().forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.setAttribute('data-index', index);
            cellElement.textContent = cell;
            elements.board.appendChild(cellElement);
        });
    };

    const updateCell = (index, value) => {
        const cell = document.querySelector(`[data-index="${index}"]`);
        if (cell) cell.textContent = value;
    };

    const updateStatus = (message) => {
        elements.status.textContent = message;
        console.log(message);
    };

    const bindCellClick = (handler) => {
        elements.board.addEventListener('click', (event) => {
            const clickedCell = event.target;
            if (!clickedCell.classList.contains('cell')) return;
            const index = parseInt(clickedCell.getAttribute('data-index'));
            handler(index);
        });
    };

    const bindResetClick = (handler) => {
        elements.resetButton.addEventListener('click', handler);
    };

    return {
        createBoard,
        updateCell,
        updateStatus,
        gameStateMessage,
        bindCellClick,
        bindResetClick
    };

})();

const gameFlow =(function(){
    let gameActive = true;

    const startGame = () => {

        GameBoard.clearBoard();
        Player.resetPlayer();

        DisplayController.createBoard();
        DisplayController.updateStatus(
            `Player ${Player.getCurrentPlayer()}'s turn`
        );
        setupEventListeners();
    };

    const setupEventListeners = () => {
        DisplayController.bindCellClick(handleCellClick);
        DisplayController.bindResetClick(resetGame);
    };

    const handleCellClick = (index) => {
        if (!gameActive) return;

        const currentPlayer = Player.getCurrentPlayer();
        const moveSuccess = GameBoard.setCell(index, currentPlayer);

        if (moveSuccess) {
            DisplayController.updateCell(index, currentPlayer);
            checkGameResult();
        }
    };
    const checkGameResult = () => {
        const currentBoard = GameBoard.getBoard();
        const winner = GameLogic.checkWin(currentBoard);

        if (winner) {
            DisplayController.updateStatus(
                `Player ${winner} has won!`
            );
            gameActive = false;
            return;
        }

        if (GameLogic.checkDraw(currentBoard)) {
            DisplayController.updateStatus(
                'Game ended in a draw!'
            );
            gameActive = false;
            return;
        }

        Player.switchPlayer();
        DisplayController.updateStatus(
            `It's ${Player.getCurrentPlayer()}'s turn`
        );
    };
    const resetGame = () => {
        GameBoard.resetBoard();
        Player.resetPlayer();
        gameActive = true;
        startGame();
    };

    // Console interface
    const makeMove = (index) => {
        if (!gameActive) {
            console.log("Game is not active. Reset to play again.");
            return;
        }
        
        handleCellClick(index);
    };

    const getState = () => {
        return {
            board: GameBoard.getBoard(),
            currentPlayer: Player.getCurrentPlayer(),
            gameActive
        };
    };

    // Initialize game when DOM is loaded
    document.addEventListener('DOMContentLoaded', startGame);
    return {
        makeMove,
        resetGame,
        getState
    };


   
})();
