"use client"

import * as React from "react"
import {
    ChevronLeft,
    ChevronRight,
    Calendar as CalendarIcon,
    ChevronDown,
    ChevronUp,
    X
} from "lucide-react"
import moment from "moment"
import { cn } from "@/lib/utils"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DatePickerProps {
    startDate?: string
    dueDate?: string
    onStartDateChange?: (date: string) => void
    onDueDateChange?: (date: string) => void
    activeMode?: 'start' | 'due'

    // For backward compatibility
    value?: string
    onChange?: (date: string) => void
    children?: React.ReactNode
    className?: string
}

export const formatSmartDate = (dateStr: string) => {
    if (!dateStr) return { text: "", color: "" }
    const d = moment(dateStr)
    const today = moment().startOf('day')
    const diff = d.clone().startOf('day').diff(today, 'days')

    // Check if there's a time component (non-zero hour/minute)
    const hasTime = dateStr.includes(':') || (d.hour() !== 0 || d.minute() !== 0)
    const timeSuffix = hasTime ? `, ${d.format("h:mma")}` : ""

    if (diff === 0) return { text: `Today${timeSuffix}`, color: "text-amber-500" }
    if (diff === 1) return { text: `Tomorrow${timeSuffix}`, color: "text-gray-700" }
    if (diff === -1) return { text: `Yesterday${timeSuffix}`, color: "text-red-400" }

    // Use day name if within this week or next week (roughly 7 days range)
    if (diff > 1 && diff < 7) return { text: `${d.format("ddd")}${timeSuffix}`, color: "text-gray-700" }
    if (diff < -1 && diff > -7) return { text: `${d.format("ddd")}${timeSuffix}`, color: "text-gray-700" }

    return { text: `${d.format("M/D/YY")}${timeSuffix}`, color: "text-gray-700" }
}

export function DatePicker({
    startDate: propStartDate,
    dueDate: propDueDate,
    onStartDateChange,
    onDueDateChange,
    activeMode: propActiveMode = 'due',
    value,
    onChange,
    children,
    className
}: DatePickerProps) {
    const [open, setOpen] = React.useState(false)
    const [timeOpen, setTimeOpen] = React.useState(false)
    const [isMounted, setIsMounted] = React.useState(false)

    React.useEffect(() => {
        setIsMounted(true)
    }, [])

    // Initialize with direct props if available, otherwise fall back to 'value' if it matches the active mode
    const [startDate, setStartDate] = React.useState<string>(propStartDate || (propActiveMode === 'start' ? value : "") || "")
    const [dueDate, setDueDate] = React.useState<string>(propDueDate || (propActiveMode === 'due' ? value : "") || "")

    const [activeField, setActiveField] = React.useState<'start' | 'due'>(propActiveMode)

    // Update internal state when props change
    React.useEffect(() => {
        if (propStartDate !== undefined) setStartDate(propStartDate)
        else if (value !== undefined && propActiveMode === 'start') setStartDate(value)
    }, [propStartDate, value, propActiveMode])

    React.useEffect(() => {
        if (propDueDate !== undefined) setDueDate(propDueDate)
        else if (value !== undefined && propActiveMode === 'due') setDueDate(value)
    }, [propDueDate, value, propActiveMode])

    const activeDateValue = activeField === 'start' ? startDate : dueDate
    const activeMoment = activeDateValue ? moment(activeDateValue) : moment()
    const [viewDate, setViewDate] = React.useState(activeMoment.clone().startOf('month'))

    const selectedTime = activeDateValue && activeDateValue.includes(' ')
        ? moment(activeDateValue).format("h:mm a")
        : null

    const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

    const prevMonth = () => setViewDate(viewDate.clone().subtract(1, 'month'))
    const nextMonth = () => setViewDate(viewDate.clone().add(1, 'month'))

    const days = []
    const totalDays = viewDate.daysInMonth()
    const firstDay = viewDate.clone().startOf('month').day()
    const prevMonthDate = viewDate.clone().subtract(1, 'month')
    const prevMonthDays = prevMonthDate.daysInMonth()

    for (let i = firstDay - 1; i >= 0; i--) {
        days.push({ day: prevMonthDays - i, date: prevMonthDate.clone().date(prevMonthDays - i), current: false })
    }
    for (let i = 1; i <= totalDays; i++) {
        days.push({ day: i, date: viewDate.clone().date(i), current: true })
    }
    const remaining = 42 - days.length
    const nextMonthDate = viewDate.clone().add(1, 'month')
    for (let i = 1; i <= remaining; i++) {
        days.push({ day: i, date: nextMonthDate.clone().date(i), current: false })
    }

    const quickOptions = React.useMemo(() => {
        if (!isMounted) return []
        return [
            { label: "Today", value: moment().format("ddd"), date: moment() },
            { label: "Later", value: moment().add(3, 'hours').format("h:mm a"), date: moment().add(3, 'hours') },
            { label: "Tomorrow", value: moment().add(1, 'days').format("ddd"), date: moment().add(1, 'days') },
            { label: "This weekend", value: moment().endOf('week').subtract(1, 'days').format("ddd"), date: moment().endOf('week').subtract(1, 'days') },
            { label: "Next week", value: moment().add(1, 'weeks').startOf('isoWeek').format("ddd"), date: moment().add(1, 'weeks').startOf('isoWeek') },
        ]
    }, [isMounted])

    const times = []
    for (let h = 0; h < 24; h++) {
        for (let m = 0; m < 60; m += 15) {
            times.push(moment().hour(h).minute(m).format("h:mm a"))
        }
    }

    const handleSelectDate = (date: moment.Moment) => {
        const newDate = date.clone()
        const currentVal = activeField === 'start' ? startDate : dueDate

        if (currentVal && currentVal.includes(' ')) {
            const timeParts = moment(currentVal, "YYYY-MM-DD HH:mm")
            newDate.hour(timeParts.hour()).minute(timeParts.minute())
        } else if (selectedTime) {
            const timeParts = moment(selectedTime, "h:mm a")
            newDate.hour(timeParts.hour()).minute(timeParts.minute())
        }

        const formatted = newDate.format("YYYY-MM-DD" + (newDate.hour() !== 0 || newDate.minute() !== 0 ? " HH:mm" : ""))

        if (activeField === 'start') {
            setStartDate(formatted)
            onStartDateChange?.(formatted)
            if (propActiveMode === 'start') onChange?.(formatted)
        } else {
            setDueDate(formatted)
            onDueDateChange?.(formatted)
            if (propActiveMode === 'due') onChange?.(formatted)
        }
    }

    const handleSelectTime = (time: string) => {
        const timeParts = moment(time, "h:mm a")
        const baseDate = moment(activeDateValue || moment())
        const newDate = baseDate.clone().hour(timeParts.hour()).minute(timeParts.minute())
        const formatted = newDate.format("YYYY-MM-DD HH:mm")

        if (activeField === 'start') {
            setStartDate(formatted)
            onStartDateChange?.(formatted)
            if (propActiveMode === 'start') onChange?.(formatted)
        } else {
            setDueDate(formatted)
            onDueDateChange?.(formatted)
            if (propActiveMode === 'due') onChange?.(formatted)
        }
        setTimeOpen(false)
    }

    const clearDate = (e: React.MouseEvent, field: 'start' | 'due') => {
        e.stopPropagation()
        if (field === 'start') {
            setStartDate("")
            onStartDateChange?.("")
            if (propActiveMode === 'start') onChange?.("")
        } else {
            setDueDate("")
            onDueDateChange?.("")
            if (propActiveMode === 'due') onChange?.("")
        }
    }

    const formatDateInput = (dateStr: string) => {
        const smart = formatSmartDate(dateStr)
        return typeof smart === 'string' ? smart : smart.text
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                {children || (
                    <button className={cn("hover:bg-black/5 px-2 py-1 rounded transition-colors", className)}>
                        {value ? (() => {
                            const smart = formatSmartDate(value)
                            return typeof smart === 'string' ? smart : smart.text
                        })() : "Set date"}
                    </button>
                )}
            </PopoverTrigger>
            <PopoverContent align="start" className="p-0 border border-gray-100 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] w-[580px] overflow-hidden z-50">
                {/* Top Headers */}
                <div className="flex gap-2 p-3 bg-white border-b border-gray-100">
                    {/* Start Date Field */}
                    <div
                        onClick={() => setActiveField('start')}
                        className={cn(
                            "flex-[1.2] flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer transition-all",
                            activeField === 'start' ? "bg-blue-50/50 border-blue-500/50" : "bg-white border-gray-100 hover:border-gray-200"
                        )}
                    >
                        <CalendarIcon size={16} className={startDate ? "text-gray-500" : "text-gray-300"} />
                        <div className="flex-1 flex items-center justify-between gap-2 overflow-hidden">
                            <span className={cn("text-[13px] font-semibold whitespace-nowrap", startDate ? "text-gray-900" : "text-gray-400")}>
                                {startDate ? formatDateInput(startDate) : "Start date"}
                            </span>

                            <div className="flex items-center gap-1">
                                {startDate && activeField === 'start' && (
                                    <div onClick={(e) => clearDate(e, 'start')} className="p-1 hover:bg-black/5 rounded-md group relative mr-0.5">
                                        <X size={14} className="text-gray-400 hover:text-gray-600" />
                                        <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[11px] font-bold px-2 py-1 rounded shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">Clear</div>
                                    </div>
                                )}

                                <Popover open={timeOpen && activeField === 'start'} onOpenChange={(open) => { setTimeOpen(open); if (open) setActiveField('start'); }}>
                                    <PopoverTrigger asChild>
                                        <div
                                            onClick={(e) => { e.stopPropagation(); setActiveField('start'); setTimeOpen(true); }}
                                            className={cn(
                                                "text-[13px] font-bold px-1.5 py-0.5 rounded hover:bg-black/5 transition-colors whitespace-nowrap",
                                                startDate && startDate.includes(' ') ? "text-blue-600" : "text-gray-400"
                                            )}
                                        >
                                            {(startDate && startDate.includes(' ') ? moment(startDate).format("h:mm a") : null) || "Add time"}
                                        </div>
                                    </PopoverTrigger>
                                    <PopoverContent side="bottom" align="end" className="p-0 border border-gray-100 bg-white rounded-lg shadow-xl w-[140px] max-h-[300px] overflow-y-auto z-[70] animate-in fade-in slide-in-from-top-1">
                                        {times.map((time, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => handleSelectTime(time)}
                                                className="px-4 py-2 text-[13px] text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors"
                                            >
                                                {time}
                                            </div>
                                        ))}
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                    </div>

                    {/* Due Date Field */}
                    <div
                        onClick={() => setActiveField('due')}
                        className={cn(
                            "flex-[1.2] flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer transition-all",
                            activeField === 'due' ? "bg-blue-50/50 border-blue-500/50" : "bg-white border-gray-100 hover:border-gray-200"
                        )}
                    >
                        <CalendarIcon size={16} className={dueDate ? "text-gray-500" : "text-gray-300"} />
                        <div className="flex-1 flex items-center justify-between gap-2 overflow-hidden">
                            <span className={cn("text-[13px] font-semibold whitespace-nowrap", dueDate ? "text-gray-900" : "text-gray-400")}>
                                {dueDate ? formatDateInput(dueDate) : "Due date"}
                            </span>

                            <div className="flex items-center gap-1">
                                {dueDate && activeField === 'due' && (
                                    <div onClick={(e) => clearDate(e, 'due')} className="p-1 hover:bg-black/5 rounded-md group relative mr-0.5">
                                        <X size={14} className="text-gray-400 hover:text-gray-600" />
                                        <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[11px] font-bold px-2 py-1 rounded shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">Clear</div>
                                    </div>
                                )}

                                <Popover open={timeOpen && activeField === 'due'} onOpenChange={(open) => { setTimeOpen(open); if (open) setActiveField('due'); }}>
                                    <PopoverTrigger asChild>
                                        <div
                                            onClick={(e) => { e.stopPropagation(); setActiveField('due'); setTimeOpen(true); }}
                                            className={cn(
                                                "text-[13px] font-bold px-1.5 py-0.5 rounded hover:bg-black/5 transition-colors whitespace-nowrap",
                                                dueDate && dueDate.includes(' ') ? "text-blue-600" : "text-gray-400"
                                            )}
                                        >
                                            {(dueDate && dueDate.includes(' ') ? moment(dueDate).format("h:mm a") : null) || "Add time"}
                                        </div>
                                    </PopoverTrigger>
                                    <PopoverContent side="bottom" align="end" className="p-0 border border-gray-100 bg-white rounded-lg shadow-xl w-[140px] max-h-[300px] overflow-y-auto z-[70] animate-in fade-in slide-in-from-top-1">
                                        {times.map((time, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => handleSelectTime(time)}
                                                className="px-4 py-2 text-[13px] text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors"
                                            >
                                                {time}
                                            </div>
                                        ))}
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex">
                    {/* Sidebar Presets */}
                    <div className="w-[180px] border-r border-gray-100 py-2 bg-white">
                        {quickOptions.map((opt, i) => (
                            <div
                                key={i}
                                onClick={() => handleSelectDate(opt.date)}
                                className="px-4 py-2.5 flex items-center justify-between cursor-pointer transition-colors hover:bg-gray-50"
                            >
                                <span className="text-[14px] text-gray-700 font-medium">{opt.label}</span>
                                <span className="text-[12px] text-gray-400">{opt.value}</span>
                            </div>
                        ))}
                    </div>

                    {/* Calendar View */}
                    <div className="flex-1 p-4 bg-white">
                        <div className="flex items-center justify-between mb-4 px-1">
                            <span className="text-[16px] font-bold text-gray-900">
                                {viewDate.format("MMMM YYYY")}
                            </span>
                            <div className="flex items-center gap-1">
                                <div className="flex items-center gap-1 mr-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded">
                                    <span className="text-[13px] font-medium text-gray-500">Today</span>
                                    <ChevronUp size={14} className="text-gray-400" />
                                    <ChevronDown size={14} className="text-gray-400 -ml-1" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <ChevronUp size={18} className="text-gray-400 cursor-pointer hover:text-gray-900" onClick={prevMonth} />
                                    <ChevronDown size={18} className="text-gray-400 cursor-pointer hover:text-gray-900" onClick={nextMonth} />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-7 mb-2">
                            {dayNames.map((day, i) => (
                                <div key={i} className="text-center text-[12px] font-bold text-gray-400">
                                    {day}
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 gap-y-0.5">
                            {days.map((item, i) => {
                                const isSelected = activeDateValue && moment(activeDateValue).isSame(item.date, 'day')
                                const isToday = moment().isSame(item.date, 'day')
                                const isDisabled = activeField === 'due' && startDate && item.date.isBefore(moment(startDate), 'day')

                                return (
                                    <div
                                        key={i}
                                        onClick={() => !isDisabled && handleSelectDate(item.date)}
                                        className={cn(
                                            "h-9 flex items-center justify-center text-[13px] font-bold transition-all rounded-lg m-0.5 relative group",
                                            isDisabled ? "text-gray-200 cursor-not-allowed opacity-50" : "cursor-pointer",
                                            !isDisabled && isSelected ? "bg-blue-600 text-white shadow-lg shadow-blue-100" :
                                                !isDisabled && item.current ? "text-gray-700 hover:bg-gray-50" :
                                                    !isDisabled ? "text-gray-300 hover:text-gray-400" : ""
                                        )}
                                    >
                                        {item.day}
                                        {isToday && !isSelected && !isDisabled && (
                                            <div className="absolute bottom-1 w-3.5 h-0.5 bg-red-400 rounded-full" />
                                        )}
                                        {isSelected && !isDisabled && (
                                            <div className="absolute bottom-1 w-3.5 h-0.5 bg-white/30 rounded-full" />
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
