"use client"

import * as React from "react"
import { X, Sparkles, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface CustomFieldSidebarProps {
    isOpen: boolean
    onClose: () => void
    onCreateField: (fieldName: string, fillMethod: "manual" | "ai") => void
}

export function CustomFieldSidebar({ isOpen, onClose, onCreateField }: CustomFieldSidebarProps) {
    const [fieldName, setFieldName] = React.useState("")
    const [fillMethod, setFillMethod] = React.useState<"manual" | "ai">("manual")

    const handleCreate = () => {
        if (fieldName.trim()) {
            onCreateField(fieldName, fillMethod)
            setFieldName("")
            setFillMethod("manual")
            onClose()
        }
    }

    const handleCancel = () => {
        setFieldName("")
        setFillMethod("manual")
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                onClick={handleCancel}
            />

            {/* Sidebar */}
            <div className="relative w-[400px] h-full bg-white shadow-xl flex flex-col animate-in slide-in-from-right duration-300">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleCancel}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                        <h2 className="text-lg font-semibold text-gray-900">Text</h2>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Field Name */}
                    <div className="space-y-2">
                        <label className="text-[12px] font-medium text-gray-700">
                            Field name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Enter name..."
                                value={fieldName}
                                onChange={(e) => setFieldName(e.target.value)}
                                className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-[12px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
                                autoFocus
                            />
                            <Sparkles className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                    </div>

                    {/* Fill Method */}
                    <div className="space-y-2">
                        <label className="text-[12px] font-medium text-gray-700">
                            Fill method
                        </label>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setFillMethod("manual")}
                                className={cn(
                                    "flex-1 px-4 py-2.5 rounded-lg text-[12px] font-medium transition-all",
                                    fillMethod === "manual"
                                        ? "bg-gray-900 text-white"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                )}
                            >
                                Manual fill
                            </button>
                            <button
                                onClick={() => setFillMethod("ai")}
                                className={cn(
                                    "flex-1 px-4 py-2.5 rounded-lg text-[12px] font-medium transition-all flex items-center justify-center gap-2",
                                    fillMethod === "ai"
                                        ? "bg-purple-600 text-white"
                                        : "bg-purple-50 text-purple-600 hover:bg-purple-100"
                                )}
                            >
                                <Sparkles className="w-4 h-4" />
                                Fill with AI
                            </button>
                        </div>
                    </div>

                    {/* More Settings */}
                    <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group">
                        <span className="text-[12px] font-medium text-gray-700">
                            More settings and permissions
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </button>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 flex items-center justify-end gap-3">
                    <button
                        onClick={handleCancel}
                        className="px-4 py-2 text-[12px] font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleCreate}
                        disabled={!fieldName.trim()}
                        className={cn(
                            "px-4 py-2 text-[12px] font-medium rounded-lg transition-colors",
                            fieldName.trim()
                                ? "bg-gray-800 text-white hover:bg-gray-900"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        )}
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    )
}
