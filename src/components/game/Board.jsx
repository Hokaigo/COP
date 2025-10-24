import Cell from "./Cell.jsx";

export default function Board({ board, fixed, selected, sameGrid, lineGrid, blockGrid, onSelectCell, onChangeCell, onBlurCell }) {
    const cells = [];

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const value = board?.[row]?.[col] ?? null;

            const borders = [];
            if (row % 3 === 0) borders.push("top-border");
            if (col % 3 === 0) borders.push("left-border");
            if (row === 8) borders.push("bottom-border");
            if (col === 8) borders.push("right-border");

            const isSame = !!(sameGrid && sameGrid[row]?.[col]);
            const isLine = !!(lineGrid && lineGrid[row]?.[col]);
            const isBlock = !!(blockGrid && blockGrid[row]?.[col]);

            const isFocused = isSame || isLine || isBlock;

            cells.push(
                <Cell key={`${row}-${col}`} row={row} col={col} value={value} isFixed={!!fixed?.[row]?.[col]}
                      isSelected={selected?.row === row && selected?.col === col} isFocused={isFocused} isSame={isSame}
                      isLineOrBlock={isLine || isBlock} className={borders.join(" ")} onSelect={onSelectCell} onChange={onChangeCell}
                      onBlur={onBlurCell} />
            );
        }
    }

    return (
        <div className="board" role="grid" aria-label="Sudoku board">
            {cells}
        </div>
    );
}
