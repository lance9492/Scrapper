import { Card } from "@/components/ui/card"
import { SuccessMessage } from "@/components/payment/success/success-message"
import { SuccessActions } from "@/components/payment/success/success-actions"

export default function PaymentSuccessPage() {
  return (
    <div className="container max-w-md py-20">
      <Card className="p-6">
        <SuccessMessage />
        <SuccessActions />
      </Card>
    </div>
  )
}