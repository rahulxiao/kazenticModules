"use client"

import React, { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ReviewRequestItem } from '@/data/tableData'
import { Button } from '@/components/ui/button'

interface ToReviewTableProps {
    items: ReviewRequestItem[];
    onReview: (id: string) => void;
}

export default function ToReviewTable({ items, onReview }: ToReviewTableProps) {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

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
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-left border-collapse table-fixed">
                <thead>
                    <tr className="bg-[#f2f9fe] text-[#191f38] text-[11px] font-semibold border-b border-gray-200">
                        <th className="px-4 py-3 w-[45px] text-center">
                            <input
                                type="checkbox"
                                className="size-4 rounded border-gray-300 bg-white accent-[#4157FE] cursor-pointer"
                                checked={items.length > 0 && selectedIds.length === items.length}
                                onChange={toggleAll}
                            />
                        </th>
                        <th className="px-4 py-3">Details</th>
                        <th className="px-4 py-3 w-[110px] text-center">Duration</th>
                        <th className="px-4 py-3 w-[110px] text-center">Limit</th>
                        <th className="px-4 py-3 w-[110px] text-center">Payable</th>
                        <th className="px-4 py-3 w-[110px] text-center">Over Limit</th>
                        <th className="px-4 py-3 w-[200px] text-center whitespace-nowrap">Action</th>
                    </tr>
                </thead>
                <tbody className="">
                    {items.map((item) => (
                        <tr key={item.id} className="group border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
                            <td className="px-4 py-4 text-center align-middle">
                                <input
                                    type="checkbox"
                                    className={`size-4 rounded border-gray-300 bg-white accent-[#4157FE] cursor-pointer transition-opacity ${selectedIds.includes(item.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                                    checked={selectedIds.includes(item.id)}
                                    onChange={() => toggleOne(item.id)}
                                />
                            </td>
                            <td className="px-4 py-4 align-middle">
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
                            <td className="px-2 py-3 align-middle text-center">
                                <div className="inline-flex items-center justify-center w-[90px] h-[26px] rounded-lg bg-[#DBE9FF] text-[#191f38] text-[11px] font-semibold">
                                    {item.duration}
                                </div>
                            </td>
                            <td className="px-2 py-3 align-middle text-center">
                                <div className="inline-flex items-center justify-center w-[90px] h-[26px] rounded-lg bg-[#ccfbe1] text-[#191f38] text-[11px] font-semibold">
                                    {item.limit}
                                </div>
                            </td>
                            <td className="px-2 py-3 align-middle text-center">
                                <div className="inline-flex items-center justify-center w-[95px] h-[26px] rounded-lg bg-[#ffe9c1] text-[#191f38] text-[11px] font-semibold">
                                    {item.payable}
                                </div>
                            </td>
                            <td className="px-2 py-3 align-middle text-center">
                                <div className="inline-flex items-center justify-center w-[95px] h-[26px] rounded-lg bg-[#ffdad8] text-[#191f38] text-[11px] font-semibold">
                                    {item.overLimit}
                                </div>
                            </td>
                            <td className="px-4 py-3 align-middle text-center">
                                <div className="flex items-center justify-center gap-2">
                                    <Button variant="outline" size="icon-sm" className="size-8 border-[#E2E8F0] shadow-none hover:bg-gray-50 text-[#9ba2ad]">
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
    )
}
