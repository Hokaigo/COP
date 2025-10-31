import usePuzzle from "../common/usePuzzle.jsx";
import {useCallback, useEffect} from "react";
import useGame from "./useGame.jsx";
import useTimer from "../common/useTimer.jsx";
import {useSettingsStore} from "../../store/settingsStore.js";


export default function useGameController( { autoRestartOnSettings = true, onTimeEnd } = {} ){
    const settings = useSettingsStore((state) => state.settings);

    const  { seed, newPuzzle } = usePuzzle({ initialEmpty: settings.emptyCellsCount })

    useEffect(() => {
        if(autoRestartOnSettings){
            newPuzzle( { emptyCellsCount: settings.emptyCellsCount } )
        }
    }, [settings.difficulty, settings.emptyCellsCount, autoRestartOnSettings, newPuzzle]);

    const game = useGame(seed);

    const timer = useTimer({
        initial: settings.timeLimit,
        autoStart: true,
        onEnd: () =>{
            const res = game.calculateResult() ?? { score: 0, correct: 0, total: 81 };
            onTimeEnd?.({ ...res, timeSpent: settings.timeLimit });
        }
    });

    const resetGame = useCallback(() => {
        game.reset();
        timer.reset(settings.timeLimit);
        timer.setIsRunning(true);
    }, [game, timer, settings.timeLimit]);

    return { ...game, resetGame, timeLeft: timer.timeLeft, totalTime: settings.timeLimit, running: timer.isRunning,
    startTimer: timer.start, pauseTimer: timer.pause};
}