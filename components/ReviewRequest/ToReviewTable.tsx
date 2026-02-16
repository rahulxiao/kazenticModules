"use client"

import React, { useState } from 'react'
import { ArrowRight, Check, X } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ReviewRequestItem } from '@/data/tableData'
import { Button } from '@/components/ui/button'

interface ToReviewTableProps {
    items: ReviewRequestItem[];
    onReview: (id: string) => void;
}

export default function ToReviewTable({ items, onReview }: ToReviewTableProps) {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [requestModalItem, setRequestModalItem] = useState<ReviewRequestItem | null>(null);

    const toggleAll = () => {
        if (selectedIds.length === items.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(items.map(item => item.id));
        }
    };

    const toggleOne = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    return (
        <>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                <table className="w-full text-left border-collapse table-fixed">
                    <thead>
                        <tr className="bg-[#f2f9fe] text-[#191f38] text-[11px] font-semibold border-b border-gray-200">
                            <th className="px-4 py-2.5 w-[45px] text-center">
                                <input
                                    type="checkbox"
                                    className="size-4 rounded border-gray-300 bg-white accent-[#4157FE] cursor-pointer"
                                    checked={items.length > 0 && selectedIds.length === items.length}
                                    onChange={toggleAll}
                                />
                            </th>
                            <th className="px-4 py-2.5">Details</th>
                            <th className="px-4 py-2.5 w-[110px] text-center">Duration</th>
                            <th className="px-4 py-2.5 w-[110px] text-center">Limit</th>
                            <th className="px-4 py-2.5 w-[110px] text-center">Payable</th>
                            <th className="px-4 py-2.5 w-[110px] text-center">Over Limit</th>
                            <th className="px-4 py-2.5 w-[200px] text-center whitespace-nowrap">Action</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {items.map((item) => (
                            <tr key={item.id} className="group border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
                                <td className="px-4 py-2.5 text-center align-middle">
                                    <input
                                        type="checkbox"
                                        className={`size-4 rounded border-gray-300 bg-white accent-[#4157FE] cursor-pointer transition-opacity ${selectedIds.includes(item.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                                        checked={selectedIds.includes(item.id)}
                                        onChange={() => toggleOne(item.id)}
                                    />
                                </td>
                                <td className="px-4 py-2.5 align-middle">
                                    <div className="flex items-center w-full">
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                            <div className="size-7 rounded-full bg-[#4157FE] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                                                {item.userAvatar}
                                            </div>
                                            <span className="text-[11px] font-medium text-[#191f38] truncate">
                                                {item.userName}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <span className="text-[11px] text-[#9ba2ad] font-medium whitespace-nowrap">
                                                {item.dateRange}
                                            </span>
                                            <button
                                                onClick={() => onReview(item.id)}
                                                className="flex items-center gap-1 bg-[#4157fe] hover:bg-[#3b52e0] text-white text-[11px] font-semibold px-3 py-1 rounded-md transition-all shadow-sm"
                                            >
                                                Review <ArrowRight className="size-3" />
                                            </button>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-2 py-2.5 align-middle text-center">
                                    <div className="inline-flex items-center justify-center w-[90px] h-[26px] rounded-lg bg-[#DBE9FF] text-[#191f38] text-[11px] font-semibold">
                                        {item.duration}
                                    </div>
                                </td>
                                <td className="px-2 py-2.5 align-middle text-center">
                                    <div className="inline-flex items-center justify-center w-[90px] h-[26px] rounded-lg bg-[#ccfbe1] text-[#191f38] text-[11px] font-semibold">
                                        {item.limit}
                                    </div>
                                </td>
                                <td className="px-2 py-2.5 align-middle text-center">
                                    <div className="inline-flex items-center justify-center w-[95px] h-[26px] rounded-lg bg-[#ffe9c1] text-[#191f38] text-[11px] font-semibold">
                                        {item.payable}
                                    </div>
                                </td>
                                <td className="px-2 py-2.5 align-middle text-center">
                                    <div className="inline-flex items-center justify-center w-[95px] h-[26px] rounded-lg bg-[#ffdad8] text-[#191f38] text-[11px] font-semibold">
                                        {item.overLimit}
                                    </div>
                                </td>
                                <td className="px-4 py-2.5 align-middle text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="icon-sm"
                                            className="size-8 border-[#E2E8F0] shadow-none hover:bg-gray-50 text-[#9ba2ad]"
                                            onClick={() => setRequestModalItem(item)}
                                        >
                                            <ArrowRight className="size-4 text-[#9a5d1b]" />
                                        </Button>
                                        <Button variant="outline" size="icon-sm" className="size-8 border-[#E2E8F0] shadow-none hover:bg-gray-50 rounded-full">
                                            <Check className="size-4 text-[#0ca678]" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Request Changes Modal */}
            {requestModalItem && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-[#001737]/20 backdrop-blur-[2px]"
                        onClick={() => setRequestModalItem(null)}
                    />
                    <div className="relative w-full max-w-[500px] bg-white rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden animate-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-8 pt-8 pb-4">
                            <h3 className="text-[18px] font-bold text-[#191f38]">Request Changes</h3>
                            <button
                                onClick={() => setRequestModalItem(null)}
                                className="size-8 flex items-center justify-center rounded-full bg-[#F2F9FE] text-[#4157FE] hover:bg-[#e1f0ff] transition-colors"
                            >
                                <X className="size-5" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="px-8 pb-8">
                            <p className="text-[12px] leading-[1.6] text-gray-500 font-medium tracking-tight">
                                Time entries for this period will be unlocked, and <span className="text-[#191f38] font-bold">{requestModalItem.userName}</span> will get notified to make and resubmit changes.
                            </p>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex items-center justify-center gap-3 px-8 pb-8">
                            <button
                                onClick={() => setRequestModalItem(null)}
                                className="flex-1 h-[44px] rounded-xl border border-[#DBE9FF] text-[#4157FE] text-[12px] font-bold hover:bg-[#F2F9FE] transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setRequestModalItem(null)}
                                className="flex-1 h-[44px] rounded-xl bg-[#4157FE] text-white text-[12px] font-bold hover:bg-[#3b52e0] transition-all shadow-[0_4px_12px_rgba(65,87,254,0.3)]"
                            >
                                Request
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
