"use client"

import * as React from "react"
import { Hourglass, HelpCircle } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"

interface TimeEstimationProps {
    value: string
    onChange: (value: string) => void
}

export function TimeEstimation({ value, onChange }: TimeEstimationProps) {
    const [inputValue, setInputValue] = React.useState(value || "")

    React.useEffect(() => {
        setInputValue(value || "")
    }, [value])

    const handleSave = () => {
        onChange(inputValue)
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer group hover:bg-gray-50 p-1 px-2 rounded transition-colors w-full h-full">
                    <Hourglass size={14} className="text-gray-400 group-hover:text-gray-600 shrink-0" />
                    <span className="text-[13px] text-gray-700 font-medium truncate">
                        {value || ""}
                    </span>
                    {!value && <span className="text-[13px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Add estimate</span>}
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-[340px] p-4 bg-white border border-gray-250 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] text-gray-900 outline-none" align="start">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-[15px] font-semibold text-gray-800">Time Estimate</span>
                            <HelpCircle size={16} className="text-gray-400 cursor-help" />
                        </div>
                        <div className="flex-1 ml-4 pt-1">
                            <Input
                                value={inputValue}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (e.key === 'Enter') handleSave()
                                }}
                                placeholder="Type in time"
                                className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 h-9 text-[13px] rounded-md focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500 shadow-sm"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end text-[11px] text-gray-400 italic">
                        Changes are automatically saved
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
