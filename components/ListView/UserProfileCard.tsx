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
        <div className="w-[350px] h-[250px] bg-white rounded-[16px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 p-5 font-sans overflow-hidden">
            {/* Header with Avatar and Email */}
            <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-[60px] w-[60px] border-2 border-white shadow-md ring-1 ring-gray-100">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-[#5c67ff] text-white text-xl font-bold">
                        {getInitials(user.name)}
                    </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                    <h3 className="text-[17px] font-bold text-[#1a1c1e] truncate leading-tight mb-0.5">
                        {user.email}
                    </h3>
                </div>
            </div>

            {/* Status Information */}
            <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-gray-500">
                    <div className="w-5 flex justify-center">
                        <Circle size={10} className="text-gray-400" />
                    </div>
                    <span className="text-[13px] font-medium tracking-wide">Last online</span>
                </div>

                <div className="flex items-center gap-3 text-gray-500">
                    <div className="w-5 flex justify-center">
                        <Mail size={16} className="text-gray-400" />
                    </div>
                    <span className="text-[13px] font-medium truncate tracking-wide text-gray-400">{user.email}</span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-[10px] bg-white border border-gray-200 text-[#1a1c1e] text-[13px] font-semibold hover:bg-gray-50 transition-colors">
                    <MessageSquare size={16} className="text-[#1a1c1e]" />
                    Chat
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-[10px] bg-white border border-gray-200 text-[#1a1c1e] text-[13px] font-semibold hover:bg-gray-50 transition-colors">
                    <User size={16} className="text-[#1a1c1e]" />
                    View profile
                </button>
            </div>
        </div>
    )
}
