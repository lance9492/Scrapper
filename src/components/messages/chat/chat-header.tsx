import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ChatHeaderProps {
  chatId: string
}

export function ChatHeader({ chatId }: ChatHeaderProps) {
  return (
    <div className="pb-4 border-b">
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage src={`https://avatar.vercel.sh/${chatId}.png`} />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">Scrap Trader</div>
          <div className="text-sm text-muted-foreground">Online</div>
        </div>
      </div>
    </div>
  )
}