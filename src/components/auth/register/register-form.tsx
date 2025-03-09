"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/toast"
import { createUserWithEmail } from "@/lib/firebase/auth"
import { RegistrationSteps } from "./steps/registration-steps"
import { type AccountType, type TradingPreferences, type CompanyFormData, type RegisterFormData } from "./types"

export function RegisterForm() {
  const [step, setStep] = useState(1)
  const [accountType, setAccountType] = useState<AccountType | null>(null)
  const [tradingPreferences, setTradingPreferences] = useState<TradingPreferences>({
    buying: false,
    selling: false,
  })
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [companyData, setCompanyData] = useState<CompanyFormData>({
    registrationNumber: "",
    vatNumber: "",
  })

  const router = useRouter()

  const handleSubmit = async () => {
    try {
      await createUserWithEmail(formData.email, formData.password)
      
      toast({
        title: "Account created",
        description: "Please check your email to verify your account"
      })

      router.push("/auth/verify")
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create account",
        variant: "destructive"
      })
    }
  }

  return (
    <RegistrationSteps
      step={step}
      accountType={accountType}
      tradingPreferences={tradingPreferences}
      formData={formData}
      companyData={companyData}
      onStepChange={setStep}
      onAccountTypeSelect={setAccountType}
      onPreferencesChange={setTradingPreferences}
      onFormDataChange={setFormData}
      onCompanyDataChange={setCompanyData}
      onSubmit={handleSubmit}
    />
  )
}