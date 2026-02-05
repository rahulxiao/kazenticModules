"use client"

import * as React from "react"
import { Plus } from "lucide-react"

interface TimeTrackerProps {
    value: string
}

export function TimeTracker({ value }: TimeTrackerProps) {
    const isEmpty = value === "Add time"
    return (
        <div className="flex items-center gap-2 group/time cursor-pointer w-full h-full p-1">
            {isEmpty ? (
                <>
                    <div className="h-5 w-5 rounded-full border border-gray-200 flex items-center justify-center opacity-0 group-hover/time:opacity-100 transition-opacity shrink-0">
                        <Plus size={10} className="text-gray-400" />
                    </div>
                    <span className="text-gray-300 text-[13px] truncate">{value}</span>
                </>
            ) : (
                <>
                    <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 shrink-0">
                        <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-current border-b-[4px] border-b-transparent ml-0.5" />
                    </div>
                    <span className="text-gray-700 text-[13px] font-medium truncate">{value}</span>
                </>
            )}
        </div>
    )
}
