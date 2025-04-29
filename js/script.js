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
