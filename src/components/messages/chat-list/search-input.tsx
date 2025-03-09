"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function SearchInput() {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input placeholder="Search conversations..." className="pl-9" />
    </div>
  )
}