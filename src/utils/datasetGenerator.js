function cloneBoard(b) {
    return b.map(row => row.slice());
}

function emptyBoard() {
    return Array.from({ length: 9 }, () => Array(9).fill(null));
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function isValidPlacement(board, r, c, num) {
    for (let i = 0; i < 9; i++) if (board[r][i] === num) return false;
    for (let i = 0; i < 9; i++) if (board[i][c] === num) return false;
    const br = Math.floor(r / 3) * 3;
    const bc = Math.floor(c / 3) * 3;
    for (let i = br; i < br + 3; i++) {
        for (let j = bc; j < bc + 3; j++) {
            if (board[i][j] === num) return false;
        }
    }
    return true;
}

export function generateSolvedBoard() {
    const board = emptyBoard();

    function fill() {
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (board[r][c] === null) {
                    const nums = shuffle([1,2,3,4,5,6,7,8,9].slice());
                    for (const n of nums) {
                        if (isValidPlacement(board, r, c, n)) {
                            board[r][c] = n;
                            if (fill()) return true;
                            board[r][c] = null;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    fill();
    return board;
}

export function countSolutions(board, limit = 2) {
    const b = cloneBoard(board);
    let count = 0;

    function solve() {
        if (count >= limit) return;
        let found = false;
        let rr = -1, cc = -1;
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (b[r][c] === null) {
                    rr = r; cc = c;
                    found = true;
                    break;
                }
            }
            if (found) break;
        }
        if (!found) {
            count++;
            return;
        }
        for (let n = 1; n <= 9; n++) {
            if (isValidPlacement(b, rr, cc, n)) {
                b[rr][cc] = n;
                solve();
                b[rr][cc] = null;
                if (count >= limit) return;
            }
        }
    }

    solve();
    return count;
}

export function generatePuzzle() {
    const targetHoles = 46;

    const solved = generateSolvedBoard();

    const positions = shuffle([...Array(81).keys()]);

    const puzzle = cloneBoard(solved);
    let removed = 0;

    for (const pos of positions) {
        if (removed >= targetHoles) break;
        const r = Math.floor(pos / 9);
        const c = pos % 9;

        const backup = puzzle[r][c];
        puzzle[r][c] = null;

        const sols = countSolutions(puzzle, 2);
        if (sols !== 1) {
            puzzle[r][c] = backup;
        } else {
            removed++;
        }
    }

    return puzzle;
}
