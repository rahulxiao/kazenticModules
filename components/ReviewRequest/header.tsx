"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import ReviewRequest from "./index";

const tabs = [
    { key: "Time Tracker", label: "Time Tracker", icon: "/assets/timetrackerIcon.svg", activeIcon: "/assets/timetrackerIcon.svg" },
    { key: "Review Requests", label: "Review Requests", icon: "/assets/manageIcon.svg", activeIcon: "/assets/manageIcon.svg" }
];

export default function Header() {
    const [activeTab, setActiveTab] = useState("Review Requests");
    const [isReviewMembersOpen, setIsReviewMembersOpen] = useState(false);
    const [isAssigneeOpen, setIsAssigneeOpen] = useState(false);

    return (
        <div className="bg-[#fafafa] border-b border-[#E2E8F0]">
            <div className="mx-auto bg-white overflow-hidden">
                {/* Header Tabs */}
                <div className="flex items-center px-4 h-12 justify-between border-b border-[#E2E8F0] relative">
                    <div className="flex h-full capitalize">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.key;

                            return (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`h-full px-5 text-[12px] font-medium flex items-center gap-2 relative transition-all ${isActive ? "text-[#4157FE] font-bold" : "text-[#94A3B8] hover:text-[#64748B]"
                                        }`}
                                >
                                    <Image
                                        src={isActive ? tab.activeIcon : tab.icon}
                                        alt={tab.label}
                                        width={16}
                                        height={16}
                                    />

                                    {tab.label}

                                    {isActive && (
                                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#4157FE]" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-2.5">
                        {activeTab === "Review Requests" && (
                            <div className="flex items-center gap-2 relative">
                                <Button variant="outline" size="sm" className="h-8 text-[12px] font-semibold text-[#191f38] border-[#E2E8F0] rounded-lg shadow-sm hover:border-[#4157FE] transition-all">
                                    This Week
                                </Button>

                                <Button
                                    onClick={() => setIsReviewMembersOpen(!isReviewMembersOpen)}
                                    variant="outline"
                                    size="sm"
                                    className={cn(
                                        "h-8 text-[12px] font-semibold border-[#E2E8F0] rounded-lg shadow-sm hover:border-[#4157FE] transition-all",
                                        isReviewMembersOpen ? "border-[#4157FE] text-[#4157FE] bg-[#F2F9FE]" : "text-[#191f38]"
                                    )}
                                >
                                    Teams <ChevronDown className={cn("size-3.5 transition-transform", isReviewMembersOpen && "rotate-180")} />
                                </Button>

                                <Button
                                    onClick={() => setIsAssigneeOpen(!isAssigneeOpen)}
                                    variant="outline"
                                    size="sm"
                                    className="h-8 pr-3 gap-2 text-[12px] font-semibold text-[#191f38] border-[#E2E8F0] rounded-lg shadow-sm hover:border-[#4157FE] transition-all"
                                >
                                    <div className="size-5 rounded-full bg-[#4157FE] text-white flex items-center justify-center text-[9px] font-bold shrink-0 shadow-sm shadow-[#4157FE]/20">
                                        AH
                                    </div>
                                    <span className="leading-none tracking-tight">
                                        Alif Hassan
                                    </span>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="min-h-screen bg-white">
                    {activeTab === "Time Tracker" && (
                        <div className="flex items-center justify-center h-64 text-gray-400 text-sm italic">
                            Time Tracker content coming soon...
                        </div>
                    )}
                    {activeTab === "Review Requests" && <ReviewRequest />}
                </div>
            </div>
        </div>
    );
}