"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { companySchema, type CompanyFormData } from "./company-schema"

interface CompanyDetailsStepProps {
  formData: CompanyFormData
  onFormDataChange: (data: CompanyFormData) => void
  onNext: () => void
  onBack: () => void
}

export function CompanyDetailsStep({
  formData,
  onFormDataChange,
  onNext,
  onBack,
}: CompanyDetailsStepProps) {
  const form = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: formData,
  })

  const onSubmit = (data: CompanyFormData) => {
    onFormDataChange(data)
    onNext()
  }

  return (
    <Card className="w-full max-w-md p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Company Details</h2>
        <p className="text-muted-foreground">
          Please provide your company information
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="registrationNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Registration Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="vatNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>VAT Number (Optional)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={onBack} className="w-full">
              Back
            </Button>
            <Button type="submit" className="w-full">
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  )
}