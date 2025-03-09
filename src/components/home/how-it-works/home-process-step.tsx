import { Card } from "@/components/ui/card"

interface HomeProcessStepProps {
  number: number
  title: string
  description: string
}

export function HomeProcessStep({ number, title, description }: HomeProcessStepProps) {
  return (
    <Card className="p-6 text-center">
      <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
        {number}
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Card>
  )
}