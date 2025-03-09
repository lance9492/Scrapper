"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/toast"
import { useAuth } from "@/components/providers/auth-provider"

interface Price {
  id: string
  material_type: string
  grade: string
  price_per_kg: number
}

export function PriceEditor({ initialPrices }: { initialPrices: Price[] }) {
  const [prices, setPrices] = useState(initialPrices)
  const [isEditing, setIsEditing] = useState(false)
  const { user } = useAuth()

  const handlePriceChange = (id: string, newPrice: number) => {
    setPrices(prices.map(price => 
      price.id === id ? { ...price, price_per_kg: newPrice } : price
    ))
  }

  const handleSave = async () => {
    try {
      const response = await fetch('/api/prices', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prices)
      })

      if (!response.ok) {
        throw new Error('Failed to update prices')
      }

      setIsEditing(false)
      toast({
        title: "Success",
        description: "Prices updated successfully"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update prices",
        variant: "destructive"
      })
    }
  }

  if (!user) return null

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Material Prices</h2>
        {isEditing ? (
          <div className="space-x-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        ) : (
          <Button onClick={() => setIsEditing(true)}>
            Edit Prices
          </Button>
        )}
      </div>

      <div className="grid gap-4">
        {prices.map((price) => (
          <div key={price.id} className="flex items-center justify-between p-4 bg-card rounded-lg">
            <div>
              <div className="font-medium">{price.material_type}</div>
              <div className="text-sm text-muted-foreground">Grade {price.grade}</div>
            </div>
            {isEditing ? (
              <Input
                type="number"
                value={price.price_per_kg}
                onChange={(e) => handlePriceChange(price.id, parseFloat(e.target.value))}
                className="w-32"
                step="0.01"
              />
            ) : (
              <div className="font-bold">R {price.price_per_kg.toFixed(2)}/kg</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}