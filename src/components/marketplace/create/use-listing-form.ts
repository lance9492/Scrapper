"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "@/hooks/toast"
import { createPaymentForm } from "@/lib/payfast"
import { listingSchema, type ListingFormData, type PaymentFormData } from "./types"

export function useListingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paymentData, setPaymentData] = useState<PaymentFormData | null>(null)

  const form = useForm<ListingFormData>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      duration: 7,
      images: [],
    },
  })

  async function onSubmit(values: ListingFormData) {
    setIsSubmitting(true)
    try {
      const payment = createPaymentForm({
        amount: 10.00,
        item_name: "Scrap Metal Listing Fee",
        return_url: `${window.location.origin}/marketplace/create/success`,
        cancel_url: `${window.location.origin}/marketplace/create/cancel`,
        notify_url: `${window.location.origin}/api/payment/notify`,
        email_address: "user@example.com", // TODO: Get from auth session
      })

      setPaymentData(payment)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetPayment = () => {
    setPaymentData(null)
    setIsSubmitting(false)
  }

  return {
    form,
    isSubmitting,
    paymentData,
    onSubmit,
    resetPayment
  }
}