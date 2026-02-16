"use client"

import React, { useState, useMemo } from 'react'
import { ChevronDown, ChevronRight, Calendar, CircleCheck, MoreHorizontal, DollarSign, Trash2, Clock, Timer, Ban, LayoutGrid, FileText, ArrowRight, X, Pencil } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getReviewRequests, ReviewDetailItem, ReviewDay } from '@/data/requestReview'
import { tableData, USERS } from '@/data/tableData'
import RequestPopover from './RequestPopover'
import ApprovePopover from './ApprovePopover'

interface ReviewDetailViewProps {
    reviewingId: string;
    onBack: () => void;
    onStatusUpdate: (id: string, status: 'approved' | 'changes_required') => void;
}

export default function ReviewDetailView({ reviewingId, onBack, onStatusUpdate }: ReviewDetailViewProps) {
    // 1. Find the user being reviewed
    const reviewingUser = useMemo(() => {
        const allRequests = getReviewRequests().flatMap(group => group.items);
        const request = allRequests.find(item => item.id === reviewingId);
        if (!request) return null;

        const user = USERS.find(u => u.name === request.userName);
        return {
            name: request.userName,
            avatar: request.userAvatar,
            email: user?.email,
            dateRange: request.dateRange,
            status: request.status,
            duration: request.duration,
            limit: request.limit,
            payable: request.payable,
            overLimit: request.overLimit
        };
    }, [reviewingId]);

    // 2. Filter and map tasks from tableData
    const detailData = useMemo((): ReviewDay[] => {
        if (!reviewingUser) return [];

        const userTasks = tableData.filter(task =>
            (reviewingUser.email && task.assignees.includes(reviewingUser.email)) ||
            task.createdBy === reviewingUser.name
        );

        if (userTasks.length === 0) return [];

        const groups: { [key: string]: ReviewDetailItem[] } = {};

        userTasks.forEach((task, index) => {
            const date = task.dateCreated || "Recent Tasks";
            if (!groups[date]) groups[date] = [];

            // Mock some variety for signed in/out since it's not in tableData
            const startHour = 9 + (index % 3);
            const durationArr = task.timeTracker?.match(/(\d+)h/);
            const h = durationArr ? parseInt(durationArr[1]) : 4;

            groups[date].push({
                id: task.id || Math.random().toString(),
                task: `[${task.taskID || 'TASK'}] ${task.name}`,
                description: task.status || 'No status',
                payable: index % 3 !== 0,
                tags: task.tags || ["Kazentic"],
                signedIn: `${startHour}:00 AM`,
                signedOut: `${startHour + h}:00 PM`,
                duration: task.timeTracker || "0h",
            });
        });

        return Object.keys(groups).map(date => {
            const dayTasks = groups[date];
            // Calculate total hours for this day
            const totalMinutes = dayTasks.reduce((acc, task) => {
                const match = task.duration.match(/(\d+)h\s*(\d+)m/);
                if (match) {
                    return acc + parseInt(match[1]) * 60 + parseInt(match[2]);
                }
                const hMatch = task.duration.match(/(\d+)h/);
                if (hMatch) return acc + parseInt(hMatch[1]) * 60;
                return acc;
            }, 0);

            const h = Math.floor(totalMinutes / 60);
            const m = totalMinutes % 60;
            const totalStr = m > 0 ? `${h}h ${m}m` : `${h}h`;

            return {
                date,
                totalHours: totalStr,
                limitHours: "8h",
                tasks: dayTasks
            };
        });
    }, [reviewingUser]);

    const [expandedDays, setExpandedDays] = useState<string[]>(detailData.map(d => d.date));
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [showApproveModal, setShowApproveModal] = useState(false);

    const toggleDay = (date: string) => {
        setExpandedDays(prev =>
            prev.includes(date) ? prev.filter(d => d !== date) : [...prev, date]
        );
    }

    const handleApproveSubmit = (comment: string) => {
        onStatusUpdate(reviewingId, 'approved');
        setShowApproveModal(false);
    };

    const handleRequestSubmit = (comment: string) => {
        onStatusUpdate(reviewingId, 'changes_required');
        setShowRequestModal(false);
    };

    if (!reviewingUser) return null;

    if (detailData.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200 mx-4">
                <Clock className="size-12 text-gray-300 mb-4" />
                <h3 className="text-[16px] font-bold text-gray-400">No logs found</h3>
                <p className="text-[12px] text-gray-400 text-center">We couldn't find any specific time logs for {reviewingUser?.name} in the system.</p>
                <button
                    onClick={onBack}
                    className="mt-6 text-[13px] font-semibold text-[#4157FE] hover:underline"
                >
                    Go back to list
                </button>
            </div>
        )
    }

    return (
        <div className="w-full bg-white font-sans px-0 py-6 leading-5 tracking-[-0.05em] min-h-screen animate-in fade-in duration-500">
            <div className="max-w-[1400px] mx-auto space-y-6 px-4">
                {/* Top Header Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 py-2">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onBack}
                            className="size-9 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-gray-100 transition-colors"
                        >
                            <ChevronRight className="size-5 rotate-180" />
                        </button>

                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-1.5 shadow-sm">
                                <div className="size-6 rounded-md bg-[#4157FE] text-white flex items-center justify-center text-[10px] font-semibold">
                                    {reviewingUser.avatar || 'AH'}
                                </div>
                                <span className="text-[12px] font-medium text-[#191f38]">{reviewingUser.name}</span>
                            </div>

                            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-1.5 shadow-sm">
                                <Calendar className="size-4 text-gray-400" />
                                <span className="text-[12px] font-medium text-gray-500">{reviewingUser.dateRange}</span>
                            </div>

                            <div className={cn(
                                "flex items-center gap-2 rounded-lg px-3 py-1.5 shadow-sm border",
                                reviewingUser.status === 'to_review' && "bg-[#F2F9FE] text-[#4157FE] border-[#DBE9FF]",
                                reviewingUser.status === 'changes_required' && "bg-[#FFF9F2] text-[#FF8A00] border-[#FFE4B6]",
                                reviewingUser.status === 'approved' && "bg-[#F2FFF9] text-[#00BA34] border-[#C4FFE2]"
                            )}>
                                <div className={cn(
                                    "size-4 rounded-full border-2 flex items-center justify-center",
                                    reviewingUser.status === 'to_review' && "border-[#4157FE]",
                                    reviewingUser.status === 'changes_required' && "border-[#FF8A00]",
                                    reviewingUser.status === 'approved' && "border-[#00BA34]"
                                )}>
                                    <div className={cn(
                                        "size-1.5 rounded-full",
                                        reviewingUser.status === 'to_review' && "bg-[#4157FE]",
                                        reviewingUser.status === 'changes_required' && "bg-[#FF8A00]",
                                        reviewingUser.status === 'approved' && "bg-[#00BA34]"
                                    )} />
                                </div>
                                <span className="text-[11px] font-semibold uppercase tracking-wide">
                                    {reviewingUser.status === 'to_review' ? 'Pending' : reviewingUser.status.replace('_', ' ')}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowRequestModal(true)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-[#191f38] text-[12px] font-semibold hover:bg-gray-50 transition-all active:scale-95"
                        >
                            <ArrowRight className="size-4 text-[#4157FE]" />
                            Request Change
                        </button>
                        <button
                            onClick={() => setShowApproveModal(true)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#C4FFE2] bg-[#F2FFF9] text-[#00BA34] text-[12px] font-semibold hover:bg-[#e6fff2] transition-all active:scale-95"
                        >
                            <CircleCheck className="size-4" />
                            Approve
                        </button>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: 'Time Tracked', value: reviewingUser.duration, subValue: `/ ${reviewingUser.limit}`, icon: Timer, color: 'text-blue-500', iconBg: 'bg-blue-50', border: 'border-gray-100' },
                        { label: 'Payable', value: reviewingUser.payable, subValue: '', icon: DollarSign, color: 'text-emerald-500', iconBg: 'bg-emerald-50', border: 'border-gray-100' },
                        { label: 'Non-Payable', value: reviewingUser.overLimit, subValue: `/ ${reviewingUser.limit}`, icon: Ban, color: 'text-gray-400', iconBg: 'bg-gray-50', border: 'border-gray-100' },
                        { label: reviewingUser.status === 'approved' ? 'Approved At' : 'Last Login', value: 'Thu, Jan 12, 2025', subValue: '| 11:45 PM', icon: CircleCheck, color: 'text-gray-500', iconBg: 'bg-gray-50', border: 'border-gray-100' },
                    ].map((card, i) => (
                        <div key={i} className={cn("bg-white border rounded-xl p-4 flex items-center gap-4 shadow-sm", card.border)}>
                            <div className={cn("size-10 rounded-lg flex items-center justify-center shrink-0 border border-gray-50 shadow-inner", card.iconBg)}>
                                <card.icon className={cn("size-5", card.color)} />
                            </div>
                            <div className="space-y-0.5">
                                <div className="text-[12px] text-gray-400 font-medium">{card.label}</div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-[16px] font-semibold text-[#191f38]">{card.value}</span>
                                    {card.subValue && <span className="text-[12px] text-gray-400 font-medium opacity-70">{card.subValue}</span>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Inner Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-4 py-1 border-b border-gray-100 pb-3">
                    <button className="flex items-center gap-2 bg-white border border-gray-200 text-[#191f38] text-[12px] font-semibold px-3 py-1.5 rounded-lg shadow-sm hover:border-[#4157FE] transition-all group">
                        <DollarSign className="size-3.5 text-gray-400 group-hover:text-[#4157FE]" />
                        Payable
                    </button>

                    <div className="flex items-center bg-gray-100/50 p-0.5 rounded-lg border border-gray-100">
                        {[
                            { label: 'Time Entries', icon: LayoutGrid, active: true },
                            { label: 'Time Sheet', icon: FileText, active: false },
                        ].map((tab, i) => (
                            <button
                                key={i}
                                className={cn(
                                    "flex items-center gap-2 text-[12px] font-semibold px-3 py-1.5 rounded-md transition-all",
                                    tab.active
                                        ? "bg-white border border-gray-200 text-[#4157FE] shadow-sm"
                                        : "text-gray-400 hover:text-gray-600"
                                )}
                            >
                                <tab.icon className={cn("size-3.5", tab.active ? "text-[#4157FE]" : "text-gray-400")} />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content Area (Day Tables) */}
                <div className="space-y-8 pb-10">
                    {detailData.map((day) => (
                        <div key={day.date} className="space-y-4">
                            {/* Day Header */}
                            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                                <div
                                    className="flex items-center gap-3 cursor-pointer select-none group"
                                    onClick={() => toggleDay(day.date)}
                                >
                                    <div className="flex items-center justify-center size-5 rounded-md hover:bg-gray-100 transition-colors">
                                        {expandedDays.includes(day.date) ? (
                                            <ChevronDown className="size-4 text-gray-400" />
                                        ) : (
                                            <ChevronRight className="size-4 text-gray-400" />
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 px-1">
                                        <Calendar className="size-4 text-gray-300" />
                                        <span className="text-[13px] font-semibold text-[#191f38] leading-none">{day.date}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-[12px] font-medium text-gray-400">
                                    <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg">
                                        <Clock className="size-3.5 text-gray-300" />
                                        <span className="text-[#191f38] font-bold">{day.totalHours}</span>
                                        <span className="opacity-50">/</span>
                                        <span>{day.limitHours}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Day Table */}
                            {expandedDays.includes(day.date) && (
                                <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-sm mx-2">
                                    <div className="min-w-[1200px]">
                                        <table className="w-full text-left border-collapse table-fixed">
                                            <thead>
                                                <tr className="bg-[#f8fafc] text-gray-500 text-[12px] font-semibold border-b border-gray-100">
                                                    <th className="px-6 py-3.5 w-[32%]">Task</th>
                                                    <th className="px-4 py-3.5 w-[20%]">Description</th>
                                                    <th className="px-4 py-3.5 w-[100px] text-center">Payable</th>
                                                    <th className="px-4 py-3.5 w-[110px] text-center">Tags</th>
                                                    <th className="px-4 py-3.5 w-[130px] text-center">Signed In</th>
                                                    <th className="px-4 py-3.5 w-[130px] text-center">Signed Out</th>
                                                    <th className="px-4 py-3.5 w-[130px] text-center">Duration</th>
                                                    <th className="px-4 py-3.5 w-[110px] text-center"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {day.tasks.map((task) => {
                                                    const parts = task.task.match(/^(\[.*?\])(.*)$/);
                                                    const prefix = parts ? parts[1] : '';
                                                    const body = parts ? parts[2] : task.task;

                                                    return (
                                                        <tr key={task.id} className="group border-b border-gray-200 last:border-0 hover:bg-gray-50/30 transition-colors">
                                                            <td className="px-6 py-3.5 align-middle">
                                                                <div className="text-[13px] text-[#191f38] leading-relaxed flex items-baseline gap-1.5">
                                                                    <span className="font-semibold text-[#191f38] shrink-0">{prefix}</span>
                                                                    <span className="font-medium text-[#191f38]/80 truncate">{body}</span>
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-3.5 align-middle">
                                                                <span className="text-[13px] text-gray-400 font-medium">-</span>
                                                            </td>
                                                            <td className="px-4 py-3.5 align-middle text-center">
                                                                <div className="flex justify-center">
                                                                    <div className={cn(
                                                                        "size-8 rounded-lg border flex items-center justify-center transition-all",
                                                                        task.payable
                                                                            ? "bg-white border-[#C2F3E3] text-[#087f5b]"
                                                                            : "bg-white border-gray-100 text-[#D1D5DB]"
                                                                    )}>
                                                                        <DollarSign className="size-4" />
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-3.5 align-middle text-center">
                                                                <div className="flex justify-center gap-1">
                                                                    {task.tags.map((tag, idx) => (
                                                                        <div key={idx} className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#F3F0FF] text-[#7E57C2] text-[10px] font-semibold uppercase tracking-wide">
                                                                            {tag}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-3.5 align-middle text-center">
                                                                <div className="inline-flex items-center justify-center w-[100px] h-[32px] rounded-lg bg-[#D3F9E8] text-[#087F5B] text-[12px] font-semibold">
                                                                    {task.signedIn}
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-3.5 align-middle text-center">
                                                                <div className="inline-flex items-center justify-center w-[100px] h-[32px] rounded-lg bg-[#FFE3E3] text-[#E03131] text-[12px] font-semibold">
                                                                    {task.signedOut}
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-3.5 align-middle text-center">
                                                                <div className="inline-flex items-center justify-center w-[100px] h-[32px] rounded-lg bg-[#E7F5FF] text-[#1C7ED6] text-[12px] font-semibold uppercase">
                                                                    {task.duration}
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-3.5 align-middle text-center">
                                                                <div className="flex items-center justify-center gap-4">
                                                                    <CircleCheck className="size-5 text-[#087f5b] cursor-pointer opacity-80" />
                                                                    <div className="relative">
                                                                        <MoreHorizontal
                                                                            className="size-5 text-gray-300 cursor-pointer hover:text-gray-400 transition-colors"
                                                                            onClick={() => setDeletingId(deletingId === task.id ? null : task.id)}
                                                                        />
                                                                        {deletingId === task.id && (
                                                                            <>
                                                                                <div
                                                                                    className="fixed inset-0 z-[60]"
                                                                                    onClick={(e) => {
                                                                                        e.stopPropagation();
                                                                                        setDeletingId(null);
                                                                                    }}
                                                                                />
                                                                                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-[70] animate-in slide-in-from-top-2 duration-200">
                                                                                    <button className="w-full px-4 py-2.5 text-left text-[13px] text-red-500 font-medium hover:bg-red-50 flex items-center gap-2 transition-colors">
                                                                                        <Trash2 className="size-4" />
                                                                                        Delete Log
                                                                                    </button>
                                                                                </div>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <RequestPopover
                isOpen={showRequestModal}
                onClose={() => setShowRequestModal(false)}
                onSubmit={handleRequestSubmit}
                userName={reviewingUser.name}
            />

            <ApprovePopover
                isOpen={showApproveModal}
                onClose={() => setShowApproveModal(false)}
                onApprove={handleApproveSubmit}
                userName={reviewingUser.name}
            />
        </div>
    )
}
