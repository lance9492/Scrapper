"use client"

import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Building2, User } from "lucide-react"
import { type AccountType } from "../types"

interface AccountTypeStepProps {
  selectedType: AccountType | null
  onTypeSelect: (type: AccountType) => void
  onNext: () => void
}

export function AccountTypeStep({ selectedType, onTypeSelect, onNext }: AccountTypeStepProps) {
  return (
    <Card className="w-full max-w-md p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Choose Account Type</h2>
        <p className="text-muted-foreground">
          Select the type of account you want to create
        </p>
      </div>

      <RadioGroup
        value={selectedType || ""}
        onValueChange={(value) => onTypeSelect(value as AccountType)}
        className="grid gap-4"
      >
        <div>
          <RadioGroupItem
            value="individual"
            id="individual"
            className="peer sr-only"
          />
          <Label
            htmlFor="individual"
            className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-muted peer-data-[state=checked]:border-primary"
          >
            <div className="flex items-center gap-4">
              <User className="h-5 w-5" />
              <div>
                <div className="font-semibold">Individual Account</div>
                <div className="text-sm text-muted-foreground">
                  For personal use and small-scale trading
                </div>
              </div>
            </div>
          </Label>
        </div>

        <div>
          <RadioGroupItem
            value="company"
            id="company"
            className="peer sr-only"
          />
          <Label
            htmlFor="company"
            className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-muted peer-data-[state=checked]:border-primary"
          >
            <div className="flex items-center gap-4">
              <Building2 className="h-5 w-5" />
              <div>
                <div className="font-semibold">Company Account</div>
                <div className="text-sm text-muted-foreground">
                  For businesses and large-scale operations
                </div>
              </div>
            </div>
          </Label>
        </div>
      </RadioGroup>

      <Button 
        onClick={onNext} 
        className="w-full mt-6"
        disabled={!selectedType}
      >
        Continue
      </Button>
    </Card>
  )
}