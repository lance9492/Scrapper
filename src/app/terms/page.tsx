import { Card } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="container py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      
      <div className="space-y-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-muted-foreground mb-4">
            Welcome to Scrapper.co.za. By accessing and using our platform, you agree to be bound by these Terms of Service.
          </p>
          <p className="text-muted-foreground">
            These terms govern your use of our website and services for buying, selling, and trading recyclable materials in South Africa.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">2. User Accounts</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li>• You must be at least 18 years old to create an account</li>
            <li>• You are responsible for maintaining the security of your account</li>
            <li>• Business accounts must provide valid company registration details</li>
            <li>• You must provide accurate and truthful information</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">3. Listing Rules</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li>• All listings must be for legitimate recyclable materials</li>
            <li>• Accurate descriptions and images are required</li>
            <li>• Pricing must be in South African Rand (ZAR)</li>
            <li>• Prohibited items will be removed</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">4. Trading Guidelines</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li>• All transactions must be conducted through our platform</li>
            <li>• Sellers must have necessary permits and licenses</li>
            <li>• Materials must meet described quality standards</li>
            <li>• Payment terms must be clearly stated</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">5. Safety and Compliance</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li>• Users must comply with all applicable laws and regulations</li>
            <li>• Proper handling and transportation of materials is required</li>
            <li>• Environmental and safety standards must be maintained</li>
            <li>• Report any suspicious activities</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">6. Fees and Payments</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li>• Listing fees are non-refundable</li>
            <li>• Transaction fees may apply</li>
            <li>• Payment methods are subject to verification</li>
            <li>• All fees are exclusive of VAT</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">7. Dispute Resolution</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li>• Users should attempt to resolve disputes amicably</li>
            <li>• Our support team can mediate if necessary</li>
            <li>• We reserve the right to suspend accounts during investigations</li>
            <li>• Legal action should be a last resort</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">8. Termination</h2>
          <p className="text-muted-foreground">
            We reserve the right to terminate or suspend accounts that violate these terms, engage in fraudulent activity, or pose a risk to our community. Users may also terminate their accounts at any time by contacting support.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">9. Changes to Terms</h2>
          <p className="text-muted-foreground">
            We may modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms. Users will be notified of significant changes.
          </p>
        </Card>

        <div className="text-sm text-muted-foreground mt-8">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p>For questions about these terms, please contact our support team.</p>
        </div>
      </div>
    </div>
  )
}