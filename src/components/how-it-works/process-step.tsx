import { Card } from "@/components/ui/card"

interface ProcessStepProps {
  number: number
  title: string
  description: string
}

export function ProcessStep({ number, title, description }: ProcessStepProps) {
  return (
    <Card className="p-6 text-center">
      <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Card>
  )
}