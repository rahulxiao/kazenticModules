"use client"

import { ColumnDef } from "@tanstack/react-table"
import { taskTable } from "@/data/tableData"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { columns as listViewColumns } from "../ListView/columns"
import { NameModule } from "../ListView/NameModule"
import { GripVertical } from "lucide-react"
import { HeaderMenu } from "../ListView/HeaderManu/HeaderMenu"

const indexColumn: ColumnDef<taskTable> = {
    accessorKey: "index",
    id: "index",
    // Header: Shows # by default. Shows Checkbox if hovered OR if rows are selected.
    header: ({ table }) => (
        <div className="flex items-center justify-center w-full h-full">
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 w-4 h-4 rounded border-gray-300"
            />
        </div>
    ),
    cell: ({ row, table, ...rest }: any) => {
        const dragHandleProps = rest.dragHandleProps
        const isSelected = row.getIsSelected()

        return (
            <div
                className="flex items-center justify-center w-full h-full relative group/index-cell"
            >
                <div
                    className={cn(
                        "flex items-center gap-1 transition-all",
                        (isSelected || true) // Always show checkbox for now to match image
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"
                    )}
                >
                    <GripVertical
                        size={14}
                        className="text-gray-400 cursor-grab active:cursor-grabbing opacity-0 group-hover/index-cell:opacity-100"
                        {...dragHandleProps}
                    />
                    <Checkbox
                        checked={isSelected}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                        className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 w-4 h-4 rounded border-gray-300"
                    />
                </div>
            </div>
        )
    },
    size: 50,
    minSize: 50,
    enableResizing: false,
}

// Modify existing Name column to remove its checkbox and left padding
const modifiedListViewColumns = listViewColumns.map((col: any) => {
    if (col.accessorKey === "name") {
        return {
            ...col,
            header: ({ column, table }: any) => (
                <HeaderMenu
                    title="Task Name"
                    columnId="name"
                    table={table}
                />
            ),
            cell: ({ getValue, row, table, ...rest }: any) => {
                const name = getValue() as string
                const tags = (row.original as any).tags || []
                const avatar = (row.original as any).avatar
                const isAddingSubtask = (table.options.meta as any)?.addingSubtaskTo === row.id
                const isExpanded = row.getIsExpanded()
                const subtasks = (row.original as any).subtasks || []
                const dragHandleProps = (rest as any).dragHandleProps

                return <NameModule
                    name={name}
                    avatar={avatar}
                    tags={tags}
                    taskID={row.original.taskID}
                    dragHandleProps={dragHandleProps}
                    isAddingSubtask={isAddingSubtask}
                    isExpanded={isExpanded}
                    canExpand={subtasks.length > 0}
                    subtaskCount={subtasks.length}
                    depth={row.depth}
                    isSelected={row.getIsSelected()}
                    onToggleSelect={(value) => row.toggleSelected(!!value)}
                    onToggleExpand={() => {
                        if (subtasks.length > 0) {
                            row.toggleExpanded();
                            if (!isExpanded) {
                                (table.options.meta as any)?.onAddSubtask(row.id);
                            }
                        } else {
                            (table.options.meta as any)?.onAddSubtask(row.id);
                        }
                    }}
                    onAddSubtask={() => (table.options.meta as any)?.onAddSubtask(row.id)}
                    variant="table"
                />
            }
        }
    }
    return col
})

export const columns: ColumnDef<taskTable>[] = [
    indexColumn,
    ...modifiedListViewColumns
]
