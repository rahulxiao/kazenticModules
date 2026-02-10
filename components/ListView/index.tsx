"use client"

import * as React from "react"
import {
    flexRender,
    getCoreRowModel,
    getExpandedRowModel,
    getSortedRowModel,
    useReactTable,
    ExpandedState,
    SortingState,
} from "@tanstack/react-table"
import { columns } from "@/components/ListView/columns"

import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { taskTable, tableData } from "@/data/tableData"

import { AddSubtaskModule } from "@/components/ListView/AddSubtaskModule"
import { AddColums } from "@/components/ListView/FieldColums"
import { CalculatePopover } from "@/components/ListView/HeaderManu/CalculatePopover"
import { cn } from "@/lib/utils"
import { Plus, ChevronDown } from "lucide-react"
import moment from "moment"
import { BulkActionsToolbar } from "@/components/ListView/BulkActionsToolbar"

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
    arrayMove,
    SortableContext,
    horizontalListSortingStrategy,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { DraggableHeader } from "@/components/ListView/DraggableHeader"
import { DraggableRow } from "@/components/ListView/DraggableRow"

export default function ListView() {
    const [data, setData] = React.useState<taskTable[]>(tableData)
    const [addingSubtaskTo, setAddingSubtaskTo] = React.useState<string | null>(null)
    const [expanded, setExpanded] = React.useState<ExpandedState>({ "0": true, "0.0": true, "0.0.1": true })
    const [columnVisibility, setColumnVisibility] = React.useState({})
    const [isAddColumnsOpen, setIsAddColumnsOpen] = React.useState(false)
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [rowSelection, setRowSelection] = React.useState({})

    const [tableColumns, setTableColumns] = React.useState(() => [...columns])

    // Initialize column order, ensuring 'name' is first and handled specially
    const [columnOrder, setColumnOrder] = React.useState<string[]>(() => {
        const order = columns.map((c: any) => c.accessorKey || c.id || "unknown")
        return order
    })

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

        // DISTINGUISH BETWEEN COLUMN DRAG AND ROW DRAG
        const isColumnDrag = columnOrder.includes(active.id as string)

        if (isColumnDrag) {
            // Prevent moving 'name' or moving anything to 'name' position (index 0)
            if (active.id === 'name' || over.id === 'name' ||
                active.id === 'addNewColumn' || over.id === 'addNewColumn') {
                return
            }

            setColumnOrder((order) => {
                const oldIndex = order.indexOf(active.id as string)
                const newIndex = order.indexOf(over.id as string)
                return arrayMove(order, oldIndex, newIndex)
            })
        } else {
            // ROW DRAG
            const activeId = active.id as string
            const overId = over.id as string

            // Find the row indices and parent paths
            const activePath = activeId.split('.')
            const overPath = overId.split('.')

            // Only allow reordering within the same parent
            if (activePath.slice(0, -1).join('.') !== overPath.slice(0, -1).join('.')) {
                return
            }

            const moveRowRecursive = (data: taskTable[], path: string[], targetIdx: number): taskTable[] => {
                const [currentIndex, ...remainingPath] = path
                const idx = parseInt(currentIndex)

                if (remainingPath.length === 0) {
                    // Reached the level where moving happens
                    return arrayMove(data, idx, targetIdx)
                }

                return data.map((item, i) => {
                    if (i === idx) {
                        return {
                            ...item,
                            subtasks: moveRowRecursive(item.subtasks || [], remainingPath, targetIdx)
                        }
                    }
                    return item
                })
            }

            const activeIdx = parseInt(activePath[activePath.length - 1])
            const overIdx = parseInt(overPath[overPath.length - 1])
            const parentPath = activePath.slice(0, -1)

            setData(old => {
                if (parentPath.length === 0) {
                    return arrayMove(old, activeIdx, overIdx)
                }
                return moveRowRecursive(old, parentPath, overIdx)
            })
        }
    }

    const updateData = (rowId: string, columnId: string, value: any) => {
        const updateRecursive = (data: taskTable[], path: string[]): taskTable[] => {
            const [currentIndex, ...remainingPath] = path
            const idx = parseInt(currentIndex)

            return data.map((item, i) => {
                if (i === idx) {
                    if (remainingPath.length === 0) {
                        return { ...item, [columnId]: value }
                    }
                    return {
                        ...item,
                        subtasks: updateRecursive(item.subtasks || [], remainingPath)
                    }
                }
                return item
            })
        }

        setData(old => updateRecursive(old, rowId.split('.')))
    }

    const addSubtask = (parentId: string, subtaskName: string) => {
        const addRecursive = (data: taskTable[], path: string[]): taskTable[] => {
            const [currentIndex, ...remainingPath] = path
            const idx = parseInt(currentIndex)

            return data.map((item, i) => {
                if (i === idx) {
                    if (remainingPath.length === 0) {
                        const newSubtask: taskTable = {
                            name: subtaskName,
                            assignees: [],
                            startDate: "",
                            dueDate: "",
                            priority: "",
                            taskID: Math.random().toString(36).substring(2, 11),
                            timeTracker: "Add time",
                            addNewColumn: "",
                            dateCreated: new Date().toISOString().split('T')[0],
                            subtasks: []
                        }
                        return {
                            ...item,
                            subtasks: [...(item.subtasks || []), newSubtask]
                        }
                    }
                    return {
                        ...item,
                        subtasks: addRecursive(item.subtasks || [], remainingPath)
                    }
                }
                return item
            })
        }

        setData(old => addRecursive(old, parentId.split('.')))

        // Auto-expand the parent after adding
        setExpanded(prev => ({ ...(prev as any), [parentId]: true }))
    }

    const [columnSizing, setColumnSizing] = React.useState({})

    const duplicateColumn = (colId: string) => {
        const colIndex = tableColumns.findIndex((c: any) => (c.accessorKey || c.id) === colId)
        if (colIndex === -1) return

        const columnToClone = tableColumns[colIndex]
        const newColId = `${colId}_${Math.random().toString(36).substr(2, 5)}`

        // 1. Clone Column Definition
        const newColumn = {
            ...columnToClone,
            accessorKey: newColId,
            id: newColId,
            header: (props: any) => {
                const OriginalHeader = columnToClone.header as any
                return <OriginalHeader {...props} />
            }
        }

        // 2. Add new column to state
        setTableColumns(prev => {
            const newCols = [...prev]
            newCols.splice(colIndex + 1, 0, newColumn)
            return newCols
        })

        // 3. Duplicate Data
        setData(prevData => {
            const copyRecursive = (items: taskTable[]): taskTable[] => {
                return items.map(item => ({
                    ...item,
                    [newColId]: (item as any)[colId],
                    subtasks: item.subtasks ? copyRecursive(item.subtasks) : []
                }))
            }
            return copyRecursive(prevData)
        })

        // 4. Update Column Order
        setColumnOrder(prev => {
            const oldIndex = prev.indexOf(colId)
            if (oldIndex === -1) return [...prev, newColId]

            const newOrder = [...prev]
            newOrder.splice(oldIndex + 1, 0, newColId)
            return newOrder
        })
    }

    const [columnCalculationMethods, setColumnCalculationMethods] = React.useState<Record<string, string>>({})
    const [calculateOpenColId, setCalculateOpenColId] = React.useState<string | null>(null)
    const [isCreatingTask, setIsCreatingTask] = React.useState(false)

    // Helper to flatten data for calculations
    const flattenData = React.useCallback((items: taskTable[]): taskTable[] => {
        return items.reduce((acc, item) => {
            return [...acc, item, ...(item.subtasks ? flattenData(item.subtasks) : [])]
        }, [] as taskTable[])
    }, [])

    // Derived calculations based on data and selected methods
    const columnCalculations = React.useMemo(() => {
        const results: Record<string, { method: string, value: string | number }> = {}
        const flatData = flattenData(data)

        Object.entries(columnCalculationMethods).forEach(([columnId, method]) => {
            const values = flatData.map((row: any) => row[columnId])
            let value: string | number = ""

            switch (method) {
                case "count_all":
                    value = flatData.length
                    break
                case "count_values":
                    value = values.filter(v => v !== null && v !== undefined && v !== "").length
                    break
                case "count_unique":
                    value = new Set(values.filter(v => v !== null && v !== undefined && v !== "")).size
                    break
                case "count_empty":
                    value = values.filter(v => v === null || v === undefined || v === "").length
                    break
                case "count_not_empty":
                    value = values.filter(v => v !== null && v !== undefined && v !== "").length
                    break
                case "percent_filled":
                    const filled = values.filter(v => v !== null && v !== undefined && v !== "").length
                    value = flatData.length ? `${Math.round((filled / flatData.length) * 100)}%` : "0%"
                    break
                case "percent_total":
                    const totalFilled = values.filter(v => v !== null && v !== undefined && v !== "").length
                    value = flatData.length ? `${Math.round((totalFilled / flatData.length) * 100)}%` : "0%"
                    break
                case "earliest_date":
                    const dates = values
                        .filter(v => v && moment(v).isValid())
                        .map(v => moment(v))
                        .sort((a, b) => a.valueOf() - b.valueOf())
                    value = dates.length ? dates[0].format("MMM D") : "-"
                    break
                case "latest_date":
                    const datesLatest = values
                        .filter(v => v && moment(v).isValid())
                        .map(v => moment(v))
                        .sort((a, b) => b.valueOf() - a.valueOf())
                    value = datesLatest.length ? datesLatest[0].format("MMM D") : "-"
                    break
                case "date_range":
                    const datesRange = values
                        .filter(v => v && moment(v).isValid())
                        .map(v => moment(v))
                        .sort((a, b) => a.valueOf() - b.valueOf())

                    if (datesRange.length === 0) {
                        value = "-"
                    } else if (datesRange.length === 1) {
                        value = datesRange[0].format("MMM D")
                    } else {
                        const start = datesRange[0]
                        const end = datesRange[datesRange.length - 1]
                        value = `${start.format("MMM D")} - ${end.format("MMM D")}`
                    }
                    break
                default:
                    value = ""
            }
            results[columnId] = { method, value }
        })

        return results
    }, [data, columnCalculationMethods, flattenData])


    const handleCalculate = (columnId: string, method: string) => {
        setColumnCalculationMethods(prev => ({
            ...prev,
            [columnId]: method
        }))
    }

    const handleClearCalculation = (columnId: string) => {
        setColumnCalculationMethods(prev => {
            const newState = { ...prev }
            delete newState[columnId]
            return newState
        })
    }

    const handleDeleteSelected = () => {
        const selectedIds = Object.keys(rowSelection);

        // Recursive deletion helper
        const deleteRecursive = (items: taskTable[]): taskTable[] => {
            return items.filter((item, index) => { // This index logic is tricky with selection IDs which are row IDs
                // Row IDs from tanstack table are usually "0", "0.1", etc. based on index path.
                // However, selection relies on `getRowId`.
                // By default getRowId returns index. But with subrows it returns "0.1".
                // Since we don't have unique stable IDs for everything (taskID is string),
                // we'll rely on the row selection keys which match the row.id from table.
                // WE CANNOT easily filter by ID since IDs change after filter.
                // Better approach: Get the row objects from table instance if possible
                // OR: We need stable IDs for row selection to persist correctly, but for deletion we just need to know what to delete.

                // Let's use a simpler approach: Set data by filtering out items whose IDs are in selection?
                // Wait, rowSelection keys depend on current table state.
                return true;
            })
        }

        // Actually, simpler: Get selected rows from table instance
        const selectedRows = table.getSelectedRowModel().flatRows;
        const selectedTaskIds = new Set(selectedRows.map(row => row.original.taskID));

        const deleteByTaskId = (items: taskTable[]): taskTable[] => {
            return items.filter(item => {
                if (selectedTaskIds.has(item.taskID)) return false;
                if (item.subtasks) {
                    item.subtasks = deleteByTaskId(item.subtasks);
                }
                return true;
            })
        }

        setData(prev => deleteByTaskId(prev));
        setRowSelection({});
    }

    const handleUpdateSelectedStatus = (newStatus: string) => {
        const selectedRows = table.getSelectedRowModel().flatRows;
        const selectedTaskIds = new Set(selectedRows.map(row => row.original.taskID));

        const updateStatusByTaskId = (items: taskTable[]): taskTable[] => {
            return items.map(item => {
                let newItem = { ...item }
                if (selectedTaskIds.has(item.taskID)) {
                    newItem.status = newStatus
                }
                if (item.subtasks) {
                    newItem.subtasks = updateStatusByTaskId(item.subtasks)
                }
                return newItem;
            })
        }

        setData(prev => updateStatusByTaskId(prev));
        setRowSelection({});
    }

    const handleUpdateSelectedAssignees = (newAssignees: string[]) => {
        const selectedRows = table.getSelectedRowModel().flatRows;
        const selectedTaskIds = new Set(selectedRows.map(row => row.original.taskID));

        const updateByTaskId = (items: taskTable[]): taskTable[] => {
            return items.map(item => {
                let newItem = { ...item }
                if (selectedTaskIds.has(item.taskID)) {
                    // Merge new assignees with existing ones (additive only)
                    const existing = item.assignees || []
                    newItem.assignees = [...new Set([...existing, ...newAssignees])]
                }
                if (item.subtasks) {
                    newItem.subtasks = updateByTaskId(item.subtasks)
                }
                return newItem;
            })
        }

        setData(prev => updateByTaskId(prev));
        // Do not clear selection so user can continue interacting
    }

    const handleUpdateSelectedStartDate = (date: string) => {
        const selectedRows = table.getSelectedRowModel().flatRows;
        const selectedTaskIds = new Set(selectedRows.map(row => row.original.taskID));

        const updateByTaskId = (items: taskTable[]): taskTable[] => {
            return items.map(item => {
                let newItem = { ...item }
                if (selectedTaskIds.has(item.taskID)) {
                    newItem.startDate = date
                }
                if (item.subtasks) {
                    newItem.subtasks = updateByTaskId(item.subtasks)
                }
                return newItem;
            })
        }

        setData(prev => updateByTaskId(prev));
        // Do not clear selection
    }

    const handleUpdateSelectedDueDate = (date: string) => {
        const selectedRows = table.getSelectedRowModel().flatRows;
        const selectedTaskIds = new Set(selectedRows.map(row => row.original.taskID));

        const updateByTaskId = (items: taskTable[]): taskTable[] => {
            return items.map(item => {
                let newItem = { ...item }
                if (selectedTaskIds.has(item.taskID)) {
                    newItem.dueDate = date
                }
                if (item.subtasks) {
                    newItem.subtasks = updateByTaskId(item.subtasks)
                }
                return newItem;
            })
        }

        setData(prev => updateByTaskId(prev));
        // Do not clear selection
    }

    const handleUpdateSelectedPriority = (priority: string) => {
        const selectedRows = table.getSelectedRowModel().flatRows;
        const selectedTaskIds = new Set(selectedRows.map(row => row.original.taskID));

        const updateByTaskId = (items: taskTable[]): taskTable[] => {
            return items.map(item => {
                let newItem = { ...item }
                if (selectedTaskIds.has(item.taskID)) {
                    newItem.priority = priority
                }
                if (item.subtasks) {
                    newItem.subtasks = updateByTaskId(item.subtasks)
                }
                return newItem;
            })
        }

        setData(prev => updateByTaskId(prev));
        // Do not clear selection
    }

    const addTask = (name: string) => {
        const newTask: taskTable = {
            name: name,
            assignees: [],
            startDate: "",
            dueDate: "",
            priority: "",
            taskID: Math.random().toString(36).substring(2, 11),
            timeTracker: "Add time",
            addNewColumn: "",
            dateCreated: new Date().toISOString().split('T')[0],
            subtasks: []
        }
        setData(prev => [...prev, newTask])
    }

    const table = useReactTable({
        data,
        columns: tableColumns,
        state: {
            expanded,
            columnOrder,
            columnSizing,
            columnVisibility,
            sorting,
            rowSelection,
        },
        enableMultiSort: true,
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnVisibilityChange: setColumnVisibility,
        onColumnOrderChange: setColumnOrder,
        onColumnSizingChange: setColumnSizing,
        onExpandedChange: setExpanded,
        getSubRows: row => row.subtasks,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        columnResizeMode: "onChange",
        meta: {
            updateData,
            onAddSubtask: (rowId: string) => {
                setAddingSubtaskTo(rowId)
            },
            addingSubtaskTo,
            onOpenAddColumns: () => setIsAddColumnsOpen(true),
            duplicateColumn,
            handleCalculate,
            clearCalculation: handleClearCalculation,
            getCalculation: (columnId: string) => columnCalculations[columnId],
        },
    })

    // Prevent hydration mismatch for DND components
    const [mounted, setMounted] = React.useState(false)
    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <div className="p-10 font-sans bg-[#fafafa] min-h-screen" />
    }

    return (
        <div className="p-10 font-sans bg-[#fafafa] min-h-screen">
            <div className="max-w-[1400px] mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto text-[#222]">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <Table style={{ minWidth: "1200px", tableLayout: "fixed" }} className="border-collapse">
                        <TableHeader >
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
                                                    <TableRow key={`${row.id}-add`} className="group/add bg-[#FDFDFD] border-b border-gray-50">
                                                        {table.getVisibleFlatColumns().map((column, colIdx) => {
                                                            const isNameColumn = column.id === "name"
                                                            return (
                                                                <TableCell
                                                                    key={column.id}
                                                                    style={{ width: column.getSize() }}
                                                                    className={cn(
                                                                        "p-0 border-r border-gray-50 last:border-r-0 relative",
                                                                        isNameColumn && "sticky left-0 z-40 bg-[#FDFDFD] border-r border-gray-100 shadow-[6px_0_15px_rgba(0,0,0,0.1)]"
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
                                    const calculation = columnCalculations[column.id]

                                    return (
                                        <TableCell
                                            key={column.id}
                                            style={{ width: column.getSize() }}
                                            className={cn(
                                                "text-xs font-medium text-gray-500 transition-colors",
                                                isNameColumn ? (isCreatingTask ? "p-0" : "p-2") : "p-2",
                                                isNameColumn && "sticky left-0 z-40 bg-white group-hover:bg-gray-50 border-r border-gray-100 shadow-[6px_0_15px_rgba(0,0,0,0.1)]"
                                            )}
                                        >
                                            {isNameColumn ? (
                                                isCreatingTask ? (
                                                    <AddSubtaskModule
                                                        depth={0}
                                                        onCancel={() => setIsCreatingTask(false)}
                                                        onSave={(name) => {
                                                            addTask(name)
                                                            setIsCreatingTask(false)
                                                        }}
                                                    />
                                                ) : (
                                                    <button
                                                        onClick={() => setIsCreatingTask(true)}
                                                        className="flex items-center gap-2 text-gray-400 hover:text-gray-700 transition-colors pl-2"
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                        Create Task
                                                    </button>
                                                )
                                            ) : (
                                                <div className="flex justify-center w-full">
                                                    <CalculatePopover
                                                        open={calculateOpenColId === column.id}
                                                        onOpenChange={(open) => setCalculateOpenColId(open ? column.id : null)}
                                                        onCalculate={(method) => handleCalculate(column.id, method)}
                                                        onClear={() => handleClearCalculation(column.id)}
                                                        currentMethod={calculation?.method}
                                                    >
                                                        <button className="flex items-center justify-center gap-1 hover:bg-gray-200 px-2 py-1 rounded transition-colors h-7 min-w-[70px]">
                                                            {calculation ? (
                                                                <span className="text-gray-900 font-semibold">{calculation.value}</span>
                                                            ) : (
                                                                // UPDATED: Used group-hover to trigger visibility on row hover
                                                                // Wrapped text and icon in a div for unified handling
                                                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                                    <span className="text-[11px] font-medium text-gray-400">Calculate</span>
                                                                    <ChevronDown className="h-3 w-3 text-gray-400" />
                                                                </div>
                                                            )}
                                                        </button>
                                                    </CalculatePopover>
                                                </div>
                                            )}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>

                        </TableBody>
                    </Table>
                </DndContext>
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
