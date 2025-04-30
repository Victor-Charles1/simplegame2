const gameBoard = (function() {
    'use strict';

    let board = Array(9).fill('');

    const getBoard = () => [...board];
    const updateCell = (index, symbol) => {
        if (index >= 0 && index < 9 && board[index] === '') {
            board[index] = symbol;
            return true;
        }
        return false;
    };
    const clearBoard = () => { board = Array(9).fill(''); };
    const isCellEmpty = index => board[index] === '';
    const isBoardFull = () => !board.includes('');

    return { getBoard, updateCell, clearBoard, isBoardFull, isCellEmpty };
})();

const playerManager = (function() {
    'use strict';

    let currentPlayer = 'X';

    const getCurrent = () => currentPlayer;
    const switchPlayer = () => { currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; };
    const reset = () => { currentPlayer = 'X'; };

    return { getCurrent, switchPlayer, reset };
})();

const gameLogic = (function() {
    'use strict';

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    const checkWin = board => {
        for (const condition of winningConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    };

    const checkDraw = board => !board.includes('');

    return { checkWin, checkDraw };
})();

const displayController = (function() {
    'use strict';

    const elements = {
        board: document.getElementById('board'),
        status: document.getElementById('status'),
        resetButton: document.getElementById('reset')
    };

    const messages = {
        win: player => `Player ${player} wins!`,
        draw: 'Game ended in a draw!',
        currentTurn: player => `${player}'s turn`
    };

    const createBoard = () => {
        elements.board.innerHTML = '';
        gameBoard.getBoard().forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.className = 'cell';
            cellElement.dataset.index = index;
            cellElement.textContent = cell;
            elements.board.appendChild(cellElement);
        });
    };

    const updateCell = (index, value) => {
        const cell = document.querySelector(`[data-index="${index}"]`);
        if (cell) cell.textContent = value;
    };

    const updateStatus = message => {
        elements.status.textContent = message;
        console.log(message);
    };

    const bindCellClick = handler => {
        elements.board.addEventListener('click', event => {
            const target = event.target;
            if (!target.classList.contains('cell')) return;
            const index = parseInt(target.dataset.index, 10);
            handler(index);
        });
    };

    const bindResetClick = handler => {
        elements.resetButton.addEventListener('click', handler);
    };

    return { createBoard, updateCell, updateStatus, bindCellClick, bindResetClick, messages };
})();

const gameController = (function() {
    'use strict';

    let isActive = true;

    const startGame = () => {
        gameBoard.clearBoard();
        playerManager.reset();
        displayController.createBoard();
        displayController.updateStatus(displayController.messages.currentTurn(playerManager.getCurrent()));
        setupEventListeners();
    };

    const setupEventListeners = () => {
        displayController.bindCellClick(handleCellClick);
        displayController.bindResetClick(resetGame);
    };

    const handleCellClick = index => {
        if (!isActive || !gameBoard.isCellEmpty(index)) return;

        const player = playerManager.getCurrent();
        if (!gameBoard.updateCell(index, player)) return;

        displayController.updateCell(index, player);
        checkGameState();
    };

    const checkGameState = () => {
        const board = gameBoard.getBoard();
        const winner = gameLogic.checkWin(board);

        if (winner) {
            endGame(displayController.messages.win(winner));
            return;
        }

        if (gameLogic.checkDraw(board)) {
            endGame(displayController.messages.draw);
            return;
        }

        playerManager.switchPlayer();
        displayController.updateStatus(displayController.messages.currentTurn(playerManager.getCurrent()));
    };

    const endGame = message => {
        isActive = false;
        displayController.updateStatus(message);
    };

    const resetGame = () => {
        isActive = true;
        startGame();
    };

    // Console interface
    const makeMove = index => {
        if (!isActive) {
            console.log("Game inactive. Reset to play.");
            return;
        }
        handleCellClick(index);
    };

    const getState = () => ({
        board: gameBoard.getBoard(),
        currentPlayer: playerManager.getCurrent(),
        isActive
    });

    document.addEventListener('DOMContentLoaded', startGame);

    return { makeMove, resetGame, getState };
})();