"use client"

import React, { useState } from 'react'
import { ChevronDown, ChevronRight, RotateCcw, CircleCheck, ListTodo } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getReviewRequests } from '@/data/requestReview'
import ToReviewTable from './ToReviewTable'
import ChangesRequiredTable from './ChangesRequiredTable'
import ApprovedTable from './ApprovedTable'
import ReviewDetailView from './ReviewDetailView'

export default function ReviewRequest() {
    const [reviewRequests, setReviewRequests] = useState(getReviewRequests());
    const [reviewingId, setReviewingId] = useState<string | null>(null);
    const [expandedSections, setExpandedSections] = useState<string[]>(['To Review', 'Changes Required', 'Approved']);

    const toggleSection = (title: string) => {
        setExpandedSections(prev =>
            prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
        );
    }

    const handleStatusUpdate = (id: string, newStatus: 'approved' | 'changes_required') => {
        setReviewRequests(prev => {
            let targetItem: any = null;
            // 1. Remove from current category
            const nextData = prev.map(group => {
                const found = group.items.find(item => item.id === id);
                if (found) {
                    targetItem = { ...found, status: newStatus };
                    return {
                        ...group,
                        count: group.count - 1,
                        items: group.items.filter(item => item.id !== id)
                    };
                }
                return group;
            });

            // 2. Add to new category
            if (targetItem) {
                return nextData.map(group => {
                    if (group.status === newStatus) {
                        return {
                            ...group,
                            count: group.count + 1,
                            items: [targetItem, ...group.items]
                        };
                    }
                    return group;
                });
            }
            return nextData;
        });
        setReviewingId(null); // Go back after update
    };

    if (reviewingId) {
        return (
            <ReviewDetailView
                key={reviewingId}
                reviewingId={reviewingId}
                onBack={() => setReviewingId(null)}
                onStatusUpdate={handleStatusUpdate}
            />
        );
    }

    return (
        <div className="w-full bg-white font-sans px-0 md:px-1 py-4 leading-5 tracking-[-0.05em] min-h-screen">
            <div className="max-w-[1400px] mx-auto space-y-4 px-3 md:px-4">
                {reviewRequests.map((group) => (
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
                                "flex items-center gap-2 px-3 py-1 rounded-lg border text-[12px] font-medium capitalize shadow-sm transition-all",
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
                                "text-[12px] w-5 h-5 flex items-center justify-center rounded-md font-semibold border shadow-sm",
                                group.status === 'to_review' && "bg-[#F2F9FE] text-[#4157FE] border-[#DBE9FF]",
                                group.status === 'changes_required' && "bg-[#FFF9F2] text-[#FF8A00] border-[#FFE4B6]",
                                group.status === 'approved' && "bg-[#F2FFF9] text-[#00BA34] border-[#C4FFE2]"
                            )}>
                                {group.count}
                            </span>
                        </div>

                        {/* Table Components */}
                        {expandedSections.includes(group.title) && (
                            <div className="overflow-x-auto pb-4 custom-scrollbar">
                                {group.status === 'to_review' && <ToReviewTable items={group.items} onReview={setReviewingId} />}
                                {group.status === 'changes_required' && <ChangesRequiredTable items={group.items} onReview={setReviewingId} />}
                                {group.status === 'approved' && <ApprovedTable items={group.items} onReview={setReviewingId} />}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
