import { EMPTY_CELLS_BOUNDS, DEFAULT_EMPTY_CELLS } from "../config/gameConfig.js";

/**
 * Створює глибоку копію ігрового поля.
 * @private
 * @param {Array<Array>} b - Двовимірний масив поля.
 * @returns {Array<Array>} Копія масиву.
 */
function cloneBoard(b) {
    return b.map(row => row.slice());
}

/**
 * Створює пусте поле 9x9, заповнене null.
 * @private
 * @returns {Array<Array<null>>}
 */
function emptyBoard() {
    return Array.from({ length: 9 }, () => Array(9).fill(null));
}

/**
 * Перемішує масив алгоритмом Фішера.
 * @private
 * @param {Array} arr - Масив для перемішування.
 * @returns {Array} Перемішаний масив.
 */
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/**
 * Перевіряє, чи можна поставити число в конкретну клітинку за правилами судоку.
 * @private
 * @param {Array<Array>} board - Поточний стан поля.
 * @param {number} r - Індекс рядка.
 * @param {number} c - Індекс стовпця.
 * @param {number} num - Число для перевірки.
 * @returns {boolean} true, якщо розміщення валідне.
 */
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

/**
 * Генерує повністю заповнене та валідне поле судоку.
 * Використовує рекурсивний алгоритм Backtracking.
 *
 * @function generateSolvedBoard
 * @name generateSolvedBoard
 * @returns {Array<Array<number>>} Заповнене поле судоку.
 */
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

/**
 * Підраховує кількість розв'язків для поля.
 * Використовується для перевірки унікальності (має бути 1).
 *
 * @function countSolutions
 * @name countSolutions
 * @param {Array<Array>} board - Поле для перевірки.
 * @param {number} [limit=2] - Поріг пошуку розв'язків.
 * @returns {number} Кількість знайдених розв'язків.
 */
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

/**
 * Створює ігровий пазл, видаляючи клітинки із заповненого поля.
 *
 * @function generatePuzzle
 * @name generatePuzzle
 * @param {Object} [params] - Налаштування.
 * @param {number|string} [params.emptyCellsCount] - Бажана кількість порожніх клітинок.
 * @returns {Array<Array<number|null>>} Ігрове поле.
 */
export function generatePuzzle({ emptyCellsCount } = {}) {
    const parsed = Number(emptyCellsCount);
    const base = Number.isFinite(parsed) ? parsed : DEFAULT_EMPTY_CELLS;

    const targetEmptyCells = Math.max(EMPTY_CELLS_BOUNDS.min, Math.min(EMPTY_CELLS_BOUNDS.max, Math.round(base)));

    const solved = generateSolvedBoard();
    const positions = shuffle([...Array(81).keys()]);
    const puzzle = cloneBoard(solved);
    let removed = 0;

    for (const position of positions){
        if(removed >= targetEmptyCells) break;
        const r = Math.floor(position / 9);
        const c = position % 9;

        const backup = puzzle[r][c];
        puzzle[r][c] = null;

        const solutions = countSolutions(puzzle, 2);
        if (solutions !== 1){
            puzzle[r][c] = backup;
        } else{
            removed++;
        }
    }
    return puzzle;
}
