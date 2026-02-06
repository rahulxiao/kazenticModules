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
    const isPinned = header.column.id === "name" || header.column.id === "addNewColumn"

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

    const style: React.CSSProperties = {
        transform: CSS.Translate.toString(transform),
        transition: isDragging ? transition : undefined, // Disable transition when not dragging (prevents laggy resizing)
        width: header.getSize(),
        zIndex: isDragging ? 100 : undefined,
        opacity: isDragging ? 0.8 : 1,
        cursor: isPinned ? "default" : undefined
    }

    return (
        <TableHead
            ref={setNodeRef}
            style={style}
            className={cn(
                "relative py-4 px-4 text-left text-[13px] font-semibold text-gray-500 bg-white border-r border-gray-100 last:border-r-0 select-none transition-all",
                index === 0 && "sticky left-0 z-50 bg-white border-r border-gray-200 shadow-[2px_0_5px_rgba(0,0,0,0.02)]",
                isDragging && "bg-gray-50/80 cursor-grabbing shadow-lg",
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
