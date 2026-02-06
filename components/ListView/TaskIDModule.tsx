"use client"

import * as React from "react"

interface TaskIDModuleProps {
    id: string
}

export function TaskIDModule({ id }: TaskIDModuleProps) {
    return (
        <div className="text-gray-400 text-[12px] font-mono px-2 py-1 select-all cursor-copy hover:text-gray-600 transition-colors">
            #{id || "0000"}
        </div>
    )
}
