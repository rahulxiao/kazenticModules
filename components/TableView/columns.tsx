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
    header: ({ table }) => {
        const isSelected = table.getIsAllPageRowsSelected() || table.getIsSomePageRowsSelected()
        return (
            <div className="group/header flex items-center justify-center w-full h-full relative">
                <span className={cn(
                    "transition-opacity duration-200 text-[13px] text-gray-500 font-semibold",
                    isSelected ? "opacity-0 hidden" : "group-hover/header:opacity-0 group-hover/header:hidden"
                )}>
                    #
                </span>
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                    className={cn(
                        "absolute transition-opacity duration-200 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600",
                        isSelected ? "opacity-100 relative" : "opacity-0 group-hover/header:opacity-100 group-hover/header:relative"
                    )}
                />
            </div>
        )
    },
    cell: ({ row, table, ...rest }: any) => {
        const dragHandleProps = rest.dragHandleProps
        const isSelected = row.getIsSelected()

        return (
            <div
                className="flex items-center justify-center w-full h-full relative group/index-cell"
            >
                {/* Index Number: Visible when NOT selected AND NOT hovered */}
                <span className={cn(
                    "text-xs font-medium text-gray-500 transition-all absolute",
                    isSelected ? "opacity-0 scale-90" : "group-hover:opacity-0 group-hover:scale-90"
                )}>
                    {row.index + 1}
                </span>

                {/* Drag Handle & Checkbox Container: Visible when Selected OR Hovered */}
                <div
                    className={cn(
                        "flex items-center gap-1 transition-all",
                        isSelected
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 pointer-events-none group-hover:pointer-events-auto"
                    )}
                >
                    <GripVertical
                        size={14}
                        className="text-gray-400 cursor-grab active:cursor-grabbing"
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
                    title="Name"
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
