import Board from "../components/game/Board.jsx";
import useGameController from "../hooks/game/useGameController.jsx";
import { useEffect, useRef } from "react";
import { formatTime } from "../utils/time.js";
import { useSettings } from "../contexts/SettingsContext.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function MainPage({ onShowResult, onBackToStart, isSettingsOpen = false }) {
    const { currentUser } = useAuth();
    const { settings } = useSettings();

    const { board, fixed, selected, sameGrid, lineGrid, blockGrid, selectCell, unselectCell, updateCell,
        calculateResult, resetGame, pauseTimer, startTimer, timeLeft, running, totalTime } = useGameController({ onTimeEnd: handleTimeEnd });

    function handleTimeEnd(result) {
        sendAndShowResult(result);
    }

    function handleShowResult() {
        pauseTimer?.();
        const result = calculateResult();
        const timeSpent = (totalTime || 0) - (timeLeft || 0);
        sendAndShowResult({ ...result, timeSpent });
    }

    function sendAndShowResult(resultData) {
        onShowResult?.(resultData);

        if (currentUser && resultData) {
            const token = localStorage.getItem("token");
            if (token) {
                fetch("http://sudoku.local/stats", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        difficulty: settings.difficulty,
                        timeSpent: Math.round(resultData.timeSpent),
                        correct: resultData.correct,
                        score: resultData.score,
                    }),
                })
                    .then((res) => {
                        if (!res.ok) {
                            console.error("Error saving stats, respond status:", res.status);
                            return res.json().catch(() => ({ error: `Server error ${res.status}` }));
                        }
                        return res.json();
                    })
                    .catch((e) => {
                        console.error("Network error while trying to save stats:", e);
                    });
            }
        }
    }

    const wasRunningRef = useRef(false);

    useEffect(() => {
        if (isSettingsOpen) {
            wasRunningRef.current = running;
            if (running) {
                pauseTimer();
            }
        } else {
            if (wasRunningRef.current) {
                startTimer();
            }
            wasRunningRef.current = false;
        }
    }, [isSettingsOpen, pauseTimer, startTimer]);

    return (
        <div>
            <div className="board-card p-3 rounded-lg mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-2">
                    <button onClick={onBackToStart}
                        className="px-4 py-2 rounded-md bg-neutral-700 hover:bg-neutral-600 text-sm font-medium transition">
                        To main page
                    </button>
                </div>

                <div className="flex items-center gap-2 justify-center sm:justify-end">
                    <div tabIndex={-1} aria-hidden className={`px-4 py-2 text-lg font-semibold rounded-md pe-none ${
                            running ? "bg-amber-300 text-black" : "bg-red-600 text-white" }`}>
                        {formatTime(timeLeft)}
                    </div>

                    <button onClick={resetGame} className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-500 text-white font-medium transition">
                        Reset
                    </button>

                    <button onClick={handleShowResult}
                        className="px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition">
                        Show result
                    </button>
                </div>
            </div>

            <div className="card sudoku mb-6">
                <Board board={board} fixed={fixed} selected={selected} sameGrid={sameGrid} lineGrid={lineGrid}
                    blockGrid={blockGrid} onSelectCell={selectCell} onChangeCell={updateCell} onBlurCell={unselectCell}/>
            </div>
        </div>
    );
}
