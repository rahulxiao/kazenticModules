"use client"

import * as React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import {
    Check,
    ChevronDown,
    Search,
    ArrowUpRight,
    Zap,
    CheckCircle2,
    RotateCcw,
    Clock,
    XCircle,
    Monitor,
    MinusCircle
} from "lucide-react"
import { cn } from "@/lib/utils"

export const STATUSES = [
    { label: "TO DO", value: "TO DO", icon: ArrowUpRight, color: "text-orange-500", bg: "bg-orange-50" },
    { label: "IN PROGRESS", value: "IN PROGRESS", icon: Zap, color: "text-purple-500", bg: "bg-purple-50" },
    { label: "ACTIVE", value: "ACTIVE", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "IN REVIEW", value: "IN REVIEW", icon: RotateCcw, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "PENDING", value: "PENDING", icon: Clock, color: "text-amber-700", bg: "bg-amber-50" },
    { label: "REJECTED", value: "REJECTED", icon: XCircle, color: "text-red-500", bg: "bg-red-50" },
    { label: "QUALITY ASSURANCE", value: "QUALITY ASSURANCE", icon: Monitor, color: "text-indigo-500", bg: "bg-indigo-50" },
    { label: "CLOSED", value: "CLOSED", icon: MinusCircle, color: "text-slate-600", bg: "bg-slate-50" },
]

interface StatusModuleProps {
    status: string
    onStatusChange: (newStatus: string) => void
}

export function StatusModule({ status, onStatusChange }: StatusModuleProps) {
    const [open, setOpen] = React.useState(false)
    const [search, setSearch] = React.useState("")

    const filteredStatuses = STATUSES.filter(s =>
        s.label.toLowerCase().includes(search.toLowerCase())
    )

    const normalizedStatus = (status || "TO DO").toUpperCase()
    const selectedStatus = STATUSES.find(s => s.value === normalizedStatus) || STATUSES[0]
    const SelectedIcon = selectedStatus.icon

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div className="inline-flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer hover:bg-gray-100/50 transition-all group">
                    <SelectedIcon size={14} className={cn(selectedStatus.color)} />
                    <span className="text-[12px] font-medium text-[#1a1c1e]">{normalizedStatus}</span>
                    <ChevronDown size={14} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[280px] border border-gray-100 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] overflow-hidden" align="start">
                <div className="p-3">
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-[#f8f9fb] border-none rounded-xl pl-10 pr-4 py-2 text-[14px] focus:outline-none placeholder:text-gray-500"
                        />
                    </div>

                    <div className="flex items-center justify-between px-1 mb-2">
                        <span className="text-[12px] font-semibold text-gray-400 uppercase tracking-tight">Statuses</span>
                        <button className="text-[12px] font-semibold text-blue-600 hover:text-blue-700 transition-colors">Select All</button>
                    </div>

                    <div className="space-y-0.5">
                        {filteredStatuses.map((opt) => {
                            const isSelected = opt.value === normalizedStatus
                            const Icon = opt.icon
                            return (
                                <div
                                    key={opt.value}
                                    onClick={() => {
                                        onStatusChange(opt.value)
                                        setOpen(false)
                                    }}
                                    className={cn(
                                        "flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all animate-in fade-in slide-in-from-top-1 duration-200",
                                        isSelected ? "bg-blue-50/60" : "hover:bg-gray-50/80"
                                    )}
                                >
                                    <div className="flex items-center gap-3.5">
                                        <Icon size={18} className={cn(opt.color)} />
                                        <span className={cn(
                                            "text-[12px] font-semibold tracking-tight transition-colors",
                                            isSelected ? "text-blue-600" : "text-gray-700"
                                        )}>
                                            {opt.label}
                                        </span>
                                    </div>
                                    {isSelected && (
                                        <Check size={18} className="text-blue-600 stroke-[2.5]" />
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
