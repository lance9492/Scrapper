import { XCircle } from "lucide-react"

export function CancelMessage() {
  return (
    <div className="text-center">
      <XCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
      <h1 className="text-2xl font-bold mb-2">Payment Cancelled</h1>
      <p className="text-muted-foreground mb-6">
        Your payment was cancelled. No charges were made to your account.
      </p>
    </div>
  )
}