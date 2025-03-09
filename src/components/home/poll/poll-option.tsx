import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PollOptionProps {
  label: string
  percentage: number
  variant: "primary" | "destructive"
  onClick: () => void
  disabled: boolean
}

export function PollOption({ label, percentage, variant, onClick, disabled }: PollOptionProps) {
  return (
    <div className="relative">
      <div className="flex justify-between mb-2 text-sm">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClick}
          disabled={disabled}
          className={cn(
            "font-medium hover:bg-transparent hover:underline p-0",
            disabled && "hover:no-underline cursor-default"
          )}
        >
          {label}
        </Button>
        <span className={cn(
          "font-medium",
          variant === "primary" ? "text-primary" : "text-destructive"
        )}>
          {percentage}%
        </span>
      </div>
      <Progress 
        value={percentage} 
        className={cn(
          "h-3",
          variant === "primary" ? "bg-primary/20" : "bg-destructive/20"
        )}
      />
    </div>
  )
}