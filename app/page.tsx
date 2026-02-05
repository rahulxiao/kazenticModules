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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { User, tableData } from "@/data/tableData"

import { AddSubtaskModule } from "@/components/ListView/AddSubtaskModule"

import { cn } from "@/lib/utils"

export default function Page() {
  const [data, setData] = React.useState<User[]>(tableData)
  const [addingSubtaskTo, setAddingSubtaskTo] = React.useState<string | null>(null)
  const [expanded, setExpanded] = React.useState<ExpandedState>({ "0": true, "0.0": true, "0.0.1": true })

  const updateData = (rowId: string, columnId: string, value: any) => {
    const updateRecursive = (data: User[], path: string[]): User[] => {
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
    const addRecursive = (data: User[], path: string[]): User[] => {
      const [currentIndex, ...remainingPath] = path
      const idx = parseInt(currentIndex)

      return data.map((item, i) => {
        if (i === idx) {
          if (remainingPath.length === 0) {
            const newSubtask: User = {
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

  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
    },
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

  return (
    <div className="p-10 font-sans bg-[#fafafa] min-h-screen">
      <div className="max-w-[1400px] mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto text-[#222]">
        <Table style={{ minWidth: "1200px" }} className="border-collapse">
          <TableHeader >
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent border-b border-gray-100">
                {headerGroup.headers.map((header, index) => (
                  <TableHead
                    key={header.id}
                    style={{ width: header.getSize() }}
                    className={cn(
                      "relative py-4 px-4 text-left text-[13px] font-semibold text-gray-500 bg-[#F2F9FE] border-r border-gray-50 last:border-r-0",
                      index === 0 && "sticky left-0 z-20 bg-inherit border-r border-gray-100 shadow-[2px_0_5px_rgba(0,0,0,0.02)]"
                    )}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}

                    {/* Resize Handle */}
                    {header.column.getCanResize() && (
                      <div
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        className="absolute right-0 top-0 h-full w-1 cursor-col-resize select-none bg-transparent hover:bg-blue-500 z-30"
                      />
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {(() => {
              const rows = table.getRowModel().rows
              const renderedRows: React.ReactNode[] = []

              rows.forEach((row, index) => {
                renderedRows.push(
                  <TableRow key={row.id} className="group hover:bg-[#F9FAFB] border-b border-gray-50 transition-colors">
                    {row.getVisibleCells().map((cell, idx) => (
                      <TableCell
                        key={cell.id}
                        style={{ width: cell.column.getSize() }}
                        className={cn(
                          "py-1 px-4 border-r border-gray-50 last:border-r-0",
                          idx === 0 && "sticky left-0 z-10 bg-white group-hover:bg-[#F9FAFB] border-r border-gray-50 shadow-[2px_0_5px_rgba(0,0,0,0.02)]"
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                )

                // Check if this is the right place to show the "Add subtask" input
                // It should show after the last visible descendant of the expanding parent
                if (addingSubtaskTo) {
                  const isParent = row.id === addingSubtaskTo
                  const nextRow = rows[index + 1]
                  const isLastDescendant = isParent && (!nextRow || !nextRow.id.startsWith(addingSubtaskTo + "."))
                  const nextIsRelative = nextRow && nextRow.id.startsWith(addingSubtaskTo + ".")
                  const nextIsNotRelative = nextRow && !nextRow.id.startsWith(addingSubtaskTo + ".")

                  // If current row is the last visible descendant of the addingSubtaskTo parent
                  const isLastChildOfParent = row.id.startsWith(addingSubtaskTo + ".") && (!nextRow || !nextRow.id.startsWith(addingSubtaskTo + "."))

                  if (isLastDescendant || isLastChildOfParent) {
                    renderedRows.push(
                      <TableRow key={`${row.id}-add`} className="bg-[#FDFDFD]">
                        <TableCell colSpan={table.getAllColumns().length} className="p-0 border-none">
                          <AddSubtaskModule
                            depth={row.id === addingSubtaskTo ? row.depth + 1 : row.depth}
                            onCancel={() => setAddingSubtaskTo(null)}
                            onSave={(subtaskName) => {
                              addSubtask(addingSubtaskTo, subtaskName)
                              setAddingSubtaskTo(null)
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    )
                  }
                }
              })

              return renderedRows
            })()}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
