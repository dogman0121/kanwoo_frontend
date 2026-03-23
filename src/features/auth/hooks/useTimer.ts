"use client"

import { useCallback, useEffect, useRef, useState } from "react"

export default function useTimer(time: number) {
    const [timeRemaining, setTimeRemaining] = useState(time)
    
    const timerIdRef = useRef<NodeJS.Timeout | undefined>(undefined)

    const clearTimer = useCallback(() => {
        if (timerIdRef.current) {
            clearInterval(timerIdRef.current)
            timerIdRef.current = undefined
        }
    }, [])

    const restartTimer = useCallback((newTime: number) => {
        clearTimer()

        setTimeRemaining(newTime)

        timerIdRef.current = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 1) {
                    clearTimer();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

    }, [clearTimer])
 
    useEffect(() => {
        restartTimer(time);

        return clearTimer;
    }, [clearTimer, restartTimer, time])


    return [timeRemaining, restartTimer] as const
}