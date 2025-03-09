"use client"

import { AccountTypeStep } from "../steps/account-type-step"
import { TradingPreferencesStep } from "../steps/trading-preferences-step"
import { DetailsStep } from "../steps/details-step"
import { CompanyDetailsStep } from "../steps/company-details-step"
import { type RegisterFormData, type AccountType, type TradingPreferences, type CompanyFormData } from "../types"

interface RegistrationStepsProps {
  step: number
  accountType: AccountType | null
  tradingPreferences: TradingPreferences
  formData: RegisterFormData
  companyData: CompanyFormData
  onStepChange: (step: number) => void
  onAccountTypeSelect: (type: AccountType) => void
  onPreferencesChange: (prefs: TradingPreferences) => void
  onFormDataChange: (data: RegisterFormData) => void
  onCompanyDataChange: (data: CompanyFormData) => void
  onSubmit: () => Promise<void>
}

export function RegistrationSteps(props: RegistrationStepsProps) {
  const {
    step,
    accountType,
    tradingPreferences,
    formData,
    companyData,
    onStepChange,
    onAccountTypeSelect,
    onPreferencesChange,
    onFormDataChange,
    onCompanyDataChange,
    onSubmit
  } = props

  switch (step) {
    case 1:
      return (
        <AccountTypeStep
          selectedType={accountType}
          onTypeSelect={onAccountTypeSelect}
          onNext={() => onStepChange(2)}
        />
      )
    case 2:
      return (
        <TradingPreferencesStep
          preferences={tradingPreferences}
          onPreferencesChange={onPreferencesChange}
          onNext={() => onStepChange(3)}
          onBack={() => onStepChange(1)}
        />
      )
    case 3:
      return accountType === "company" ? (
        <CompanyDetailsStep
          formData={companyData}
          onFormDataChange={onCompanyDataChange}
          onNext={() => onStepChange(4)}
          onBack={() => onStepChange(2)}
        />
      ) : (
        <DetailsStep
          formData={formData}
          onFormDataChange={onFormDataChange}
          onSubmit={onSubmit}
          onBack={() => onStepChange(2)}
          accountType={accountType!}
        />
      )
    case 4:
      return (
        <DetailsStep
          formData={formData}
          onFormDataChange={onFormDataChange}
          onSubmit={onSubmit}
          onBack={() => onStepChange(3)}
          accountType={accountType!}
        />
      )
    default:
      return null
  }
}