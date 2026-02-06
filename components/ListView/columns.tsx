"use client"

import { ColumnDef } from "@tanstack/react-table"
import { taskTable } from "@/data/tableData"
import { HeaderMenu } from "./HeaderMenu"
import { DatePicker, formatSmartDate } from "./DatePicker"
import moment from "moment"
import { cn } from "@/lib/utils"
import { AssigneePopOver } from "./AssigneePopOver"
import { PriorityPopOver } from "./PriorityPopOver"
import { NameModule } from "./NameModule"
import { TimeEstimation } from "./TimeEstimation"
import { TimeTracker } from "./TimeTracker"
import { StatusModule } from "./StatusModule"
import { TaskTypeModule } from "./TaskTypeModule"
import { SprintsModule } from "./SprintsModule"
import { SprintPointsModule } from "./SprintPointsModule"
import { DateClosedModule } from "./DateClosedModule"
import { CreatedByModule } from "./CreatedByModule"
import { CommentsModule } from "./CommentsModule"
import { TaskIDModule } from "./TaskIDModule"
import { CustomModule } from "./CustomModule"

const formatDueDate = (dateStr: string) => {
    if (!dateStr) return "Add date"
    const date = moment(dateStr)
    return date.format("DD/MM/YY")
}

const getDueDateStyle = (dateStr: string) => {
    if (!dateStr) return "text-gray-400"
    return "text-[#1a1c1e] font-bold"
}


import { Plus, PlayCircle, Calendar } from "lucide-react"

export const columns: ColumnDef<taskTable>[] = [
    {
        accessorKey: "name",
        header: "Name",
        enableResizing: true,
        size: 400,
        minSize: 400,
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
        accessorKey: "status",
        header: () => <HeaderMenu title="Status" />,
        size: 160,
        minSize: 120,
        cell: ({ getValue, row, table }) => {
            const status = getValue() as string
            return (
                <StatusModule
                    status={status}
                    onStatusChange={(newStatus) => {
                        (table.options.meta as any)?.updateData(row.id, "status", newStatus)
                    }}
                />
            )
        }
    },
    {
        accessorKey: "priority",
        header: () => <HeaderMenu title="Priority" />,
        size: 140,
        minSize: 100,
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
        accessorKey: "assignees",
        header: () => <HeaderMenu title="Assignee" />,
        size: 140,
        minSize: 100,
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
        accessorKey: "startDate",
        header: () => <HeaderMenu title="Start Date" />,
        size: 120,
        minSize: 80,
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
                        "cursor-pointer hover:bg-black/5 px-2 py-1 rounded transition-colors text-[13px] font-medium inline-block flex items-center gap-1.5 w-full",
                        // Dynamic color based on smart date
                        getDueDateStyle(date || "")
                    )}>
                        {date ? (() => {
                            const smart = formatSmartDate(date);
                            return (
                                <span className={smart.color}>
                                    {smart.text}
                                </span>
                            )
                        })() : <Calendar size={14} className="text-gray-300" />}
                    </div>
                </DatePicker>
            )
        }
    },
    {
        accessorKey: "dueDate",
        header: () => <HeaderMenu title="Due Date" />,
        size: 150,
        minSize: 120,
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
                        "cursor-pointer hover:bg-black/5 px-2 py-1 rounded transition-colors text-[13px] font-medium inline-block flex items-center gap-1.5 w-full",
                        // Dynamic color based on smart date
                        getDueDateStyle(date || "")
                    )}>
                        {date ? (() => {
                            const smart = formatSmartDate(date);
                            return (
                                <span className={smart.color}>
                                    {smart.text}
                                </span>
                            )
                        })() : <Calendar size={14} className="text-gray-300" />}
                    </div>
                </DatePicker>
            )
        }
    },
    {
        accessorKey: "taskType",
        header: () => <HeaderMenu title="Task Type" />,
        size: 150,
        minSize: 110,
        cell: ({ getValue, row, table }) => {
            const type = getValue() as string
            return (
                <TaskTypeModule
                    type={type}
                    onTypeChange={(newType) => {
                        (table.options.meta as any)?.updateData(row.id, "taskType", newType)
                    }}
                />
            )
        }
    },
    {
        accessorKey: "sprints",
        header: () => <HeaderMenu title="Sprints" />,
        size: 180,
        minSize: 180,
        cell: ({ getValue, row, table }) => {
            const sprint = getValue() as string
            return (
                <SprintsModule
                    sprint={sprint}
                    onSprintChange={(newSprint) => {
                        (table.options.meta as any)?.updateData(row.id, "sprints", newSprint)
                    }}
                />
            )
        }
    },
    {
        accessorKey: "sprintPoints",
        header: () => <HeaderMenu title="Sprint Points" />,
        size: 140,
        minSize: 140,
        cell: ({ getValue, row, table }) => {
            const points = getValue() as string
            return (
                <SprintPointsModule
                    points={points}
                    onPointsChange={(newPoints) => {
                        (table.options.meta as any)?.updateData(row.id, "sprintPoints", newPoints)
                    }}
                />
            )
        }
    },

    {
        accessorKey: "dateCreated",

        header: () => <HeaderMenu title="Date Created" />,
        size: 140,
        minSize: 140,
        cell: ({ getValue }) => {
            const date = getValue() as string
            return (
                <div className="text-gray-700 text-[13px] font-medium px-2">
                    {date ? moment(date).format("MMM D") : "-"}
                </div>
            )
        }
    },
    {
        accessorKey: "dateClosed",
        header: () => <HeaderMenu title="Date Closed" />,
        size: 140,
        minSize: 140,
        cell: ({ getValue, row, table }) => {
            const date = getValue() as string
            return (
                <DateClosedModule
                    date={date}
                    onDateChange={(newDate) => {
                        (table.options.meta as any)?.updateData(row.id, "dateClosed", newDate)
                    }}
                />
            )
        }
    },
    {
        accessorKey: "timeEstimate",
        header: () => <HeaderMenu title="Time Estimated" />,
        size: 150,
        minSize: 110,
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
        accessorKey: "timeTracker",
        header: () => <HeaderMenu title="Time Tracked" />,
        size: 150,
        minSize: 110,
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
        accessorKey: "createdBy",
        header: () => <HeaderMenu title="Created By" />,
        size: 150,
        minSize: 110,
        cell: ({ getValue }) => {
            const user = getValue() as string
            return <CreatedByModule user={user} />
        }
    },
    {
        accessorKey: "comments",
        header: () => <HeaderMenu title="Comments" />,
        size: 140,
        minSize: 140,
        cell: ({ getValue }) => {
            const comments = getValue() as string
            return <CommentsModule count={comments} />
        }
    },
    {
        accessorKey: "taskID",
        header: () => <HeaderMenu title="Task ID" />,
        size: 120,
        minSize: 90,
        cell: ({ getValue }) => {
            const id = getValue() as string
            return <TaskIDModule id={id} />
        }
    },
    {
        accessorKey: "custom",
        header: () => <HeaderMenu title="Custom" />,
        size: 150,
        minSize: 110,
        cell: ({ getValue, row, table }) => {
            const value = getValue() as string
            return (
                <CustomModule
                    value={value}
                    onValueChange={(newValue) => {
                        (table.options.meta as any)?.updateData(row.id, "custom", newValue)
                    }}
                />
            )
        }
    },
    {
        accessorKey: "addNewColumn",
        header: () => {
            return <button className="text-gray-400 hover:text-gray-600" title="Add New Column">+</button>
        },
        size: 50,
        minSize: 40,
    },
]

