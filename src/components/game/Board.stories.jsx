import Board from './Board.jsx';
import '../../index.css';

export default {
    title: 'Game/Board',
    component: Board,
    argTypes: {
        onSelectCell: { action: 'onSelectCell' },
        onChangeCell: { action: 'onChangeCell' },
        onBlurCell: { action: 'onBlurCell' },
    }
};

const emptyBoard = Array.from({ length: 9 }, () => Array(9).fill(null));
const emptyGrid = Array.from({ length: 9 }, () => Array(9).fill(false));

export const Initial = {
    args: {
        board: emptyBoard,
        fixed: emptyGrid,
        selected: { row: null, col: null },
        sameGrid: emptyGrid,
        lineGrid: emptyGrid,
        blockGrid: emptyGrid,
    }
};

export const InProgress = {
    args: {
        board: emptyBoard.map((row, r) => r === 0 ? [1, 2, 3, null, null, null, null, null, null] : row),
        fixed: emptyGrid.map((row, r) => r === 0 ? [true, true, true, false, false, false, false, false, false] : row),
        selected: { row: 4, col: 4 },
        lineGrid: emptyGrid.map((row, r) => row.map((_, c) => r === 4 || c === 4)),
        sameGrid: emptyGrid,
        blockGrid: emptyGrid,
    },
};

export const HighlightSameNumbers = {
    args: {
        board: emptyBoard.map((row, r) => (r === 0 || r === 4) ? [5, null, null, null, null, null, null, null, null] : row),
        fixed: emptyGrid,
        selected: { row: 0, col: 0 },
        sameGrid: emptyGrid.map((row, r) => row.map((_, c) => c === 0 && (r === 0 || r === 4))),
        lineGrid: emptyGrid,
        blockGrid: emptyGrid,
    }
};