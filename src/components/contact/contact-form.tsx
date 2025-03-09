"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { departments } from "@/lib/data/company-structure"
import { useContactForm } from "./use-contact-form"
import { MessageSquare } from "lucide-react"

export function ContactForm() {
  const { form, onSubmit } = useContactForm()

  const openChat = () => {
    // @ts-ignore
    if (window.BusinessMessages?.open) {
      // @ts-ignore
      window.BusinessMessages.open()
    }
  }

  return (
    <Card className="p-6">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Name</label>
            <Input placeholder="Your name" {...form.register('name')} />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Email</label>
            <Input type="email" placeholder="your@email.com" {...form.register('email')} />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Department</label>
          <select className="w-full p-2 rounded-md border" {...form.register('department')}>
            {departments.map((dept) => (
              <option key={dept.name}>{dept.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Message</label>
          <Textarea 
            placeholder="How can we help you?" 
            className="min-h-[150px]" 
            {...form.register('message')}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button type="submit" className="flex-1">Send Message</Button>
          <Button 
            type="button" 
            variant="secondary" 
            className="flex-1 flex items-center justify-center gap-2"
            onClick={openChat}
          >
            <MessageSquare className="h-4 w-4" />
            Start Live Chat
          </Button>
        </div>
      </form>
    </Card>
  )
}