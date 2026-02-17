"use client"

import * as React from "react"
import { Plus, Pause, Play } from "lucide-react"

interface TimeTrackerProps {
    value: string
    onToggle?: (isRunning: boolean) => void
    onChange?: (newValue: string) => void
}

const parseTimeString = (value: string): number => {
    if (value === "Add time" || !value) return 0
    let totalSeconds = 0
    const hoursMatch = value.match(/(\d+)h/)
    const minsMatch = value.match(/(\d+)m/)
    const secsMatch = value.match(/(\d+)s/)

    if (hoursMatch) totalSeconds += parseInt(hoursMatch[1]) * 3600
    if (minsMatch) totalSeconds += parseInt(minsMatch[1]) * 60
    if (secsMatch) totalSeconds += parseInt(secsMatch[1])

    return totalSeconds
}

const formatSeconds = (totalSeconds: number): string => {
    if (totalSeconds === 0) return "Add time"
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    let result = ""
    if (hours > 0) result += `${hours}h `
    if (minutes > 0) result += `${minutes}m `
    if (seconds > 0 || (hours === 0 && minutes === 0)) result += `${seconds}s`
    return result.trim()
}

export function TimeTracker({ value, onToggle, onChange }: TimeTrackerProps) {
    const [seconds, setSeconds] = React.useState(() => parseTimeString(value))
    const [isRunning, setIsRunning] = React.useState(false)

    React.useEffect(() => {
        setSeconds(parseTimeString(value))
    }, [value])

    React.useEffect(() => {
        let interval: NodeJS.Timeout
        if (isRunning) {
            interval = setInterval(() => {
                setSeconds((prev) => {
                    const newSeconds = prev + 1
                    // Optionally notify parent periodically or on stop
                    return newSeconds
                })
            }, 1000)
        }
        return () => {
            if (interval) clearInterval(interval)
        }
    }, [isRunning])

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation()
        const newRunning = !isRunning
        setIsRunning(newRunning)
        if (onToggle) onToggle(newRunning)

        if (!newRunning && onChange) {
            // When stopping, sync the final value back
            onChange(formatSeconds(seconds))
        }
    }

    const displayValue = formatSeconds(seconds)
    const isEmpty = displayValue === "Add time"

    return (
        <div
            className={`flex items-center gap-2 group/time cursor-pointer w-full h-full p-1 rounded hover:bg-gray-50/80 transition-all ${isRunning ? 'bg-blue-50/50' : ''}`}
            onClick={handleToggle}
        >
            {isEmpty ? (
                <>
                    <div className="h-5 w-5 rounded-full border border-gray-200 flex items-center justify-center opacity-0 group-hover/time:opacity-100 transition-opacity shrink-0">
                        <Plus size={10} className="text-gray-400" />
                    </div>
                    <span className="text-gray-300 text-[12px] truncate">{displayValue}</span>
                </>
            ) : (
                <>
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 transition-all ${isRunning ? 'bg-blue-500 text-white shadow-sm' : 'bg-gray-100 text-gray-500 group-hover/time:bg-gray-200'}`}>
                        {isRunning ? (
                            <Pause size={10} fill="currentColor" strokeWidth={0} />
                        ) : (
                            <Play size={10} fill="currentColor" className="ml-0.5" strokeWidth={0} />
                        )}
                    </div>
                    <span className={`text-[12px] font-medium truncate tabular-nums ${isRunning ? 'text-blue-600' : 'text-gray-700'}`}>
                        {displayValue}
                    </span>
                </>
            )}
        </div>
    )
}
