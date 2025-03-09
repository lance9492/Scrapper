"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { contactSchema, type ContactFormData } from "./contact-schema"
import { toast } from "@/hooks/toast"

export function useContactForm() {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      // TODO: Implement contact form submission
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Message sent",
        description: "We'll get back to you soon!"
      })
      
      form.reset()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      })
    }
  }

  return { form, onSubmit }
}