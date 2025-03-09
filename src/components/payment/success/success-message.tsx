import { CheckCircle } from "lucide-react"

export function SuccessMessage() {
  return (
    <div className="text-center">
      <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
      <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
      <p className="text-muted-foreground mb-6">
        Your listing has been created and will be visible to buyers shortly.
      </p>
    </div>
  )
}