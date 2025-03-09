"use client"

import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { StripperBasicInfo } from "./sections/stripper-basic-info"
import { StripperDetails } from "./sections/stripper-details"
import { useStripperForm } from "./use-stripper-form"

export function StripperListingForm() {
  const { form, isSubmitting, onSubmit } = useStripperForm()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <StripperBasicInfo form={form} />
        <StripperDetails form={form} />
        
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating listing..." : "Create Listing"}
        </Button>
      </form>
    </Form>
  )
}