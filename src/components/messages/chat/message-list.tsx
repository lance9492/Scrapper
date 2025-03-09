"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageItem } from "./message-item"

export function MessageList() {
  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {[1, 2, 3].map((message) => (
          <MessageItem
            key={message}
            content="This is a sample message in the conversation."
            timestamp={new Date().toLocaleTimeString()}
            isOwn={message % 2 === 0}
          />
        ))}
      </div>
    </ScrollArea>
  )
}