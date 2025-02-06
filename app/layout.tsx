// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'
import './globals.css'
import { Testimonials } from '@/components/testimonials'
import { PartnersSection } from '@/components/partners-section'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WildMind - AI Creative Studio',
  description: 'Turn imagination into high-quality, creative visuals with advanced AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>{children}</main>
        <Testimonials />
        <PartnersSection />
        <Footer />
      </body>
    </html>
  )
}