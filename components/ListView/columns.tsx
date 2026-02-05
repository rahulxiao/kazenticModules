"use client"

import { ColumnDef } from "@tanstack/react-table"
import { User } from "@/data/tableData"
import { HeaderMenu } from "./HeaderMenu"
import { DatePicker } from "./DatePicker"
import moment from "moment"
import { cn } from "@/lib/utils"
import { AssigneePopOver } from "./AssigneePopOver"

import { PriorityPopOver } from "./PriorityPopOver"

import { NameModule } from "./NameModule"
import { TimeEstimation } from "./TimeEstimation"
import { TimeTracker } from "./TimeTracker"

const formatDueDate = (dateStr: string) => {
    if (!dateStr) return "Add date"
    const hasTime = dateStr.includes(' ')
    const date = moment(dateStr)
    const today = moment().startOf('day')
    const yesterday = moment().subtract(1, 'days').startOf('day')
    const tomorrow = moment().add(1, 'days').startOf('day')

    let label = ""
    if (date.isSame(today, 'day')) label = "Today"
    else if (date.isSame(yesterday, 'day')) label = "Yesterday"
    else if (date.isSame(tomorrow, 'day')) label = "Tomorrow"
    // If it's within the current week, show day name
    else if (date.isAfter(moment().subtract(7, 'days')) && date.isBefore(moment().add(7, 'days'))) {
        label = date.format("ddd")
    } else {
        label = date.format("M/D/YY")
    }

    if (hasTime) {
        return `${label}, ${date.format("h:mma")}`
    }
    return label
}

const getDueDateStyle = (dateStr: string) => {
    if (!dateStr) return "text-gray-400"
    const date = moment(dateStr)
    const today = moment().startOf('day')
    const yesterday = moment().subtract(1, 'days').startOf('day')

    if (date.isSame(yesterday, 'day')) return "text-red-500"
    if (date.isSame(today, 'day')) return "text-orange-500"
    return "text-gray-500"
}

import { Plus, PlayCircle, Calendar } from "lucide-react"

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "name",
        header: "Name",
        enableResizing: false,
        cell: ({ getValue, row, table }) => {
            const name = getValue() as string
            const isAddingSubtask = (table.options.meta as any)?.addingSubtaskTo === row.id
            const isExpanded = row.getIsExpanded()
            const subtasks = (row.original as any).subtasks || []

            return <NameModule
                name={name}
                isAddingSubtask={isAddingSubtask}
                isExpanded={isExpanded}
                canExpand={subtasks.length > 0}
                subtaskCount={subtasks.length}
                depth={row.depth}
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
            />
        }
    },
    {
        accessorKey: "assignees",
        header: () => <HeaderMenu title="Assignee" />,
        cell: ({ getValue, row, table }) => {
            const assignees = getValue() as string[]
            return (
                <AssigneePopOver
                    assignees={assignees}
                    onAssigneesChange={(newAssignees) => {
                        (table.options.meta as any)?.updateData(row.id, "assignees", newAssignees)
                    }}
                />
            )
        }
    },
    {
        accessorKey: "dueDate",
        header: () => <HeaderMenu title="Due Date" />,
        cell: ({ getValue, row, table }) => {
            const date = getValue() as string
            const original = row.original
            return (
                <DatePicker
                    startDate={original.startDate}
                    dueDate={original.dueDate}
                    activeMode="due"
                    onStartDateChange={(newDate) => {
                        (table.options.meta as any)?.updateData(row.id, "startDate", newDate)
                    }}
                    onDueDateChange={(newDate) => {
                        (table.options.meta as any)?.updateData(row.id, "dueDate", newDate)
                    }}
                >
                    <div className={cn(
                        "cursor-pointer hover:bg-black/5 px-2 py-1 rounded transition-colors text-[14px] font-medium inline-block flex items-center gap-1.5",
                        getDueDateStyle(date)
                    )}>
                        {date ? formatDueDate(date) : <Calendar size={14} className="text-gray-300" />}
                    </div>
                </DatePicker>
            )
        }
    },
    {
        accessorKey: "startDate",
        header: () => <HeaderMenu title="Start Date" />,
        cell: ({ getValue, row, table }) => {
            const date = getValue() as string
            const original = row.original
            return (
                <DatePicker
                    startDate={original.startDate}
                    dueDate={original.dueDate}
                    activeMode="start"
                    onStartDateChange={(newDate) => {
                        (table.options.meta as any)?.updateData(row.id, "startDate", newDate)
                    }}
                    onDueDateChange={(newDate) => {
                        (table.options.meta as any)?.updateData(row.id, "dueDate", newDate)
                    }}
                >
                    <div className={cn(
                        "cursor-pointer hover:bg-black/5 px-2 py-1 rounded transition-colors text-[14px] font-medium inline-block flex items-center gap-1.5",
                        getDueDateStyle(date)
                    )}>
                        {date ? formatDueDate(date) : <Calendar size={14} className="text-gray-300" />}
                    </div>
                </DatePicker>
            )
        }
    },
    {
        accessorKey: "dateCreated",
        header: () => <HeaderMenu title="Date Created" />,
        cell: ({ getValue }) => {
            const date = getValue() as string
            return (
                <div className="text-gray-700 text-[14px] font-medium">
                    {moment(date).format("MMM D")}
                </div>
            )
        }
    },
    {
        accessorKey: "priority",
        header: () => <HeaderMenu title="Priority" />,
        cell: ({ getValue, row, table }) => {
            const priority = getValue() as string
            return (
                <PriorityPopOver
                    priority={priority}
                    onPriorityChange={(newPriority) => {
                        (table.options.meta as any)?.updateData(row.id, "priority", newPriority)
                    }}
                />
            )
        }
    },
    {
        accessorKey: "taskID",
        header: () => <HeaderMenu title="Task ID" />,
        cell: ({ getValue }) => {
            const id = getValue() as string
            return <div className="text-gray-400 text-[13px] font-medium"># {id}</div>
        }
    },
    {
        accessorKey: "timeTracker",
        header: () => <HeaderMenu title="Time Tracker" />,
        cell: ({ getValue, row, table }) => {
            const time = getValue() as string
            return (
                <TimeTracker
                    value={time}
                    onChange={(newValue) => {
                        (table.options.meta as any)?.updateData(row.id, "timeTracker", newValue)
                    }}
                />
            )
        }
    },
    {
        accessorKey: "timeEstimate",
        header: () => <HeaderMenu title="Time Estimate" />,
        cell: ({ getValue, row, table }) => {
            const time = getValue() as string
            return (
                <TimeEstimation
                    value={time}
                    onChange={(newLabel) => {
                        (table.options.meta as any)?.updateData(row.id, "timeEstimate", newLabel);
                    }}
                />
            )
        }
    },
    {
        accessorKey: "taskType",
        header: "Task Type",
        cell: ({ getValue }) => {
            const taskType = getValue() as string
            return <div className="text-gray-400 text-[13px] font-medium">{taskType}</div>
        }
    },
    {
        accessorKey: "createdBy",
        header: "Created By",
        cell: ({ getValue }) => {
            const createdBy = getValue() as string
            return <div className="text-gray-400 text-[13px] font-medium">{createdBy}</div>
        }
    },
    {
        accessorKey: "comments",
        header: "Comments",
        cell: ({ getValue }) => {
            const comments = getValue() as string
            return <div className="text-gray-400 text-[13px] font-medium">{comments}</div>
        }
    },
    {
        accessorKey: "addNewColumn",
        header: "+",
    },
]
