"use client"

import React, { useState } from 'react'
import { ChevronDown, ChevronRight, RotateCcw, CircleCheck, ListTodo, Timer, DollarSign, Ban, LayoutGrid, FileText, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getReviewRequests } from '@/data/tableData'
import ToReviewTable from './ToReviewTable'
import ChangesRequiredTable from './ChangesRequiredTable'
import ApprovedTable from './ApprovedTable'
import ReviewDetailView from './ReviewDetailView'

export default function ReviewRequest() {
    const data = getReviewRequests();
    const [reviewingId, setReviewingId] = useState<string | null>(null);
    const [expandedSections, setExpandedSections] = useState<string[]>(['To Review', 'Changes Required', 'Approved']);

    const toggleSection = (title: string) => {
        setExpandedSections(prev =>
            prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
        );
    }

    if (reviewingId) {
        return (
            <div className="w-full bg-white font-sans px-1 py-4 leading-5 tracking-[-0.05em] min-h-screen">
                <div className="max-w-[1400px] mx-auto space-y-4 px-4">
                    <button
                        onClick={() => setReviewingId(null)}
                        className="flex items-center gap-2 text-[11px] font-bold text-[#4157FE] uppercase tracking-wider hover:underline mb-6"
                    >
                        <ChevronRight className="size-4 rotate-180" /> Back to list
                    </button>

                    {/* Top Statistics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        {[
                            { label: 'Time Tracked', value: '36h 5m', subValue: '/ 40h', icon: Timer, color: 'text-blue-500', iconBg: 'bg-blue-50' },
                            { label: 'Payable', value: '25h', subValue: '', icon: DollarSign, color: 'text-emerald-500', iconBg: 'bg-emerald-50' },
                            { label: 'Non-Payable', value: '6h 5m', subValue: '/ 40h', icon: Ban, color: 'text-gray-400', iconBg: 'bg-gray-50' },
                            { label: 'Approved At', value: 'Thu, Jan 12, 2025', subValue: '| 11:45 PM', icon: CircleCheck, color: 'text-gray-500', iconBg: 'bg-gray-50' },
                        ].map((card, i) => (
                            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
                                <div className={cn("size-12 rounded-xl flex items-center justify-center shrink-0 border border-gray-50", card.iconBg)}>
                                    <card.icon className={cn("size-6", card.color)} />
                                </div>
                                <div className="space-y-0.5">
                                    <div className="text-[12px] text-gray-400 font-semibold">{card.label}</div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-[16px] font-bold text-[#191f38]">{card.value}</span>
                                        {card.subValue && <span className="text-[12px] text-gray-400 font-medium">{card.subValue}</span>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Secondary Toolbar */}
                    <div className="flex items-center justify-between mb-2">
                        <button className="flex items-center gap-2 bg-white border border-gray-200 hover:border-[#4157FE] text-[#191f38] text-[12px] font-bold px-4 py-2 rounded-lg shadow-sm transition-all group">
                            <DollarSign className="size-4 text-gray-400 group-hover:text-[#4157FE]" />
                            Payable
                        </button>

                        <div className="flex items-center bg-gray-50/50 p-1 rounded-xl border border-gray-100">
                            <button className="flex items-center gap-2 bg-[#F2F9FE] border border-[#DBE9FF] text-[#4157FE] text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-sm">
                                <LayoutGrid className="size-4" />
                                Time Entries
                                <div className="size-4 bg-[#4157FE] rounded-lg flex items-center justify-center">
                                    <svg viewBox="0 0 24 24" className="size-2.5 text-white fill-current"><path d="M8 9h8v2H8V9zm0 4h8v2H8v-2z" /></svg>
                                </div>
                            </button>
                            <button className="flex items-center gap-2 text-gray-400 text-[11px] font-bold px-3 py-1.5 hover:text-gray-600 transition-colors">
                                <FileText className="size-4" />
                                Time Sheet
                                <div className="size-4 border border-gray-200 rounded-lg flex items-center justify-center">
                                    <div className="size-2 bg-gray-400 rounded-sm" />
                                </div>
                            </button>
                        </div>
                    </div>

                    <ReviewDetailView />
                </div>
            </div>
        )
    }

    return (
        <div className="w-full bg-white font-sans px-1 py-4 leading-5 tracking-[-0.05em] min-h-screen">
            <div className="max-w-[1400px] mx-auto space-y-4 px-4">
                {data.map((group) => (
                    <div key={group.title} className="space-y-3">
                        {/* Group Header */}
                        <div
                            className="flex items-center gap-2 cursor-pointer select-none group/header w-fit"
                            onClick={() => toggleSection(group.title)}
                        >
                            <div className="flex items-center justify-center size-5 rounded hover:bg-gray-100 transition-colors">
                                {expandedSections.includes(group.title) ? (
                                    <ChevronDown className="size-4 text-gray-400 group-hover/header:text-gray-600 transition-colors" />
                                ) : (
                                    <ChevronRight className="size-4 text-gray-400 group-hover/header:text-gray-600 transition-colors" />
                                )}
                            </div>

                            <div className={cn(
                                "flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[10px] font-bold uppercase tracking-wider shadow-sm transition-all",
                                group.status === 'to_review' && "bg-[#F2F9FE] text-[#4157FE] border-[#DBE9FF]",
                                group.status === 'changes_required' && "bg-[#FFF9F2] text-[#FF8A00] border-[#FFE4B6]",
                                group.status === 'approved' && "bg-[#F2FFF9] text-[#00BA34] border-[#C4FFE2]"
                            )}>
                                {group.status === 'to_review' && <ListTodo className="size-3.5" />}
                                {group.status === 'changes_required' && <RotateCcw className="size-3.5" />}
                                {group.status === 'approved' && <CircleCheck className="size-3.5" />}
                                {group.title}
                            </div>
                            <span className={cn(
                                "text-[10px] w-6 h-6 flex items-center justify-center rounded-lg font-bold border shadow-sm",
                                group.status === 'to_review' && "bg-[#F2F9FE] text-[#4157FE] border-[#DBE9FF]",
                                group.status === 'changes_required' && "bg-[#FFF9F2] text-[#FF8A00] border-[#FFE4B6]",
                                group.status === 'approved' && "bg-[#F2FFF9] text-[#00BA34] border-[#C4FFE2]"
                            )}>
                                {group.count}
                            </span>
                        </div>

                        {/* Table Components */}
                        {expandedSections.includes(group.title) && (
                            <div className="pl-7">
                                {group.status === 'to_review' && <ToReviewTable items={group.items} onReview={(id) => setReviewingId(id)} />}
                                {group.status === 'changes_required' && <ChangesRequiredTable items={group.items} />}
                                {group.status === 'approved' && <ApprovedTable items={group.items} />}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
