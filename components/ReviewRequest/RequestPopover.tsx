"use client"

import React, { useState } from 'react'
import { X, Pencil } from 'lucide-react'

interface RequestPopoverProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (comment: string) => void;
    userName: string;
}

export default function RequestPopover({ isOpen, onClose, onSubmit, userName }: RequestPopoverProps) {
    const [comment, setComment] = useState("");

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-[#1e293b]/20 backdrop-blur-[2px]"
                onClick={onClose}
            />
            <div className="relative w-full max-w-[500px] bg-white rounded-[32px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Modal Header */}
                <div className="px-8 pt-8 pb-4">
                    <div className="flex items-center justify-between mb-6">
                        <div className="size-12 rounded-2xl bg-[#FFF9F2] border border-[#FFE4B6] flex items-center justify-center shadow-sm">
                            <Pencil className="size-6 text-[#FF8A00]" />
                        </div>
                        <button
                            onClick={onClose}
                            className="size-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all active:scale-90"
                        >
                            <X className="size-5" />
                        </button>
                    </div>

                    <h3 className="text-[22px] font-bold text-[#191f38] mb-2">Request changes & unlock</h3>
                    <p className="text-[14px] leading-[1.6] text-gray-500 font-medium">
                        Time entries for this period will be unlocked, and <span className="text-[#191f38] font-bold">{userName}</span> will get notified to make and resubmit changes.
                    </p>
                </div>

                {/* Modal Content */}
                <div className="px-8 pb-6">
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">
                        Comments <span className="normal-case italic font-medium opacity-60">(optional)</span>
                    </label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full min-h-[80px] bg-[#f8fafc] border border-gray-100 rounded-2xl p-5 text-[14px] text-[#191f38] placeholder:text-gray-300 focus:outline-none focus:ring-4 focus:ring-[#4157FE]/5 focus:border-[#4157FE]/50 transition-all resize-none shadow-inner"
                        placeholder="Add instructions for the team member..."
                    />
                </div>

                {/* Modal Footer */}
                <div className="grid grid-cols-2 gap-4 px-8 pb-8">
                    <button
                        onClick={onClose}
                        className="h-[52px] rounded-2xl border border-gray-200 text-gray-500 text-[14px] font-bold hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-[0.98] shadow-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onSubmit(comment)}
                        className="h-[52px] rounded-2xl bg-[#4157FE] text-white text-[14px] font-bold hover:bg-[#3245e0] transition-all shadow-[0_12px_24px_-8px_rgba(65,87,254,0.5)] active:scale-[0.98]"
                    >
                        Request changes
                    </button>
                </div>
            </div>
        </div>
    );
}
