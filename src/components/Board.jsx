import Cell from "./Cell.jsx";

export default function Board({ board }) {
    const cells = [];

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const value = board?.[row]?.[col] ?? null;
            const filled = value !== null && value !== 0;

            const borders = [];
            if (row % 3 === 0) borders.push("top-border");
            if (col % 3 === 0) borders.push("left-border");
            if (row === 8) borders.push("bottom-border");
            if (col === 8) borders.push("right-border");

            cells.push(<Cell key={`${row}-${col}`} row={row} col={col}
                             value={value} filled={filled} className={borders.join(" ")}/> );
        }
    }

    return (
        <div className="board" role="board">
            {cells}
        </div>
    );
}
