import {useState, useRef, useEffect, useCallback} from "react";

/**
 * Кастомний хук для реалізації таймера зворотного відліку.
 * Надає стан часу, що залишився, а також методи для керування таймером.
 *
 * @function useTimer
 * @name useTimer
 * @param {Object} [options={}] - Опції налаштування таймера.
 * @param {number} [options.initial=0] - Початковий час у секундах.
 * @param {boolean} [options.autoStart=false] - Чи запускати таймер автоматично при ініціалізації.
 * @param {Function} [options.onEnd] - Коллбек-функція, яка викликається, коли час вичерпано.
 * @returns {Object} Об'єкт стану та методів керування таймером.
 * @property {number} timeLeft - Кількість секунд, що залишилася.
 * @property {boolean} isRunning - Поточний стан таймера: запущений чи на паузі.
 * @property {Function} start - Метод для запуска таймера.
 * @property {Function} pause - Метод для призупинення таймера.
 * @property {Function} reset - Метод для скидання таймера до початкового стану.
 * @property {Function} set - Метод для прямого ручного встановлення часу.
 * @property {Function} setIsRunning - Метод для ручного керування станом активності.
 */
export default function useTimer({ initial = 0, autoStart = false, onEnd } = { }){
    const [timeLeft, setTimeLeft] = useState(initial);
    const [isRunning, setIsRunning] = useState(Boolean(autoStart));
    const intervalRef = useRef(null);

    useEffect(()=>{
        setTimeLeft(initial)
    }, [initial]);

    useEffect(() => {
        if(!isRunning){
            if(intervalRef.current){
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            return;
        }

        if(timeLeft <= 0){
            setIsRunning(false);
            onEnd?.();
            return;
        }

        intervalRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                    }
                    setIsRunning(false);
                    onEnd?.();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }
    }, [isRunning, onEnd]);

    const start = useCallback(() => setIsRunning(true), []);
    const pause = useCallback(() => setIsRunning(false), []);
    const reset = useCallback((next = initial) => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setTimeLeft(next);
        setIsRunning(false);
    }, [initial]);


    const set = useCallback(sec => setTimeLeft(sec), []);
    return { timeLeft, isRunning, start, pause, reset, set, setIsRunning };
}