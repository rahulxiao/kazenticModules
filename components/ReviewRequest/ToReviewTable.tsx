"use client"

import React, { useState } from 'react'
import { ArrowRight, Check, X, Pencil } from 'lucide-react'
import { ReviewRequestItem } from '@/data/requestReview'
import { Button } from '@/components/ui/button'
import ApprovePopover from './ApprovePopover'

interface ToReviewTableProps {
    items: ReviewRequestItem[];
    onReview: (id: string) => void;
    onStatusUpdate: (id: string, status: 'approved' | 'changes_required') => void;
}

export default function ToReviewTable({ items, onReview, onStatusUpdate }: ToReviewTableProps) {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [requestModalItem, setRequestModalItem] = useState<ReviewRequestItem | null>(null);
    const [approveModalItem, setApproveModalItem] = useState<ReviewRequestItem | null>(null);
    const [requestComment, setRequestComment] = useState("");

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

    const handleRequestSubmit = () => {
        if (requestModalItem) {
            onStatusUpdate(requestModalItem.id, 'changes_required');
            setRequestModalItem(null);
            setRequestComment("");
        }
    };

    const handleApproveSubmit = () => {
        if (approveModalItem) {
            onStatusUpdate(approveModalItem.id, 'approved');
            setApproveModalItem(null);
        }
    };

    return (
        <>
            <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="min-w-[1000px]">
                    <table className="w-full text-left border-collapse table-fixed">
                        <thead>
                            <tr className="bg-[#f2f9fe] text-[#191f38] text-[12px] font-semibold border-b border-gray-200">
                                <th className="px-0.5 py-2.5 w-[45px] text-center">
                                    <input
                                        type="checkbox"
                                        className="size-4 rounded border-gray-300 bg-white accent-[#4157FE] cursor-pointer"
                                        checked={items.length > 0 && selectedIds.length === items.length}
                                        onChange={toggleAll}
                                    />
                                </th>
                                <th className="px-1 py-2.5 min-w-[320px]">Details</th>
                                <th className="px-3 py-2.5 w-[110px] text-center">Duration</th>
                                <th className="px-3 py-2.5 w-[110px] text-center">Limit</th>
                                <th className="px-3 py-2.5 w-[110px] text-center">Payable</th>
                                <th className="px-3 py-2.5 w-[110px] text-center">Over Limit</th>
                                <th className="px-3 py-2.5 w-[180px] text-center whitespace-nowrap">Action</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {items.map((item) => (
                                <tr key={item.id} className="group border-b border-gray-200 last:border-0 hover:bg-gray-50/50 transition-colors">
                                    <td className="px-0.5 py-2.5 text-center align-middle">
                                        <input
                                            type="checkbox"
                                            className={`size-4 rounded border-gray-300 bg-white accent-[#4157FE] cursor-pointer transition-opacity ${selectedIds.includes(item.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                                            checked={selectedIds.includes(item.id)}
                                            onChange={() => toggleOne(item.id)}
                                        />
                                    </td>
                                    <td className="px-1 py-2.5 align-middle">
                                        <div className="flex items-center w-full">
                                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                                <div className="size-7 rounded-full bg-[#4157FE] text-white flex items-center justify-center text-[12px] font-bold shrink-0">
                                                    {item.userAvatar}
                                                </div>
                                                <span className="text-[12px] font-medium text-[#191f38] truncate">
                                                    {item.userName}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <span className="text-[12px] text-[#9ba2ad] font-medium whitespace-nowrap">
                                                    {item.dateRange}
                                                </span>
                                                <button
                                                    onClick={() => onReview(item.id)}
                                                    className="flex items-center gap-1 bg-[#4157fe] hover:bg-[#3b52e0] text-white text-[12px] font-medium px-3 py-1 rounded-md transition-all shadow-sm"
                                                >
                                                    Review <ArrowRight className="size-3" />
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-3 py-2.5 align-middle text-center">
                                        <div className="inline-flex items-center justify-center w-[95px] h-[26px] rounded-md bg-[#DDEBFF] text-[#191f38] text-[12px] font-medium">
                                            {item.duration}
                                        </div>
                                    </td>
                                    <td className="px-3 py-2.5 align-middle text-center">
                                        <div className="inline-flex items-center justify-center w-[95px] h-[26px] rounded-md bg-[#B9F5D8] text-[#191f38] text-[12px] font-medium">
                                            {item.limit}
                                        </div>
                                    </td>
                                    <td className="px-3 py-2.5 align-middle text-center">
                                        <div className="inline-flex items-center justify-center w-[95px] h-[26px] rounded-md bg-[#FFDFB5] text-[#191f38] text-[12px] font-medium">
                                            {item.payable}
                                        </div>
                                    </td>
                                    <td className="px-3 py-2.5 align-middle text-center">
                                        <div className="inline-flex items-center justify-center w-[95px] h-[26px] rounded-md bg-[#FFD8D8] text-[#191f38] text-[12px] font-medium">
                                            {item.overLimit}
                                        </div>
                                    </td>
                                    <td className="px-3 py-2.5 align-middle text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="icon-sm"
                                                className="size-8 border-[#E2E8F0] shadow-none hover:bg-gray-50 text-[#9ba2ad]"
                                                onClick={() => setRequestModalItem(item)}
                                            >
                                                <ArrowRight className="size-4 text-[#9a5d1b]" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="icon-sm"
                                                className="size-8 border-[#E2E8F0] shadow-none hover:bg-gray-50 rounded-full"
                                                onClick={() => setApproveModalItem(item)}
                                            >
                                                <Check className="size-4 text-[#0ca678]" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Request Changes Modal */}
            {requestModalItem && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-[#1e293b]/20 backdrop-blur-[2px]"
                        onClick={() => setRequestModalItem(null)}
                    />
                    <div className="relative w-full max-w-[500px] bg-white rounded-[32px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] overflow-hidden animate-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="px-8 pt-8 pb-4">
                            <div className="flex items-center justify-between mb-6">
                                <div className="size-12 rounded-2xl bg-[#FFF9F2] border border-[#FFE4B6] flex items-center justify-center shadow-sm">
                                    <Pencil className="size-6 text-[#FF8A00]" />
                                </div>
                                <button
                                    onClick={() => setRequestModalItem(null)}
                                    className="size-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all active:scale-90"
                                >
                                    <X className="size-5" />
                                </button>
                            </div>

                            <h3 className="text-[22px] font-bold text-[#191f38] mb-2">Request changes & unlock</h3>
                            <p className="text-[14px] leading-[1.6] text-gray-500 font-medium">
                                Time entries for this period will be unlocked, and <span className="text-[#191f38] font-bold">{requestModalItem.userName}</span> will get notified to make and resubmit changes.
                            </p>
                        </div>

                        {/* Modal Content */}
                        <div className="px-8 pb-6">
                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">
                                Comments <span className="normal-case italic font-medium opacity-60">(optional)</span>
                            </label>
                            <textarea
                                value={requestComment}
                                onChange={(e) => setRequestComment(e.target.value)}
                                className="w-full min-h-[140px] bg-[#f8fafc] border border-gray-100 rounded-2xl p-5 text-[14px] text-[#191f38] placeholder:text-gray-300 focus:outline-none focus:ring-4 focus:ring-[#4157FE]/5 focus:border-[#4157FE]/50 transition-all resize-none shadow-inner"
                                placeholder="Add instructions for the team member..."
                            />
                        </div>

                        {/* Modal Footer */}
                        <div className="grid grid-cols-2 gap-4 px-8 pb-8">
                            <button
                                onClick={() => setRequestModalItem(null)}
                                className="h-[52px] rounded-2xl border border-gray-200 text-gray-500 text-[14px] font-bold hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-[0.98] shadow-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleRequestSubmit}
                                className="h-[52px] rounded-2xl bg-[#4157FE] text-white text-[14px] font-bold hover:bg-[#3245e0] transition-all shadow-[0_12px_24px_-8px_rgba(65,87,254,0.5)] active:scale-[0.98]"
                            >
                                Request changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ApprovePopover
                isOpen={!!approveModalItem}
                onClose={() => setApproveModalItem(null)}
                onApprove={handleApproveSubmit}
                userName={approveModalItem?.userName || ""}
            />
        </>
    )
}
