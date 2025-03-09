"use client"

import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { ChatList } from "@/components/messages/chat-list/chat-list"
import { ChatWindow } from "@/components/messages/chat/chat-window"

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)

  return (
    <div className="container py-8">
      <div className="grid md:grid-cols-[300px_1fr] gap-8 h-[calc(100vh-12rem)]">
        <Card className="p-4">
          <ChatList
            selectedChat={selectedChat}
            onSelectChat={setSelectedChat}
          />
        </Card>
        <Card className="p-4 flex flex-col">
          <ChatWindow chatId={selectedChat} />
        </Card>
      </div>
    </div>
  )
}