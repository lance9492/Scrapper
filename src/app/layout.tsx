import { Inter } from 'next/font/google'
import { Providers } from './providers'
import { Navbar } from '@/components/ui/navbar'
import { Footer } from '@/components/ui/footer'
import { Toaster } from '@/components/ui/toaster'
import { LiveChat } from '@/components/ui/live-chat'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Scrapper - South Africa\'s Premier Recycling Marketplace',
  description: 'Buy and sell metals, plastics, and used oils with verified traders across South Africa',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body className={`${inter.className} min-h-full flex flex-col`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
          </div>
          <Toaster />
          <LiveChat />
        </Providers>
      </body>
    </html>
  )
}