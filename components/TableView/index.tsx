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
import { ChevronDown, Check, Flag, MoreHorizontal, RefreshCcw, CheckCircle2, Circle, MoreVertical } from "lucide-react"
import { AddColums } from "../ListView/FieldColums"
import { BulkActionsToolbar } from "../ListView/BulkActionsToolbar"
import { Column } from "@tanstack/react-table"
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core"
import {
    SortableContext,
    horizontalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable"
import { DraggableHeader } from "@/components/ListView/DraggableHeader"

// Helper for sticky columns
const getCommonPinningStyles = (column: Column<any>): React.CSSProperties => {
    const isPinned = column.getIsPinned()

    return {
        left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
        right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
        opacity: 1,
        position: isPinned ? "sticky" : "relative",
        width: column.getSize(),
        zIndex: isPinned ? 30 : 0,
    }
}

import { GroupByPopover } from "./GroupByPopover"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { UserProfileCard } from "../ListView/UserProfileCard"
import { USERS } from "@/data/tableData"

export default function TaskTable() {
    const [data, setData] = React.useState<taskTable[]>(tableData)
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
    const [columnPinning, setColumnPinning] = React.useState<ColumnPinningState>({ left: ["index"] })
    const [addingSubtaskTo, setAddingSubtaskTo] = React.useState<string | null>(null)
    const [isAddColumnsOpen, setIsAddColumnsOpen] = React.useState(false)
    const [rowSizing, setRowSizing] = React.useState<Record<string, number>>({})
    const [selectedGroup, setSelectedGroup] = React.useState<string>("status")

    const [columnOrder, setColumnOrder] = React.useState<string[]>(() =>
        columns.map((c: any) => c.accessorKey || c.id || "")
    )

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor)
    )

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (!active || !over || active.id === over.id) return

        const isColumnDrag = columnOrder.includes(active.id as string)
        if (isColumnDrag) {
            // Prevent moving pinned columns
            const pinned = ["index", "name"]
            if (pinned.includes(active.id as string) || pinned.includes(over.id as string)) return

            setColumnOrder((order) => {
                const oldIndex = order.indexOf(active.id as string)
                const newIndex = order.indexOf(over.id as string)
                return arrayMove(order, oldIndex, newIndex)
            })
        }
    }

    // Grouping Logic
    const groupedData = React.useMemo(() => {
        if (!selectedGroup) return { "All Tasks": data }

        const groups: Record<string, taskTable[]> = {}
        data.forEach((item) => {
            const rawValue = item[selectedGroup as keyof taskTable]
            let groupValue = "Uncategorized"

            if (Array.isArray(rawValue)) {
                groupValue = rawValue.join(", ") || "Uncategorized"
            } else if (rawValue) {
                groupValue = String(rawValue)
            }

            if (!groups[groupValue]) {
                groups[groupValue] = []
            }
            groups[groupValue].push(item)
        })
        return groups
    }, [data, selectedGroup])

    const getStatusStyle = (status: string) => {
        const normalized = status.toUpperCase()
        if (normalized === "DONE" || normalized === "ACTIVE")
            return "bg-[#ecfdf5] text-[#059669] border-[#10b981]/20"
        if (normalized === "IN PROGRESS")
            return "bg-[#f5f3ff] text-[#7c3aed] border-[#8b5cf6]/20"
        if (normalized === "HALF PROCESS" || normalized === "IN REVIEW")
            return "bg-[#eff6ff] text-[#2563eb] border-[#3b82f6]/20"
        if (normalized === "TO DO" || normalized === "UNCATEGORIZED")
            return "bg-[#f8fafc] text-[#64748b] border-[#cbd5e1]/30"
        return "bg-gray-100 text-gray-700 border-gray-200"
    }

    const StatusIcon = ({ status }: { status: string }) => {
        const normalized = status.toUpperCase()
        if (normalized === "DONE" || normalized === "ACTIVE")
            return <CheckCircle2 size={12} className="text-[#059669]" />
        if (normalized === "IN PROGRESS")
            return <RefreshCcw size={12} className="text-[#7c3aed]" />
        if (normalized === "HALF PROCESS" || normalized === "IN REVIEW")
            return <Circle size={12} className="text-[#2563eb] fill-[#2563eb]/10" />
        return <Circle size={12} className="text-[#64748b]" />
    }

    const GroupAssigneeAvatar = ({ user, initials }: { user: any, initials: string }) => {
        const [isOpen, setIsOpen] = React.useState(false)
        return (
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <div
                        className="cursor-pointer transition-transform hover:scale-110 active:scale-95"
                        onMouseEnter={() => setIsOpen(true)}
                        onMouseLeave={() => setIsOpen(false)}
                    >
                        <Avatar className="h-6 w-6 border-2 border-white shadow-sm ring-1 ring-gray-100">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback className="bg-[#5c67ff] text-white text-[10px] font-black uppercase">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                </PopoverTrigger>
                <PopoverContent
                    className="p-0 w-auto border-none bg-transparent shadow-none pointer-events-none"
                    side="bottom"
                    align="start"
                >
                    <div className="pointer-events-auto">
                        <UserProfileCard user={user} />
                    </div>
                </PopoverContent>
            </Popover>
        )
    }

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
            columnOrder,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnPinningChange: setColumnPinning,
        onColumnOrderChange: setColumnOrder,
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
        <div className="w-full min-h-screen bg-[#fafafa] text-gray-900 overflow-auto p-10 font-sans">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <div className="max-w-[1400px] mx-auto flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <GroupByPopover
                            selectedGroup={selectedGroup}
                            onGroupChange={setSelectedGroup}
                        />
                    </div>

                    <div className="bg-white rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden flex flex-col">
                        {/* Unified Scroll Container */}
                        <div className="overflow-auto bg-white">
                            {/* 
                                This wrapper ensures that the header and all rows are part of the same scroll context.
                                We set a min-width matching the table size to enable horizontal scrolling if needed.
                            */}
                            <div style={{ width: Math.max(table.getTotalSize(), 1200) }} className="min-h-full">

                                {/* Sticky Header Box */}
                                <div className="sticky top-0 z-[10] bg-white border-b border-gray-100">
                                    <Table style={{ width: Math.max(table.getTotalSize(), 1200), tableLayout: 'fixed' }} className="border-collapse" overflow={false}>
                                        <TableHeader className="bg-white">
                                            {table.getHeaderGroups().map((headerGroup) => (
                                                <TableRow key={headerGroup.id} className="hover:bg-transparent border-none h-12">
                                                    <SortableContext
                                                        items={columnOrder}
                                                        strategy={horizontalListSortingStrategy}
                                                    >
                                                        {headerGroup.headers.map((header, index) => (
                                                            <DraggableHeader
                                                                key={header.id}
                                                                header={header}
                                                                index={index}
                                                            />
                                                        ))}
                                                    </SortableContext>
                                                </TableRow>
                                            ))}
                                        </TableHeader>
                                    </Table>
                                </div>

                                <div className="p-0 space-y-0">
                                    {Object.entries(groupedData).map(([groupName, groupRows]) => (
                                        <div key={groupName} className="border-b border-gray-100 last:border-b-0">
                                            {/* Group Header Bar */}
                                            <div className="flex items-center justify-between px-4 py-3 bg-[#f8fafc]/50 border-b border-gray-50">
                                                <div className="flex items-center gap-3">
                                                    <ChevronDown size={14} className="text-gray-400 cursor-pointer" />
                                                    {selectedGroup === 'assignees' ? (
                                                        <div className="flex items-center gap-2">
                                                            <div className="flex items-center -space-x-1.5 px-0.5">
                                                                {groupName.split(', ').map((email, idx) => {
                                                                    const user = USERS.find(u => u.email === email)
                                                                    if (!user && email === "Uncategorized") return null

                                                                    const displayUser = user || { name: email, email: email, avatar: "" }
                                                                    const initials = displayUser.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

                                                                    return <GroupAssigneeAvatar key={email + idx} user={displayUser} initials={initials} />
                                                                })}
                                                            </div>
                                                        </div>
                                                    ) : selectedGroup === 'priority' ? (
                                                        <div className="flex items-center gap-2">
                                                            {(() => {
                                                                const normalized = groupName.toLowerCase()
                                                                let colorClass = "text-gray-400"
                                                                if (normalized === "urgent") colorClass = "text-[#ff4d4d]"
                                                                if (normalized === "high") colorClass = "text-[#ffd600]"
                                                                if (normalized === "normal") colorClass = "text-[#4b89ff]"
                                                                if (normalized === "low") colorClass = "text-[#8e8e8e]"

                                                                return (
                                                                    <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-white border border-gray-100 shadow-sm">
                                                                        <Flag size={14} className={cn(colorClass, "fill-current")} />
                                                                        <span className="text-[11px] font-bold uppercase tracking-tight text-gray-900">{groupName}</span>
                                                                    </div>
                                                                )
                                                            })()}
                                                        </div>
                                                    ) : (
                                                        <div className={cn(
                                                            "flex items-center gap-1.5 px-2 py-1 rounded-md border",
                                                            getStatusStyle(groupName)
                                                        )}>
                                                            <StatusIcon status={groupName} />
                                                            <span className="text-[11px] font-bold uppercase tracking-tight">{groupName}</span>
                                                        </div>
                                                    )}
                                                    <div className="flex items-center justify-center min-w-[20px] h-[20px] px-1 rounded-full bg-gray-50 text-[11px] font-bold text-gray-400 border border-gray-200">
                                                        {groupRows.length}
                                                    </div>
                                                    <MoreHorizontal size={14} className="text-gray-300 ml-1 cursor-pointer hover:text-gray-500 transition-colors" />
                                                    <Plus size={14} className="text-gray-300 cursor-pointer hover:text-gray-500 transition-colors" />
                                                </div>
                                            </div>

                                            <Table style={{ width: Math.max(table.getTotalSize(), 1200), tableLayout: 'fixed' }} className="border-collapse" overflow={false}>
                                                <TableBody>
                                                    {groupRows.map((rowData) => {
                                                        const row = table.getRowModel().rows.find(r => r.original.id === rowData.id)
                                                        if (!row) return null

                                                        return (
                                                            <TableRow
                                                                key={row.id}
                                                                data-state={row.getIsSelected() && "selected"}
                                                                className="group hover:bg-gray-50/50 border-b border-gray-50 last:border-b-0 relative"
                                                                style={{
                                                                    height: rowSizing[row.id] ? `${rowSizing[row.id]}px` : undefined,
                                                                }}
                                                            >
                                                                {row.getVisibleCells().map((cell) => {
                                                                    const pinningStyles = getCommonPinningStyles(cell.column)
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
                                                        )
                                                    })}

                                                    {/* Group Footer */}
                                                    <TableRow className="h-12 hover:bg-transparent border-t border-gray-50">
                                                        <TableCell className="p-0 border-r border-gray-50 bg-white sticky left-0 z-30" style={{ width: table.getColumn('index')?.getSize() }} />
                                                        <TableCell className="p-0 border-r border-gray-50 bg-white">
                                                            <div className="flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-gray-400 hover:text-gray-600 transition-colors cursor-pointer group/calc">
                                                                <Plus className="w-3.5 h-3.5" />
                                                                <span>Create Task</span>
                                                            </div>
                                                        </TableCell>
                                                        {table.getVisibleFlatColumns().slice(2).map((column) => (
                                                            <TableCell key={column.id} className="p-0 border-r border-gray-50 bg-white">
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
                                    ))}
                                </div>
                            </div>
                        </div>

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
                </div>
            </DndContext>

            <AddColums
                table={table}
                isOpen={isAddColumnsOpen}
                onClose={() => setIsAddColumnsOpen(false)}
            />
        </div>
    )
}