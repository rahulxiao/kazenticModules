"use client"

import * as React from "react"
import {
    getCoreRowModel,
    getExpandedRowModel,
    getSortedRowModel,
    useReactTable,
    ExpandedState,
    SortingState,
    RowSelectionState,
} from "@tanstack/react-table"
import { columns } from "@/components/ListView/columns"
import { taskTable, tableData } from "@/data/tableData"
import {
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"

export function useListView() {
    const [data, setData] = React.useState<taskTable[]>(tableData)
    const [addingSubtaskTo, setAddingSubtaskTo] = React.useState<string | null>(null)
    const [expanded, setExpanded] = React.useState<ExpandedState>({ "0": true, "0.0": true, "0.0.1": true })
    const [columnVisibility, setColumnVisibility] = React.useState({})
    const [isAddColumnsOpen, setIsAddColumnsOpen] = React.useState(false)
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [rowSelection, setRowSelection] = React.useState({})
    const [tableColumns, setTableColumns] = React.useState(() => [...columns])
    const [columnSizing, setColumnSizing] = React.useState({})
    const [columnOrder, setColumnOrder] = React.useState<string[]>(() => {
        return columns.map((c: any) => c.accessorKey || c.id || "unknown")
    })
    const [columnCalculationMethods, setColumnCalculationMethods] = React.useState<Record<string, string>>({})
    const [calculateOpenColId, setCalculateOpenColId] = React.useState<string | null>(null)
    const [isCreatingTask, setIsCreatingTask] = React.useState(false)

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor)
    )

    const [activeId, setActiveId] = React.useState<string | null>(null)

    const handleDragStart = (event: any) => {
        setActiveId(event.active.id)
    }

    const handleDragEnd = (event: DragEndEvent) => {
        setActiveId(null)
        const { active, over } = event
        if (!active || !over || active.id === over.id) return

        const isColumnDrag = columnOrder.includes(active.id as string)

        if (isColumnDrag) {
            // Only 'addNewColumn' stays non-draggable for now
            if (active.id === 'addNewColumn' || over.id === 'addNewColumn') {
                return
            }

            setColumnOrder((order) => {
                const oldIndex = order.indexOf(active.id as string)
                const newIndex = order.indexOf(over.id as string)
                return arrayMove(order, oldIndex, newIndex)
            })
        } else {
            const activeId = active.id as string
            const overId = over.id as string
            const activePath = activeId.split('.')
            const overPath = overId.split('.')

            if (activePath.slice(0, -1).join('.') !== overPath.slice(0, -1).join('.')) {
                return
            }

            const moveRowRecursive = (data: taskTable[], path: string[], targetIdx: number): taskTable[] => {
                const [currentIndex, ...remainingPath] = path
                const idx = parseInt(currentIndex)
                if (remainingPath.length === 0) return arrayMove(data, idx, targetIdx)

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
            const parentPath = activePath.slice(0, -1)

            setData(old => {
                if (parentPath.length === 0) return arrayMove(old, activeIdx, parseInt(overPath[overPath.length - 1]))
                return moveRowRecursive(old, parentPath, parseInt(overPath[overPath.length - 1]))
            })
        }
    }

    const updateData = (rowId: string, columnId: string, value: any) => {
        const updateRecursive = (data: taskTable[], path: string[]): taskTable[] => {
            const [currentIndex, ...remainingPath] = path
            const idx = parseInt(currentIndex)

            return data.map((item, i) => {
                if (i === idx) {
                    if (remainingPath.length === 0) return { ...item, [columnId]: value }
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
                        return { ...item, subtasks: [...(item.subtasks || []), newSubtask] }
                    }
                    return { ...item, subtasks: addRecursive(item.subtasks || [], remainingPath) }
                }
                return item
            })
        }
        setData(old => addRecursive(old, parentId.split('.')))
        setExpanded(prev => ({ ...(prev as any), [parentId]: true }))
    }

    const duplicateColumn = (colId: string) => {
        const colIndex = tableColumns.findIndex((c: any) => (c.accessorKey || c.id) === colId)
        if (colIndex === -1) return

        const columnToClone = tableColumns[colIndex]
        const newColId = `${colId}_${Math.random().toString(36).substr(2, 5)}`

        const newColumn = {
            ...columnToClone,
            accessorKey: newColId,
            id: newColId,
            header: (props: any) => {
                const OriginalHeader = columnToClone.header as React.ElementType
                return <OriginalHeader {...props} />
            }
        }

        setTableColumns(prev => {
            const newCols = [...prev]
            newCols.splice(colIndex + 1, 0, newColumn)
            return newCols
        })

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

        setColumnOrder(prev => {
            const oldIndex = prev.indexOf(colId)
            const newOrder = [...prev]
            newOrder.splice(oldIndex === -1 ? prev.length : oldIndex + 1, 0, newColId)
            return newOrder
        })
    }

    const flattenData = React.useCallback((items: taskTable[]): taskTable[] => {
        return items.reduce((acc, item) => {
            return [...acc, item, ...(item.subtasks ? flattenData(item.subtasks) : [])]
        }, [] as taskTable[])
    }, [])

    const flatData = React.useMemo(() => flattenData(data), [data, flattenData])

    const handleCalculate = (columnId: string, method: string) => {
        setColumnCalculationMethods(prev => ({ ...prev, [columnId]: method }))
    }

    const handleClearCalculation = (columnId: string) => {
        setColumnCalculationMethods(prev => {
            const newState = { ...prev }
            delete newState[columnId]
            return newState
        })
    }

    const handleDeleteSelected = () => {
        const selectedRows = table.getSelectedRowModel().flatRows
        const selectedTaskIds = new Set(selectedRows.map(row => row.original.taskID))

        const deleteByTaskId = (items: taskTable[]): taskTable[] => {
            return items.filter(item => {
                if (selectedTaskIds.has(item.taskID)) return false
                if (item.subtasks) item.subtasks = deleteByTaskId(item.subtasks)
                return true
            })
        }

        setData(prev => deleteByTaskId(prev))
        setRowSelection({})
    }

    const handleUpdateSelectedStatus = (newStatus: string) => {
        const selectedRows = table.getSelectedRowModel().flatRows
        const selectedTaskIds = new Set(selectedRows.map(row => row.original.taskID))

        const updateStatusByTaskId = (items: taskTable[]): taskTable[] => {
            return items.map(item => {
                let newItem = { ...item }
                if (selectedTaskIds.has(item.taskID)) newItem.status = newStatus
                if (item.subtasks) newItem.subtasks = updateStatusByTaskId(item.subtasks)
                return newItem
            })
        }
        setData(prev => updateStatusByTaskId(prev))
        setRowSelection({})
    }

    const handleUpdateSelectedAssignees = (newAssignees: string[]) => {
        const selectedRows = table.getSelectedRowModel().flatRows
        const selectedTaskIds = new Set(selectedRows.map(row => row.original.taskID))

        const updateByTaskId = (items: taskTable[]): taskTable[] => {
            return items.map(item => {
                let newItem = { ...item }
                if (selectedTaskIds.has(item.taskID)) {
                    const existing = item.assignees || []
                    newItem.assignees = [...new Set([...existing, ...newAssignees])]
                }
                if (item.subtasks) newItem.subtasks = updateByTaskId(item.subtasks)
                return newItem
            })
        }
        setData(prev => updateByTaskId(prev))
    }

    const handleUpdateSelectedStartDate = (date: string) => {
        const selectedRows = table.getSelectedRowModel().flatRows
        const selectedTaskIds = new Set(selectedRows.map(row => row.original.taskID))

        const updateByTaskId = (items: taskTable[]): taskTable[] => {
            return items.map(item => {
                let newItem = { ...item }
                if (selectedTaskIds.has(item.taskID)) newItem.startDate = date
                if (item.subtasks) newItem.subtasks = updateByTaskId(item.subtasks)
                return newItem
            })
        }
        setData(prev => updateByTaskId(prev))
    }

    const handleUpdateSelectedDueDate = (date: string) => {
        const selectedRows = table.getSelectedRowModel().flatRows
        const selectedTaskIds = new Set(selectedRows.map(row => row.original.taskID))

        const updateByTaskId = (items: taskTable[]): taskTable[] => {
            return items.map(item => {
                let newItem = { ...item }
                if (selectedTaskIds.has(item.taskID)) newItem.dueDate = date
                if (item.subtasks) newItem.subtasks = updateByTaskId(item.subtasks)
                return newItem
            })
        }
        setData(prev => updateByTaskId(prev))
    }

    const handleUpdateSelectedPriority = (priority: string) => {
        const selectedRows = table.getSelectedRowModel().flatRows
        const selectedTaskIds = new Set(selectedRows.map(row => row.original.taskID))

        const updateByTaskId = (items: taskTable[]): taskTable[] => {
            return items.map(item => {
                let newItem = { ...item }
                if (selectedTaskIds.has(item.taskID)) newItem.priority = priority
                if (item.subtasks) newItem.subtasks = updateByTaskId(item.subtasks)
                return newItem
            })
        }
        setData(prev => updateByTaskId(prev))
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
            onAddSubtask: (rowId: string) => setAddingSubtaskTo(rowId),
            addingSubtaskTo,
            onOpenAddColumns: () => setIsAddColumnsOpen(true),
            duplicateColumn,
            handleCalculate,
            clearCalculation: handleClearCalculation,
            columnCalculationMethods,
            viewType: 'list',
        },
    })

    return {
        table,
        data,
        flatData,
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
        columnCalculationMethods,
        handleCalculate,
        handleClearCalculation,
        calculateOpenColId,
        setCalculateOpenColId,
        isCreatingTask,
        setIsCreatingTask
    }
}
