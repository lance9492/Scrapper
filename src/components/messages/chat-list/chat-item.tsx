"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ChatItemProps {
  id: string
  isSelected: boolean
  onSelect: (id: string) => void
}

export function ChatItem({ id, isSelected, onSelect }: ChatItemProps) {
  return (
    <div
      className={`p-3 rounded-lg cursor-pointer hover:bg-accent ${
        isSelected ? 'bg-accent' : ''
      }`}
      onClick={() => onSelect(id)}
    >
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage src={`https://avatar.vercel.sh/${id}.png`} />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">Scrap Trader {id}</div>
          <div className="text-sm text-muted-foreground">Last message preview...</div>
        </div>
      </div>
    </div>
  )
}