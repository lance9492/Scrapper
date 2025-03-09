import { Input } from "@/components/ui/input"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <Input
      placeholder="Search listings..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full"
    />
  )
}