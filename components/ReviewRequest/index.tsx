"use client"

import React, { useState } from 'react'
import { ChevronDown, ChevronRight, Settings, CircleCheck, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getReviewRequests } from '@/data/requestReview'
import ToReviewTable from './ToReviewTable'
import ChangesRequiredTable from './ChangesRequiredTable'
import ApprovedTable from './ApprovedTable'
import ReviewDetailView from './ReviewDetailView'
import BulkApprovalToolbar from './BulkApprovalToolbar'

export default function ReviewRequest() {
    const [reviewRequests, setReviewRequests] = useState(getReviewRequests());
    const [reviewingId, setReviewingId] = useState<string | null>(null);
    const [expandedSections, setExpandedSections] = useState<string[]>(['To Review', 'Changes Required', 'Approved']);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

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
    };

    const handleBulkApprove = () => {
        setReviewRequests(prev => {
            const nextData = [...prev];
            let itemsToMove: any[] = [];

            // Find all selected items and remove them from their current groups
            nextData.forEach(group => {
                const selectedInGroup = group.items.filter(item => selectedIds.includes(item.id));
                if (selectedInGroup.length > 0) {
                    itemsToMove.push(...selectedInGroup.map(item => ({ ...item, status: 'approved' as const })));
                    group.items = group.items.filter(item => !selectedIds.includes(item.id));
                    group.count = group.items.length;
                }
            });

            // Add all to 'approved' group
            const approvedGroup = nextData.find(g => g.status === 'approved');
            if (approvedGroup) {
                approvedGroup.items = [...itemsToMove, ...approvedGroup.items];
                approvedGroup.count = approvedGroup.items.length;
            }

            return nextData;
        });
        setSelectedIds([]);
        setSelectedGroupId(null);
    };

    const handleToggleSelection = (groupId: string, id: string) => {
        if (selectedGroupId && selectedGroupId !== groupId) {
            setSelectedIds([id]);
            setSelectedGroupId(groupId);
        } else {
            setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
            setSelectedGroupId(groupId);
        }
    };

    const handleToggleAllInGroup = (groupId: string, itemIds: string[]) => {
        if (selectedGroupId && selectedGroupId !== groupId) {
            setSelectedIds(itemIds);
            setSelectedGroupId(groupId);
        } else {
            const allSelected = itemIds.every(id => selectedIds.includes(id));
            if (allSelected) {
                setSelectedIds([]);
                setSelectedGroupId(null);
            } else {
                setSelectedIds(itemIds);
                setSelectedGroupId(groupId);
            }
        }
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
                                "flex items-center gap-2 px-3 py-0.5 rounded-lg border text-[12px] font-medium transition-all shadow-sm ",
                                group.status === 'to_review' && "bg-[#F2F9FE] text-[#4157FE] border-[#4157FE80]",
                                group.status === 'changes_required' && "bg-[#FCE9CB] text-[#A4541A] border-[#A4541A80]",
                                group.status === 'approved' && "bg-[#F2FFF9] text-[#00BA34] border-[#00BA3480]"
                            )}>
                                {group.status === 'to_review' && <Search className="size-4" />}
                                {group.status === 'changes_required' && <Settings className="size-4" />}
                                {group.status === 'approved' && <CircleCheck className="size-4" />}
                                {group.title}
                            </div>
                            <span className={cn(
                                "text-[12px] size-6 flex items-center justify-center rounded-lg font-bold border shadow-sm",
                                group.status === 'to_review' && "bg-[#F2F9FE] text-[#4157FE] border-[#4157FE80]",
                                group.status === 'changes_required' && "bg-[#FCE9CB] text-[#A4541A] border-[#A4541A80]",
                                group.status === 'approved' && "bg-[#F2FFF9] text-[#00BA34] border-[#00BA3480]"
                            )}>
                                {group.count}
                            </span>
                        </div>

                        {/* Table Components */}
                        {expandedSections.includes(group.title) && (
                            <div className="overflow-x-auto pb-4 custom-scrollbar">
                                {group.status === 'to_review' && <ToReviewTable items={group.items} onReview={(id) => setReviewingId(id)} onStatusUpdate={handleStatusUpdate} selectedIds={selectedIds} onToggleSelection={(id) => handleToggleSelection('to_review', id)} onToggleAll={() => handleToggleAllInGroup('to_review', group.items.map(i => i.id))} />}
                                {group.status === 'changes_required' && <ChangesRequiredTable items={group.items} onReview={(id) => setReviewingId(id)} selectedIds={selectedIds} onToggleSelection={(id) => handleToggleSelection('changes_required', id)} onToggleAll={() => handleToggleAllInGroup('changes_required', group.items.map(i => i.id))} />}
                                {group.status === 'approved' && <ApprovedTable items={group.items} onReview={(id) => setReviewingId(id)} />}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <BulkApprovalToolbar
                selectedCount={selectedIds.length}
                isVisible={selectedIds.length > 0}
                onApproveAll={handleBulkApprove}
                onClear={() => setSelectedIds([])}
            />
        </div>
    )
}
