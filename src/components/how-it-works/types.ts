import { type LucideIcon } from "lucide-react"

export interface Benefit {
  title: string
  description: string
  icon: LucideIcon
}

export interface ProcessStepData {
  number: number
  title: string
  description: string
}