"use client"

import * as React from "react"
import { GripVertical, ChevronRight, ChevronDown, Circle, Plus, Tag, Edit2, Link2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface NameModuleProps {
    name: string
    onNameChange?: (newName: string) => void
    onAddSubtask?: () => void
    isAddingSubtask?: boolean
    isExpanded?: boolean
    onToggleExpand?: () => void
    canExpand?: boolean
    depth?: number
    isSubtask?: boolean
    subtaskCount?: number
}

export function NameModule({
    name,
    onNameChange,
    onAddSubtask,
    isAddingSubtask,
    isExpanded,
    onToggleExpand,
    canExpand,
    depth = 0,
    isSubtask = false,
    subtaskCount = 0
}: NameModuleProps) {
    const [isHovered, setIsHovered] = React.useState(false)

    return (
        <div
            className="flex items-center gap-2 group/name h-full w-full py-1 relative"
            style={{ paddingLeft: depth * 24 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Drag Handle & Checkbox */}
            <div className={cn(
                "flex items-center gap-1 transition-opacity duration-200 w-[40px] shrink-0",
                isHovered ? "opacity-100" : "opacity-0"
            )}>
                <GripVertical size={14} className="text-gray-400 cursor-grab active:cursor-grabbing" />
                <div className="w-4 h-4 rounded border border-gray-300 bg-white" />
            </div>

            {/* Expand/Collapse Arrow */}
            <div
                className="flex items-center justify-center w-4 h-4 cursor-pointer"
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

            {/* Status Indicator (Circle with dashed border in image) */}
            <Circle
                size={18}
                className="text-gray-400 stroke-[1.5] border-dashed"
                style={{ strokeDasharray: "3 2" }}
            />

            {/* Task Name & Count */}
            <div className="flex items-center gap-1.5 flex-1 truncate">
                <span className="text-[14px] font-semibold text-gray-800">
                    {name}
                </span>
                {subtaskCount > 0 && (
                    <div className="flex items-center gap-1 text-gray-400">
                        <Link2 size={13} className="rotate-45" />
                        <span className="text-[11px] font-medium">{subtaskCount}</span>
                    </div>
                )}
                <div className="h-0.5 w-1.5 bg-gray-300 rounded-full ml-1 opactiy-50" />
            </div>

            {/* Right Action Icons (Only on hover) */}
            <div className={cn(
                "flex items-center gap-1 transition-opacity duration-200",
                isHovered ? "opacity-100" : "opacity-0"
            )}>
                <div
                    className="p-1 rounded border border-gray-200 hover:bg-gray-50 cursor-pointer"
                >
                    <Plus size={14} className="text-gray-500" />
                </div>
                <div className="p-1 rounded border border-gray-200 hover:bg-gray-50 cursor-pointer">
                    <Tag size={14} className="text-gray-500" />
                </div>
                <div className="p-1 rounded border border-gray-200 hover:bg-gray-50 cursor-pointer">
                    <Edit2 size={14} className="text-gray-500" />
                </div>
            </div>
        </div>
    )
}
