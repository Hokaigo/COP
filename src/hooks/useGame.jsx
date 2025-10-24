import { useState, useMemo, useEffect } from "react";

function cloneBoard(board) {
    return board.map(row => row.slice());
}

function emptyGrid() {
    return Array.from({ length: 9 }, () => Array(9).fill(false));
}

export default function useGame(dataSeed) {
    const initialData = useMemo(() => dataSeed, [dataSeed]);
    const [board, setBoard] = useState(() => cloneBoard(initialData));
    const fixed = useMemo(() => initialData.map(row => row.map(cell => cell !== null)), [initialData]);

    const [selected, setSelected] = useState({ row: null, col: null });
    const [selectedValue, setSelectedValue] = useState(null);

    const [sameGrid, setSameGrid] = useState(() => emptyGrid());
    const [lineGrid, setLineGrid] = useState(() => emptyGrid());
    const [blockGrid, setBlockGrid] = useState(() => emptyGrid());

    function calculateSameGrid(boardState, value) {
        if (value === null || value === undefined) return emptyGrid();
        const grid = emptyGrid();
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (boardState[r][c] === value) grid[r][c] = true;
            }
        }
        return grid;
    }

    function calculateLineGrid(selected) {
        if (selected.row === null || selected.col === null) return emptyGrid();
        const grid = emptyGrid();
        for (let i = 0; i < 9; i++) {
            grid[selected.row][i] = true;
            grid[i][selected.col] = true;
        }
        return grid;
    }

    function calculateBlock(selected) {
        if (selected.row === null || selected.col === null) return emptyGrid();
        const grid = emptyGrid();
        const baseRow = Math.floor(selected.row / 3) * 3;
        const baseCol = Math.floor(selected.col / 3) * 3;
        for (let r = baseRow; r < baseRow + 3; r++) {
            for (let c = baseCol; c < baseCol + 3; c++) {
                grid[r][c] = true;
            }
        }
        return grid;
    }

    useEffect(() => {
        const hasValue = selectedValue !== null && selectedValue !== undefined;

        setSameGrid(calculateSameGrid(board, selectedValue));

        if (hasValue) {
            setLineGrid(emptyGrid());
            setBlockGrid(emptyGrid());
        } else {
            setLineGrid(calculateLineGrid(selected));
            setBlockGrid(calculateBlock(selected));
        }
    }, [board, selected, selectedValue]);

    function selectCell(row, col) {
        setSelected({ row, col });
        const value = board?.[row]?.[col] ?? null;
        setSelectedValue(value === null || value === undefined ? null : value);
    }

    function unselectCell() {
        setSelected({ row: null, col: null });
        setSelectedValue(null);
    }

    function updateCell(row, col, value) {
        setBoard(prev => {
            const next = cloneBoard(prev);
            next[row][col] = value === null ? null : Number(value);
            return next;
        });
        setSelected({ row, col });
        setSelectedValue(value === null || value === undefined ? null : value);
    }

    function isCellValid(boardState, row, col) {
        const value = boardState[row][col];
        if (value === null || value === undefined) return true;

        for (let c = 0; c < 9; c++)
            if (c !== col && boardState[row][c] === value) return false;
        for (let r = 0; r < 9; r++)
            if (r !== row && boardState[r][col] === value) return false;

        const br = Math.floor(row / 3) * 3;
        const bc = Math.floor(col / 3) * 3;
        for (let r = br; r < br + 3; r++) {
            for (let c = bc; c < bc + 3; c++) {
                if ((r !== row || c !== col) && boardState[r][c] === value) return false;
            }
        }
        return true;
    }

    function calculateResult() {
        let correct = 0;
        const total = 81;

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                const isPrefilled = fixed[r][c];
                if (isPrefilled) {
                    correct++;
                } else {
                    const v = board[r][c];
                    if (v !== null && v !== undefined && isCellValid(board, r, c)) {
                        correct++;
                    }
                }
            }
        }

        const score = Math.round((correct / total) * 100);
        return { score, correct, total };
    }


    function reset() {
        setBoard(cloneBoard(initialData));
        setSelected({ row: null, col: null });
        setSelectedValue(null);
    }

    return { board, fixed, selected, sameGrid, lineGrid, blockGrid, selectCell, unselectCell, updateCell, calculateResult, reset };
}
