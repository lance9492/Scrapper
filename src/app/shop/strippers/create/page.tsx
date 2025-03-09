```typescript
import { StripperForm } from "@/components/shop/strippers/create/stripper-form"

export default function CreateStripperListingPage() {
  return (
    <div className="container max-w-2xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">List for Stripping</h1>
        <p className="text-muted-foreground">
          Create a listing for your vehicle or machinery that's available for stripping. Add multiple images and videos to showcase all available parts.
        </p>
      </div>
      <StripperForm />
    </div>
  )
}
```