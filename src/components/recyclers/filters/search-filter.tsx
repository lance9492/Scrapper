import { Input } from "@/components/ui/input"

interface SearchFilterProps {
  value: string
  onChange: (value: string) => void
}

export function SearchFilter({ value, onChange }: SearchFilterProps) {
  return (
    <div>
      <label className="text-sm font-medium mb-2 block">Search</label>
      <Input
        placeholder="Search recyclers..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}