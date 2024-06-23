document.addEventListener("DOMContentLoaded", () => {
    let boxes = document.querySelectorAll(".box");
    let resetbtn = document.querySelector("#reset-btn");
    let turno = true; // true for 'X', false for 'O'
    let board = Array(9).fill(null);

    const winPatterns = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8],
    ];

    function checkWin(player) {
        return winPatterns.some(pattern => {
            return pattern.every(index => {
                return board[index] === player;
            });
        });
    }

    function handleClick(event) {
        const box = event.target;
        const boxIndex = Array.from(boxes).indexOf(box);

        if (board[boxIndex] || checkWin('X') || checkWin('O')) {
            return;
        }

        board[boxIndex] = turno ? 'X' : 'O';
        box.innerText = board[boxIndex];

        if (checkWin(board[boxIndex])) {
            setTimeout(() => {
                alert(`${board[boxIndex]} wins!`);
            }, 100);
        } else if (board.every(cell => cell)) {
            setTimeout(() => {
                alert('It\'s a tie!');
            }, 100);
        }

        turno = !turno;
    }

    function resetGame() {
        board.fill(null);
        boxes.forEach(box => box.innerText = '');
        turno = true;
    }

    boxes.forEach(box => {
        box.addEventListener("click", handleClick);
    });

    resetbtn.addEventListener("click", resetGame);
});
