"use client"

import * as React from "react"
import { GripVertical, ChevronRight, ChevronDown, Circle, Plus, Tag, Edit2, Link2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"

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
    variant = "list"
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
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[12px] font-medium text-[#1a1c1e] leading-snug break-words">
                        {name}
                    </span>

                    {/* Tags */}
                    {tags && tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                            {tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="px-2 py-0.5 rounded-[4px] bg-[#8a7344] text-white text-[10px] font-bold uppercase tracking-wider"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {subtaskCount > 0 && (
                        <div className="flex items-center gap-1 text-gray-400">
                            <Link2 size={13} className="rotate-45" />
                            <span className="text-[11px] font-medium">{subtaskCount}</span>
                        </div>
                    )}

                    <div className="h-[2px] w-2 bg-gray-300 rounded-full opactiy-50 shrink-0" />
                </div>
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
