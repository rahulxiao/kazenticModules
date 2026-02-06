"use client"

import * as React from "react"
import { MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

interface CommentsModuleProps {
    count: string | number
}

export function CommentsModule({ count }: CommentsModuleProps) {
    const numCount = typeof count === 'string' ? parseInt(count) || 0 : count

    return (
        <div className="flex items-center gap-1.5 px-2 py-1 cursor-pointer hover:bg-gray-100/50 rounded transition-colors group">
            <MessageSquare size={14} className={cn(
                "transition-colors",
                numCount > 0 ? "text-blue-500 fill-blue-50" : "text-gray-300 group-hover:text-gray-400"
            )} />
            {numCount > 0 && (
                <span className="text-[13px] font-semibold text-gray-700">
                    {numCount}
                </span>
            )}
        </div>
    )
}
