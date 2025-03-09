interface MessageItemProps {
  content: string
  timestamp: string
  isOwn: boolean
}

export function MessageItem({ content, timestamp, isOwn }: MessageItemProps) {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : ''}`}>
      <div
        className={`max-w-[70%] p-3 rounded-lg ${
          isOwn ? 'bg-primary text-primary-foreground' : 'bg-muted'
        }`}
      >
        <p>{content}</p>
        <div className="text-xs mt-1 opacity-70">{timestamp}</div>
      </div>
    </div>
  )
}