import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProvinceFilterProps {
  value: string
  onChange: (value: string) => void
}

export function ProvinceFilter({ value, onChange }: ProvinceFilterProps) {
  return (
    <div>
      <label className="text-sm font-medium mb-2 block">Province</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select province" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Provinces</SelectItem>
          <SelectItem value="western-cape">Western Cape</SelectItem>
          <SelectItem value="gauteng">Gauteng</SelectItem>
          <SelectItem value="kwazulu-natal">KwaZulu-Natal</SelectItem>
          <SelectItem value="eastern-cape">Eastern Cape</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}