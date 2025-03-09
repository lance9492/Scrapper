import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type UseFormReturn } from "react-hook-form"
import { type StripperFormData } from "../schema"

interface StripperBasicInfoProps {
  form: UseFormReturn<StripperFormData>
}

export function StripperBasicInfo({ form }: StripperBasicInfoProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="stripType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Strip Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select strip type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Full Vehicle">Full Vehicle</SelectItem>
                <SelectItem value="Partial">Partial</SelectItem>
                <SelectItem value="Components">Components</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea {...field} className="min-h-[150px]" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}