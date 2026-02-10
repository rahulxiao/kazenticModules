"use client"

import * as React from "react"
import {
    flexRender,
    getCoreRowModel,
    getExpandedRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    RowSelectionState,
    ColumnPinningState,
} from "@tanstack/react-table"
import { columns } from "./columns"
import { taskTable, tableData } from "@/data/tableData"
import { Plus } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ChevronDown, Check } from "lucide-react"
import { AddColums } from "../ListView/FieldColums"
import { BulkActionsToolbar } from "../ListView/BulkActionsToolbar"
import { Column } from "@tanstack/react-table"

// Helper for sticky columns
const getCommonPinningStyles = (column: Column<any>): React.CSSProperties => {
    const isPinned = column.getIsPinned()

    return {
        left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
        right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
        opacity: 1,
        position: isPinned ? "sticky" : "relative",
        width: column.getSize(),
        zIndex: isPinned ? 1 : 0,
    }
}

export default function TaskTable() {
    const [data, setData] = React.useState<taskTable[]>(tableData)
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
    const [columnPinning, setColumnPinning] = React.useState<ColumnPinningState>({ left: ["index"] })
    const [addingSubtaskTo, setAddingSubtaskTo] = React.useState<string | null>(null)
    const [isAddColumnsOpen, setIsAddColumnsOpen] = React.useState(false)
    const [rowSizing, setRowSizing] = React.useState<Record<string, number>>({})

    // Row Resizing Logic
    const handleRowResizeStart = React.useCallback(
        (e: React.MouseEvent | React.TouchEvent, rowId: string) => {
            e.preventDefault()
            const startY = 'touches' in e ? e.touches[0].clientY : e.clientY

            // Find the closest TR to get its current visual height
            const rowElement = (e.target as HTMLElement).closest('tr')
            const currentRect = rowElement?.getBoundingClientRect()
            const startHeight = currentRect?.height || rowSizing[rowId] || 50

            const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
                const currentY = 'touches' in moveEvent ? moveEvent.touches[0].clientY : moveEvent.clientY
                const delta = currentY - startY
                const newHeight = Math.max(50, startHeight + delta) // Minimum height 50px

                setRowSizing((prev) => ({
                    ...prev,
                    [rowId]: newHeight,
                }))
            }

            const handleUp = () => {
                document.removeEventListener('mousemove', handleMove)
                document.removeEventListener('mouseup', handleUp)
                document.removeEventListener('touchmove', handleMove)
                document.removeEventListener('touchend', handleUp)
            }

            document.addEventListener('mousemove', handleMove)
            document.addEventListener('mouseup', handleUp)
            document.addEventListener('touchmove', handleMove)
            document.addEventListener('touchend', handleUp)
        },
        [rowSizing]
    )

    // Bulk Handlers
    const handleClearSelection = React.useCallback(() => setRowSelection({}), [])

    const handleDelete = React.useCallback(() => {
        const selectedIds = Object.keys(rowSelection).filter((id) => rowSelection[id])
        if (selectedIds.length === 0) return

        setData((prev) => prev.filter((row) => !rowSelection[row.id || row.taskID || ""]))
        setRowSelection({})
    }, [rowSelection])

    const handleBulkUpdate = React.useCallback(
        (field: keyof taskTable, value: any) => {
            const selectedIds = Object.keys(rowSelection).filter((id) => rowSelection[id])
            if (selectedIds.length === 0) return

            setData((prev) =>
                prev.map((row) =>
                    rowSelection[row.id || row.taskID || ""] ? { ...row, [field]: value } : row
                )
            )
        },
        [rowSelection]
    )

    // Update data function for cell edits
    const updateData = React.useCallback(
        (rowId: string, columnId: string, value: any) => {
            setData(old =>
                old.map(row => {
                    // Compare with row.id which we added to tableData
                    if (row.id === rowId) {
                        return {
                            ...row,
                            [columnId]: value,
                        }
                    }
                    return row
                })
            )
        },
        []
    )

    // Handle adding subtasks
    const handleAddSubtask = React.useCallback((parentId: string) => {
        setAddingSubtaskTo(prev => prev === parentId ? null : parentId)
    }, [])

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            rowSelection,
            columnPinning,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnPinningChange: setColumnPinning,
        getRowId: (row) => row.id || row.taskID || "",
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        enableColumnResizing: true,
        enablePinning: true,
        columnResizeMode: "onChange",
        meta: {
            updateData,
            addingSubtaskTo,
            onAddSubtask: handleAddSubtask,
            onOpenAddColumns: () => setIsAddColumnsOpen(true),
            viewType: 'table',
            rowSizing,
            onRowResizeStart: handleRowResizeStart,
        },
    })

    return (
        <div className="w-full h-full bg-white text-gray-900 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-auto">
                <Table style={{ width: table.getTotalSize() }}>
                    <TableHeader className="sticky top-0 z-10 bg-[#f3f8ff] shadow-sm">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="hover:bg-transparent border-gray-200">
                                {headerGroup.headers.map((header) => {
                                    const { position, ...pinningStyles } = getCommonPinningStyles(header.column)
                                    return (
                                        <TableHead
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            className="h-12 px-0 text-xs font-medium text-gray-500 relative group border-r border-gray-100 last:border-r-0 bg-[#f3f8ff]"
                                            style={{
                                                width: header.getSize(),
                                                minWidth: header.getSize(),
                                                ...pinningStyles,
                                                position: position === "sticky" ? "sticky" : "relative",
                                                zIndex: header.column.getIsPinned() ? 30 : undefined,
                                            }}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                            {/* Resize Handle */}
                                            {header.column.getCanResize() && (
                                                <div
                                                    onMouseDown={header.getResizeHandler()}
                                                    onTouchStart={header.getResizeHandler()}
                                                    className={`absolute right-0 top-0 h-full w-[1px] cursor-col-resize touch-none hover:bg-gray-400 ${header.column.getIsResizing() ? "bg-blue-500 w-[2px]" : "bg-transparent"
                                                        }`}
                                                />
                                            )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {/* Mock Grouping Row: ACTIVE */}
                        <TableRow className="bg-[#fcfdfd] hover:bg-[#fcfdfd] border-gray-100">
                            <TableCell className="p-0 border-r border-gray-100 sticky left-0 z-10 bg-[#fcfdfd]">
                                <div className="flex items-center justify-center h-full">
                                    <ChevronDown size={14} className="text-gray-400" />
                                </div>
                            </TableCell>
                            <TableCell colSpan={columns.length - 1} className="p-0">
                                <div className="flex items-center gap-2 px-3 py-2">
                                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#e6f4ea] text-[#1e8e3e] border border-[#ceead6]">
                                        <Check size={12} strokeWidth={3} />
                                        <span className="text-[11px] font-bold uppercase tracking-wider">Active</span>
                                    </div>
                                    <span className="text-[11px] font-bold text-gray-400 bg-gray-50 border border-gray-100 px-1.5 py-0.5 rounded-md">
                                        4
                                    </span>
                                </div>
                            </TableCell>
                        </TableRow>

                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="group hover:bg-gray-50/50 border-gray-100 relative"
                                    style={{
                                        height: rowSizing[row.id] ? `${rowSizing[row.id]}px` : undefined,
                                    }}
                                >
                                    {row.getVisibleCells().map((cell) => {
                                        const { position, ...pinningStyles } = getCommonPinningStyles(cell.column)
                                        const isPinned = cell.column.getIsPinned()
                                        return (
                                            <TableCell
                                                key={cell.id}
                                                className={`p-0 border-r border-gray-100 last:border-r-0 overflow-visible relative transition-colors whitespace-normal break-words ${cell.column.id === 'index' ? 'align-middle' : 'align-top'
                                                    } ${isPinned
                                                        ? "bg-white group-hover:bg-gray-50"
                                                        : "bg-white group-hover:bg-gray-50/50"
                                                    }`}
                                                style={{
                                                    width: cell.column.getSize(),
                                                    minWidth: cell.column.getSize(),
                                                    maxWidth: cell.column.getSize(),
                                                    ...pinningStyles,
                                                    position: position === "sticky" ? "sticky" : "relative",
                                                    zIndex: cell.column.getIsPinned() ? 10 : undefined,
                                                }}
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                                {cell.column.id === 'index' && (
                                                    <div
                                                        className="absolute bottom-0 left-0 w-full h-1.5 cursor-row-resize hover:bg-blue-400/50 transition-colors z-[100]"
                                                        onMouseDown={(e) => handleRowResizeStart(e, row.id)}
                                                        onTouchStart={(e) => handleRowResizeStart(e, row.id)}
                                                    />
                                                )}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                        {/* Calculate Row */}
                        <TableRow className="hover:bg-transparent border-gray-100 h-10">
                            <TableCell className="p-0 border-r border-gray-100 sticky left-0 z-10 bg-white" />
                            <TableCell className="p-0 border-r border-gray-100 bg-white">
                                <div className="flex items-center gap-2 px-4 py-2 text-[12px] font-medium text-gray-400 hover:text-gray-600 transition-colors cursor-pointer group/calc">
                                    <Plus className="w-3.5 h-3.5" />
                                    <span>Create Task</span>
                                </div>
                            </TableCell>
                            {table.getVisibleFlatColumns().slice(2).map((column) => (
                                <TableCell key={column.id} className="p-0 border-r border-gray-100">
                                    <div className="flex items-center justify-center gap-1.5 px-3 py-2 text-[11px] font-medium text-gray-400 hover:text-gray-600 transition-colors cursor-pointer whitespace-nowrap group/calc">
                                        <span>Calculate</span>
                                        <ChevronDown size={12} className="opacity-0 group-hover/calc:opacity-100 transition-opacity" />
                                    </div>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableBody>
                </Table>
            </div>

            <AddColums
                table={table}
                isOpen={isAddColumnsOpen}
                onClose={() => setIsAddColumnsOpen(false)}
            />

            <BulkActionsToolbar
                selectedCount={Object.keys(rowSelection).filter(id => rowSelection[id]).length}
                onClearSelection={handleClearSelection}
                onDelete={handleDelete}
                onUpdateStatus={(status) => handleBulkUpdate("status", status)}
                onUpdateAssignees={(assignees) => handleBulkUpdate("assignees", assignees)}
                onUpdateStartDate={(date) => handleBulkUpdate("startDate", date)}
                onUpdateDueDate={(date) => handleBulkUpdate("dueDate", date)}
                onUpdatePriority={(priority) => handleBulkUpdate("priority", priority)}
            />
        </div>
    )
}