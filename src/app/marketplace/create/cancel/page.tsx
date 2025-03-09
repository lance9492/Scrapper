import { Card } from "@/components/ui/card"
import { CancelMessage } from "@/components/payment/cancel/cancel-message"
import { CancelActions } from "@/components/payment/cancel/cancel-actions"

export default function PaymentCancelPage() {
  return (
    <div className="container max-w-md py-20">
      <Card className="p-6">
        <CancelMessage />
        <CancelActions />
      </Card>
    </div>
  )
}