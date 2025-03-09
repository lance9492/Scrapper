"use client"

import Link from "next/link"
import { Button } from "./button"
import { ThemeToggle } from "./theme-toggle"
import { ShoppingBag, BarChart2, MessageCircle, Map, User, Recycle, Menu, X, Wrench, Mail } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { signOut } from "@/lib/auth/validate"
import { toast } from "@/hooks/toast"
import { useAuth } from "@/components/providers/auth-provider"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
      toast({
        title: "Success",
        description: "Successfully logged out"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive"
      })
    }
  }

  const navItems = [
    {
      href: "/marketplace",
      label: "RecycleMart",
      icon: ShoppingBag
    },
    {
      href: "/partsbay",
      label: "SalvageHub",
      icon: Wrench
    },
    {
      href: "/prices",
      label: "Live Prices",
      icon: BarChart2
    },
    {
      href: "/materials",
      label: "Materials",
      icon: Recycle
    },
    {
      href: "/recyclers",
      label: "Recyclers",
      icon: Map
    },
    {
      href: "/contact",
      label: "Contact",
      icon: Mail
    }
  ]

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center space-x-2 mr-8">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-primary rounded-lg transform rotate-45"></div>
            <div className="absolute inset-1 bg-background rounded-md flex items-center justify-center">
              <span className="text-primary font-bold text-lg">S</span>
            </div>
          </div>
          <span className="font-bold text-xl">Scrapper</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6 flex-1 justify-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-2 ml-auto">
          <ThemeToggle />
          
          {user ? (
            <>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/messages">
                  <MessageCircle className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" onClick={handleSignOut}>
                <User className="h-5 w-5" />
              </Button>
              <Button asChild>
                <Link href="/marketplace/create">Post Listing</Link>
              </Button>
            </>
          ) : (
            <Button asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-x-0 top-14 bg-background border-b md:hidden transition-all duration-200 ease-in-out",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        )}
      >
        <div className="container py-4 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-accent"
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
          <hr className="my-2" />
          {user ? (
            <>
              <Button asChild className="w-full" onClick={() => setIsOpen(false)}>
                <Link href="/marketplace/create">Post Listing</Link>
              </Button>
              <Button variant="outline" asChild className="w-full" onClick={() => setIsOpen(false)}>
                <Link href="/messages">Messages</Link>
              </Button>
            </>
          ) : (
            <Button asChild className="w-full" onClick={() => setIsOpen(false)}>
              <Link href="/auth/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}