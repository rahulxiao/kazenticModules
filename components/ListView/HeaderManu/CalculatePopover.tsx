"use client"

import * as React from "react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import {
    ChevronDown,
    Check,
    Trash2
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface CalculatePopoverProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onCalculate: (method: string) => void
    onClear?: () => void
    children: React.ReactNode
    currentMethod?: string
}

type CalculationMethod =
    | "count_all"
    | "count_values"
    | "count_unique"
    | "count_empty"
    | "count_not_empty"
    | "percent_total"
    | "percent_filled"
    | "earliest_date"
    | "latest_date"
    | "date_range"

const methodLabels: Record<string, string> = {
    count_all: "Count all",
    count_values: "Range",
    count_unique: "Count unique",
    count_empty: "Count empty",
    count_not_empty: "Count not empty",
    percent_total: "Percent of total",
    percent_filled: "Percent filled",
    earliest_date: "Earliest date",
    latest_date: "Latest date",
    date_range: "Date range",
}

export function CalculatePopover({ open, onOpenChange, onCalculate, children, currentMethod, onClear }: CalculatePopoverProps) {
    const [selectedMethod, setSelectedMethod] = React.useState<string>(currentMethod || "count_values")

    React.useEffect(() => {
        if (currentMethod) {
            setSelectedMethod(currentMethod)
        }
    }, [currentMethod])

    const handleCalculate = () => {
        onCalculate(selectedMethod)
        onOpenChange(false)
    }

    return (
        <Popover open={open} onOpenChange={onOpenChange}>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent
                className="w-[280px] p-0 bg-white border-zinc-200 text-zinc-900 shadow-xl overflow-visible"
                align="start"
                sideOffset={5}
            >
                <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 bg-white">
                    <h3 className="text-[11px] font-bold tracking-wider text-zinc-500 uppercase">
                        CALCULATE
                    </h3>
                    <button
                        onClick={() => {
                            if (onClear) onClear()
                            onOpenChange(false)
                        }}
                        className="text-zinc-400 hover:text-red-500 transition-colors"
                        title="Clear calculation"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>

                <div className="p-4 space-y-4 bg-white">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                className="w-full flex items-center justify-between bg-white hover:bg-zinc-50 border border-zinc-200 rounded-md px-3 py-2 text-[12px] text-zinc-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                            >
                                <span className="font-medium">{methodLabels[selectedMethod] || "Select method"}</span>
                                <ChevronDown className="h-4 w-4 text-zinc-400" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[200px] bg-white text-zinc-900 border-zinc-200" align="start">
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger className="hover:bg-zinc-100 data-[state=open]:bg-zinc-100 text-zinc-700">
                                    <span>Count</span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent className="bg-white text-zinc-900 border-zinc-200">
                                        <DropdownMenuRadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
                                            <DropdownMenuRadioItem value="count_all" className="hover:bg-zinc-100 text-zinc-700 data-[state=checked]:text-blue-600">
                                                Count all
                                            </DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="count_values" className="hover:bg-zinc-100 text-zinc-700 data-[state=checked]:text-blue-600">
                                                Count values
                                            </DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="count_unique" className="hover:bg-zinc-100 text-zinc-700 data-[state=checked]:text-blue-600">
                                                Count unique values
                                            </DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="count_empty" className="hover:bg-zinc-100 text-zinc-700 data-[state=checked]:text-blue-600">
                                                Count empty
                                            </DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="count_not_empty" className="hover:bg-zinc-100 text-zinc-700 data-[state=checked]:text-blue-600">
                                                Count not empty
                                            </DropdownMenuRadioItem>
                                        </DropdownMenuRadioGroup>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>

                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger className="hover:bg-zinc-100 data-[state=open]:bg-zinc-100 text-zinc-700">
                                    <span>Percent</span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent className="bg-white text-zinc-900 border-zinc-200">
                                        <DropdownMenuRadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
                                            <DropdownMenuRadioItem value="percent_total" className="hover:bg-zinc-100 text-zinc-700 data-[state=checked]:text-blue-600">
                                                Percent of total
                                            </DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="percent_filled" className="hover:bg-zinc-100 text-zinc-700 data-[state=checked]:text-blue-600">
                                                Percent filled
                                            </DropdownMenuRadioItem>
                                        </DropdownMenuRadioGroup>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>

                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger className="hover:bg-zinc-100 data-[state=open]:bg-zinc-100 text-zinc-700">
                                    <span>Dates</span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent className="bg-white text-zinc-900 border-zinc-200">
                                        <DropdownMenuRadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
                                            <DropdownMenuRadioItem value="earliest_date" className="hover:bg-zinc-100 text-zinc-700 data-[state=checked]:text-blue-600">
                                                Earliest date
                                            </DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="latest_date" className="hover:bg-zinc-100 text-zinc-700 data-[state=checked]:text-blue-600">
                                                Latest date
                                            </DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="date_range" className="hover:bg-zinc-100 text-zinc-700 data-[state=checked]:text-blue-600">
                                                Date range
                                            </DropdownMenuRadioItem>
                                        </DropdownMenuRadioGroup>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button
                        onClick={handleCalculate}
                        className="w-full bg-white text-black hover:bg-gray-100 transition-colors font-medium text-[12px] h-9 shadow-sm border"
                    >
                        Calculate
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}
