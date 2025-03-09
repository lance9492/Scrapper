"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

export function MessageInput() {
  return (
    <div className="pt-4 border-t mt-auto">
      <div className="flex space-x-2">
        <Input placeholder="Type your message..." />
        <Button size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}