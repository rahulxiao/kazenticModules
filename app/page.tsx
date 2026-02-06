"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
  ExpandedState,
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
import { cn } from "@/lib/utils"

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

export default function Page() {
  const [data, setData] = React.useState<taskTable[]>(tableData)
  const [addingSubtaskTo, setAddingSubtaskTo] = React.useState<string | null>(null)
  const [expanded, setExpanded] = React.useState<ExpandedState>({ "0": true, "0.0": true, "0.0.1": true })

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

  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
      columnOrder,
      columnSizing,
    },
    onColumnOrderChange: setColumnOrder,
    onColumnSizingChange: setColumnSizing,
    onExpandedChange: setExpanded,
    getSubRows: row => row.subtasks,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    columnResizeMode: "onChange",
    meta: {
      updateData,
      onAddSubtask: (rowId: string) => {
        setAddingSubtaskTo(rowId)
      },
      addingSubtaskTo,
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
            </TableBody>
          </Table>
        </DndContext>
      </div>
    </div>
  )
}
