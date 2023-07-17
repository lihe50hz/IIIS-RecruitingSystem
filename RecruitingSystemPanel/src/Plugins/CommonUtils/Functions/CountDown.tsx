import { useEffect, useRef } from 'react'

export default function useInterval(callback: () => void, delay: number) {
    const latestCallback = useRef(() => {})
    useEffect(() => {
        latestCallback.current = callback
    })
    useEffect(() => {
        if (delay !== null) {
            const interval = setInterval(() => latestCallback.current(), delay || 0)
            return () => clearInterval(interval)
        }
        return undefined
    }, [delay])
}
