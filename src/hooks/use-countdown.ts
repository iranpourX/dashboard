import {useEffect, useState} from "react"

export function useCountdown(seconds: number) {
    const [time, setTime] = useState(seconds)

    useEffect(() => {
        if (time <= 0) {
            return
        }

        const interval =
            setInterval(() => {
                setTime(
                    (
                        prev
                    ) =>
                        prev - 1
                )
            }, 1000)

        return () =>
            clearInterval(
                interval
            )
    }, [time])

    return {
        time,

        reset: () =>
            setTime(
                seconds
            )
    }
}