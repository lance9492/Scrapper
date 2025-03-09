"use client"

import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { type TradingPreferences } from "../types"

interface TradingPreferencesStepProps {
  preferences: TradingPreferences
  onPreferencesChange: (preferences: TradingPreferences) => void
  onNext: () => void
  onBack: () => void
}

export function TradingPreferencesStep({
  preferences,
  onPreferencesChange,
  onNext,
  onBack,
}: TradingPreferencesStepProps) {
  return (
    <Card className="w-full max-w-md p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Trading Preferences</h2>
        <p className="text-muted-foreground">
          Select how you want to trade on our platform
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="buying"
            checked={preferences.buying}
            onCheckedChange={(checked) =>
              onPreferencesChange({ ...preferences, buying: checked as boolean })
            }
          />
          <Label htmlFor="buying">
            <div className="font-medium">Buy Scrap Metal</div>
            <div className="text-sm text-muted-foreground">
              Browse and purchase scrap metal listings
            </div>
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="selling"
            checked={preferences.selling}
            onCheckedChange={(checked) =>
              onPreferencesChange({ ...preferences, selling: checked as boolean })
            }
          />
          <Label htmlFor="selling">
            <div className="font-medium">Sell Scrap Metal</div>
            <div className="text-sm text-muted-foreground">
              List and sell your scrap metal
            </div>
          </Label>
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <Button variant="outline" onClick={onBack} className="w-full">
          Back
        </Button>
        <Button
          onClick={onNext}
          className="w-full"
          disabled={!preferences.buying && !preferences.selling}
        >
          Continue
        </Button>
      </div>
    </Card>
  )
}