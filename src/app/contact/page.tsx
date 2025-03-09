import { departments } from "@/lib/data/company-structure"
import { ContactForm } from "@/components/contact/contact-form"
import { DepartmentCard } from "@/components/contact/department-card"

export default function ContactPage() {
  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-muted-foreground">
          Get in touch with our team for any inquiries or support needs.
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr_300px] gap-8">
        <ContactForm />
        <div className="space-y-4">
          {departments.map((department) => (
            <DepartmentCard key={department.name} department={department} />
          ))}
        </div>
      </div>
    </div>
  )
}