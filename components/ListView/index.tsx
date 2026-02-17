"use client"

import * as React from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { AddSubtaskModule } from "@/components/ListView/AddSubtaskModule"
import { CreateTaskModule } from "@/components/ListView/CreateTaskModule"
import { AddColums } from "@/components/ListView/FieldColums"
import { CalculateModule } from "@/components/ListView/CalculateModule"
import { cn } from "@/lib/utils"
import { BulkActionsToolbar } from "@/components/ListView/BulkActionsToolbar"
import {
    DndContext,
    closestCenter,
    DragOverlay,
} from "@dnd-kit/core"
import {
    SortableContext,
    horizontalListSortingStrategy,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { DraggableHeader } from "@/components/ListView/DraggableHeader"
import { DraggableRow } from "@/components/ListView/DraggableRow"
import { useListView } from "./useListView"

export default function ListView() {
    const {
        table,
        sensors,
        handleDragStart,
        handleDragEnd,
        activeId,
        columnOrder,
        addingSubtaskTo,
        setAddingSubtaskTo,
        isAddColumnsOpen,
        setIsAddColumnsOpen,
        rowSelection,
        setRowSelection,
        addTask,
        addSubtask,
        handleDeleteSelected,
        handleUpdateSelectedStatus,
        handleUpdateSelectedAssignees,
        handleUpdateSelectedStartDate,
        handleUpdateSelectedDueDate,
        handleUpdateSelectedPriority,
        flatData,
        columnCalculationMethods,
        handleCalculate,
        handleClearCalculation,
        calculateOpenColId,
        setCalculateOpenColId,
        isCreatingTask,
        setIsCreatingTask
    } = useListView()

    const [mounted, setMounted] = React.useState(false)
    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <div className="p-10 font-sans bg-[#fafafa] min-h-screen" />
    }

    return (
        <div className="w-full min-h-screen bg-[#fafafa] p-0 md:p-6 lg:p-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 text-[#222] overflow-hidden flex flex-col">
                <div className="overflow-x-auto w-full">
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                    >
                        <Table style={{ minWidth: "1200px", tableLayout: "fixed" }} className="border-collapse">
                            <TableHeader>
                                {table.getHeaderGroups().map(headerGroup => (
                                    <TableRow key={headerGroup.id} className="hover:bg-transparent border-b border-gray-100">
                                        <SortableContext
                                            items={columnOrder}
                                            strategy={horizontalListSortingStrategy}
                                        >
                                            {headerGroup.headers.map((header, index) => (
                                                <DraggableHeader key={header.id} header={header} index={index} />
                                            ))}
                                        </SortableContext>
                                    </TableRow>
                                ))}
                            </TableHeader>

                            <TableBody>
                                <SortableContext
                                    items={table.getRowModel().rows.map(row => row.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    {(() => {
                                        const rows = table.getRowModel().rows
                                        const renderedRows: React.ReactNode[] = []

                                        rows.forEach((row, index) => {
                                            renderedRows.push(
                                                <DraggableRow key={row.id} row={row} />
                                            )

                                            if (addingSubtaskTo) {
                                                const isParent = row.id === addingSubtaskTo
                                                const nextRow = rows[index + 1]
                                                const isLastDescendant = isParent && (!nextRow || !nextRow.id.startsWith(addingSubtaskTo + "."))
                                                const isLastChildOfParent = row.id.startsWith(addingSubtaskTo + ".") && (!nextRow || !nextRow.id.startsWith(addingSubtaskTo + "."))

                                                if (isLastDescendant || isLastChildOfParent) {
                                                    renderedRows.push(
                                                        <TableRow key={`${row.id}-add`} className="group/add bg-[#FDFDFD] border-b border-gray-100">
                                                            {table.getVisibleFlatColumns().map((column) => {
                                                                const isNameColumn = column.id === "name"
                                                                return (
                                                                    <TableCell
                                                                        key={column.id}
                                                                        style={{ width: column.getSize() }}
                                                                        className={cn(
                                                                            "p-0 border-r border-gray-100 last:border-r-0 relative",
                                                                            isNameColumn && "bg-[#FDFDFD] border-r border-gray-100"
                                                                        )}
                                                                    >
                                                                        {isNameColumn ? (
                                                                            <AddSubtaskModule
                                                                                depth={row.id === addingSubtaskTo ? row.depth + 1 : row.depth}
                                                                                onCancel={() => setAddingSubtaskTo(null)}
                                                                                onSave={(subtaskName) => {
                                                                                    addSubtask(addingSubtaskTo, subtaskName)
                                                                                    setAddingSubtaskTo(null)
                                                                                }}
                                                                            />
                                                                        ) : (
                                                                            <div className="h-full w-full" />
                                                                        )}
                                                                    </TableCell>
                                                                )
                                                            })}
                                                        </TableRow>
                                                    )
                                                }
                                            }
                                        })

                                        return renderedRows
                                    })()}
                                </SortableContext>

                                {/* Footer / Calculate Row */}
                                <TableRow className="hover:bg-gray-50 border-t-2 border-gray-100 transition-colors group">
                                    {table.getVisibleFlatColumns().map((column) => {
                                        const isNameColumn = column.id === "name"

                                        return (
                                            <TableCell
                                                key={column.id}
                                                style={{ width: column.getSize() }}
                                                className={cn(
                                                    "text-xs font-medium text-gray-500 transition-colors",
                                                    isNameColumn ? (isCreatingTask ? "p-0" : "p-2") : "p-2",
                                                    isNameColumn && "bg-white group-hover:bg-gray-50 border-r border-gray-100"
                                                )}
                                            >
                                                {isNameColumn ? (
                                                    <CreateTaskModule
                                                        onSave={addTask}
                                                        onOpenChange={setIsCreatingTask}
                                                    />
                                                ) : (
                                                    <CalculateModule
                                                        items={flatData}
                                                        columnId={column.id}
                                                        currentMethod={columnCalculationMethods[column.id]}
                                                        onCalculate={(method) => handleCalculate(column.id, method)}
                                                        onClear={() => handleClearCalculation(column.id)}
                                                        isOpen={calculateOpenColId === column.id}
                                                        onOpenChange={(open) => setCalculateOpenColId(open ? column.id : null)}
                                                    />
                                                )}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>

                            </TableBody>
                        </Table>
                        <DragOverlay adjustScale={true} dropAnimation={{
                            duration: 250,
                            easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
                        }}>
                            {activeId ? (
                                columnOrder.includes(activeId) ? (
                                    <div className="bg-white/95 backdrop-blur-sm border-2 border-blue-500/50 p-3 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] cursor-grabbing flex items-center gap-3 animate-in fade-in zoom-in duration-200">
                                        <div className="flex gap-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse delay-75" />
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse delay-150" />
                                        </div>
                                        <span className="text-[12px] font-semibold text-gray-800 uppercase tracking-wider">Reordering Column</span>
                                    </div>
                                ) : (
                                    <div className="bg-white/95 backdrop-blur-sm border-2 border-indigo-500/50 p-4 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] cursor-grabbing flex items-center gap-4 animate-in fade-in zoom-in duration-200 min-w-[300px]">
                                        <div className="h-10 w-1 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[12px] font-semibold text-gray-900">Moving Task</span>
                                            <span className="text-[11px] text-gray-500 font-medium">Release to place here</span>
                                        </div>
                                    </div>
                                )
                            ) : null}
                        </DragOverlay>
                    </DndContext>
                </div>
            </div>
            <AddColums
                table={table}
                isOpen={isAddColumnsOpen}
                onClose={() => setIsAddColumnsOpen(false)}
            />
            <BulkActionsToolbar
                selectedCount={Object.keys(rowSelection).length}
                onClearSelection={() => setRowSelection({})}
                onDelete={handleDeleteSelected}
                onUpdateStatus={handleUpdateSelectedStatus}
                onUpdateAssignees={handleUpdateSelectedAssignees}
                onUpdateStartDate={handleUpdateSelectedStartDate}
                onUpdateDueDate={handleUpdateSelectedDueDate}
                onUpdatePriority={handleUpdateSelectedPriority}
            />
        </div>
    )
}