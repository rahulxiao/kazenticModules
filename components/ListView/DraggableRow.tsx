"use client"

import * as React from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { TableRow, TableCell } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { flexRender, Row } from "@tanstack/react-table"
import { taskTable } from "@/data/tableData"

interface DraggableRowProps {
    row: Row<taskTable>
}

export function DraggableRow({ row }: DraggableRowProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: row.id,
    })

    const style: React.CSSProperties = {
        transform: CSS.Translate.toString(transform),
        transition,
        zIndex: isDragging ? 100 : undefined,
        opacity: isDragging ? 0.8 : 1,
        position: "relative",
    }

    return (
        <TableRow
            ref={setNodeRef}
            style={style}
            className={cn(
                "group hover:bg-[#F9FAFB] border-b border-gray-50 transition-colors",
                isDragging && "bg-blue-50/50 shadow-md z-50 border-blue-200"
            )}
        >
            {row.getVisibleCells().map((cell, idx) => (
                <TableCell
                    key={cell.id}
                    style={{ width: cell.column.getSize() }}
                    className={cn(
                        "py-1 px-3 border-r border-gray-50 last:border-r-0 relative group/cell transition-colors",
                        idx === 0 && cell.column.id === "name" && "sticky left-0 z-40 bg-white group-hover:bg-[#F9FAFB] border-r border-gray-100 shadow-[6px_0_15px_rgba(0,0,0,0.1)] whitespace-normal align-top",
                        isDragging && idx === 0 && "bg-blue-50"
                    )}
                >
                    {/* Cell Highlight Effect */}
                    <div className="absolute inset-[2px] border border-transparent group-hover/cell:border-gray-300 group-hover/cell:bg-gray-400/5 rounded-md pointer-events-none transition-all duration-200 z-0" />

                    <div className={cn("relative", idx === 0 && cell.column.id === "name" ? "z-10" : "z-0")}>
                        {flexRender(
                            cell.column.columnDef.cell,
                            {
                                ...cell.getContext(),
                                dragHandleProps: idx === 0 ? { ...attributes, ...listeners } : undefined
                            }
                        )}
                    </div>
                </TableCell>
            ))}
        </TableRow>
    )
}
