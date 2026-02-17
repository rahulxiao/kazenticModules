"use client"

import * as React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import {
    Check,
    ChevronDown,
    Circle,
    Diamond,
    ClipboardList,
    FileEdit,
    HelpCircle
} from "lucide-react"
import { cn } from "@/lib/utils"

const TYPES = [
    { label: "Task", value: "Task", icon: Circle, color: "text-gray-500", isDefault: true },
    { label: "Milestone", value: "Milestone", icon: Diamond, color: "text-gray-500" },
    { label: "Form Response", value: "Form Response", icon: ClipboardList, color: "text-gray-500" },
    { label: "Meeting Note", value: "Meeting Note", icon: FileEdit, color: "text-gray-500" },
]

interface TaskTypeModuleProps {
    type: string
    onTypeChange: (newType: string) => void
}

export function TaskTypeModule({ type, onTypeChange }: TaskTypeModuleProps) {
    const [open, setOpen] = React.useState(false)

    // Normalize type to ensure we find a match, default to Task
    const normalizedType = type || "Task"
    const selectedType = TYPES.find(t => t.value === normalizedType) || TYPES[0]
    const Icon = selectedType.icon

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-transparent hover:border-gray-200 hover:bg-gray-50/50 transition-all cursor-pointer group">
                    <Icon size={14} className="text-gray-500" />
                    <span className="text-[12px] font-medium text-gray-700">{normalizedType}</span>
                    <ChevronDown size={14} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[240px] border border-gray-100 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] overflow-hidden" align="start">
                <div className="p-4">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4 px-1">
                        <div className="flex items-center gap-1.5">
                            <span className="text-[12px] font-bold text-gray-400">Task Types</span>
                            <HelpCircle size={14} className="text-gray-300 cursor-help" />
                        </div>
                        <button className="text-[12px] font-bold text-gray-900 hover:opacity-70 transition-opacity">Edit</button>
                    </div>

                    {/* Options */}
                    <div className="space-y-1">
                        {TYPES.map((opt) => {
                            const isSelected = opt.value === normalizedType
                            const OptIcon = opt.icon
                            return (
                                <div
                                    key={opt.value}
                                    onClick={() => {
                                        onTypeChange(opt.value)
                                        setOpen(false)
                                    }}
                                    className={cn(
                                        "flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all",
                                        isSelected ? "bg-[#f4f4f5]" : "hover:bg-gray-50"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <OptIcon size={16} className="text-gray-500" />
                                        <div className="flex items-center gap-1.5">
                                            <span className={cn(
                                                "text-[12px] font-bold transition-colors",
                                                isSelected ? "text-gray-900" : "text-gray-700"
                                            )}>
                                                {opt.label}
                                            </span>
                                            {opt.isDefault && (
                                                <span className="text-[12px] text-gray-400 font-medium">(default)</span>
                                            )}
                                        </div>
                                    </div>
                                    {isSelected && (
                                        <Check size={16} className="text-gray-900 stroke-[2.5]" />
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
