"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import moment from "moment"
import { CalculatePopover } from "./HeaderManu/CalculatePopover"

interface CalculateModuleProps {
    items: any[]
    columnId: string
    currentMethod?: string
    onCalculate: (method: string) => void
    onClear: () => void
    isOpen: boolean
    onOpenChange: (open: boolean) => void
}

export function CalculateModule({
    items,
    columnId,
    currentMethod,
    onCalculate,
    onClear,
    isOpen,
    onOpenChange
}: CalculateModuleProps) {

    const calculateValue = React.useCallback(() => {
        if (!currentMethod) return null

        const values = items.map((row: any) => row[columnId])
        let value: string | number = ""

        switch (currentMethod) {
            case "count_all":
                value = items.length
                break
            case "count_values":
                value = values.filter(v => v !== null && v !== undefined && v !== "").length
                break
            case "count_unique":
                value = new Set(values.filter(v => v !== null && v !== undefined && v !== "")).size
                break
            case "count_empty":
                value = values.filter(v => v === null || v === undefined || v === "").length
                break
            case "count_not_empty":
                value = values.filter(v => v !== null && v !== undefined && v !== "").length
                break
            case "percent_filled":
                const filled = values.filter(v => v !== null && v !== undefined && v !== "").length
                value = items.length ? `${Math.round((filled / items.length) * 100)}%` : "0%"
                break
            case "percent_total":
                const totalFilled = values.filter(v => v !== null && v !== undefined && v !== "").length
                value = items.length ? `${Math.round((totalFilled / items.length) * 100)}%` : "0%"
                break
            case "earliest_date":
                const dates = values
                    .filter(v => v && moment(v).isValid())
                    .map(v => moment(v))
                    .sort((a, b) => a.valueOf() - b.valueOf())
                value = dates.length ? dates[0].format("MMM D") : "-"
                break
            case "latest_date":
                const datesLatest = values
                    .filter(v => v && moment(v).isValid())
                    .map(v => moment(v))
                    .sort((a, b) => b.valueOf() - a.valueOf())
                value = datesLatest.length ? datesLatest[0].format("MMM D") : "-"
                break
            case "date_range":
                const datesRange = values
                    .filter(v => v && moment(v).isValid())
                    .map(v => moment(v))
                    .sort((a, b) => a.valueOf() - b.valueOf())

                if (datesRange.length === 0) {
                    value = "-"
                } else if (datesRange.length === 1) {
                    value = datesRange[0].format("MMM D")
                } else {
                    const start = datesRange[0]
                    const end = datesRange[datesRange.length - 1]
                    value = `${start.format("MMM D")} - ${end.format("MMM D")}`
                }
                break
            default:
                value = ""
        }
        return value
    }, [items, columnId, currentMethod])

    const value = calculateValue()

    return (
        <div className="flex justify-center w-full">
            <CalculatePopover
                open={isOpen}
                onOpenChange={onOpenChange}
                onCalculate={onCalculate}
                onClear={onClear}
                currentMethod={currentMethod}
            >
                <button className="flex items-center justify-center gap-1.5 px-3 py-2 text-[12px] font-medium transition-colors cursor-pointer whitespace-nowrap group/calc min-h-[40px] w-full">
                    {value !== null ? (
                        <div className="flex flex-col items-center">
                            <span className="text-gray-900 font-medium">{value}</span>
                            <div className="flex items-center gap-1 opacity-0 group-hover/calc:opacity-100 transition-opacity duration-200">
                                <span className="text-[10px] text-gray-400">Calculate</span>
                                <ChevronDown size={10} className="text-gray-400" />
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1 text-gray-400 hover:text-gray-600">
                            <span>Calculate</span>
                            <ChevronDown size={12} className="text-gray-400" />
                        </div>
                    )}
                </button>
            </CalculatePopover>
        </div>
    )
}
