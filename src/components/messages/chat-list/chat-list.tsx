"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { SearchInput } from "./search-input"
import { ChatItem } from "./chat-item"

interface ChatListProps {
  selectedChat: string | null
  onSelectChat: (id: string) => void
}

export function ChatList({ selectedChat, onSelectChat }: ChatListProps) {
  return (
    <div className="space-y-4">
      <SearchInput />
      <ScrollArea className="h-[calc(100vh-16rem)]">
        <div className="space-y-2">
          {[1, 2, 3].map((chat) => (
            <ChatItem
              key={chat}
              id={`chat-${chat}`}
              isSelected={selectedChat === `chat-${chat}`}
              onSelect={onSelectChat}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}