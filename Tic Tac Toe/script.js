const board = document.getElementById('board');
const resultContainer = document.getElementById('result-container');
const result = document.getElementById('result');
const newGameButton = document.getElementById('new-game');
const gameContainer = document.getElementById('game-container');

let currentPlayer = 'X';
const cells = Array(9).fill(null);

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            return cells[a];
        }
    }

    if (cells.every(cell => cell)) {
        return 'Draw';
    }

    return null;
}

function handleClick(event) {
    const cell = event.target;
    const index = Array.from(board.children).indexOf(cell);

    if (cells[index] || checkWinner()) {
        return;
    }

    cells[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);

    const winner = checkWinner();

    if (winner) {
        if (winner === 'Draw') {
            result.textContent = "It's a draw!";
        } else {
            result.textContent = `${winner} wins!`;
        }
        resultContainer.classList.remove('hidden');
        gameContainer.classList.add('hidden');
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function startNewGame() {
    cells.fill(null);
    board.innerHTML = '';
    resultContainer.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    currentPlayer = 'X';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', handleClick);
        board.appendChild(cell);
    }
}

newGameButton.addEventListener('click', startNewGame);

startNewGame();
