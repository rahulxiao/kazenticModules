"use client"

import * as React from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, Info } from "lucide-react"

interface CustomizeTaskIdDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function CustomizeTaskIdDialog({ open, onOpenChange }: CustomizeTaskIdDialogProps) {
    const [prefix, setPrefix] = React.useState("")
    const [startIndex, setStartIndex] = React.useState("")
    const [showInTaskView, setShowInTaskView] = React.useState(true)

    const handleSave = () => {
        // TODO: Implement save logic
        console.log("Saving task ID settings:", { prefix, startIndex, showInTaskView })
        onOpenChange(false)
    }

    const handleCancel = () => {
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">Edit custom task ID</DialogTitle>
                    <DialogDescription className="text-[12px] text-muted-foreground">
                        Create unique, easy-to-read task IDs (like PROJ-123) for this Space.{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                            Learn more
                        </a>
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {/* Prefix Input */}
                    <div className="space-y-2">
                        <Label htmlFor="prefix" className="text-[12px] font-medium">
                            Prefix (eg. SALES, DEV, DESIGN)
                        </Label>
                        <div className="flex gap-2">
                            <Input
                                id="prefix"
                                value={prefix}
                                onChange={(e) => setPrefix(e.target.value)}
                                className="flex-1 bg-white dark:bg-zinc-950 border-zinc-300 dark:border-zinc-700"
                                placeholder="Enter prefix"
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Start Index Input */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Label htmlFor="startIndex" className="text-[12px] font-medium">
                                Start index from
                            </Label>
                            <Info className="h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                        <Input
                            id="startIndex"
                            type="number"
                            value={startIndex}
                            onChange={(e) => setStartIndex(e.target.value)}
                            className="bg-white dark:bg-zinc-950 border-zinc-300 dark:border-zinc-700"
                            placeholder="101"
                        />
                    </div>

                    {/* Show in Task View Checkbox */}
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="showInTaskView"
                            checked={showInTaskView}
                            onCheckedChange={(checked: boolean) => setShowInTaskView(checked)}
                            className="border-zinc-300 dark:border-zinc-700"
                        />
                        <Label
                            htmlFor="showInTaskView"
                            className="text-[12px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Show task ID in task view
                        </Label>
                    </div>
                </div>

                <DialogFooter className="gap-2">
                    <Button
                        variant="outline"
                        onClick={handleCancel}
                        className="bg-transparent border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        className="bg-white text-black border border-zinc-300 hover:bg-zinc-100 dark:bg-zinc-100 dark:text-black dark:hover:bg-white"
                    >
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
