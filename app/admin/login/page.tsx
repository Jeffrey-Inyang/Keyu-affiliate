"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (password === "0706") {
      sessionStorage.setItem("keyu_admin_token", "authenticated")
      router.push("/admin")
    } else {
      setError("Invalid password")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="animate-fade-in">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black mb-3 text-foreground">KEYU</h1>
            <p className="text-muted-foreground text-sm font-light">Admin Access</p>
          </div>

          <div className="bg-card rounded-xl border border-border p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-3 text-foreground">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground placeholder:text-muted-foreground transition-all duration-300"
                />
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm font-medium">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-accent text-accent-foreground py-3 rounded-lg hover:opacity-85 transition-opacity duration-300 font-bold disabled:opacity-50 mt-8"
              >
                {isLoading ? "Authenticating..." : "Access Admin"}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-border/30 text-center">
              <p className="text-xs text-muted-foreground">KEYU Admin Panel. Authorized access only.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
