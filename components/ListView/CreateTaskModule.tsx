"use client"

import * as React from "react"
import { Plus } from "lucide-react"
import { AddSubtaskModule } from "./AddSubtaskModule"

interface CreateTaskModuleProps {
    onSave: (name: string) => void
    onOpenChange?: (open: boolean) => void
}

export function CreateTaskModule({ onSave, onOpenChange }: CreateTaskModuleProps) {
    const [isCreating, setIsCreating] = React.useState(false)

    const handleToggle = (state: boolean) => {
        setIsCreating(state)
        onOpenChange?.(state)
    }

    if (isCreating) {
        return (
            <AddSubtaskModule
                depth={0}
                onCancel={() => handleToggle(false)}
                onSave={(name) => {
                    onSave(name)
                    handleToggle(false)
                }}
            />
        )
    }

    return (
        <button
            onClick={() => handleToggle(true)}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-700 transition-colors pl-2 h-7"
        >
            <Plus className="h-4 w-4" />
            <span className="text-[12px] font-medium transition-colors">Create Task</span>
        </button>
    )
}
