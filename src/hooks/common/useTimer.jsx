import {useState, useRef, useEffect, useCallback} from "react";
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