"use client"

import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { USERS } from "@/data/tableData"

interface CreatedByModuleProps {
    user: string
}

export function CreatedByModule({ user }: CreatedByModuleProps) {
    const userData = USERS.find(u => u.name === user)
    const initials = user ? user.split(' ').map(n => n[0]).join('').toUpperCase() : "U"

    return (
        <div className="flex items-center gap-2 px-2 py-1">
            <Avatar className="w-5 h-5">
                {userData?.avatar && <AvatarImage src={userData.avatar} />}
                <AvatarFallback className="text-[10px] bg-blue-100 text-blue-600 font-bold">
                    {initials}
                </AvatarFallback>
            </Avatar>
            <span className="text-gray-600 text-[13px] font-medium truncate max-w-[120px]">
                {user || "Unknown"}
            </span>
        </div>
    )
}
