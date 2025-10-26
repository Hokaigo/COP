import Board from "../components/game/Board.jsx";
import useGameController from "../hooks/game/useGameController.jsx";
import {useEffect, useRef} from "react";
import { formatTime } from  "../utils/time.js"



export default function MainPage({ onShowResult, onBackToStart, isSettingsOpen = false }) {

    const { board, fixed, selected, sameGrid, lineGrid, blockGrid, selectCell, unselectCell, updateCell,
        calculateResult, resetGame, pauseTimer, startTimer, timeLeft, running, totalTime } =
        useGameController( {onTimeEnd: (result) => onShowResult?.(result) });

    const wasRunningRef = useRef(false);

    useEffect(() => {
        if(isSettingsOpen){
            wasRunningRef.current = Boolean(running);
            pauseTimer?.();
        } else{
            if (wasRunningRef.current){
                startTimer?.()
            }
        }
    }, [isSettingsOpen]);

    function handleShowResult() {
        pauseTimer?.();
        const result = calculateResult();
        const timeSpent = (typeof totalTime === "number" ? totalTime : 0) -
            (typeof timeLeft === "number" ? timeLeft : 0);
        onShowResult?.({ ...result, timeSpent  });
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3 board-card p-3 rounded">
                <button className="btn btn-lg btn-secondary me-2" onClick={onBackToStart}>To main page</button>

                <div className="d-flex align-items-center gap-2">
                    <div className={`btn btn-lg fw-semibold me-2 ${running ? "text-bg-warning text-dark" : "text-bg-danger text-light"} pe-none`}
                        tabIndex={-1}>{formatTime(timeLeft)}</div>

                    <button className="btn btn-lg btn-danger me-2" onClick={resetGame}>Reset</button>
                    <button className="btn btn-lg btn-success" onClick={handleShowResult}>Show result</button>
                </div>
            </div>


            <div className="card sudoku mb-3">
                <Board board={board} fixed={fixed} selected={selected} sameGrid={sameGrid} lineGrid={lineGrid}
                       blockGrid={blockGrid} onSelectCell={selectCell} onChangeCell={updateCell}
                       onBlurCell={unselectCell}/>
            </div>
        </div>
    );
}