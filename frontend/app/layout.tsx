import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Autovoyage",
  description: "AI-powered travel itinerary planner",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen bg-white text-black dark:bg-black dark:text-white`}
      >
        <div className="flex min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
