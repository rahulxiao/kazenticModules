export type User = {
    name: string
    assignees: string[]
    avatar?: string
    status?: string
    priority?: string
    taskType?: string
    sprints?: string
    sprintPoints?: string
    startDate?: string
    dueDate?: string
    dateCreated?: string
    dateClosed?: string
    timeEstimate?: string
    timeTracker?: string
    createdBy?: string
    comments?: string
    taskID?: string
    custom?: string
    addNewColumn?: string
    subtasks?: User[]
    tags?: string[]
}



export const USERS = [
    { name: "Alif Hassan", email: "alif@example.com", avatar: "https://github.com/shadcn.png" },
    { name: "Tonmoy Asif", email: "tonmoy@example.com", avatar: "https://github.com/shadcn.png" },
    { name: "John Doe", email: "john@example.com", avatar: "" },
    { name: "Jane Smith", email: "jane@example.com", avatar: "" },
    { name: "Alice Johnson", email: "alice.johnson@example.com", avatar: "" },
    { name: "Bob Williams", email: "bob.williams@example.com", avatar: "" },
    { name: "Charlie Brown", email: "charlie.brown@example.com", avatar: "" },
    { name: "David Davis", email: "david.davis@example.com", avatar: "" },
    { name: "Eva Miller", email: "eva.miller@example.com", avatar: "" },
    { name: "Frank Wilson", email: "frank.wilson@example.com", avatar: "" },
    { name: "Nat qwe", email: "nat@example.com", avatar: "" },
]

export const tableData: User[] = [
    {
        "name": "Design Homepage Layout",
        "assignees": ["alif@example.com"],
        "status": "IN PROGRESS",
        "priority": "Urgent",
        "taskType": "Feature",
        "sprints": "Sprint 1",
        "sprintPoints": "2",
        "startDate": "2025-11-23",
        "dueDate": "2025-11-23",
        "dateCreated": "2026-02-03",
        "dateClosed": "",
        "timeEstimate": "4h",
        "timeTracker": "1h 17m",
        "createdBy": "Alif Hassan",
        "comments": "3",
        "taskID": "86ewq17dq",
        "custom": "Phase 1",
        "addNewColumn": "",


        "subtasks": [
            {
                "name": "Subtask 1",
                "assignees": [],
                "startDate": "",
                "dueDate": "",
                "priority": "",
                "taskID": "st001",
                "timeTracker": "Add time",
                "addNewColumn": "",
                "dateCreated": "2026-02-04",
                "subtasks": [
                    {
                        "name": "Subtask 2",
                        "assignees": [],
                        "startDate": "",
                        "dueDate": "",
                        "priority": "",
                        "taskID": "st002",
                        "timeTracker": "Add time",
                        "addNewColumn": "",
                        "dateCreated": "2026-02-04",
                        "subtasks": [
                            {
                                "name": "Subtask 3",
                                "assignees": [],
                                "startDate": "",
                                "dueDate": "",
                                "priority": "",
                                "taskID": "st003",
                                "timeTracker": "Add time",
                                "addNewColumn": "",
                                "dateCreated": "2026-02-04",
                                "subtasks": [
                                    {
                                        "name": "Subtask 4",
                                        "assignees": [],
                                        "startDate": "",
                                        "dueDate": "",
                                        "priority": "",
                                        "taskID": "st004",
                                        "timeTracker": "Add time",
                                        "addNewColumn": "",
                                        "dateCreated": "2026-02-04",
                                        "subtasks": [
                                            {
                                                "name": "Subtask 5",
                                                "assignees": [],
                                                "startDate": "",
                                                "dueDate": "",
                                                "priority": "",
                                                "taskID": "st005",
                                                "timeTracker": "Add time",
                                                "addNewColumn": "",
                                                "dateCreated": "2026-02-04",
                                                "subtasks": [
                                                    {
                                                        "name": "Subtask 6",
                                                        "assignees": [],
                                                        "startDate": "",
                                                        "dueDate": "",
                                                        "priority": "",
                                                        "taskID": "st006",
                                                        "timeTracker": "Add time",
                                                        "addNewColumn": "",
                                                        "dateCreated": "2026-02-04",
                                                        "subtasks": [
                                                            {
                                                                "name": "Subtask 7",
                                                                "assignees": [],
                                                                "startDate": "",
                                                                "dueDate": "",
                                                                "priority": "",
                                                                "taskID": "st007",
                                                                "timeTracker": "Add time",
                                                                "addNewColumn": "",
                                                                "dateCreated": "2026-02-04",
                                                                "subtasks": [
                                                                    {
                                                                        "name": "Subtask 8",
                                                                        "assignees": [],
                                                                        "startDate": "",
                                                                        "dueDate": "",
                                                                        "priority": "",
                                                                        "taskID": "st008",
                                                                        "timeTracker": "Add time",
                                                                        "addNewColumn": "",
                                                                        "dateCreated": "2026-02-04",
                                                                        "subtasks": [
                                                                            {
                                                                                "name": "Subtask 9",
                                                                                "assignees": [],
                                                                                "startDate": "",
                                                                                "dueDate": "",
                                                                                "priority": "",
                                                                                "taskID": "st009",
                                                                                "timeTracker": "Add time",
                                                                                "addNewColumn": "",
                                                                                "dateCreated": "2026-02-04"
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "name": "Subtask 5",
                "assignees": [],
                "startDate": "",
                "dueDate": "",
                "priority": "",
                "taskID": "st005",
                "timeTracker": "Add time",
                "addNewColumn": "",
                "dateCreated": "2026-02-04",
                "subtasks": [
                    {
                        "name": "Subtask 6",
                        "assignees": [],
                        "startDate": "",
                        "dueDate": "",
                        "priority": "",
                        "taskID": "st006",
                        "timeTracker": "Add time",
                        "addNewColumn": "",
                        "dateCreated": "2026-02-04",
                        "subtasks": [
                            {
                                "name": "Subtask 7",
                                "assignees": [],
                                "startDate": "",
                                "dueDate": "",
                                "priority": "",
                                "taskID": "st007",
                                "timeTracker": "Add time",
                                "addNewColumn": "",
                                "dateCreated": "2026-02-04",
                                "subtasks": [
                                    {
                                        "name": "Subtask 8",
                                        "assignees": [],
                                        "startDate": "",
                                        "dueDate": "",
                                        "priority": "",
                                        "taskID": "st008",
                                        "timeTracker": "Add time",
                                        "addNewColumn": "",
                                        "dateCreated": "2026-02-04"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "name": "Subtask 9",
                "assignees": [],
                "startDate": "",
                "dueDate": "",
                "priority": "",
                "taskID": "st009",
                "timeTracker": "Add time",
                "addNewColumn": "",
                "dateCreated": "2026-02-04",
                "subtasks": [
                    {
                        "name": "Subtask 10",
                        "assignees": [],
                        "startDate": "",
                        "dueDate": "",
                        "priority": "",
                        "taskID": "st010",
                        "timeTracker": "Add time",
                        "addNewColumn": "",
                        "dateCreated": "2026-02-04",
                        "subtasks": [
                            {
                                "name": "Subtask 11",
                                "assignees": [],
                                "startDate": "",
                                "dueDate": "",
                                "priority": "",
                                "taskID": "st011",
                                "timeTracker": "Add time",
                                "addNewColumn": "",
                                "dateCreated": "2026-02-04",
                                "subtasks": [
                                    {
                                        "name": "Subtask 12",
                                        "assignees": [],
                                        "startDate": "",
                                        "dueDate": "",
                                        "priority": "",
                                        "taskID": "st012",
                                        "timeTracker": "Add time",
                                        "addNewColumn": "",
                                        "dateCreated": "2026-02-04"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "name": "Subtask 13",
                "assignees": [],
                "startDate": "",
                "dueDate": "",
                "priority": "",
                "taskID": "st013",
                "timeTracker": "Add time",
                "addNewColumn": "",
                "dateCreated": "2026-02-04",
                "subtasks": [
                    {
                        "name": "Subtask 14",
                        "assignees": [],
                        "startDate": "",
                        "dueDate": "",
                        "priority": "",
                        "taskID": "st014",
                        "timeTracker": "Add time",
                        "addNewColumn": "",
                        "dateCreated": "2026-02-04",
                        "subtasks": [
                            {
                                "name": "Subtask 15",
                                "assignees": [],
                                "startDate": "",
                                "dueDate": "",
                                "priority": "",
                                "taskID": "st015",
                                "timeTracker": "Add time",
                                "addNewColumn": "",
                                "dateCreated": "2026-02-04",
                                "subtasks": [
                                    {
                                        "name": "Subtask 16",
                                        "assignees": [],
                                        "startDate": "",
                                        "dueDate": "",
                                        "priority": "",
                                        "taskID": "st016",
                                        "timeTracker": "Add time",
                                        "addNewColumn": "",
                                        "dateCreated": "2026-02-04"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "name": "Subtask 17",
                "assignees": [],
                "startDate": "",
                "dueDate": "",
                "priority": "",
                "taskID": "st017",
                "timeTracker": "Add time",
                "addNewColumn": "",
                "dateCreated": "2026-02-04",
                "subtasks": [
                    {
                        "name": "Subtask 18",
                        "assignees": [],
                        "startDate": "",
                        "dueDate": "",
                        "priority": "",
                        "taskID": "st018",
                        "timeTracker": "Add time",
                        "addNewColumn": "",
                        "dateCreated": "2026-02-04",
                        "subtasks": [
                            {
                                "name": "Subtask 19",
                                "assignees": [],
                                "startDate": "",
                                "dueDate": "",
                                "priority": "",
                                "taskID": "st019",
                                "timeTracker": "Add time",
                                "addNewColumn": "",
                                "dateCreated": "2026-02-04",
                                "subtasks": [
                                    {
                                        "name": "Subtask 20",
                                        "assignees": [],
                                        "startDate": "",
                                        "dueDate": "",
                                        "priority": "",
                                        "taskID": "st020",
                                        "timeTracker": "Add time",
                                        "addNewColumn": "",
                                        "dateCreated": "2026-02-04"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    { name: "Create User Profile Page need more people to do this task so that i can see what happend in the task", assignees: ["alif@example.com"], startDate: "", dueDate: "2026-02-07", priority: "Low", taskID: "86ewq17eq", timeTracker: "Add time", timeEstimate: "3h", addNewColumn: "", dateCreated: "2026-02-03", tags: ["backend", "frontend"] },
    { name: "Add Friend Request System", assignees: ["alif@example.com", "tonmoy@example.com"], startDate: "", dueDate: "2026-02-11", priority: "High", taskID: "86ewq17ew", timeTracker: "Add time", timeEstimate: "6h", addNewColumn: "", dateCreated: "2026-02-03" },
    { name: "Develop User Login Functionality", assignees: ["alif@example.com"], startDate: "", dueDate: "2026-02-06", priority: "Urgent", taskID: "86ewq17et", timeTracker: "Add time", timeEstimate: "", addNewColumn: "", dateCreated: "2026-02-03" },
    { name: "Implement User Logout Functionality", assignees: ["alif@example.com"], startDate: "", dueDate: "2026-02-13", priority: "High", taskID: "86ewq17ev", timeTracker: "Add time", timeEstimate: "", addNewColumn: "", dateCreated: "2026-02-03" },
]
