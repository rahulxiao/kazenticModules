"use client"

import { ColumnDef } from "@tanstack/react-table"
import { taskTable } from "@/data/tableData"
import { HeaderMenu } from "./HeaderManu/HeaderMenu"
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
    return "text-[#1a1c1e] font-medium"
}


import { Plus, PlayCircle, Calendar } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

export const columns: ColumnDef<taskTable>[] = [
    {
        accessorKey: "name",
        header: ({ table }) => (
            <div className="flex items-center gap-2">
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                    className="translate-y-[1px]"
                />
                <span>Name</span>
            </div>
        ),
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
                taskID={(row.original as any).taskID}
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
            />
        }
    },
    {
        accessorKey: "status",
        header: ({ table, column }) => <HeaderMenu title="Status" columnId={column.id} table={table} />,
        size: 160,
        minSize: 120,
        sortingFn: (rowA, rowB) => {
            const statusOrder: Record<string, number> = {
                "To Do": 1,
                "In Progress": 2,
                "In Review": 3,
                "Done": 4,
                "Blocked": 5,
                "": 6,
            }
            const statusA = (rowA.getValue("status") as string) || ""
            const statusB = (rowB.getValue("status") as string) || ""
            return (statusOrder[statusA] || 999) - (statusOrder[statusB] || 999)
        },
        cell: ({ getValue, row, column, table }) => {
            const status = getValue() as string
            return (
                <StatusModule
                    status={status}
                    onStatusChange={(newStatus) => {
                        (table.options.meta as any)?.updateData(row.id, column.id, newStatus)
                    }}
                />
            )
        }
    },
    {
        accessorKey: "priority",
        header: ({ table, column }) => <HeaderMenu title="Priority" columnId={column.id} table={table} />,
        size: 140,
        minSize: 100,
        sortingFn: (rowA, rowB) => {
            const priorityOrder: Record<string, number> = {
                "Urgent": 1,
                "High": 2,
                "Medium": 3,
                "Low": 4,
                "": 5,
            }
            const priorityA = (rowA.getValue("priority") as string) || ""
            const priorityB = (rowB.getValue("priority") as string) || ""
            return (priorityOrder[priorityA] || 999) - (priorityOrder[priorityB] || 999)
        },
        cell: ({ getValue, row, column, table }) => {
            const priority = getValue() as string
            return (
                <PriorityPopOver
                    priority={priority}
                    onPriorityChange={(newPriority) => {
                        (table.options.meta as any)?.updateData(row.id, column.id, newPriority)
                    }}
                />
            )
        }
    },
    {
        accessorKey: "assignees",
        header: ({ table, column }) => <HeaderMenu title="Assignee" columnId={column.id} table={table} />,
        size: 140,
        minSize: 100,
        cell: ({ getValue, row, column, table }) => {
            const assignees = getValue() as string[]
            return (
                <AssigneePopOver
                    assignees={assignees}
                    onAssigneesChange={(newAssignees) => {
                        (table.options.meta as any)?.updateData(row.id, column.id, newAssignees)
                    }}
                />
            )
        }
    },
    {
        accessorKey: "startDate",
        header: ({ table, column }) => <HeaderMenu title="Start Date" columnId={column.id} table={table} />,
        size: 120,
        minSize: 80,
        sortingFn: (rowA, rowB) => {
            const dateA = rowA.getValue("startDate") as string
            const dateB = rowB.getValue("startDate") as string
            if (!dateA) return 1
            if (!dateB) return -1
            return new Date(dateA).getTime() - new Date(dateB).getTime()
        },
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
                        "cursor-pointer hover:bg-black/5 px-2 py-1 rounded transition-colors text-[12px] font-medium inline-block flex items-center gap-1.5 w-full",
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
        header: ({ table, column }) => <HeaderMenu title="Due Date" columnId={column.id} table={table} />,
        size: 150,
        minSize: 120,
        sortingFn: (rowA, rowB) => {
            const dateA = rowA.getValue("dueDate") as string
            const dateB = rowB.getValue("dueDate") as string
            if (!dateA) return 1
            if (!dateB) return -1
            return new Date(dateA).getTime() - new Date(dateB).getTime()
        },
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
                        "cursor-pointer hover:bg-black/5 px-2 py-1 rounded transition-colors text-[12px] font-medium inline-block flex items-center gap-1.5 w-full",
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
        header: ({ table, column }) => <HeaderMenu title="Task Type" columnId={column.id} table={table} />,
        size: 150,
        minSize: 110,
        cell: ({ getValue, row, column, table }) => {
            const type = getValue() as string
            return (
                <TaskTypeModule
                    type={type}
                    onTypeChange={(newType) => {
                        (table.options.meta as any)?.updateData(row.id, column.id, newType)
                    }}
                />
            )
        }
    },
    {
        accessorKey: "sprints",
        header: ({ table, column }) => <HeaderMenu title="Sprints" columnId={column.id} table={table} />,
        size: 180,
        minSize: 180,
        cell: ({ getValue, row, column, table }) => {
            const sprint = getValue() as string
            return (
                <SprintsModule
                    sprint={sprint}
                    onSprintChange={(newSprint) => {
                        (table.options.meta as any)?.updateData(row.id, column.id, newSprint)
                    }}
                />
            )
        }
    },
    {
        accessorKey: "sprintPoints",
        header: ({ table, column }) => <HeaderMenu title="Sprint Points" columnId={column.id} table={table} />,
        size: 140,
        minSize: 140,
        sortingFn: (rowA, rowB) => {
            const pointsA = parseInt((rowA.getValue("sprintPoints") as string) || "0")
            const pointsB = parseInt((rowB.getValue("sprintPoints") as string) || "0")
            return pointsA - pointsB
        },
        cell: ({ getValue, row, column, table }) => {
            const points = getValue() as string
            return (
                <SprintPointsModule
                    points={points}
                    onPointsChange={(newPoints) => {
                        (table.options.meta as any)?.updateData(row.id, column.id, newPoints)
                    }}
                />
            )
        }
    },

    {
        accessorKey: "dateCreated",

        header: ({ table, column }) => <HeaderMenu title="Date Created" columnId={column.id} table={table} />,
        size: 140,
        minSize: 140,
        sortingFn: (rowA, rowB) => {
            const dateA = rowA.getValue("dateCreated") as string
            const dateB = rowB.getValue("dateCreated") as string
            if (!dateA) return 1
            if (!dateB) return -1
            return new Date(dateA).getTime() - new Date(dateB).getTime()
        },
        cell: ({ getValue }) => {
            const date = getValue() as string
            return (
                <div className="text-gray-700 text-[12px] font-medium px-2">
                    {date ? moment(date).format("MMM D") : "-"}
                </div>
            )
        }
    },
    {
        accessorKey: "dateClosed",
        header: ({ table, column }) => <HeaderMenu title="Date Closed" columnId={column.id} table={table} />,
        size: 140,
        minSize: 140,
        sortingFn: (rowA, rowB) => {
            const dateA = rowA.getValue("dateClosed") as string
            const dateB = rowB.getValue("dateClosed") as string
            if (!dateA) return 1
            if (!dateB) return -1
            return new Date(dateA).getTime() - new Date(dateB).getTime()
        },
        cell: ({ getValue, row, column, table }) => {
            const date = getValue() as string
            return (
                <DateClosedModule
                    date={date}
                    onDateChange={(newDate) => {
                        (table.options.meta as any)?.updateData(row.id, column.id, newDate)
                    }}
                />
            )
        }
    },
    {
        accessorKey: "timeEstimate",
        header: ({ table, column }) => <HeaderMenu title="Time Estimated" columnId={column.id} table={table} />,
        size: 150,
        minSize: 110,
        cell: ({ getValue, row, column, table }) => {
            const time = getValue() as string
            return (
                <TimeEstimation
                    value={time}
                    onChange={(newLabel) => {
                        (table.options.meta as any)?.updateData(row.id, column.id, newLabel);
                    }}
                />
            )
        }
    },
    {
        accessorKey: "timeTracker",
        header: ({ table, column }) => <HeaderMenu title="Time Tracked" columnId={column.id} table={table} />,
        size: 150,
        minSize: 110,
        cell: ({ getValue, row, column, table }) => {
            const time = getValue() as string
            return (
                <TimeTracker
                    value={time}
                    onChange={(newValue) => {
                        (table.options.meta as any)?.updateData(row.id, column.id, newValue)
                    }}
                />
            )
        }
    },
    {
        accessorKey: "createdBy",
        header: ({ table }) => <HeaderMenu title="Created By" columnId="createdBy" table={table} />,
        size: 150,
        minSize: 110,
        cell: ({ getValue }) => {
            const user = getValue() as string
            return <CreatedByModule user={user} />
        }
    },
    {
        accessorKey: "comments",
        header: ({ table }) => <HeaderMenu title="Comments" columnId="comments" table={table} />,
        size: 140,
        minSize: 140,
        cell: ({ getValue }) => {
            const comments = getValue() as string
            return <CommentsModule count={comments} />
        }
    },
    {
        accessorKey: "taskID",
        header: ({ table }) => <HeaderMenu title="Task ID" columnId="taskID" table={table} />,
        size: 120,
        minSize: 90,
        cell: ({ getValue }) => {
            const id = getValue() as string
            return <TaskIDModule id={id} />
        }
    },
    {
        accessorKey: "custom",
        header: ({ table, column }) => <HeaderMenu title="Custom" columnId={column.id} table={table} />,
        size: 150,
        minSize: 110,
        cell: ({ getValue, row, column, table }) => {
            const value = getValue() as string
            return (
                <CustomModule
                    value={value}
                    onValueChange={(newValue) => {
                        (table.options.meta as any)?.updateData(row.id, column.id, newValue)
                    }}
                />
            )
        }
    },
    {
        accessorKey: "addNewColumn",
        header: ({ table }: any) => {
            return (
                <div className="flex h-full w-full items-center justify-center">
                    <button
                        onClick={() => (table.options.meta as any)?.onOpenAddColumns?.()}
                        className="flex h-7 w-7 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-all duration-200"
                        title="Add New Column"
                    >
                        <Plus strokeWidth={2} className="h-4 w-4" />
                    </button>
                </div>
            )
        },
        size: 50,
        minSize: 40,
    },
]

