"use client"

import * as React from "react"
import moment from "moment"
import { Calendar } from "lucide-react"
import { DatePicker, formatSmartDate } from "./DatePicker"

interface DateClosedModuleProps {
    date: string
    onDateChange?: (newDate: string) => void
}

export function DateClosedModule({ date, onDateChange }: DateClosedModuleProps) {
    const smartDate = date ? formatSmartDate(date) : null

    return (
        <DatePicker
            value={date}
            onChange={(newDate) => onDateChange?.(newDate)}
        >
            <div className="flex items-center gap-1.5 px-2 py-1 cursor-pointer hover:bg-black/5 rounded group transition-all min-h-[30px] w-full">
                {smartDate ? (
                    <span className={`text-[12px] font-medium transition-colors ${smartDate.color}`}>
                        {smartDate.text}
                    </span>
                ) : (
                    <Calendar
                        size={14}
                        className="text-gray-200 group-hover:text-gray-400 transition-colors"
                    />
                )}
            </div>
        </DatePicker>
    )
}
