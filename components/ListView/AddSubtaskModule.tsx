"use client"

import * as React from "react"
import { Circle, Box, Wand2, Users, Calendar, Flag, Tag, Edit3, CornerDownRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"

interface AddSubtaskModuleProps {
    onSave: (name: string) => void
    onCancel: () => void
    depth?: number
}

export function AddSubtaskModule({ onSave, onCancel, depth = 1 }: AddSubtaskModuleProps) {
    const [name, setName] = React.useState("")
    const inputRef = React.useRef<HTMLInputElement>(null)

    React.useEffect(() => {
        inputRef.current?.focus()
    }, [])

    const handleSave = () => {
        if (name.trim()) {
            onSave(name)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSave()
        } else if (e.key === 'Escape') {
            onCancel()
        }
    }

    return (
        <div
            className="flex items-center gap-2 w-full py-1.5 bg-transparent h-full relative"
            style={{ paddingLeft: (depth * 24) + 72 }}
        >
            {/* Status Indicator */}
            <div className="shrink-0 w-[18px]">
                <Circle
                    size={18}
                    className="text-gray-300 stroke-[1.5] border-dashed"
                    style={{ strokeDasharray: "3 2" }}
                />
            </div>

            {/* Input Field Area */}
            <div className="flex-1 flex items-center min-w-0 pr-2">
                <input
                    ref={inputRef}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Task Name"
                    className="w-full bg-transparent border-none text-[12px] text-gray-800 placeholder:text-gray-400 focus:outline-none py-1"
                />
            </div>

            {/* Toolbar - Now always visible when text is present, or slightly visible on hover */}
            {name.length > 0 && (
                <div className="absolute right-[-670px] top-1/2 -translate-y-1/2 flex items-center gap-1.5 bg-white/95 backdrop-blur-[2px] pl-4 z-10 py-1">
                    {/* Left Group */}
                    <div className="flex items-center gap-1">
                        <div className="p-1 rounded border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors shadow-sm">
                            <Box size={14} className="text-gray-400" />
                        </div>
                        <div className="p-1 rounded border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors shadow-sm">
                            <Wand2 size={14} className="text-gray-400" />
                        </div>
                    </div>

                    <div className="h-4 w-[1px] bg-gray-100 mx-0.5" />

                    {/* Middle Group */}
                    <div className="flex items-center gap-1">
                        <div className="p-1 rounded border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors shadow-sm">
                            <Users size={14} className="text-gray-400" />
                        </div>
                        <div className="p-1 rounded border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors shadow-sm">
                            <Calendar size={14} className="text-gray-400" />
                        </div>
                        <div className="p-1 rounded border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors shadow-sm">
                            <Flag size={14} className="text-gray-400" />
                        </div>
                        <div className="p-1 rounded border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors shadow-sm">
                            <Tag size={14} className="text-gray-400" />
                        </div>
                        <div className="flex items-center gap-1 px-1.5 py-1 rounded border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors shadow-sm">
                            <Edit3 size={14} className="text-gray-400" />
                            <span className="text-[10px] font-bold text-gray-400">1</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 ml-1">
                        <button
                            onClick={onCancel}
                            className="px-2.5 py-1 text-[12px] font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-3 py-1 bg-gray-900 text-white text-[12px] font-bold rounded flex items-center gap-1.5 hover:bg-gray-800 transition-colors shadow-sm"
                        >
                            Save
                            <span className="text-[10px] opacity-70">↵</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
