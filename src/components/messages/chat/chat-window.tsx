"use client"

import { ChatHeader } from "./chat-header"
import { MessageList } from "./message-list"
import { MessageInput } from "./message-input"

interface ChatWindowProps {
  chatId: string | null
}

export function ChatWindow({ chatId }: ChatWindowProps) {
  if (!chatId) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        Select a conversation to start messaging
      </div>
    )
  }

  return (
    <>
      <ChatHeader chatId={chatId} />
      <MessageList />
      <MessageInput />
    </>
  )
}