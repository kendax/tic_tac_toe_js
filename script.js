const statusDisplay = document.querySelector('.game-status');

// Whether the game can accept player input or not
let gameActive = true;

// Value of the current player
let currentPlayer = "X";

/* An array holding the current value of each of the 9 boxes in the game.The initial value as seen here for each of those boxes is empty */
let gameState = ["", "", "", "", "", "", "", "", ""];

// Messages to display in the game upon various events
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

// The combinations of boxes that can result in a win
const winningConditions = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8]
];

// Fill in the player's representation in the clicked box
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

// Change the active player in the game
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

// Verify whether one player has won or the game has ended in a draw
function handleResultValidation() {
    let roundWon = false;
    for(let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        const a = gameState[winCondition[0]];
        const b = gameState[winCondition[1]];
        const c = gameState[winCondition[2]];
        if( a === '' || b === '' || c === '')
            continue;
        if(a === b && b === c) {
            roundWon = true;
            break
        }
    }
    if(roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
    const roundDraw = !gameState.includes("");
    if(roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

// Determine which box the player has clicked
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if(gameState[clickedCellIndex] !== "" || !gameActive)
        return;

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

// Start the game afresh
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

// Add an event listener to each box
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));

// Add an event listener to the 'Restart Game' button
document.querySelector('.game-restart').addEventListener('click', handleRestartGame);

