import Board from "../components/game/Board.jsx";
import useGameController from "../hooks/game/useGameController.jsx";
import {useEffect, useRef} from "react";
import { formatTime } from  "../utils/time.js"
import {useSettings} from "../contexts/SettingsContext.jsx";
import {useAuth} from "../contexts/AuthContext.jsx";



export default function MainPage({ onShowResult, onBackToStart, isSettingsOpen = false }) {
    const { currentUser } = useAuth();
    const { settings } = useSettings();

    const { board, fixed, selected, sameGrid, lineGrid, blockGrid, selectCell, unselectCell, updateCell,
        calculateResult, resetGame, pauseTimer, startTimer, timeLeft, running, totalTime } =
        useGameController( { onTimeEnd: handleTimeEnd });

    function handleTimeEnd(result){
        sendAndShowResult(result);
    }

    function handleShowResult() {
        pauseTimer?.();
        const result = calculateResult();
        const timeSpent = (totalTime || 0) - (timeLeft || 0);
        sendAndShowResult({ ...result, timeSpent });
    }

    function sendAndShowResult(resultData){
        onShowResult?.(resultData);

        if (currentUser && resultData){
            const token = localStorage.getItem('token');
            if(token){
                fetch('http://sudoku.local/stats',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        difficulty: settings.difficulty,
                        timeSpent: Math.round(resultData.timeSpent),
                        correct: resultData.correct,
                        score: resultData.score
                    })
                })
                    .then(res =>{
                        if(!res.ok){
                            console.error("Error saving stats, respond status:", res.status);
                            return res.json().catch(() => ({ error: `Server error ${res.status}` }));                        }
                        return res.json();
                    })
                    .catch(e => {
                        console.error('Network error while trying to save stats:', e);
                    });
            }
        }
    }

    const wasRunningRef = useRef(false);

    useEffect(() => {
        if(isSettingsOpen){
            wasRunningRef.current = running;
            if (running) {
                pauseTimer();
            }
        } else{
            if (wasRunningRef.current){
                startTimer();
            }
            wasRunningRef.current = false;
        }
    }, [isSettingsOpen, pauseTimer, startTimer]);

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