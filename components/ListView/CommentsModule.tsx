"use client"

import * as React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import {
    MessageSquare,
    Plus,
    ChevronDown,
    Paperclip,
    AtSign,
    User,
    Smile,
    Video,
    Mic,
    SendHorizontal,
    Check
} from "lucide-react"
import { cn } from "@/lib/utils"

interface CommentsModuleProps {
    count: string | number
}

export function CommentsModule({ count }: CommentsModuleProps) {
    const [open, setOpen] = React.useState(false)
    const [comment, setComment] = React.useState("")
    const [mode, setMode] = React.useState<"Comment" | "Email">("Comment")
    const numCount = typeof count === 'string' ? parseInt(count) || 0 : count

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div className="flex items-center gap-1.5 px-2 py-1 cursor-pointer hover:bg-gray-100/50 rounded transition-colors group">
                    <MessageSquare size={14} className={cn(
                        "transition-colors",
                        numCount > 0 ? "text-blue-500 fill-blue-50" : "text-gray-300 group-hover:text-gray-400"
                    )} />
                    {numCount > 0 && (
                        <span className="text-[12px] font-semibold text-gray-700">
                            {numCount}
                        </span>
                    )}
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-[450px] p-2 bg-white border border-gray-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden" align="start">
                <div className="border border-gray-100 rounded-xl bg-gray-50/10 p-4 transition-all focus-within:border-gray-200 focus-within:bg-white focus-within:shadow-sm">
                    {/* Input Area */}
                    <textarea
                        className="w-full bg-transparent border-none outline-none text-[12px] text-gray-700 placeholder:text-gray-400 resize-none min-h-[40px] leading-relaxed"
                        placeholder={mode === "Comment" ? "Write your comment here..." : "Send an email..."}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />

                    {/* Toolbar */}
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-1">
                            <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-400">
                                <Plus size={16} />
                            </button>
                            <div className="h-4 w-[1px] bg-gray-200 mx-1" />
                            <Popover>
                                <PopoverTrigger asChild>
                                    <button className="flex items-center gap-1 px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-600 text-[12px] font-semibold min-w-[85px] justify-between">
                                        {mode}
                                        <ChevronDown size={14} className="text-gray-400" />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[180px] p-1 bg-white border border-gray-100 rounded-xl shadow-xl z-[100]" align="start">
                                    <div
                                        onClick={() => setMode("Comment")}
                                        className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group"
                                    >
                                        <span className={cn(
                                            "text-[12px] transition-colors",
                                            mode === "Comment" ? "font-semibold text-gray-700" : "font-medium text-gray-600"
                                        )}>Comment</span>
                                        {mode === "Comment" && <Check size={14} className="text-gray-900 stroke-[3]" />}
                                    </div>
                                    <div
                                        onClick={() => setMode("Email")}
                                        className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group"
                                    >
                                        <span className={cn(
                                            "text-[12px] transition-colors",
                                            mode === "Email" ? "font-semibold text-gray-700" : "font-medium text-gray-600"
                                        )}>Email</span>
                                        {mode === "Email" && <Check size={14} className="text-gray-900 stroke-[3]" />}
                                    </div>
                                </PopoverContent>
                            </Popover>
                            <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-400">
                                <Paperclip size={16} />
                            </button>
                            <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-400">
                                <AtSign size={16} />
                            </button>
                            <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-400">
                                <User size={16} />
                            </button>
                            <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-400">
                                <Smile size={16} />
                            </button>
                        </div>

                        <div className="flex items-center gap-1">
                            <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-400">
                                <Video size={16} />
                            </button>
                            <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-400">
                                <Mic size={16} />
                            </button>
                            <button
                                className={cn(
                                    "p-1.5 rounded-md transition-all ml-1",
                                    comment.trim() ? "bg-blue-600 text-white shadow-md hover:bg-blue-700" : "text-gray-300 pointer-events-none"
                                )}
                            >
                                <SendHorizontal size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
