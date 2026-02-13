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
        "taskID": "86ewq17dq",
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
        taskID: "86ewq17eq",
        timeTracker: "Add time",
        timeEstimate: "3h",
        addNewColumn: "",
        dateCreated: "2026-02-03",
        tags: ["backend", "frontend"],
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
        id: "6",
        name: "Add Friend Request System",
        assignees: ["alif@example.com", "tonmoy@example.com"],
        startDate: "",
        dueDate: "2026-02-11",
        priority: "High",
        taskID: "86ewq17ew",
        timeTracker: "Add time",
        timeEstimate: "6h",
        addNewColumn: "",
        dateCreated: "2026-02-03",
        tags: [],
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
        id: "7",
        name: "Develop User Login Functionality",
        assignees: ["alif@example.com"],
        startDate: "",
        dueDate: "2026-02-06",
        priority: "Urgent",
        taskID: "86ewq17et",
        timeTracker: "Add time",
        timeEstimate: "",
        addNewColumn: "",
        dateCreated: "2026-02-03",
        tags: [],
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
        id: "8",
        name: "Implement User Logout Functionality",
        assignees: ["alif@example.com"],
        startDate: "",
        dueDate: "2026-02-13",
        priority: "High",
        taskID: "86ewq17ev",
        timeTracker: "Add time",
        timeEstimate: "",
        addNewColumn: "",
        dateCreated: "2026-02-03",
        tags: [],
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
]

export type ReviewRequestItem = {
    id: string;
    userName: string;
    userAvatar: string;
    dateRange: string;
    duration: string;
    limit: string;
    payable: string;
    overLimit: string;
    status: 'to_review' | 'changes_required' | 'approved';
}

export type ReviewRequestGroup = {
    title: string;
    count: number;
    status: 'to_review' | 'changes_required' | 'approved';
    items: ReviewRequestItem[];
}

export const getReviewRequests = (): ReviewRequestGroup[] => {
    return [
        {
            title: "To Review",
            count: 4,
            status: 'to_review',
            items: [
                { id: '1', userName: "Alif Hassan", userAvatar: "AH", dateRange: "Dec 07-Dec 13, 2025", duration: "9h 33m", limit: "9h", payable: "9h 33m", overLimit: "9h 33m", status: 'to_review' },
                { id: '2', userName: "Alif Hassan", userAvatar: "AH", dateRange: "Dec 07-Dec 13, 2025", duration: "9h 33m", limit: "9h", payable: "9h 33m", overLimit: "9h 33m", status: 'to_review' },
                { id: '3', userName: "Alif Hassan", userAvatar: "AH", dateRange: "Dec 07-Dec 13, 2025", duration: "9h 33m", limit: "9h", payable: "9h 33m", overLimit: "9h 33m", status: 'to_review' },
                { id: '4', userName: "Alif Hassan", userAvatar: "AH", dateRange: "Dec 07-Dec 13, 2025", duration: "9h 33m", limit: "9h", payable: "9h 33m", overLimit: "9h 33m", status: 'to_review' },
            ]
        },
        {
            title: "Changes Required",
            count: 4,
            status: 'changes_required',
            items: [
                { id: '5', userName: "Alif Hassan", userAvatar: "AH", dateRange: "Dec 07-Dec 13, 2025", duration: "9h 33m", limit: "9h", payable: "9h 33m", overLimit: "9h 33m", status: 'changes_required' },
                { id: '6', userName: "Alif Hassan", userAvatar: "AH", dateRange: "Dec 07-Dec 13, 2025", duration: "9h 33m", limit: "9h", payable: "9h 33m", overLimit: "9h 33m", status: 'changes_required' },
                { id: '7', userName: "Alif Hassan", userAvatar: "AH", dateRange: "Dec 07-Dec 13, 2025", duration: "9h 33m", limit: "9h", payable: "9h 33m", overLimit: "9h 33m", status: 'changes_required' },
                { id: '8', userName: "Alif Hassan", userAvatar: "AH", dateRange: "Dec 07-Dec 13, 2025", duration: "9h 33m", limit: "9h", payable: "9h 33m", overLimit: "9h 33m", status: 'changes_required' },
            ]
        },
        {
            title: "Approved",
            count: 5,
            status: 'approved',
            items: [
                { id: '9', userName: "Alif Hassan", userAvatar: "AH", dateRange: "Jan 07-Jan 13, 2025", duration: "9h 33m", limit: "9h", payable: "9h 33m", overLimit: "9h 33m", status: 'approved' },
                { id: '10', userName: "Alif Hassan", userAvatar: "AH", dateRange: "Jan 07-Jan 13, 2025", duration: "9h 33m", limit: "9h", payable: "9h 33m", overLimit: "9h 33m", status: 'approved' },
                { id: '11', userName: "Alif Hassan", userAvatar: "AH", dateRange: "Jan 07-Jan 13, 2025", duration: "9h 33m", limit: "9h", payable: "9h 33m", overLimit: "9h 33m", status: 'approved' },
                { id: '12', userName: "Alif Hassan", userAvatar: "AH", dateRange: "Jan 07-Jan 13, 2025", duration: "9h 33m", limit: "9h", payable: "9h 33m", overLimit: "9h 33m", status: 'approved' },
                { id: '13', userName: "Alif Hassan", userAvatar: "AH", dateRange: "Jan 07-Jan 13, 2025", duration: "9h 33m", limit: "9h", payable: "9h 33m", overLimit: "9h 33m", status: 'approved' },
            ]
        }
    ]
}

export type ReviewDetailItem = {
    id: string;
    task: string;
    description: string;
    payable: boolean;
    tags: string[];
    signedIn: string;
    signedOut: string;
    duration: string;
}

export type ReviewDay = {
    date: string;
    totalHours: string;
    limitHours: string;
    tasks: ReviewDetailItem[];
}

export const getReviewDetails = (): ReviewDay[] => {
    return [
        {
            date: "Mon, Jan 8",
            totalHours: "9h",
            limitHours: "8h",
            tasks: Array(5).fill(null).map((_, i) => ({
                id: `task-${i}`,
                task: "[kzt-242] Create Pages using new design system.",
                description: "-",
                payable: i % 2 === 0,
                tags: ["Kazentic"],
                signedIn: "11:59 AM",
                signedOut: "02:59 PM",
                duration: "05H : 00M"
            }))
        },
        {
            date: "Tue, Jan 9",
            totalHours: "9h",
            limitHours: "8h",
            tasks: Array(5).fill(null).map((_, i) => ({
                id: `task-tue-${i}`,
                task: "[kzt-242] Create Pages using new design system.",
                description: "-",
                payable: i % 2 === 0,
                tags: ["Kazentic"],
                signedIn: "11:59 AM",
                signedOut: "02:59 PM",
                duration: "05H : 00M"
            }))
        }
    ]
}
