"use client"

import * as React from "react"
import { GripVertical, ChevronRight, ChevronDown, Circle, Plus, Tag, Edit2, Link2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger, PopoverAnchor } from "../ui/popover"

export interface NameModuleProps {
    name: string
    avatar?: string
    onNameChange?: (newName: string) => void
    onAddSubtask?: () => void
    isAddingSubtask?: boolean
    isExpanded?: boolean
    onToggleExpand?: () => void
    canExpand?: boolean
    depth?: number
    isSubtask?: boolean
    subtaskCount?: number
    tags?: string[]
    dragHandleProps?: any
    isSelected?: boolean
    onToggleSelect?: (value: boolean) => void
    variant?: "list" | "table"
    taskID?: string
}

export function NameModule({
    name,
    avatar,
    onNameChange,
    onAddSubtask,
    isAddingSubtask,
    isExpanded,
    onToggleExpand,
    canExpand,
    depth = 0,
    isSubtask = false,
    subtaskCount = 0,
    tags = [],
    dragHandleProps,
    isSelected,
    onToggleSelect,
    variant = "list",
    taskID
}: NameModuleProps) {
    const [isHovered, setIsHovered] = React.useState(false)

    return (
        <div
            className="flex items-start gap-2 group/name w-full py-2.5 relative"
            style={{ paddingLeft: depth * 24 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Drag Handle & Checkbox - Only show in List variant */}
            {variant === "list" && (
                <div className={cn(
                    "flex items-center gap-1 transition-opacity duration-200 w-[40px] shrink-0 pt-0.5",
                    (isHovered || isSelected) ? "opacity-100" : "opacity-0"
                )}>
                    <GripVertical
                        size={14}
                        className="text-gray-400 cursor-grab active:cursor-grabbing"
                        {...dragHandleProps}
                    />
                    <Checkbox
                        checked={isSelected}
                        onCheckedChange={(checked) => onToggleSelect?.(checked as boolean)}
                        className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 w-4 h-4 rounded border-gray-300 transition-all"
                    />
                </div>
            )}

            {/* Expand/Collapse Arrow */}
            <div
                className="flex items-center justify-center w-4 h-4 cursor-pointer mt-1"
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleExpand?.();
                }}
            >
                {!isSubtask && (
                    isExpanded ? (
                        <ChevronDown size={14} className="text-gray-600" />
                    ) : (
                        <ChevronRight
                            size={14}
                            className={cn(
                                "text-gray-400 transition-transform hover:text-gray-600",
                                isHovered ? "opacity-100" : (canExpand ? "opacity-100" : "opacity-0")
                            )}
                        />
                    )
                )}
            </div>

            {/* Status Indicator or Avatar */}
            <div className="mt-0.5">
                {avatar ? (
                    <Avatar className="w-5 h-5">
                        <AvatarImage src={avatar} />
                        <AvatarFallback className="text-[10px] bg-gray-100 text-gray-500 font-bold">
                            {name[0].toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                ) : (
                    <Circle
                        size={18}
                        className="text-gray-400 stroke-[1.5] border-dashed"
                        style={{ strokeDasharray: "3 2" }}
                    />
                )}
            </div>

            {/* Task Name, Tags & Count */}
            <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                <div className="flex items-start gap-1.5 shrink-0 min-w-0">
                    {taskID && (
                        <span className="text-[12px] text-gray-400 font-medium shrink-0 mt-[2px]">
                            [{taskID}]
                        </span>
                    )}
                    <Popover open={isHovered}>
                        <PopoverAnchor asChild>
                            <span className="text-[12px] font-medium text-[#1a1c1e] leading-snug truncate whitespace-nowrap cursor-default">
                                {name}
                            </span>
                        </PopoverAnchor>
                        <PopoverContent
                            side="top"
                            align="center"
                            sideOffset={8}
                            className="z-[110] p-0 w-auto border-none bg-transparent shadow-none pointer-events-none"
                        >
                            <div className="bg-white border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.15)] rounded-lg p-3 min-w-[200px] max-w-[350px] relative animate-in fade-in zoom-in duration-200">
                                <p className="text-[13px] font-medium text-gray-900 leading-relaxed text-center">
                                    {name}
                                </p>
                                {/* Arrow */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-[1px] border-[6px] border-transparent border-t-white drop-shadow-sm" />
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Subtask Stats Badge */}
                {subtaskCount > 0 && (
                    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-gray-50 border border-gray-100 text-gray-400 shrink-0 self-start">
                        <span className="text-[10px] font-medium">1</span>
                        <div className="w-3 h-3 flex items-center justify-center">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="8" y1="6" x2="21" y2="6" />
                                <line x1="8" y1="12" x2="21" y2="12" />
                                <line x1="8" y1="18" x2="21" y2="18" />
                                <line x1="3" y1="6" x2="3.01" y2="6" />
                                <line x1="3" y1="12" x2="3.01" y2="12" />
                                <line x1="3" y1="18" x2="3.01" y2="18" />
                            </svg>
                        </div>
                    </div>
                )}
            </div>

            {/* Right Action Icons (Only on hover) */}
            <div className={cn(
                "flex items-center gap-1 transition-opacity duration-200 absolute right-2 top-2.5 bg-white/80 backdrop-blur-[2px] rounded-md pl-2 py-0.5",
                isHovered ? "opacity-100" : "opacity-0"
            )}>
                <div
                    className="p-1 rounded border border-gray-200 hover:bg-gray-50 cursor-pointer shadow-sm"
                >
                    <Plus size={14} className="text-gray-500" />
                </div>
                <div className="p-1 rounded border border-gray-200 hover:bg-gray-50 cursor-pointer shadow-sm">
                    <Tag size={14} className="text-gray-500" />
                </div>
                <div className="p-1 rounded border border-gray-200 hover:bg-gray-50 cursor-pointer shadow-sm">
                    <Edit2 size={14} className="text-gray-500" />
                </div>
            </div>
        </div>
    )
}
