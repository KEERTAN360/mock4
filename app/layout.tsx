import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import FloatingSafetyMonitor from "@/components/floating-safety-monitor"
import { LanguageProvider } from "@/contexts/language-context"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Tourist app",
  description: "MY app",
  generator: "Keertan",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <LanguageProvider>
          <Suspense fallback={null}>
            {children}
            <FloatingSafetyMonitor isActive={true} />
            <Analytics />
          </Suspense>
        </LanguageProvider>
      </body>
    </html>
  )
}
