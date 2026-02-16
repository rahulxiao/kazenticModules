"use client"

import React from 'react'
import { CircleCheck, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BulkApprovalToolbarProps {
    selectedCount: number;
    onApproveAll: () => void;
    onClear: () => void;
    isVisible: boolean;
}

export default function BulkApprovalToolbar({
    selectedCount,
    onApproveAll,
    onClear,
    isVisible
}: BulkApprovalToolbarProps) {
    return (
        <div className={cn(
            "fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 transform",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
        )}>
            <div className="bg-white border border-gray-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] px-6 py-3 flex items-center gap-8 min-w-[400px]">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onClear}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors group"
                    >
                        <X className="size-4 text-gray-400 group-hover:text-gray-600" />
                    </button>
                    <span className="text-[14px] font-semibold text-[#191f38]">
                        {selectedCount} submissions selected
                    </span>
                </div>

                <div className="h-4 w-px bg-gray-200" />

                <button
                    onClick={onApproveAll}
                    className="flex items-center gap-2 bg-[#F2FFF9] hover:bg-[#e6fff2] text-[#00BA34] border border-[#00BA3440] px-5 py-2 rounded-xl text-[13px] font-bold transition-all active:scale-95 shadow-sm"
                >
                    <CircleCheck className="size-4" />
                    Approve all
                </button>
            </div>
        </div>
    )
}
