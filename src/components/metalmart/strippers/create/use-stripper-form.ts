"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { stripperFormSchema, type StripperFormData } from "./schema"
import { toast } from "@/hooks/toast"

export function useStripperForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<StripperFormData>({
    resolver: zodResolver(stripperFormSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      location: "",
      make: "",
      model: "",
      year: new Date().getFullYear(),
      stripType: "Full Vehicle",
      condition: ""
    }
  })

  const onSubmit = async (data: StripperFormData) => {
    setIsSubmitting(true)
    try {
      // TODO: Implement API call to save listing
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Success",
        description: "Your listing has been created"
      })
      
      form.reset()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create listing",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    form,
    isSubmitting,
    onSubmit
  }
}