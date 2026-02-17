"use client"

import * as React from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { TableHead } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { flexRender, Header } from "@tanstack/react-table"
import { taskTable } from "@/data/tableData"

interface DraggableHeaderProps {
    header: Header<taskTable, unknown>
    index: number
}

export function DraggableHeader({ header, index }: DraggableHeaderProps) {
    const viewType = (header.getContext().table.options.meta as any)?.viewType
    const isPinned = ["index", "addNewColumn", "select"].includes(header.column.id)
    const isSticky = header.column.getIsPinned() === "left" || ["select", "index"].includes(header.column.id) ||
        (viewType === 'list' && header.column.id === 'name')

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: header.column.id,
        disabled: isPinned
    })

    // Calculate left offset for sticky columns
    const getLeft = () => {
        if (header.column.id === "index") return 0
        if (header.column.getIsPinned() === "left") {
            return header.column.getStart("left")
        }
        if (viewType === 'list' && header.column.id === 'name') return 0
        return undefined
    }

    const style: React.CSSProperties = {
        transform: CSS.Translate.toString(transform),
        transition,
        width: header.getSize(),
        zIndex: isDragging ? 100 : (isSticky ? 30 : undefined),
        opacity: isDragging ? 0.3 : 1,
        cursor: isPinned ? "default" : undefined,
        left: getLeft(),
        position: isSticky ? "sticky" : "relative"
    }

    return (
        <TableHead
            ref={setNodeRef}
            style={style}
            className={cn(
                "relative py-3 px-4 text-left text-[12px] font-medium text-gray-600 bg-white border-r border-gray-100 last:border-r-0 select-none",
                isSticky && "z-30 bg-white border-r border-gray-200",
                !isPinned && "hover:bg-gray-50/80 transition-colors duration-200",
                isDragging && "z-50 ring-2 ring-blue-400 ring-inset bg-blue-50/50",
                header.column.getIsResizing() && "bg-gray-50/50 z-20"
            )}
        >
            <div
                {...attributes}
                {...listeners}
                className={cn(
                    "flex items-center h-full w-full",
                    !isPinned && "cursor-grab active:cursor-grabbing"
                )}
            >
                {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                )}
            </div>

            {/* Modern Resize Handle */}
            {header.column.getCanResize() && (
                <div
                    onMouseDown={(e) => {
                        e.stopPropagation()
                        header.getResizeHandler()(e)
                    }}
                    onTouchStart={(e) => {
                        e.stopPropagation()
                        header.getResizeHandler()(e)
                    }}
                    className={cn(
                        "absolute right-[-1px] top-0 h-full w-[3px] cursor-col-resize select-none z-30 group/resizer",
                        header.column.getIsResizing() ? "opacity-100" : "opacity-0 hover:opacity-100 transition-opacity"
                    )}
                >
                    {/* The Resize Pill */}
                    <div className={cn(
                        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[4px] h-[20px] rounded-full bg-[#7c3aed] transition-all shadow-sm",
                        header.column.getIsResizing() && "h-[24px] w-[5px] shadow-[0_0_8px_rgba(124,58,237,0.4)]"
                    )} />
                </div>
            )}
        </TableHead>
    )
}