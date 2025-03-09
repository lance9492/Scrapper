"use client"

import Script from "next/script"

export function LiveChat() {
  return (
    <>
      <Script
        src="https://business.googleapis.com/chat/widget"
        strategy="afterInteractive"
        onLoad={() => {
          // @ts-ignore
          window.BusinessMessages = {
            businessId: "YOUR_BUSINESS_ID",
            businessName: "Scrapper",
            theme: {
              primaryColor: "hsl(336, 80%, 58%)",
              secondaryColor: "hsl(336, 40%, 96%)",
            }
          }
        }}
      />
    </>
  )
}