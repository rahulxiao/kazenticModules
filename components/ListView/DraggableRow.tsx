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
            {row.getVisibleCells().map((cell, idx) => {
                const isSticky = ["index", "name"].includes(cell.column.id)
                // If we are in TableView (index exists), drag handle is on index.
                // If ListView (index doesn't exist, name is first), drag handle on name.
                const isIndexColumn = cell.column.id === "index"
                const isNameColumnFirst = cell.column.id === "name" && idx === 0
                const isDragColumn = isIndexColumn || isNameColumnFirst

                const getLeft = () => {
                    if (cell.column.id === "index") return 0
                    if (cell.column.id === "name") {
                        if (idx === 0) return 0 // ListView
                        return 50 // TableView (50px index)
                    }
                    return undefined
                }

                return (
                    <TableCell
                        key={cell.id}
                        style={{
                            width: cell.column.getSize(),
                            minWidth: cell.column.columnDef.minSize,
                            left: getLeft(),
                            position: isSticky ? "sticky" : undefined,
                            zIndex: isSticky ? (isDragging ? 100 : 20) : undefined,
                            backgroundColor: isSticky ? "white" : undefined
                        }}
                        className={cn(
                            "py-1 px-3 border-r border-gray-50 last:border-r-0 relative group/cell transition-colors",
                            isSticky && "group-hover:bg-[#F9FAFB] border-r border-gray-100 shadow-[2px_0_5px_rgba(0,0,0,0.02)] whitespace-normal align-top",
                            isDragging && isSticky && "bg-blue-50"
                        )}
                    >
                        {/* Cell Highlight Effect */}
                        <div className="absolute inset-[2px] border border-transparent group-hover/cell:border-gray-300 group-hover/cell:bg-gray-400/5 rounded-md pointer-events-none transition-all duration-200 z-0" />

                        <div className={cn("relative", isSticky ? "z-10" : "z-0")}>
                            {flexRender(
                                cell.column.columnDef.cell,
                                {
                                    ...cell.getContext(),
                                    dragHandleProps: isDragColumn ? { ...attributes, ...listeners } : undefined
                                }
                            )}
                        </div>
                    </TableCell>
                )
            })}
        </TableRow>
    )
}
