"use client"

import * as React from "react"
import { Plus } from "lucide-react"

interface CustomModuleProps {
    value: string
    onValueChange: (newValue: string) => void
}

export function CustomModule({ value, onValueChange }: CustomModuleProps) {
    const [isEditing, setIsEditing] = React.useState(false)
    const [localValue, setLocalValue] = React.useState(value)

    const handleBlur = () => {
        setIsEditing(false)
        onValueChange(localValue)
    }

    if (isEditing) {
        return (
            <input
                autoFocus
                className="w-full h-7 px-2 text-[13px] font-medium border border-blue-200 rounded outline-none bg-blue-50/20"
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={(e) => e.key === 'Enter' && handleBlur()}
            />
        )
    }

    return (
        <div
            className="flex items-center min-h-[28px] px-2 py-1 rounded hover:bg-gray-100/50 cursor-pointer group transition-colors"
            onClick={() => setIsEditing(true)}
        >
            {value ? (
                <span className="text-[13px] font-medium text-gray-700">{value}</span>
            ) : (
                <Plus size={14} className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
        </div>
    )
}
