"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

export function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mouseX, setMouseX] = useState(0)
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    // Initialize window width
    setWindowWidth(window.innerWidth)

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX)
    }

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    const adminToken = sessionStorage.getItem("keyu_admin_token")
    setIsAdmin(!!adminToken)
  }, [])

  const logoOffset = windowWidth ? (mouseX - windowWidth / 2) * 0.01 : 0
  const mouseProgress = windowWidth ? (mouseX / windowWidth) * 100 : 50
  const glowTransform = windowWidth ? (mouseX / windowWidth - 0.5) * 100 : 0

  return (
    <>
      {/* Top Accent Line */}
      <div 
        className="fixed top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent z-50 opacity-30"
        style={{
          background: `linear-gradient(90deg, transparent 0%, white ${mouseProgress}%, transparent 100%)`
        }}
      />
      
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent border-b border-white/5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link 
            href="/" 
            className="group relative flex items-center"
          >
            <span 
              className="text-2xl font-black tracking-tighter text-white transition-all duration-300 group-hover:tracking-wide"
              style={{ transform: `translateX(${logoOffset}px)` }}
            >
              KEYU
            </span>
            <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300" />
          </Link>

          {/* Navigation Links */}
          <div className="flex gap-1 items-center">
            <Link
              href="/"
              className="relative px-5 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors duration-300 group"
            >
              <span className="relative z-10 font-mono tracking-wider uppercase">Store</span>
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>

            {isAdmin && (
              <Link
                href="/admin"
                className="relative ml-3 px-5 py-2 bg-white text-black text-sm font-bold overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-white/20"
              >
                <span className="relative z-10 font-mono tracking-wider uppercase">Admin</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono tracking-wider uppercase text-white">
                  Admin
                </span>
              </Link>
            )}
          </div>
        </div>

        {/* Bottom Glow Line */}
        <div 
          className={`absolute bottom-0 left-0 right-0 h-[1px] transition-opacity duration-500 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        >
          <div 
            className="h-full bg-gradient-to-r from-transparent via-white/30 to-transparent blur-sm"
            style={{
              transform: `translateX(${glowTransform}px)`
            }}
          />
        </div>
      </nav>
    </>
  )
}