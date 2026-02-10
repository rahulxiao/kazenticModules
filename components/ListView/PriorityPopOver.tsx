"use client"

import * as React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Flag, Ban, Check } from "lucide-react"
import { cn } from "@/lib/utils"

const PRIORITIES = [
    { label: "Urgent", value: "Urgent", color: "text-[#ff4d4d]", icon: Flag, bg: "bg-red-50" },
    { label: "High", value: "High", color: "text-[#ffd600]", icon: Flag, bg: "bg-yellow-50" },
    { label: "Normal", value: "Normal", color: "text-[#4b89ff]", icon: Flag, bg: "bg-blue-50" },
    { label: "Low", value: "Low", color: "text-[#8e8e8e]", icon: Flag, bg: "bg-gray-50" },
    { label: "Clear", value: "", color: "text-[#8e8e8e]", icon: Ban, bg: "bg-transparent" },
]

interface PriorityPopOverProps {
    priority: string
    onPriorityChange: (newPriority: string) => void
    children?: React.ReactNode
    open?: boolean
    onOpenChange?: (open: boolean) => void
}

export function PriorityPopOver({
    priority,
    onPriorityChange,
    children,
    open,
    onOpenChange
}: PriorityPopOverProps) {
    const [localOpen, setLocalOpen] = React.useState(false)

    const isControlled = open !== undefined
    const isOpen = isControlled ? open : localOpen
    const handleOpenChange = (newOpen: boolean) => {
        if (!isControlled) {
            setLocalOpen(newOpen)
        }
        onOpenChange?.(newOpen)
    }

    const selectedPriority = PRIORITIES.find(p => p.value === priority) || PRIORITIES[2] // Default to Normal if not found

    return (
        <Popover open={isOpen} onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
                {children || (
                    <div
                        className="inline-flex items-center gap-2.5 px-2 py-1 rounded cursor-pointer hover:bg-gray-100/50 transition-colors group"
                    >
                        {priority ? (
                            <>
                                <selectedPriority.icon size={16} className={cn(selectedPriority.color, "fill-current")} />
                                <span className="text-[13px] font-bold text-[#1a1c1e]">{priority}</span>
                            </>
                        ) : (
                            <Flag size={16} className="text-gray-300 group-hover:text-gray-400" />
                        )}
                    </div>
                )}
            </PopoverTrigger>

            <PopoverContent className="p-2 w-[180px] border border-gray-100 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)]" align="start">
                <div className="px-3 py-2 text-[12px] font-bold text-gray-400 uppercase tracking-wider">
                    Task Priority
                </div>
                <div className="space-y-0.5">
                    {PRIORITIES.map((opt) => {
                        const isSelected = opt.value === priority
                        const Icon = opt.icon

                        return (
                            <div
                                key={opt.label}
                                onClick={() => {
                                    onPriorityChange(opt.value)
                                    handleOpenChange(false)
                                }}
                                className={cn(
                                    "flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors group",
                                    isSelected ? "bg-blue-50/50" : "hover:bg-gray-50"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon size={16} className={cn(opt.color, "fill-current")} />
                                    <span className={cn(
                                        "text-[14px] font-medium transition-colors",
                                        isSelected ? "text-gray-900" : "text-gray-600 group-hover:text-gray-900"
                                    )}>
                                        {opt.label}
                                    </span>
                                </div>
                                {isSelected && (
                                    <Check size={14} className="text-gray-400 stroke-[2.5]" />
                                )}
                            </div>
                        )
                    })}
                </div>
            </PopoverContent>
        </Popover>
    )
}
