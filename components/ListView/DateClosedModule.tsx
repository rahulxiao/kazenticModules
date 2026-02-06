"use client"

import * as React from "react"
import moment from "moment"
import { Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

interface DateClosedModuleProps {
    date: string
}

export function DateClosedModule({ date }: DateClosedModuleProps) {
    if (!date) return <div className="px-2 py-1"><Calendar size={14} className="text-gray-200" /></div>

    return (
        <div className="text-gray-500 text-[13px] font-medium px-2 py-1">
            {moment(date).format("MMM D, YYYY")}
        </div>
    )
}
