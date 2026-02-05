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
            className="flex items-center gap-3 w-full py-2 bg-gray-50/30 border-b border-gray-50"
            style={{ paddingLeft: (depth * 24) + 72 }}
        >
            {/* Status Indicator */}
            <Circle
                size={18}
                className="text-gray-300 stroke-[1.5] border-dashed shrink-0"
                style={{ strokeDasharray: "3 2" }}
            />

            {/* Input Field */}
            <input
                ref={inputRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Task Name or type '/' for commands"
                className="flex-1 bg-transparent border-none text-[14px] text-gray-800 placeholder:text-gray-400 focus:outline-none"
            />

            {/* Toolbar */}
            <div className="flex items-center gap-2 text-gray-400">
                <div className="flex items-center gap-1 px-1.5 py-1 rounded hover:bg-gray-100 cursor-pointer border border-transparent hover:border-gray-200 transition-all">
                    <Box size={14} />
                </div>
                <div className="flex items-center gap-1 px-1.5 py-1 rounded hover:bg-gray-100 cursor-pointer border border-transparent hover:border-gray-200 transition-all">
                    <Wand2 size={14} />
                </div>

                <div className="h-4 w-[1px] bg-gray-200 mx-1" />

                <div className="flex items-center gap-1 px-1.5 py-1 rounded hover:bg-gray-100 cursor-pointer border border-transparent hover:border-gray-200 transition-all">
                    <Users size={14} />
                </div>
                <div className="flex items-center gap-1 px-1.5 py-1 rounded hover:bg-gray-100 cursor-pointer border border-transparent hover:border-gray-200 transition-all">
                    <Calendar size={14} />
                </div>
                <div className="flex items-center gap-1 px-1.5 py-1 rounded hover:bg-gray-100 cursor-pointer border border-transparent hover:border-gray-200 transition-all">
                    <Flag size={14} />
                </div>
                <div className="flex items-center gap-1 px-1.5 py-1 rounded hover:bg-gray-100 cursor-pointer border border-transparent hover:border-gray-200 transition-all">
                    <Tag size={14} />
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 cursor-pointer border border-gray-200 transition-all text-gray-500">
                    <Edit3 size={14} />
                    <span className="text-[11px] font-bold">1</span>
                </div>

                <div className="flex items-center gap-2 ml-2">
                    <button
                        onClick={onCancel}
                        className="px-3 py-1.5 text-[13px] font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-3 py-1.5 bg-gray-900 text-white text-[13px] font-bold rounded flex items-center gap-1.5 hover:bg-gray-800 transition-colors shadow-sm"
                    >
                        Save
                        <span className="text-[10px] opacity-70">↵</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
