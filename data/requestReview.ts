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
            count: 6,
            status: 'to_review',
            items: [
                { id: 'req-1', userName: "Alif Hassan", userAvatar: "AH", dateRange: "Feb 01-Feb 07, 2026", duration: "38h 15m", limit: "40h", payable: "38h 15m", overLimit: "0h", status: 'to_review' },
                { id: 'req-2', userName: "Tonmoy Asif", userAvatar: "TA", dateRange: "Feb 01-Feb 07, 2026", duration: "42h 30m", limit: "40h", payable: "40h", overLimit: "2h 30m", status: 'to_review' },
                { id: 'req-3', userName: "Jane Smith", userAvatar: "JS", dateRange: "Feb 08-Feb 14, 2026", duration: "25h 00m", limit: "40h", payable: "25h 00m", overLimit: "0h", status: 'to_review' },
                { id: 'req-4', userName: "John Doe", userAvatar: "JD", dateRange: "Feb 08-Feb 14, 2026", duration: "12h 45m", limit: "20h", payable: "12h 45m", overLimit: "0h", status: 'to_review' },
                { id: 'req-5', userName: "Alice Johnson", userAvatar: "AJ", dateRange: "Feb 01-Feb 07, 2026", duration: "36h 20m", limit: "40h", payable: "36h 20m", overLimit: "0h", status: 'to_review' },
                { id: 'req-6', userName: "Bob Williams", userAvatar: "BW", dateRange: "Jan 25-Jan 31, 2026", duration: "45h 10m", limit: "40h", payable: "40h", overLimit: "5h 10m", status: 'to_review' },
            ]
        },
        {
            title: "Changes Required",
            count: 3,
            status: 'changes_required',
            items: [
                { id: 'req-7', userName: "Charlie Brown", userAvatar: "CB", dateRange: "Jan 18-Jan 24, 2026", duration: "33h 40m", limit: "40h", payable: "33h 40m", overLimit: "0h", status: 'changes_required' },
                { id: 'req-8', userName: "David Davis", userAvatar: "DD", dateRange: "Jan 11-Jan 17, 2026", duration: "39h 55m", limit: "40h", payable: "39h 55m", overLimit: "0h", status: 'changes_required' },
                { id: 'req-9', userName: "Eva Miller", userAvatar: "EM", dateRange: "Jan 04-Jan 10, 2026", duration: "41h 15m", limit: "40h", payable: "40h", overLimit: "1h 15m", status: 'changes_required' },
            ]
        },
        {
            title: "Approved",
            count: 3,
            status: 'approved',
            items: [
                { id: 'req-10', userName: "Frank Wilson", userAvatar: "FW", dateRange: "Dec 28-Jan 03, 2026", duration: "35h 25m", limit: "40h", payable: "35h 25m", overLimit: "0h", status: 'approved' },
                { id: 'req-11', userName: "Nat qwe", userAvatar: "NQ", dateRange: "Dec 21-Dec 27, 2025", duration: "28h 50m", limit: "30h", payable: "28h 50m", overLimit: "0h", status: 'approved' },
                { id: 'req-12', userName: "Alif Hassan", userAvatar: "AH", dateRange: "Dec 14-Dec 20, 2025", duration: "40h 00m", limit: "40h", payable: "40h 00m", overLimit: "0h", status: 'approved' },
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
