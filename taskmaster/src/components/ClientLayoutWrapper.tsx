
"use client"

import { useUserSession } from "@/hooks/useUserSession"
import Navbar from "@/components/Navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { ReactNode } from "react"

export default function ClientLayoutWrapper({ children }: { children: ReactNode }) {
  const { user, loading } = useUserSession()

  if (loading) return <div>Loading...</div>

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <Navbar />
      {children}
    </ThemeProvider>
  )
}
