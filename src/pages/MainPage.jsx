import { useState } from "react";
import Board from "../components/game/Board.jsx";
import useGame from "../hooks/useGame.jsx";
import { generatePuzzle } from "../utils/datasetGenerator.js";


export default function MainPage({ onShowResult, onBackToStart }) {
    const [dataSeed] = useState(() => generatePuzzle());

    const { board, fixed, selected, sameGrid, lineGrid, blockGrid, selectCell, unselectCell, updateCell, calculateResult,
        reset } = useGame(dataSeed);

    function handleShowResult() {
        const result = calculateResult();
        onShowResult?.(result);
    }


    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3 board-card p-3 rounded">
                <button className="btn-lg btn btn-secondary me-2" onClick={onBackToStart}>To main page</button>
                <div>
                    <button className="btn-lg btn btn-danger me-2" onClick={reset}>Reset</button>
                    <button className="btn-lg btn btn-success" onClick={handleShowResult}>Show result</button>
                </div>
            </div>


            <div className="card sudoku mb-3">
                <Board board={board} fixed={fixed} selected={selected} sameGrid={sameGrid} lineGrid={lineGrid}
                    blockGrid={blockGrid} onSelectCell={selectCell} onChangeCell={updateCell} onBlurCell={unselectCell} />
            </div>
        </div>
    );
}