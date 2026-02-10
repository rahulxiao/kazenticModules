"use client"

import * as React from "react"
import {
    X,
    Trash2,
    Calendar,
    Users,
    Tag,
    MoreHorizontal,
    Copy,
    ArrowRightCircle,
    CheckCircle2,
    Zap,
    Flag,
    Link,
    Eye,
    Box,
    Edit,
    RotateCcw,
    FolderInput,
    Clipboard,
    Archive,
    CopyPlus,
    GitMerge,
    Search
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { STATUSES } from "./StatusModule"
import { PriorityPopOver } from "./PriorityPopOver"
import { AssigneePopOver } from "./AssigneePopOver"
import { DatePicker } from "./DatePicker"

interface BulkActionsToolbarProps {
    selectedCount: number
    onClearSelection: () => void
    onDelete: () => void
    onUpdateStatus: (status: string) => void
    onUpdateAssignees: (assignees: string[]) => void
    onUpdateStartDate: (date: string) => void
    onUpdateDueDate: (date: string) => void
    onUpdatePriority: (priority: string) => void
}

const MORE_ACTIONS = [
    {
        title: "Set or change",
        items: [
            { label: "Custom Fields", icon: Edit, id: "custom_fields" },
            { label: "Task Type", icon: Box, id: "task_type" },
            { label: "Status", icon: CheckCircle2, id: "status" },
            { label: "Assignees", icon: Users, id: "assignees" },
            { label: "Dates", icon: Calendar, id: "dates" },
            { label: "Sprint Points", icon: Zap, id: "sprint_points" },
            { label: "Tags", icon: Tag, id: "tags" },
            { label: "Priority", icon: Flag, id: "priority" },
            { label: "Followers", icon: Eye, id: "followers" },
            { label: "Dependencies", icon: Link, id: "dependencies" },
        ]
    },
    {
        title: "Apply an action",
        items: [
            { label: "Move/Add", icon: FolderInput, id: "move_add" },
            { label: "Duplicate", icon: CopyPlus, id: "duplicate" },
            { label: "Convert to Subtask", icon: RotateCcw, id: "convert_subtask" },
            { label: "Merge Tasks", icon: GitMerge, id: "merge" },
            { label: "Relationships", icon: Link, id: "relationships" },
            { label: "Copy to clipboard", icon: Clipboard, id: "copy_clipboard" },
            { label: "Remove from List", icon: X, id: "remove_list" },
            { label: "Archive", icon: Archive, id: "archive" },
        ]
    }
]

export function BulkActionsToolbar({
    selectedCount,
    onClearSelection,
    onDelete,
    onUpdateStatus,
    onUpdateAssignees,
    onUpdateStartDate,
    onUpdateDueDate,
    onUpdatePriority
}: BulkActionsToolbarProps) {
    const [activePopover, setActivePopover] = React.useState<string | null>(null)
    const [bulkAssignees, setBulkAssignees] = React.useState<string[]>([])

    // Reset bulk assignees when selection is cleared
    React.useEffect(() => {
        if (selectedCount === 0) {
            setBulkAssignees([])
            setActivePopover(null)
        }
    }, [selectedCount])

    if (selectedCount === 0) return null

    const handleActionClick = (id: string) => {
        setActivePopover(id)
    }

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
            {/* Main container */}
            <div className="flex items-center gap-2 bg-white border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-lg px-2 py-2 pr-4">
                {/* Selection Count & Clear */}
                <div className="flex items-center gap-2 bg-gray-100 text-gray-900 rounded px-3 py-1.5 mr-2">
                    <span className="text-sm font-medium whitespace-nowrap">
                        {selectedCount} Task{selectedCount > 1 ? "s" : ""} selected
                    </span>
                    <button
                        onClick={onClearSelection}
                        className="hover:bg-gray-200 rounded-full p-0.5 transition-colors"
                    >
                        <X size={14} />
                    </button>
                </div>

                {/* Status */}
                <Popover open={activePopover === 'status'} onOpenChange={(open) => setActivePopover(open ? 'status' : null)}>
                    <PopoverTrigger asChild>
                        <ToolbarButton icon={CheckCircle2} label="Status" />
                    </PopoverTrigger>
                    <PopoverContent className="w-[240px] p-0" align="start">
                        <div className="p-2 space-y-1">
                            <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase">
                                Set Status
                            </div>
                            {STATUSES.map((status) => {
                                const Icon = status.icon
                                return (
                                    <button
                                        key={status.value}
                                        onClick={() => {
                                            onUpdateStatus(status.value)
                                            setActivePopover(null)
                                        }}
                                        className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-gray-100 rounded-sm text-sm"
                                    >
                                        <Icon size={16} className={status.color} />
                                        <span>{status.label}</span>
                                    </button>
                                )
                            })}
                        </div>
                    </PopoverContent>
                </Popover>

                {/* Assignees */}
                <AssigneePopOver
                    assignees={bulkAssignees}
                    onAssigneesChange={(newAssignees) => {
                        setBulkAssignees(newAssignees)
                        onUpdateAssignees(newAssignees)
                    }}
                    open={activePopover === 'assignees'}
                    onOpenChange={(open) => setActivePopover(open ? 'assignees' : null)}
                >
                    <ToolbarButton icon={Users} label="Assignees" />
                </AssigneePopOver>

                {/* Dates */}
                <DatePicker
                    startDate=""
                    dueDate=""
                    onStartDateChange={onUpdateStartDate}
                    onDueDateChange={onUpdateDueDate}
                    open={activePopover === 'dates'}
                    onOpenChange={(open) => setActivePopover(open ? 'dates' : null)}
                >
                    <ToolbarButton icon={Calendar} label="Dates" />
                </DatePicker>

                <ToolbarButton icon={Tag} label="Tags" />

                <div className="w-px h-4 bg-gray-200 mx-1" />

                <ToolbarButton icon={ArrowRightCircle} label="Move/Add" />
                <ToolbarButton icon={Copy} label="Copy" />

                <div className="w-px h-4 bg-gray-200 mx-1" />

                {/* Delete Button */}
                <button
                    onClick={onDelete}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-red-50 text-red-600 transition-colors text-sm font-medium"
                >
                    <Trash2 size={16} />
                    <span>Delete</span>
                </button>

                <div className="w-px h-4 bg-gray-200 mx-1" />

                {/* More Options Popover */}
                <Popover open={activePopover === 'more'} onOpenChange={(open) => setActivePopover(open ? 'more' : null)}>
                    <PopoverTrigger asChild>
                        <button className="p-1.5 hover:bg-gray-100 rounded-md text-gray-500">
                            <MoreHorizontal size={18} />
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[500px] p-0 bg-white border border-gray-100 shadow-xl rounded-xl" align="center" sideOffset={10}>
                        <div className="p-3 border-b border-gray-100">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full bg-gray-50 border-none rounded-md pl-8 pr-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/20"
                                />
                            </div>
                        </div>
                        <div className="p-2 max-h-[400px] overflow-y-auto flex gap-4">
                            {MORE_ACTIONS.map((section, idx) => (
                                <div key={idx} className="flex-1 min-w-0">
                                    <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 mb-1">
                                        {section.title}
                                    </div>
                                    <div className="space-y-0.5">
                                        {section.items.map((item) => {
                                            const Icon = item.icon

                                            // Base button content
                                            const ButtonContent = (
                                                <button
                                                    onClick={() => {
                                                        if (!['status', 'assignees', 'dates', 'priority'].includes(item.id)) {
                                                            handleActionClick(item.id)
                                                        }
                                                    }}
                                                    className="w-full flex items-center gap-2.5 px-2 py-1.5 hover:bg-gray-100 rounded text-sm text-gray-700 transition-colors text-left group"
                                                >
                                                    <Icon size={16} className="text-gray-400 group-hover:text-gray-600" />
                                                    <span className="truncate">{item.label}</span>
                                                </button>
                                            )

                                            if (item.id === 'assignees') {
                                                return (
                                                    <AssigneePopOver
                                                        key={item.id}
                                                        assignees={bulkAssignees}
                                                        onAssigneesChange={(newAssignees) => {
                                                            setBulkAssignees(newAssignees)
                                                            onUpdateAssignees(newAssignees)
                                                        }}
                                                    >
                                                        {ButtonContent}
                                                    </AssigneePopOver>
                                                )
                                            }

                                            if (item.id === 'dates') {
                                                return (
                                                    <DatePicker
                                                        key={item.id}
                                                        startDate=""
                                                        dueDate=""
                                                        onStartDateChange={onUpdateStartDate}
                                                        onDueDateChange={onUpdateDueDate}
                                                    >
                                                        {ButtonContent}
                                                    </DatePicker>
                                                )
                                            }

                                            if (item.id === 'priority') {
                                                return (
                                                    <PriorityPopOver
                                                        key={item.id}
                                                        priority=""
                                                        onPriorityChange={(p) => {
                                                            onUpdatePriority(p)
                                                            setActivePopover(null)
                                                        }}
                                                    >
                                                        {ButtonContent}
                                                    </PriorityPopOver>
                                                )
                                            }

                                            if (item.id === 'status') {
                                                return (
                                                    <Popover key={item.id}>
                                                        <PopoverTrigger asChild>
                                                            {ButtonContent}
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-[240px] p-0" align="start" side="right">
                                                            <div className="p-2 space-y-1">
                                                                <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase">
                                                                    Set Status
                                                                </div>
                                                                {STATUSES.map((status) => {
                                                                    const StatusIcon = status.icon
                                                                    return (
                                                                        <button
                                                                            key={status.value}
                                                                            onClick={() => {
                                                                                onUpdateStatus(status.value)
                                                                                setActivePopover(null)
                                                                            }}
                                                                            className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-gray-100 rounded-sm text-sm"
                                                                        >
                                                                            <StatusIcon size={16} className={status.color} />
                                                                            <span>{status.label}</span>
                                                                        </button>
                                                                    )
                                                                })}
                                                            </div>
                                                        </PopoverContent>
                                                    </Popover>
                                                )
                                            }

                                            return <React.Fragment key={item.id}>{ButtonContent}</React.Fragment>
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}

const ToolbarButton = React.forwardRef<HTMLButtonElement, { icon: any, label: string } & React.ButtonHTMLAttributes<HTMLButtonElement>>(
    ({ icon: Icon, label, className, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-gray-100 text-gray-700 transition-colors text-sm font-medium whitespace-nowrap",
                    className
                )}
                {...props}
            >
                <Icon size={16} className="text-gray-500" />
                <span>{label}</span>
            </button>
        )
    }
)
ToolbarButton.displayName = "ToolbarButton"