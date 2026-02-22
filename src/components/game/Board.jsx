import Cell from "./Cell.jsx";

/**
 * Board Component.
 * Відображає ігрове поле судоку розміром 9x9.
 * Відповідає за рендер окремих клітинок та передачу станів підсвічування вибраної клітинки.
 *
 * @component
 * @name Board
 * @param {Object} props - Властивості компонента.
 * @param {Array<Array<number|string|null>>} props.board - Двовимірний масив (9x9), що містить поточні значення клітинок.
 * @param {Array<Array<boolean>>} props.fixed - Двовимірний масив (9x9), що вказує, які клітинки є початковими та незмінними.
 * @param {Object|null} props.selected - Об'єкт з координатами вибраної клітинки `{row, col}`.
 * @param {Array<Array<boolean>>} [props.sameGrid] - Двовимірний масив для підсвічування клітинок з таким самим значенням.
 * @param {Array<Array<boolean>>} [props.lineGrid] - Двовимірний масив для підсвічування клітинок на тій самій лінії, хрестиком.
 * @param {Array<Array<boolean>>} [props.blockGrid] - Двовимірний масив для підсвічування клітинок у тому самому квадраті 3x3.
 * @param {Function} props.onSelectCell - Коллбек, що викликається при кліку на клітинку.
 * @param {Function} props.onChangeCell - Коллбек, що викликається при зміні значення в клітинці.
 * @param {Function} props.onBlurCell - Коллбек, що викликається при втраті фокусу клітинкою.
 * @returns {React.ReactElement} Повертає елемент сітки ігрового поля.
 */
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
