"use client"

import * as React from "react"
import { Table as TanStackTable } from "@tanstack/react-table"
import { GripVertical, X, ArrowUp, ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
    DragOverlay,
} from "@dnd-kit/core"
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { restrictToVerticalAxis, restrictToParentElement } from "@dnd-kit/modifiers"

interface SortingOrderPanelProps {
    table: TanStackTable<any>
}

interface SortItem {
    id: string
    label: string
    desc: boolean
}

function SortableItem({ item, onRemove, index }: { item: SortItem; onRemove: () => void; index: number }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
        setActivatorNodeRef,
    } = useSortable({ id: item.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn(
                "flex items-center justify-between gap-2 px-2.5 py-2 bg-muted/30 hover:bg-muted/50 rounded border border-border/30 group transition-colors",
                isDragging && "opacity-0 invisible h-[38px]" // MUST keep a fixed height to prevent menu from shifting
            )}
        >
            <div className="flex items-center gap-2 flex-1">
                <button
                    ref={setActivatorNodeRef}
                    {...attributes}
                    {...listeners}
                    className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground transition-colors p-1 -m-1 rounded hover:bg-muted/50"
                >
                    <GripVertical className="w-3.5 h-3.5" />
                </button>
                <div className="flex items-center gap-2 flex-1">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white text-xs font-bold">
                        {index + 1}
                    </span>
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                </div>
            </div>
            <div className="flex items-center gap-1.5">
                <div className="text-muted-foreground">
                    {item.desc ? (
                        <ArrowDown className="w-3.5 h-3.5" />
                    ) : (
                        <ArrowUp className="w-3.5 h-3.5" />
                    )}
                </div>
                <button
                    onClick={onRemove}
                    className="text-muted-foreground hover:text-foreground transition-colors opacity-0 group-hover:opacity-100"
                >
                    <X className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    )
}

export function SortingOrderPanel({ table }: SortingOrderPanelProps) {
    const sorting = table.getState().sorting
    const [activeId, setActiveId] = React.useState<string | null>(null)

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    // Convert sorting state to sortable items
    const sortItems: SortItem[] = sorting.map((sort) => {
        const column = table.getColumn(sort.id)
        const columnDef = column?.columnDef as any

        // Optimized label extraction to prevent artifacts like double letters
        let label = sort.id.charAt(0).toUpperCase() + sort.id.slice(1).replace(/([A-Z])/g, ' $1')

        // Try to get the title from props if available
        if (columnDef?.header?.props?.title) {
            label = columnDef.header.props.title
        } else if (typeof columnDef?.header === 'string') {
            label = columnDef.header
        }

        return {
            id: sort.id,
            label,
            desc: sort.desc,
        }
    })

    const handleDragStart = (event: any) => {
        setActiveId(event.active.id)
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        setActiveId(null)

        if (!over || active.id === over.id) return

        const oldIndex = sortItems.findIndex((item) => item.id === active.id)
        const newIndex = sortItems.findIndex((item) => item.id === over.id)

        const newSortItems = arrayMove(sortItems, oldIndex, newIndex)

        // Update the sorting state with new order
        const newSorting = newSortItems.map((item) => ({
            id: item.id,
            desc: item.desc,
        }))

        table.setSorting(newSorting)
    }

    const handleDragCancel = () => {
        setActiveId(null)
    }

    const handleRemoveSort = (columnId: string) => {
        const newSorting = sorting.filter((sort) => sort.id !== columnId)
        table.setSorting(newSorting)
    }

    const activeItem = sortItems.find((item) => item.id === activeId)
    const activeIndex = sortItems.findIndex((item) => item.id === activeId)

    if (sortItems.length === 0) return null

    // Calculate fixed height to prevent menu shifting during drag
    // Each item is approximately 38px + 6px gap (1.5 * 4px)
    const itemHeight = 38
    const gapHeight = 6
    const containerMinHeight = sortItems.length * itemHeight + (sortItems.length - 1) * gapHeight

    return (
        <div className="px-2 py-2.5 border-b border-border/50 bg-muted/20 relative overflow-hidden">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 px-1">
                Sorting order
            </div>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                modifiers={[restrictToVerticalAxis, restrictToParentElement]}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragCancel={handleDragCancel}
            >
                <SortableContext
                    items={sortItems.map((item) => item.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div
                        className="space-y-1.5"
                        style={{ minHeight: `${containerMinHeight}px` }}
                    >
                        {sortItems.map((item, index) => (
                            <SortableItem
                                key={item.id}
                                item={item}
                                index={index}
                                onRemove={() => handleRemoveSort(item.id)}
                            />
                        ))}
                    </div>
                </SortableContext>
                <DragOverlay
                    modifiers={[restrictToVerticalAxis, restrictToParentElement]}
                    dropAnimation={null}
                    zIndex={100}
                >
                    {activeItem ? (
                        <div className="flex items-center justify-between gap-2 px-2.5 py-2 bg-background border border-border rounded shadow-2xl scale-[1.02] transition-transform">
                            <div className="flex items-center gap-2 flex-1">
                                <div className="text-muted-foreground p-1">
                                    <GripVertical className="w-3.5 h-3.5" />
                                </div>
                                <div className="flex items-center gap-2 flex-1">
                                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white text-xs font-bold">
                                        {activeIndex + 1}
                                    </span>
                                    <span className="text-sm font-medium text-foreground">{activeItem.label}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="text-muted-foreground">
                                    {activeItem.desc ? (
                                        <ArrowDown className="w-3.5 h-3.5" />
                                    ) : (
                                        <ArrowUp className="w-3.5 h-3.5" />
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    )
}
