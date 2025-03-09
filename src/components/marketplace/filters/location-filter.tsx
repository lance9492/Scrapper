import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LocationFilterProps {
  value: string
  onChange: (value: string) => void
}

const locations = [
  { value: "all", label: "All Locations" },
  { value: "gauteng", label: "Gauteng" },
  { value: "western-cape", label: "Western Cape" },
  { value: "kwazulu-natal", label: "KwaZulu-Natal" },
]

export function LocationFilter({ value, onChange }: LocationFilterProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-medium">Location</h3>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select location" />
        </SelectTrigger>
        <SelectContent>
          {locations.map((location) => (
            <SelectItem key={location.value} value={location.value}>
              {location.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}