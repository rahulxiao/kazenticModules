"use client"

import * as React from "react"
import {
    ArrowDownWideNarrow,
    ArrowLeftToLine,
    ArrowRightToLine,
    ArrowUpDown,
    Calculator,
    Copy,
    EyeOff,
    Settings,
    Trash,
    UserCog,
    Zap,
    ChevronUp,
    ChevronDown,
} from "lucide-react"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface HeaderMenuProps {
    title: string
    className?: string
}

export function HeaderMenu({ title, className }: HeaderMenuProps) {
    const [open, setOpen] = React.useState(false)

    const handleItemClick = (action: string) => {
        console.log(`Action triggered: ${action} for column ${title}`)
        setOpen(false)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button
                    className={cn(
                        "flex items-center justify-between gap-2 hover:bg-black/5 dark:hover:bg-white/10 px-2 py-1 rounded-md focus:outline-hidden transition-colors w-full text-left font-normal text-muted-foreground",
                        className
                    )}
                >
                    <span>{title}</span>
                    <div className="flex flex-col -space-y-1">
                        <ChevronUp className="h-2.5 w-2.5" />
                        <ChevronDown className="h-2.5 w-2.5" />
                    </div>
                </button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-[280px] p-0 shadow-xl border-border/50">
                <div className="flex flex-col text-sm py-1">
                    {/* Section 1 */}
                    <div className="p-1 border-b border-border/50">
                        <MenuItem
                            icon={ArrowUpDown}
                            label="Sort"
                            onClick={() => handleItemClick("Sort")}
                        />
                        <MenuItem
                            icon={ArrowDownWideNarrow}
                            label="Sort entire column"
                            onClick={() => handleItemClick("Sort entire column")}
                        />
                    </div>

                    {/* Section 2 */}
                    <div className="p-1 border-b border-border/50">
                        <MenuItem
                            icon={Settings}
                            label="Edit field"
                            onClick={() => handleItemClick("Edit field")}
                        />
                        <MenuItem
                            icon={UserCog}
                            label="Privacy and permissions"
                            onClick={() => handleItemClick("Privacy and permissions")}
                        />
                    </div>

                    {/* Section 3 */}
                    <div className="p-1 border-b border-border/50">
                        <MenuItem
                            icon={ArrowLeftToLine}
                            label="Move to start"
                            onClick={() => handleItemClick("Move to start")}
                        />
                        <MenuItem
                            icon={ArrowRightToLine}
                            label="Move to end"
                            onClick={() => handleItemClick("Move to end")}
                        />
                        <MenuItem
                            icon={Calculator}
                            label="Calculate"
                            onClick={() => handleItemClick("Calculate")}
                        />
                        <MenuItem
                            icon={Zap}
                            label="Automate"
                            onClick={() => handleItemClick("Automate")}
                        />
                    </div>

                    {/* Section 4 */}
                    <div className="p-1">
                        <MenuItem
                            icon={EyeOff}
                            label="Hide column"
                            onClick={() => handleItemClick("Hide column")}
                        />
                        <MenuItem
                            icon={Copy}
                            label="Duplicate"
                            onClick={() => handleItemClick("Duplicate")}
                        />
                        <MenuItem
                            icon={Trash}
                            label="Delete field"
                            onClick={() => handleItemClick("Delete field")}
                        />
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

function MenuItem({
    icon: Icon,
    label,
    onClick,
}: {
    icon: any
    label: string
    onClick: () => void
}) {
    return (
        <div
            onClick={onClick}
            className="flex items-center gap-3 px-3 py-2 hover:bg-muted/50 cursor-pointer rounded-sm transition-colors"
        >
            <Icon className="h-4 w-4 text-muted-foreground stroke-[1.5px]" />
            <span className="font-medium text-foreground/80">{label}</span>
        </div>
    )
}
