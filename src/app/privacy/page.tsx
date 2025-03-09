import { Card } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="container py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="space-y-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>We collect information that you provide directly to us, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name and contact information</li>
              <li>Business details and registration numbers</li>
              <li>Account credentials</li>
              <li>Transaction and listing information</li>
              <li>Communications with other users</li>
            </ul>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li>• To provide and maintain our services</li>
            <li>• To process your transactions</li>
            <li>• To verify your identity and prevent fraud</li>
            <li>• To communicate with you about our services</li>
            <li>• To improve our platform and user experience</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">3. Information Sharing</h2>
          <p className="text-muted-foreground mb-4">
            We may share your information with:
          </p>
          <ul className="space-y-3 text-muted-foreground">
            <li>• Other users as necessary for transactions</li>
            <li>• Service providers who assist our operations</li>
            <li>• Law enforcement when required by law</li>
            <li>• Professional advisors and insurers</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">4. Data Security</h2>
          <p className="text-muted-foreground mb-4">
            We implement appropriate security measures to protect your information, including:
          </p>
          <ul className="space-y-3 text-muted-foreground">
            <li>• Encryption of sensitive data</li>
            <li>• Regular security assessments</li>
            <li>• Access controls and authentication</li>
            <li>• Secure data storage practices</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">5. Your Rights</h2>
          <p className="text-muted-foreground mb-4">
            You have the right to:
          </p>
          <ul className="space-y-3 text-muted-foreground">
            <li>• Access your personal information</li>
            <li>• Correct inaccurate data</li>
            <li>• Request deletion of your data</li>
            <li>• Object to data processing</li>
            <li>• Export your data</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">6. Cookies and Tracking</h2>
          <p className="text-muted-foreground mb-4">
            We use cookies and similar technologies to:
          </p>
          <ul className="space-y-3 text-muted-foreground">
            <li>• Remember your preferences</li>
            <li>• Analyze site usage</li>
            <li>• Enhance site security</li>
            <li>• Provide personalized content</li>
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">7. Children's Privacy</h2>
          <p className="text-muted-foreground">
            Our services are not intended for children under 18. We do not knowingly collect or maintain information from persons under 18 years of age.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">8. International Data Transfers</h2>
          <p className="text-muted-foreground">
            Your information may be transferred to and processed in countries other than South Africa. We ensure appropriate safeguards are in place for such transfers.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">9. Changes to Privacy Policy</h2>
          <p className="text-muted-foreground">
            We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the effective date.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">10. Contact Us</h2>
          <p className="text-muted-foreground">
            If you have any questions about this privacy policy or our data practices, please contact our privacy team at privacy@scrapper.co.za
          </p>
        </Card>

        <div className="text-sm text-muted-foreground mt-8">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p>Effective date: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  )
}