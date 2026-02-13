"use client"

import React, { useState } from 'react'
import { ChevronDown, ChevronRight, Calendar, CircleCheck, MoreHorizontal, DollarSign, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getReviewDetails } from '@/data/tableData'

export default function ReviewDetailView() {
    const detailData = getReviewDetails();
    const [expandedDays, setExpandedDays] = useState<string[]>(detailData.map(d => d.date));
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const toggleDay = (date: string) => {
        setExpandedDays(prev =>
            prev.includes(date) ? prev.filter(d => d !== date) : [...prev, date]
        );
    }

    return (
        <div className="w-full space-y-6 animate-in fade-in duration-500 pb-10">
            {detailData.map((day) => (
                <div key={day.date} className="space-y-3">
                    {/* Day Header */}
                    <div className="flex items-center justify-between px-2">
                        <div
                            className="flex items-center gap-3 cursor-pointer select-none group"
                            onClick={() => toggleDay(day.date)}
                        >
                            <div className="flex items-center justify-center size-5 rounded hover:bg-gray-100 transition-colors">
                                {expandedDays.includes(day.date) ? (
                                    <ChevronDown className="size-4 text-gray-500" />
                                ) : (
                                    <ChevronRight className="size-4 text-gray-500" />
                                )}
                            </div>
                            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-1.5 shadow-sm hover:border-[#4157FE] transition-colors">
                                <Calendar className="size-4 text-[#4157FE]" />
                                <span className="text-[12px] font-semibold text-[#191f38]">{day.date}</span>
                            </div>
                        </div>

                        {/* Summary Pill */}
                        <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg px-3 py-1.5 shadow-sm text-[12px] font-bold">
                            <span className="text-gray-400 font-medium tracking-tight">
                                <span className="text-[#191f38] text-[15px] font-bold">{day.totalHours}</span> / {day.limitHours}
                            </span>
                        </div>
                    </div>

                    {/* Day Table */}
                    {expandedDays.includes(day.date) && (
                        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm mx-2">
                            <table className="w-full text-left border-collapse table-fixed">
                                <thead>
                                    <tr className="bg-[#f2f9fe]/50 text-[#191f38] text-[11px] font-semibold border-b border-gray-100">
                                        <th className="px-6 py-3 w-[35%]">Task</th>
                                        <th className="px-4 py-3">Description</th>
                                        <th className="px-4 py-3 w-[80px] text-center">Payable</th>
                                        <th className="px-4 py-3 w-[110px] text-center">Tags</th>
                                        <th className="px-4 py-3 w-[130px] text-center">Signed In</th>
                                        <th className="px-4 py-3 w-[130px] text-center">Signed Out</th>
                                        <th className="px-4 py-3 w-[130px] text-center">Duration</th>
                                        <th className="px-4 py-3 w-[100px] text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {day.tasks.map((task) => (
                                        <tr key={task.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/30 transition-colors h-[64px]">
                                            <td className="px-6 py-2">
                                                <span className="text-[12px] font-medium text-[#191f38] leading-tight block">
                                                    {task.task}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                <span className="text-[12px] text-gray-400">{task.description}</span>
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                                <div className="flex justify-center">
                                                    <div className={cn(
                                                        "size-8 rounded-lg border flex items-center justify-center transition-colors",
                                                        task.payable
                                                            ? "bg-[#F2FFF9] border-[#C4FFE2] text-[#00BA34]"
                                                            : "bg-gray-50 border-gray-100 text-[#D1D5DB]"
                                                    )}>
                                                        {task.payable ? (
                                                            <DollarSign className="size-4" />
                                                        ) : (
                                                            <div className="relative">
                                                                <DollarSign className="size-4 opacity-30" />
                                                                <div className="absolute inset-0 flex items-center justify-center">
                                                                    <div className="w-[1px] h-4 bg-gray-400 rotate-45" />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                                <div className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[#F5F3FF] border border-[#DDD6FE] text-[#7C3AED] text-[10px] font-bold uppercase tracking-wider">
                                                    Kazentic
                                                </div>
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                                <div className="inline-flex items-center justify-center w-[112px] h-[34px] rounded-lg bg-[#ccfbe1] text-[#191f38] text-[12px] font-bold">
                                                    {task.signedIn}
                                                </div>
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                                <div className="inline-flex items-center justify-center w-[112px] h-[34px] rounded-lg bg-[#ffdad8] text-[#191f38] text-[12px] font-bold">
                                                    {task.signedOut}
                                                </div>
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                                <div className="inline-flex items-center justify-center w-[112px] h-[34px] rounded-lg bg-[#DBE9FF] text-[#191f38] text-[12px] font-bold">
                                                    {task.duration}
                                                </div>
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                                <div className="flex items-center justify-center gap-3">
                                                    <CircleCheck className="size-5 text-[#0ca678] cursor-pointer hover:scale-110 transition-transform" />
                                                    <div className="relative">
                                                        <MoreHorizontal
                                                            className="size-5 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
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
                                                                <div className="absolute right-0 bottom-full mb-2 z-[70] animate-in fade-in slide-in-from-bottom-2 duration-200">
                                                                    <div className="bg-white border border-gray-100 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] overflow-hidden min-w-[160px]">
                                                                        <button
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                setDeletingId(null);
                                                                            }}
                                                                            className="w-full flex items-center gap-3 px-4 py-3 text-[#e03131] hover:bg-red-50 transition-colors group/delete"
                                                                        >
                                                                            <Trash2 className="size-4 group-hover/delete:scale-110 transition-transform" />
                                                                            <span className="text-[12px] font-bold">Delete row</span>
                                                                        </button>
                                                                    </div>
                                                                    <div className="absolute right-3 top-full -mt-1 w-2 h-2 bg-white border-r border-b border-gray-100 rotate-45" />
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}
