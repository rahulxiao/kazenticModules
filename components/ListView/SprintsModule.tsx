"use client"

import * as React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Check, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

const SPRINTS = [
    { label: "Sprint 1", value: "Sprint 1", range: "(7/12 - 8/12)" },
    { label: "Sprint 2", value: "Sprint 2", range: "(8/12 - 9/12)" },
    { label: "Sprint 3", value: "Sprint 3", range: "(9/12 - 10/12)" },
    { label: "Backlog", value: "Backlog", range: "" },
]

interface SprintsModuleProps {
    sprint: string
    onSprintChange: (newSprint: string) => void
}

export function SprintsModule({ sprint, onSprintChange }: SprintsModuleProps) {
    const [open, setOpen] = React.useState(false)
    const selectedSprint = SPRINTS.find(s => s.value === sprint)

    return (
        <div className="flex items-center gap-2 group/sprint">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <div className="inline-flex items-center gap-1 px-1.5 py-1 rounded cursor-pointer hover:bg-gray-100/50 transition-colors">
                        <span className="text-[13px] font-medium text-blue-600 hover:underline">
                            {sprint ? (
                                <>
                                    {sprint} {selectedSprint?.range}
                                </>
                            ) : "Select Sprint"}
                        </span>
                    </div>
                </PopoverTrigger>
                <PopoverContent className="p-1.5 w-[200px] border border-gray-100 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)]" align="start">
                    <div className="space-y-0.5">
                        {SPRINTS.map((opt) => {
                            const isSelected = opt.value === sprint
                            return (
                                <div
                                    key={opt.value}
                                    onClick={() => {
                                        onSprintChange(opt.value)
                                        setOpen(false)
                                    }}
                                    className={cn(
                                        "flex items-center justify-between px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors group",
                                        isSelected ? "bg-blue-50/50" : "hover:bg-gray-50"
                                    )}
                                >
                                    <div className="flex flex-col">
                                        <span className={cn(
                                            "text-[13px] font-medium transition-colors",
                                            isSelected ? "text-gray-900" : "text-gray-600 group-hover:text-gray-900"
                                        )}>
                                            {opt.label}
                                        </span>
                                        {opt.range && <span className="text-[11px] text-gray-400">{opt.range}</span>}
                                    </div>
                                    {isSelected && (
                                        <Check size={14} className="text-blue-500 stroke-[3]" />
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </PopoverContent>
            </Popover>
            <div className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 opacity-0 group-hover/sprint:opacity-100 transition-opacity">
                <Plus size={14} className="text-gray-500" />
            </div>
        </div>
    )
}
