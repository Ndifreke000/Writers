import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/auth-provider"
import { ProjectProvider } from "@/components/project-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Writer's Workshop",
  description: "A complete platform for writers to organize and create their stories",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ProjectProvider>{children}</ProjectProvider>
        </AuthProvider>
      </body>
    </html>
  )
}



import './globals.css'