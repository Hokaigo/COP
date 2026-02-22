import usePuzzle from "../common/usePuzzle.jsx";
import {useCallback, useEffect} from "react";
import useGame from "./useGame.jsx";
import useTimer from "../common/useTimer.jsx";
import {useSettingsStore} from "../../store/domain/settingsStore.js";

/**
 * Кастомний хук-контролер, який поєднує всю логіку гри Судоку.
 * Контролює генерацію поля, логіку ігрового стану, таймер та налаштування.
 *
 * @function useGameController
 * @name useGameController
 * @param {Object} [options={}] - Опції контролера.
 * @param {boolean} [options.autoRestartOnSettings=true] - Авто-генерація при зміні налаштувань.
 * @param {Function} [options.onTimeEnd] - Коллбек при закінченні часу.
 * @returns {Object} Стан гри та таймера (включає всі властивості `useGame`).
 * @property {Function} resetGame - Повний перезапуск поточної гри та таймера.
 * @property {number} timeLeft - Час, що залишився у секундах.
 * @property {number} totalTime - Загальний ліміт часу у секундах.
 * @property {boolean} running - Чи активний зараз таймер.
 * @property {Function} startTimer - Відновлення таймера.
 * @property {Function} pauseTimer - Призупинення таймера.
 */
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