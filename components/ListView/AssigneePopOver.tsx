"use client"

import * as React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Search, Check, Plus, X, UserPlus2 } from "lucide-react"
import { USERS } from "@/data/tableData"
import { cn } from "@/lib/utils"

interface AssigneePopOverProps {
    assignees: string[]
    onAssigneesChange: (newAssignees: string[]) => void
}

export function AssigneePopOver({ assignees = [], onAssigneesChange }: AssigneePopOverProps) {
    const [open, setOpen] = React.useState(false)
    const [search, setSearch] = React.useState("")

    const filteredUsers = USERS.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    )

    const getInitials = (name: string) => {
        if (!name) return "U"
        return name[0].toUpperCase()
    }

    const toggleUser = (email: string) => {
        const newAssignees = assignees.includes(email)
            ? assignees.filter(e => e !== email)
            : [...assignees, email]
        onAssigneesChange(newAssignees)
    }

    const selectedUsers = USERS.filter(u => assignees.includes(u.email))

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div className="group cursor-pointer flex items-center -space-x-1.5 transition-all">
                    {selectedUsers.length > 0 ? (
                        <>
                            {selectedUsers.map((user, i) => (
                                <div
                                    key={user.email}
                                    className="relative transition-transform duration-200"
                                    style={{ zIndex: selectedUsers.length - i }}
                                >
                                    <Avatar className="h-7 w-7 text-[10px] font-bold border border-white shadow-sm hover:scale-110 transition-transform">
                                        <AvatarImage src={user.avatar} />
                                        <AvatarFallback className="bg-indigo-600 text-white">
                                            {getInitials(user.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    {/* Individual remove button on hover */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleUser(user.email);
                                        }}
                                        className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-red-500 text-white border border-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all scale-0 group-hover:scale-100 z-50 shadow-md"
                                    >
                                        <X size={8} className="stroke-[3]" />
                                    </button>
                                </div>
                            ))}
                            <div className="h-7 w-7 rounded-full bg-transparent border border-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ml-1">
                                <Plus size={14} className="text-gray-400" />
                            </div>
                        </>
                    ) : (
                        <div className="h-7 w-7 rounded-full border border-gray-200 flex items-center justify-center hover:border-indigo-400 hover:bg-indigo-50/50 transition-colors">
                            <UserPlus2 size={14} className="text-gray-300" />
                        </div>
                    )}
                </div>
            </PopoverTrigger>
            <PopoverContent className="p-2 w-[280px] border border-gray-100 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)]" align="start">
                <div className="relative mb-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-[#f4f4f5]/60 border-none rounded-lg pl-10 pr-4 py-2.5 text-[14px] focus:outline-none placeholder:text-gray-400 transition-colors focus:bg-[#f4f4f5]"
                    />
                </div>

                {/* Active Assignees Tags */}
                {selectedUsers.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-2 px-1">
                        {selectedUsers.map(user => (
                            <div key={user.email} className="flex items-center gap-1.5 bg-blue-50 text-blue-600 px-2 py-1 rounded-md text-[12px] font-medium border border-blue-100">
                                <span>{user.name.split(' ')[0]}</span>
                                <X
                                    size={12}
                                    className="cursor-pointer hover:text-blue-800"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleUser(user.email);
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                )}

                <div className="max-h-[250px] overflow-y-auto space-y-0.5 custom-scrollbar">
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => {
                            const isSelected = assignees.includes(user.email)
                            return (
                                <div
                                    key={user.email}
                                    onClick={() => toggleUser(user.email)}
                                    className={cn(
                                        "flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors group",
                                        isSelected ? "bg-blue-50/70 text-blue-600" : "hover:bg-gray-50/80"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-7 w-7">
                                            <AvatarImage src={user.avatar} />
                                            <AvatarFallback className="text-[10px] bg-gray-100 text-gray-600">
                                                {getInitials(user.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className={cn(
                                            "text-[14px] font-medium transition-colors",
                                            isSelected ? "text-blue-600" : "text-gray-600 group-hover:text-gray-900"
                                        )}>
                                            {user.name}
                                        </span>
                                    </div>
                                    {isSelected && (
                                        <Check size={16} className="text-blue-500 stroke-[2.5]" />
                                    )}
                                </div>
                            )
                        })
                    ) : (
                        <div className="px-3 py-4 text-center text-gray-400 text-[13px]">
                            No users found
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    )
}