import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/toast"
import { registerUser } from "./api"
import { type RegisterFormData, type AccountType, type TradingPreferences, type CompanyFormData } from "@/components/auth/register/types"

export function useRegistrationFlow() {
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
      await registerUser({
        accountType: accountType!,
        tradingPreferences,
        formData,
        companyData: accountType === "company" ? companyData : undefined
      })

      toast({
        title: "Account created",
        description: "Please check your email to verify your account"
      })

      router.push("/auth/verify")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
        variant: "destructive"
      })
    }
  }

  return {
    step,
    accountType,
    tradingPreferences,
    formData,
    companyData,
    handleStepChange: setStep,
    handleAccountTypeSelect: setAccountType,
    handlePreferencesChange: setTradingPreferences,
    handleFormDataChange: setFormData,
    handleCompanyDataChange: setCompanyData,
    handleSubmit
  }
}