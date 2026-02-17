"use client"

import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { MessageSquare, User, Mail, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

interface UserProfileCardProps {
    user: {
        name: string
        email: string
        avatar?: string
        status?: string
        lastOnline?: string
    }
}

export function UserProfileCard({ user }: UserProfileCardProps) {
    const getInitials = (name: string) => {
        if (!name) return "U"
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    }

    return (
        <div className="w-[320px] h-[210px] bg-white rounded-[14px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 p-4 font-sans overflow-hidden">
            {/* Header with Avatar and Email */}
            <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-[44px] w-[44px] border-2 border-white shadow-sm ring-1 ring-gray-100">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-[#5c67ff] text-white text-base font-bold">
                        {getInitials(user.name)}
                    </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                    <h3 className="text-[12px] font-bold text-[#1a1c1e] truncate leading-tight mb-0.5">
                        {user.email}
                    </h3>
                </div>
            </div>

            {/* Status Information */}
            <div className="space-y-2.5 mb-5">
                <div className="flex items-center gap-2.5 text-gray-500">
                    <div className="w-4 flex justify-center">
                        <Circle size={8} className="text-gray-400" />
                    </div>
                    <span className="text-[12px] font-medium tracking-wide">Last online</span>
                </div>

                <div className="flex items-center gap-2.5 text-gray-500">
                    <div className="w-4 flex justify-center">
                        <Mail size={14} className="text-gray-400" />
                    </div>
                    <span className="text-[12px] font-medium truncate tracking-wide text-gray-400">{user.email}</span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-[8px] bg-white border border-gray-200 text-[#1a1c1e] text-[12px] font-semibold hover:bg-gray-50 transition-colors">
                    <MessageSquare size={14} className="text-[#1a1c1e]" />
                    Chat
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-[8px] bg-white border border-gray-200 text-[#1a1c1e] text-[12px] font-semibold hover:bg-gray-50 transition-colors">
                    <User size={14} className="text-[#1a1c1e]" />
                    Profile
                </button>
            </div>
        </div>
    )
}
