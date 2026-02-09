"use client"

import * as React from "react"
import { Table } from "@tanstack/react-table"
import {
    X,
    Search,
    Circle,
    Flag,
    Box,
    PlayCircle,
    Zap,
    Calendar,
    Clock,
    User,
    MessageSquare,
    Hash,
    PenTool,
    GripVertical
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core"
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { CustomFieldSidebar } from "./CustomFieldSidebar"

// Simple Switch Component since one wasn't found
const Switch = ({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (checked: boolean) => void }) => (
    <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onCheckedChange(!checked)}
        className={cn(
            "peer inline-flex h-[20px] w-[36px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
            checked ? "bg-blue-600" : "bg-gray-200"
        )}
    >
        <span
            className={cn(
                "pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform",
                checked ? "translate-x-4" : "translate-x-0"
            )}
        />
    </button>
)

interface ColumnItem {
    id: string
    label: string
    icon: any
}

interface SortableItemProps {
    item: ColumnItem
    table: Table<any>
    onCustomToggle?: () => void
}

function SortableItem({ item, table, onCustomToggle }: SortableItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: item.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    const column = table.getColumn(item.id)
    const isVisible = column?.getIsVisible() ?? true

    const handleToggle = (checked: boolean) => {
        // Special handling for custom field
        if (item.id === "custom" && checked && onCustomToggle) {
            onCustomToggle()
        } else {
            column?.toggleVisibility(checked)
        }
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn(
                "flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg group transition-colors",
                isDragging && "opacity-50 bg-gray-100"
            )}
        >
            <div className="flex items-center gap-3">
                <div
                    {...attributes}
                    {...listeners}
                    className="text-gray-400 hover:text-gray-600 transition-colors cursor-grab active:cursor-grabbing"
                >
                    <GripVertical className="w-4 h-4" />
                </div>
                <item.icon className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                    {item.label}
                </span>
            </div>
            <Switch
                checked={isVisible}
                onCheckedChange={handleToggle}
            />
        </div>
    )
}

interface AddColumsProps<TData> {
    table: Table<TData>
    isOpen: boolean
    onClose: () => void
}

export function AddColums<TData>({ table, isOpen, onClose }: AddColumsProps<TData>) {
    const [searchQuery, setSearchQuery] = React.useState("")
    const [isCustomFieldSidebarOpen, setIsCustomFieldSidebarOpen] = React.useState(false)

    const [categories, setCategories] = React.useState([
        {
            title: "Task Basics",
            items: [
                { id: "status", label: "Status", icon: Circle },
                { id: "priority", label: "Priority", icon: Flag },
                { id: "taskType", label: "Task Type", icon: Box },
                { id: "sprints", label: "Sprints", icon: PlayCircle },
                { id: "sprintPoints", label: "Sprint Points", icon: Zap },
            ]
        },
        {
            title: "Dates",
            items: [
                { id: "startDate", label: "Start Date", icon: Calendar },
                { id: "dueDate", label: "Due Date", icon: Calendar },
                { id: "dateCreated", label: "Date Created", icon: Calendar },
                { id: "dateClosed", label: "Date Closed", icon: Calendar },
            ]
        },
        {
            title: "Time",
            items: [
                { id: "timeEstimate", label: "Time Estimated", icon: Clock },
                { id: "timeTracker", label: "Time Tracked", icon: Clock },
            ]
        },
        {
            title: "Meta data",
            items: [
                { id: "createdBy", label: "Created by", icon: User },
                { id: "comments", label: "Comments", icon: MessageSquare },
                { id: "taskID", label: "Task ID", icon: Hash },
                { id: "custom", label: "Custom", icon: PenTool },
            ]
        }
    ])

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

    const handleDragEnd = (event: DragEndEvent, categoryIndex: number) => {
        const { active, over } = event

        if (!over || active.id === over.id) return

        setCategories((prevCategories) => {
            const newCategories = [...prevCategories]
            const category = newCategories[categoryIndex]
            const oldIndex = category.items.findIndex((item) => item.id === active.id)
            const newIndex = category.items.findIndex((item) => item.id === over.id)

            category.items = arrayMove(category.items, oldIndex, newIndex)

            return newCategories
        })
    }

    // Sync table column order when categories change
    React.useEffect(() => {
        const allColumnIds = categories.flatMap(cat => cat.items.map(item => item.id))
        const fullOrder = ['name', 'assignees', ...allColumnIds, 'addNewColumn']
        table.setColumnOrder(fullOrder)
    }, [categories, table])

    if (!isOpen) return null

    const filteredCategories = categories.map((cat, originalIndex) => ({
        ...cat,
        originalIndex,
        items: cat.items.filter(item =>
            item.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(cat => cat.items.length > 0)


    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Sidebar */}
            <div className="relative w-[400px] h-full bg-white shadow-xl flex flex-col animate-in slide-in-from-right duration-300">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                        <h2 className="text-lg font-semibold text-gray-900">Fields</h2>
                    </div>
                </div>

                {/* Search */}
                <div className="p-4 border-b border-gray-100">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {filteredCategories.map((category, categoryIndex) => (
                        <div key={category.title}>
                            <div className="flex items-center justify-between mb-3 px-1">
                                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {category.title}
                                </h3>
                            </div>
                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={(event) => handleDragEnd(event, category.originalIndex)}
                            >
                                <SortableContext
                                    items={category.items.map(item => item.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    <div className="space-y-1">
                                        {category.items.map((item) => (
                                            <SortableItem
                                                key={item.id}
                                                item={item}
                                                table={table}
                                                onCustomToggle={() => setIsCustomFieldSidebarOpen(true)}
                                            />
                                        ))}
                                    </div>
                                </SortableContext>
                            </DndContext>
                        </div>
                    ))}
                </div>
            </div>

            {/* Custom Field Sidebar */}
            <CustomFieldSidebar
                isOpen={isCustomFieldSidebarOpen}
                onClose={() => setIsCustomFieldSidebarOpen(false)}
                onCreateField={(fieldName, fillMethod) => {
                    console.log("Creating custom field:", fieldName, fillMethod)
                    // Enable the custom column visibility
                    table.getColumn("custom")?.toggleVisibility(true)
                }}
            />
        </div>
    )
}
