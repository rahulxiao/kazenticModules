export type taskTable = {
    id?: string
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
    subtasks?: taskTable[]
    tags?: string[]
}

export const SPRINTS = [
    { label: "Sprint 1", value: "Sprint 1", range: "(7/12 - 8/12)" },
    { label: "Sprint 2", value: "Sprint 2", range: "(8/12 - 9/12)" },
    { label: "Sprint 3", value: "Sprint 3", range: "(9/12 - 10/12)" },
    { label: "Backlog", value: "Backlog", range: "" },
]

export type Sprint = typeof SPRINTS[number]

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

export const tableData: taskTable[] = [
    {
        "id": "1",
        "name": "Design Homepage Layout",
        "assignees": ["alif@example.com"],
        "status": "IN PROGRESS",
        "priority": "Urgent",
        "taskType": "Task",
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
        "taskID": "G-123",
        "custom": "Phase 1",
        "addNewColumn": "",


        "subtasks": [
            {
                "id": "2",
                "name": "Subtask 1",
                "assignees": [],
                "startDate": "",
                "dueDate": "",
                "priority": "",
                "sprints": "Sprint 1",
                "sprintPoints": "10",
                "taskID": "st001",
                "timeTracker": "Add time",
                "addNewColumn": "",
                "dateCreated": "2026-02-04",
                "subtasks": [
                    {
                        "id": "3",
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
                                "id": "4",
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
    {
        id: "5",
        name: "Create User Profile Page need more people to do this task so that i can see what happend in the task",
        assignees: ["alif@example.com"],
        startDate: "",
        dueDate: "2026-02-07",
        priority: "Low",
        taskID: "k-98",
        timeTracker: "Add time",
        timeEstimate: "3h",
        addNewColumn: "",
        dateCreated: "2026-02-03",
        tags: ["backend"],
        status: "To Do",
        taskType: "Development",
        sprints: "",
        sprintPoints: "",
        dateClosed: "",
        createdBy: "alif@example.com",
        comments: "0",
        custom: "",
        subtasks: []
    },
    {
        id: "101",
        name: "Refactor API Headers",
        assignees: ["tonmoy@example.com"],
        priority: "High",
        taskID: "KZT-501",
        timeTracker: "6h 20m",
        dateCreated: "Feb 02, 2026",
        tags: ["API"],
        status: "DONE",
        createdBy: "Tonmoy Asif",
        subtasks: []
    },
    {
        id: "102",
        name: "Database Schema Optimization",
        assignees: ["tonmoy@example.com"],
        priority: "Urgent",
        taskID: "KZT-502",
        timeTracker: "8h 00m",
        dateCreated: "Feb 03, 2026",
        tags: ["DB", "Backend"],
        status: "DONE",
        createdBy: "Tonmoy Asif",
        subtasks: []
    },
    {
        id: "103",
        name: "UI Animation Fixes",
        assignees: ["jane@example.com"],
        priority: "Medium",
        taskID: "KZT-503",
        timeTracker: "4h 30m",
        dateCreated: "Feb 09, 2026",
        tags: ["Frontend"],
        status: "DONE",
        createdBy: "Jane Smith",
        subtasks: []
    },
    {
        id: "104",
        name: "Responsive Design Mobile",
        assignees: ["jane@example.com"],
        priority: "High",
        taskID: "KZT-504",
        timeTracker: "7h 15m",
        dateCreated: "Feb 10, 2026",
        tags: ["Frontend"],
        status: "DONE",
        createdBy: "Jane Smith",
        subtasks: []
    },
    {
        id: "105",
        name: "Unit Test Implementation",
        assignees: ["alice.johnson@example.com"],
        priority: "Low",
        taskID: "KZT-505",
        timeTracker: "5h 45m",
        dateCreated: "Feb 04, 2026",
        tags: ["Testing"],
        status: "DONE",
        createdBy: "Alice Johnson",
        subtasks: []
    },
    {
        id: "106",
        name: "Bug Bash Session",
        assignees: ["alice.johnson@example.com"],
        priority: "Medium",
        taskID: "KZT-506",
        timeTracker: "3h 00m",
        dateCreated: "Feb 05, 2026",
        tags: ["QA"],
        status: "DONE",
        createdBy: "Alice Johnson",
        subtasks: []
    },
    {
        id: "107",
        name: "Security Audit Report",
        assignees: ["bob.williams@example.com"],
        priority: "Urgent",
        taskID: "KZT-507",
        timeTracker: "8h 30m",
        dateCreated: "Jan 27, 2026",
        tags: ["Security"],
        status: "DONE",
        createdBy: "Bob Williams",
        subtasks: []
    },
    {
        id: "108",
        name: "Firewall Configuration",
        assignees: ["bob.williams@example.com"],
        priority: "High",
        taskID: "KZT-508",
        timeTracker: "6h 00m",
        dateCreated: "Jan 28, 2026",
        tags: ["Infrastructure"],
        status: "DONE",
        createdBy: "Bob Williams",
        subtasks: []
    },
    {
        id: "109",
        name: "SEO Optimization",
        assignees: ["charlie.brown@example.com"],
        priority: "Low",
        taskID: "KZT-509",
        timeTracker: "4h 20m",
        dateCreated: "Jan 19, 2026",
        tags: ["Marketing"],
        status: "DONE",
        createdBy: "Charlie Brown",
        subtasks: []
    },
    {
        id: "110",
        name: "Performance Monitoring Setup",
        assignees: ["david.davis@example.com"],
        priority: "Medium",
        taskID: "KZT-510",
        timeTracker: "8h 00m",
        dateCreated: "Jan 12, 2026",
        tags: ["DevOps"],
        status: "DONE",
        createdBy: "David Davis",
        subtasks: []
    },
    {
        id: "111",
        name: "Error Logging Migration",
        assignees: ["eva.miller@example.com"],
        priority: "High",
        taskID: "KZT-511",
        timeTracker: "5h 50m",
        dateCreated: "Jan 06, 2026",
        tags: ["Backend"],
        status: "DONE",
        createdBy: "Eva Miller",
        subtasks: []
    },
    {
        id: "112",
        name: "Cloud Hosting Refresh",
        assignees: ["frank.wilson@example.com"],
        priority: "Medium",
        taskID: "KZT-512",
        timeTracker: "7h 10m",
        dateCreated: "Dec 29, 2025",
        tags: ["Infrastructure"],
        status: "DONE",
        createdBy: "Frank Wilson",
        subtasks: []
    },
    {
        id: "113",
        name: "Holiday Feature Launch",
        assignees: ["alif@example.com"],
        priority: "Urgent",
        taskID: "KZT-513",
        timeTracker: "8h 00m",
        dateCreated: "Dec 16, 2025",
        tags: ["Feature"],
        status: "DONE",
        createdBy: "Alif Hassan",
        subtasks: []
    },
    {
        id: "114",
        name: "New Asset Pipeline",
        assignees: ["nat@example.com"],
        priority: "Low",
        taskID: "KZT-514",
        timeTracker: "6h 45m",
        dateCreated: "Dec 23, 2025",
        tags: ["Internal"],
        status: "DONE",
        createdBy: "Nat qwe",
        subtasks: []
    },
    {
        id: "115",
        name: "User Feedback Analysis",
        assignees: ["tonmoy@example.com"],
        priority: "Medium",
        taskID: "KZT-515",
        timeTracker: "3h 30m",
        dateCreated: "Feb 04, 2026",
        tags: ["Analytics"],
        status: "DONE",
        createdBy: "Tonmoy Asif",
        subtasks: []
    },
    {
        id: "116",
        name: "Landing Page A/B Test",
        assignees: ["jane@example.com"],
        priority: "High",
        taskID: "KZT-516",
        timeTracker: "5h 15m",
        dateCreated: "Feb 11, 2026",
        tags: ["Frontend"],
        status: "DONE",
        createdBy: "Jane Smith",
        subtasks: []
    },
    {
        id: "117",
        name: "API Rate Limiting",
        assignees: ["alice.johnson@example.com"],
        priority: "High",
        taskID: "KZT-517",
        timeTracker: "7h 40m",
        dateCreated: "Feb 06, 2026",
        tags: ["Backend"],
        status: "DONE",
        createdBy: "Alice Johnson",
        subtasks: []
    },
    {
        id: "118",
        name: "Server Patching Phase 1",
        assignees: ["bob.williams@example.com"],
        priority: "Urgent",
        taskID: "KZT-518",
        timeTracker: "8h 00m",
        dateCreated: "Jan 29, 2026",
        tags: ["Security"],
        status: "DONE",
        createdBy: "Bob Williams",
        subtasks: []
    },
    {
        id: "119",
        name: "Newsletter Template Design",
        assignees: ["charlie.brown@example.com"],
        priority: "Low",
        taskID: "KZT-519",
        timeTracker: "2h 50m",
        dateCreated: "Jan 21, 2026",
        tags: ["Design"],
        status: "DONE",
        createdBy: "Charlie Brown",
        subtasks: []
    },
    {
        id: "120",
        name: "Final Performance Benchmarks",
        assignees: ["david.davis@example.com"],
        priority: "Medium",
        taskID: "KZT-520",
        timeTracker: "6h 30m",
        dateCreated: "Jan 15, 2026",
        tags: ["DevOps"],
        status: "DONE",
        createdBy: "David Davis",
        subtasks: []
    },
]


