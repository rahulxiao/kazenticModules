"use client"

import * as React from "react"
import {
    ChevronRight,
    Check,
    User,
    Flag,
    Tag,
    Calendar,
    Box,
    CircleDashed,
    RefreshCcw,
    UserPlus
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface GroupByOption {
    id: string
    label: string
    icon: React.ReactNode
}

const GROUP_OPTIONS: GroupByOption[] = [
    { id: "status", label: "Status", icon: <CircleDashed className="w-[18px] h-[18px]" /> },
    { id: "assignees", label: "Assignee", icon: <UserPlus className="w-[18px] h-[18px]" /> },
    { id: "priority", label: "Priority", icon: <Flag className="w-[18px] h-[18px]" /> },
    { id: "tags", label: "Tags", icon: <Tag className="w-[18px] h-[18px]" /> },
    { id: "dueDate", label: "Due Date", icon: <Calendar className="w-[18px] h-[18px]" /> },
    { id: "taskType", label: "Task Type", icon: <Box className="w-[18px] h-[18px]" /> },
]

interface GroupByPopoverProps {
    selectedGroup: string
    onGroupChange: (group: string) => void
}

export function GroupByPopover({ selectedGroup, onGroupChange }: GroupByPopoverProps) {
    const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc")
    const [isOpen, setIsOpen] = React.useState(false)
    const [activePanel, setActivePanel] = React.useState<"fields" | "order" | null>("fields")

    const currentOption = GROUP_OPTIONS.find(opt => opt.id === selectedGroup)

    return (
        <div className="flex items-center gap-2 p-3 bg-white border-b border-gray-100 font-sans">
            <Popover open={isOpen} onOpenChange={(open) => {
                setIsOpen(open)
                if (!open) setActivePanel("fields") // Reset or keep fields open? 
            }}>
                <PopoverTrigger asChild>
                    <button className="flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium text-[#64748b] bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-all shadow-sm group">
                        <div className="flex items-center gap-2">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-gray-600 transition-colors">
                                <rect x="3" y="3" width="7" height="7" />
                                <rect x="14" y="3" width="7" height="7" />
                                <rect x="14" y="14" width="7" height="7" />
                                <rect x="3" y="14" width="7" height="7" />
                                <path d="M7 10v4" />
                                <path d="M14 7h-4" />
                            </svg>
                            <span className="text-[#5a6a85] font-semibold text-[14px]">
                                Group by {currentOption ? `: ${currentOption.label}` : ""}
                            </span>
                        </div>
                    </button>
                </PopoverTrigger>
                <PopoverContent
                    className={cn(
                        "p-0 bg-white border border-gray-200 shadow-[0_4px_24px_rgba(0,0,0,0.08)] rounded-[12px] overflow-hidden transition-all duration-200 flex border-width-[1px] z-[100]",
                        activePanel ? "w-[392px]" : "w-[201px]"
                    )}
                    align="start"
                >
                    {/* Left Panel: Primary Actions */}
                    <div className="w-[201px] p-[21px] flex flex-col items-center">
                        <div className="space-y-[8px]">
                            <button
                                onClick={() => setActivePanel(activePanel === "fields" ? null : "fields")}
                                style={{ width: '159px', height: '46px' }}
                                className={cn(
                                    "flex items-center justify-between px-[16px] rounded-[10px] border transition-all group shrink-0",
                                    activePanel === "fields"
                                        ? "border-gray-200 bg-white shadow-sm"
                                        : "border-gray-100 bg-white"
                                )}
                            >
                                <span className="text-[12px] font-medium text-[#5a6a85]">
                                    {currentOption?.label || "Select group"}
                                </span>
                                <ChevronRight className="w-[16px] h-[16px] text-gray-400" />
                            </button>

                            <button
                                onClick={() => setActivePanel(activePanel === "order" ? null : "order")}
                                style={{ width: '159px', height: '46px' }}
                                className={cn(
                                    "flex items-center justify-between px-[16px] rounded-[10px] border transition-all group shrink-0",
                                    activePanel === "order"
                                        ? "border-gray-200 bg-white shadow-sm"
                                        : "border-gray-100 bg-white"
                                )}
                            >
                                <span className="text-[12px] font-medium text-[#5a6a85]">
                                    {sortOrder === "asc" ? "Ascending" : "Descending"}
                                </span>
                                <ChevronRight className="w-[16px] h-[16px] text-gray-400" />
                            </button>
                        </div>

                        <div className="w-full flex justify-end pt-3 pr-1">
                            <button
                                onClick={() => {
                                    onGroupChange("")
                                    setIsOpen(false)
                                }}
                                className="text-[12px] font-semibold text-[#f55151] hover:text-red-600 transition-colors"
                            >
                                Clear filter
                            </button>
                        </div>
                    </div>

                    {/* Right Panel: Options (Matching image's premium style) */}
                    {activePanel && (
                        <div
                            style={{ width: '191px', height: '316px' }}
                            className="bg-white p-[12px] border-l border-gray-100 animate-in slide-in-from-left-1 duration-200 flex flex-col"
                        >
                            {activePanel === "fields" && (
                                <div className="space-y-[1px]">
                                    {GROUP_OPTIONS.map((option) => {
                                        const isSelected = selectedGroup === option.id
                                        return (
                                            <button
                                                key={option.id}
                                                onClick={() => onGroupChange(option.id)}
                                                className={cn(
                                                    "w-full flex items-center justify-between px-[12px] py-[10px] rounded-[10px] text-[15px] transition-colors group",
                                                    isSelected
                                                        ? "bg-[#f4f8ff] text-[#4477ff] font-semibold"
                                                        : "text-[#5a6a85] hover:bg-gray-50 font-medium"
                                                )}
                                            >
                                                <div className="flex items-center gap-[12px]">
                                                    <span className={cn(
                                                        "transition-colors",
                                                        isSelected ? "text-[#4477ff]" : "text-gray-400 group-hover:text-gray-500"
                                                    )}>
                                                        {option.icon}
                                                    </span>
                                                    <span>{option.label}</span>
                                                </div>
                                                {isSelected && (
                                                    <Check className="w-[18px] h-[18px] text-[#4477ff] stroke-[3px] shrink-0" />
                                                )}
                                            </button>
                                        )
                                    })}
                                </div>
                            )}

                            {activePanel === "order" && (
                                <div className="space-y-[1px]">
                                    {["asc", "desc"].map((order) => {
                                        const isSelected = sortOrder === order
                                        return (
                                            <button
                                                key={order}
                                                onClick={() => setSortOrder(order as "asc" | "desc")}
                                                className={cn(
                                                    "w-full flex items-center justify-between px-[12px] py-[10px] rounded-[10px] text-[15px] transition-colors group",
                                                    isSelected
                                                        ? "bg-[#f4f8ff] text-[#4477ff] font-semibold"
                                                        : "text-[#5a6a85] hover:bg-gray-50 font-medium"
                                                )}
                                            >
                                                <div className="flex items-center gap-[12px]">
                                                    <RefreshCcw className={cn(
                                                        "w-[18px] h-[18px] transition-colors",
                                                        isSelected ? "text-[#4477ff]" : "text-gray-400"
                                                    )} />
                                                    {order === "asc" ? "Ascending" : "Descending"}
                                                </div>
                                                {isSelected && (
                                                    <Check className="w-[18px] h-[18px] text-[#4477ff] stroke-[3px] shrink-0" />
                                                )}
                                            </button>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    )}
                </PopoverContent>
            </Popover>
        </div>
    )
}
