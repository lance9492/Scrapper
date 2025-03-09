"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export function StrippersFilters() {
  return (
    <Card className="p-4 space-y-6">
      <div>
        <Label>Search</Label>
        <Input placeholder="Search strippers..." className="mt-1.5" />
      </div>

      <div>
        <Label>Type</Label>
        <Select>
          <SelectTrigger className="mt-1.5">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full">Full Vehicle</SelectItem>
            <SelectItem value="partial">Partial</SelectItem>
            <SelectItem value="components">Components</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Make</Label>
        <Select>
          <SelectTrigger className="mt-1.5">
            <SelectValue placeholder="Select make" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="toyota">Toyota</SelectItem>
            <SelectItem value="volkswagen">Volkswagen</SelectItem>
            <SelectItem value="ford">Ford</SelectItem>
            <SelectItem value="caterpillar">Caterpillar</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Year Range</Label>
        <div className="grid grid-cols-2 gap-2 mt-1.5">
          <Input type="number" placeholder="From" />
          <Input type="number" placeholder="To" />
        </div>
      </div>
    </Card>
  )
}