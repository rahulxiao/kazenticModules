"use client"

import * as React from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { TableHead } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { flexRender, Header } from "@tanstack/react-table"
import { User } from "@/data/tableData"

interface DraggableHeaderProps {
    header: Header<User, unknown>
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
        transition,
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
                "relative py-4 px-4 text-left text-[13px] font-semibold text-gray-500 bg-[#F2F9FE] border-r border-gray-50 last:border-r-0 select-none",
                index === 0 && "sticky left-0 z-50 bg-[#F2F9FE] border-r border-gray-100 shadow-[6px_0_15px_rgba(0,0,0,0.1)]",
                isDragging && "bg-blue-50/80 cursor-grabbing shadow-lg"
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

            {/* Resize Handle - Still functional if needed */}
            {header.column.getCanResize() && (
                <div
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    className="absolute right-0 top-0 h-full w-1 cursor-col-resize select-none bg-transparent hover:bg-blue-500 z-30"
                />
            )}
        </TableHead>
    )
}
