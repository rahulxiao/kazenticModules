"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SprintPointsModuleProps {
    points: string
    onPointsChange: (newPoints: string) => void
}

import { Star } from "lucide-react"

export function SprintPointsModule({ points, onPointsChange }: SprintPointsModuleProps) {
    const [isEditing, setIsEditing] = React.useState(false)
    const [value, setValue] = React.useState(points)

    const handleBlur = () => {
        setIsEditing(false)
        onPointsChange(value)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleBlur()
        }
    }

    return (
        <div
            className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md border border-gray-200 bg-gray-50/30 hover:bg-gray-100 transition-colors cursor-text group"
            onClick={() => setIsEditing(true)}
        >
            <Star size={14} className={cn(
                "transition-colors",
                points ? "text-gray-600 fill-gray-400/20" : "text-gray-300"
            )} />
            {isEditing ? (
                <input
                    autoFocus
                    className="w-10 text-[12px] font-medium bg-transparent outline-none"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                />
            ) : (
                <span className={cn(
                    "text-[12px] font-medium",
                    points ? "text-[#1a1c1e]" : "text-gray-300"
                )}>
                    {points || "0"}
                </span>
            )}
        </div>
    )
}

