document.addEventListener('DOMContentLoaded', () => {
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameOver = false;
    const cells = document.querySelectorAll('.cell');
    const statusDiv = document.getElementById('status');
    const resetButton = document.getElementById('resetButton');

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]  // Diagonals
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
        }
        return false;
    }

    function handleCellClick(event) {
        const index = parseInt(event.target.getAttribute('data-index'), 10);
        if (board[index] || gameOver) return;

        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;

        if (checkWinner()) {
            gameOver = true;
            statusDiv.textContent = `${currentPlayer} Wins!`;
        } else if (board.every(cell => cell)) {
            gameOver = true;
            statusDiv.textContent = "It's a Tie!";
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusDiv.textContent = `Player ${currentPlayer}'s Turn`;
        }
    }

    function resetGame() {
        board.fill('');
        gameOver = false;
        currentPlayer = 'X';
        statusDiv.textContent = `Player ${currentPlayer}'s Turn`;
        cells.forEach(cell => {
            cell.textContent = '';
        });
    }

    cells.forEach((cell, index) => {
        cell.setAttribute('data-index', index); // Ensure data-index is set
        cell.addEventListener('click', handleCellClick);
    });

    resetButton.addEventListener('click', resetGame);

    statusDiv.textContent = `Player ${currentPlayer}'s Turn`;
});
