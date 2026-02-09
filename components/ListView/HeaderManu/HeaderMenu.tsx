"use client"

import * as React from "react"
import { Table as TanStackTable } from "@tanstack/react-table"
import {
    ArrowDownWideNarrow,
    ArrowLeftToLine,
    ArrowRightToLine,
    ArrowUpDown,
    Calculator,
    Copy,
    EyeOff,
    Settings,
    Trash,
    UserCog,
    Zap,
    ChevronUp,
    ChevronDown,
    LucideIcon,
    ArrowUp,
    ArrowDown,
    Hash,
    X,
} from "lucide-react"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { SortingOrderPanel } from "./SortingOrderPanel"
import { CustomizeTaskIdDialog } from "./CustomizeTaskIdDialog"
import { CalculatePopover } from "./CalculatePopover"

export type MenuAction =
    | "sort"
    | "sortEntireColumn"
    | "editField"
    | "privacyPermissions"
    | "moveToStart"
    | "moveToEnd"
    | "calculate"
    | "automate"
    | "hideColumn"
    | "duplicate"
    | "deleteField"
    | "customizeTaskId"
    | "clearSort"

export interface MenuItemConfig {
    id: MenuAction
    icon: LucideIcon
    label: string
    action: (columnId: string) => void
}

export interface MenuSection {
    items: MenuAction[]
}

export interface HeaderMenuConfig {
    sections: MenuSection[]
}

export const menuItemDefinitions: Record<MenuAction, Omit<MenuItemConfig, "action">> = {
    sort: {
        id: "sort",
        icon: ArrowUpDown,
        label: "Sort",
    },
    sortEntireColumn: {
        id: "sortEntireColumn",
        icon: ArrowDownWideNarrow,
        label: "Sort entire column",
    },
    editField: {
        id: "editField",
        icon: Settings,
        label: "Edit field",
    },
    privacyPermissions: {
        id: "privacyPermissions",
        icon: UserCog,
        label: "Privacy and permissions",
    },
    moveToStart: {
        id: "moveToStart",
        icon: ArrowLeftToLine,
        label: "Move to start",
    },
    moveToEnd: {
        id: "moveToEnd",
        icon: ArrowRightToLine,
        label: "Move to end",
    },
    calculate: {
        id: "calculate",
        icon: Calculator,
        label: "Calculate",
    },
    automate: {
        id: "automate",
        icon: Zap,
        label: "Automate",
    },
    hideColumn: {
        id: "hideColumn",
        icon: EyeOff,
        label: "Hide column",
    },
    duplicate: {
        id: "duplicate",
        icon: Copy,
        label: "Duplicate",
    },
    deleteField: {
        id: "deleteField",
        icon: Trash,
        label: "Delete field",
    },
    customizeTaskId: {
        id: "customizeTaskId",
        icon: Hash,
        label: "Customize task ID",
    },
    clearSort: {
        id: "clearSort",
        icon: X,
        label: "Clear sort",
    },
}

export const defaultActions: Record<MenuAction, (columnId: string) => void> = {
    sort: (columnId) => console.log(`Sort column: ${columnId}`),
    sortEntireColumn: (columnId) => console.log(`Sort entire column: ${columnId}`),
    editField: (columnId) => console.log(`Edit field: ${columnId}`),
    privacyPermissions: (columnId) => console.log(`Privacy and permissions: ${columnId}`),
    moveToStart: (columnId) => console.log(`Move to start: ${columnId}`),
    moveToEnd: (columnId) => console.log(`Move to end: ${columnId}`),
    calculate: (columnId) => console.log(`Calculate: ${columnId}`),
    automate: (columnId) => console.log(`Automate: ${columnId}`),
    hideColumn: (columnId) => console.log(`Hide column: ${columnId}`),
    duplicate: (columnId) => console.log(`Duplicate: ${columnId}`),
    deleteField: (columnId) => console.log(`Delete field: ${columnId}`),
    customizeTaskId: (columnId) => console.log(`Customize task ID: ${columnId}`),
    clearSort: (columnId) => console.log(`Clear sort: ${columnId}`),
}

const fullMenuConfig: HeaderMenuConfig = {
    sections: [
        { items: ["sort", "sortEntireColumn"] },
        { items: ["editField", "privacyPermissions"] },
        { items: ["moveToStart", "moveToEnd", "calculate", "automate"] },
        { items: ["hideColumn", "duplicate", "deleteField"] },
    ],
}

const basicMenuConfig: HeaderMenuConfig = {
    sections: [
        { items: ["sort"] },
        { items: ["hideColumn", "duplicate"] },
    ],
}

const readOnlyMenuConfig: HeaderMenuConfig = {
    sections: [
        { items: ["sort", "sortEntireColumn"] },
        { items: ["hideColumn"] },
    ],
}

const customFieldMenuConfig: HeaderMenuConfig = {
    sections: [
        { items: ["sort", "sortEntireColumn"] },
        { items: ["editField", "privacyPermissions"] },
        { items: ["moveToStart", "moveToEnd", "automate"] },
        { items: ["hideColumn", "duplicate", "deleteField"] },
    ],
}

const taskIDMenuConfig: HeaderMenuConfig = {
    sections: [
        { items: ["customizeTaskId"] },
        { items: ["sort", "sortEntireColumn"] },
        { items: ["hideColumn"] },
    ],
}
const customCommonMenuConfig: HeaderMenuConfig = {
    sections: [
        { items: ["sort", "sortEntireColumn"] },
        { items: ["moveToStart", "moveToEnd", "calculate"] },
        { items: ["hideColumn"] },
    ],
}

export const columnMenuConfigs: Record<string, HeaderMenuConfig> = {
    // Full featured columns
    status: fullMenuConfig,
    priority: fullMenuConfig,
    taskType: fullMenuConfig,
    sprints: fullMenuConfig,
    sprintPoints: fullMenuConfig,

    // Date columns
    startDate: customCommonMenuConfig,
    dueDate: customCommonMenuConfig,
    dateClosed: customCommonMenuConfig,

    // Time columns
    timeEstimate: customCommonMenuConfig,
    timeTracker: customCommonMenuConfig,

    // Assignee column
    assignees: customCommonMenuConfig,

    // Read-only columns
    dateCreated: readOnlyMenuConfig,
    createdBy: readOnlyMenuConfig,
    comments: readOnlyMenuConfig,
    taskID: taskIDMenuConfig,

    // Custom field
    custom: customFieldMenuConfig,
}

interface HeaderMenuProps {
    title: string
    columnId?: string
    className?: string
    config?: HeaderMenuConfig
    customActions?: Partial<Record<MenuAction, (columnId: string) => void>>
    table?: TanStackTable<any>
}

export function HeaderMenu({
    title,
    columnId,
    className,
    config,
    customActions = {},
    table,
}: HeaderMenuProps) {
    const [open, setOpen] = React.useState(false)
    const [customizeTaskIdOpen, setCustomizeTaskIdOpen] = React.useState(false)
    const [calculateOpen, setCalculateOpen] = React.useState(false)

    // Determine which config to use
    const menuConfig = config || (columnId && columnMenuConfigs[columnId]) || fullMenuConfig

    // Get current sort state for this column
    const column = table && columnId ? table.getColumn(columnId) : null
    const currentSort = column?.getIsSorted()

    // Create sort functions that use the table instance
    const createSortActions = () => {
        if (!table || !columnId) return {}

        return {
            sort: (colId: string) => {
                const column = table.getColumn(colId)
                if (!column) return

                // Get current sorting state
                const currentSorting = table.getState().sorting
                const existingSortIndex = currentSorting.findIndex(s => s.id === colId)

                let newSorting
                if (existingSortIndex >= 0) {
                    // Column is already sorted, toggle its direction
                    const currentSort = currentSorting[existingSortIndex]
                    newSorting = [...currentSorting]
                    newSorting[existingSortIndex] = {
                        id: colId,
                        desc: !currentSort.desc // Toggle direction
                    }
                } else {
                    // Column is not sorted, add it to the sorting array (multi-sort)
                    newSorting = [
                        ...currentSorting,
                        { id: colId, desc: false } // Start with ascending
                    ]
                }

                table.setSorting(newSorting)
            },
            sortEntireColumn: (colId: string) => {
                const column = table.getColumn(colId)
                if (!column) return

                // Clear all other sorting and set only this column
                const currentSort = column.getIsSorted()
                table.setSorting([
                    { id: colId, desc: currentSort === 'asc' ? true : false }
                ])
            },
            moveToStart: (colId: string) => {
                if (!table) return

                const currentOrder = table.getState().columnOrder
                const columnIndex = currentOrder.indexOf(colId)

                // Don't move if it's the 'name' column or already at position 1 (after 'name')
                if (colId === 'name' || columnIndex <= 1) return

                // Move to position 1 (right after 'name' which is always at 0)
                const newOrder = [
                    currentOrder[0], // Keep 'name' at the start
                    colId,
                    ...currentOrder.slice(1, columnIndex),
                    ...currentOrder.slice(columnIndex + 1)
                ]

                table.setColumnOrder(newOrder)
            },
            moveToEnd: (colId: string) => {
                if (!table) return

                const currentOrder = table.getState().columnOrder
                const columnIndex = currentOrder.indexOf(colId)

                // Don't move if it's the 'name' column or 'addNewColumn', or already at the end
                if (colId === 'name' || colId === 'addNewColumn') return

                // Find the position before 'addNewColumn' (if it exists)
                const addColumnIndex = currentOrder.indexOf('addNewColumn')
                const targetEndIndex = addColumnIndex !== -1 ? addColumnIndex : currentOrder.length

                // If already at the end position, do nothing
                if (columnIndex === targetEndIndex - 1) return

                // Move to the end (before 'addNewColumn' if it exists)
                const newOrder = [
                    ...currentOrder.slice(0, columnIndex),
                    ...currentOrder.slice(columnIndex + 1, targetEndIndex),
                    colId,
                    ...(addColumnIndex !== -1 ? [currentOrder[addColumnIndex]] : [])
                ]

                table.setColumnOrder(newOrder)
            },
            hideColumn: (colId: string) => {
                if (!table) return

                table.getColumn(colId)?.toggleVisibility(false)
            },
            duplicate: (colId: string) => {
                (table.options.meta as any)?.duplicateColumn?.(colId)
            },
            deleteField: (colId: string) => {
                if (!table) return

                table.getColumn(colId)?.toggleVisibility(false)
            },
            customizeTaskId: (colId: string) => {
                setCustomizeTaskIdOpen(true)
            },
            calculate: (colId: string) => {
                setCalculateOpen(true)
            },
            clearSort: (colId: string) => {
                const currentSorting = table.getState().sorting
                const newSorting = currentSorting.filter(s => s.id !== colId)
                table.setSorting(newSorting)
            },
        }
    }

    // Merge custom actions with defaults and sort actions
    const actions = {
        ...defaultActions,
        ...createSortActions(),
        ...customActions
    }

    const handleItemClick = (action: MenuAction) => {
        const actionFn = actions[action]
        if (actionFn) {
            actionFn(columnId || title)
        }
        setOpen(false)
    }

    // Direct sort handlers for chevron buttons
    const handleSortAscending = (e: React.MouseEvent) => {
        e.stopPropagation() // Prevent popover from opening
        if (!table || !columnId) return

        const currentSorting = table.getState().sorting
        const existingSortIndex = currentSorting.findIndex(s => s.id === columnId)

        let newSorting
        if (existingSortIndex >= 0) {
            // Update existing sort to ascending
            newSorting = [...currentSorting]
            newSorting[existingSortIndex] = { id: columnId, desc: false }
        } else {
            // Add new ascending sort
            newSorting = [...currentSorting, { id: columnId, desc: false }]
        }

        table.setSorting(newSorting)
    }

    const handleSortDescending = (e: React.MouseEvent) => {
        e.stopPropagation() // Prevent popover from opening
        if (!table || !columnId) return

        const currentSorting = table.getState().sorting
        const existingSortIndex = currentSorting.findIndex(s => s.id === columnId)

        let newSorting
        if (existingSortIndex >= 0) {
            // Update existing sort to descending
            newSorting = [...currentSorting]
            newSorting[existingSortIndex] = { id: columnId, desc: true }
        } else {
            // Add new descending sort
            newSorting = [...currentSorting, { id: columnId, desc: true }]
        }

        table.setSorting(newSorting)
    }

    return (
        <>
            <div className="absolute top-0 left-0 w-full h-10 pointer-events-none invisible">
                <CalculatePopover
                    open={calculateOpen}
                    onOpenChange={setCalculateOpen}
                    onCalculate={(method) => {
                        (table?.options.meta as any)?.handleCalculate?.(columnId, method)
                    }}
                >
                    <div className="w-full h-full" />
                </CalculatePopover>
            </div>

            <Popover open={open} onOpenChange={setOpen}>
                <div className="flex items-center justify-between gap-2 w-full group">
                    <PopoverTrigger asChild>
                        <button className="flex items-center gap-1.5 text-left font-normal text-muted-foreground px-2 py-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-md transition-colors flex-1">
                            {title}
                            {currentSort && (
                                <span className="text-blue-600">
                                    {currentSort === 'asc' ? (
                                        <ArrowUp className="h-3 w-3" />
                                    ) : (
                                        <ArrowDown className="h-3 w-3" />
                                    )}
                                </span>
                            )}
                        </button>
                    </PopoverTrigger>
                    <div className="flex flex-col -space-y-1 pr-2">
                        <button
                            onClick={handleSortAscending}
                            className={cn(
                                "hover:bg-black/10 dark:hover:bg-white/20 rounded-sm transition-colors p-0.5",
                                currentSort === 'asc' && "text-blue-600"
                            )}
                            title="Sort ascending"
                        >
                            <ChevronUp className="h-2.5 w-2.5" />
                        </button>
                        <button
                            onClick={handleSortDescending}
                            className={cn(
                                "hover:bg-black/10 dark:hover:bg-white/20 rounded-sm transition-colors p-0.5",
                                currentSort === 'desc' && "text-blue-600"
                            )}
                            title="Sort descending"
                        >
                            <ChevronDown className="h-2.5 w-2.5" />
                        </button>
                    </div>
                </div>
                <PopoverContent
                    align="start"
                    className="w-[280px] max-h-[600px] p-0 shadow-xl border-border/50 overflow-hidden"
                >
                    {table && <SortingOrderPanel table={table} />}
                    <div className="flex flex-col text-sm py-1 overflow-y-auto max-h-[500px]">
                        {/* Dynamic "Clear sort" option */}
                        {currentSort && (
                            <div className="p-1 border-b border-border/50">
                                <MenuItem
                                    icon={menuItemDefinitions.clearSort.icon}
                                    label={menuItemDefinitions.clearSort.label}
                                    onClick={() => handleItemClick("clearSort")}
                                />
                            </div>
                        )}
                        {menuConfig.sections.map((section, sectionIndex) => (
                            <div
                                key={sectionIndex}
                                className={cn(
                                    "p-1",
                                    sectionIndex < menuConfig.sections.length - 1 && "border-b border-border/50"
                                )}
                            >
                                {section.items.map((itemId) => {
                                    const itemDef = menuItemDefinitions[itemId]
                                    return (
                                        <MenuItem
                                            key={itemId}
                                            icon={itemDef.icon}
                                            label={itemDef.label}
                                            onClick={() => handleItemClick(itemId)}
                                        />
                                    )
                                })}
                            </div>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>

            <CustomizeTaskIdDialog
                open={customizeTaskIdOpen}
                onOpenChange={setCustomizeTaskIdOpen}
            />
        </>
    )
}

function MenuItem({
    icon: Icon,
    label,
    onClick,
}: {
    icon: LucideIcon
    label: string
    onClick: () => void
}) {
    return (
        <div
            onClick={onClick}
            className="flex items-center gap-3 px-3 py-2 hover:bg-muted/50 cursor-pointer rounded-sm transition-colors"
        >
            <Icon className="h-4 w-4 text-muted-foreground stroke-[1.5px]" />
            <span className="font-medium text-foreground/80">{label}</span>
        </div>
    )
}
