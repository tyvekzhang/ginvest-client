"use client"

import type React from "react"
import { useEffect } from "react"
import { useAuthStore } from "@/lib/auth-store"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser } = useAuthStore()

  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to restore user:", error)
      }
    }
  }, [setUser])

  return <>{children}</>
}
