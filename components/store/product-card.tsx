"use client"

import type React from "react"
import type { Product } from "@/lib/types/product"
import { useState, useRef } from "react"
import Link from "next/link"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setMousePosition({ x, y })

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * 3
    const rotateY = ((centerX - x) / centerX) * 3

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${isHovered ? 10 : 0}px)`
  }

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)"
    }
    setIsHovered(false)
  }

  return (
    <Link href={`/product/${product.id}`}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovered(true)}
        className="group cursor-pointer relative"
        style={{ transformStyle: "preserve-3d", transition: "transform 0.1s ease-out" }}
      >
        {/* Glow Effect */}
        <div 
          className="absolute -inset-[1px] bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
        />
        
        <div className="relative bg-zinc-950 border border-white/10 overflow-hidden group-hover:border-white/30 transition-all duration-500">
          {/* Image Container */}
          <div className="relative w-full aspect-square overflow-hidden bg-zinc-900">
            {/* Spotlight Effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
              style={{
                background: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.15), transparent 80%)`,
              }}
            />
            
            {/* Image */}
            <div
              className="w-full h-full transition-all duration-700 ease-out"
              style={{
                transform: isHovered ? "scale(1.1)" : "scale(1)",
              }}
            >
              <img
                src={product.image_url || "/placeholder.svg?height=400&width=400&query=premium fashion"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Category Badge */}
            {product.category && (
              <div className="absolute top-4 left-4 bg-white text-black px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] shadow-xl">
                {product.category}
              </div>
            )}

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Content */}
          <div className="relative p-4 bg-zinc-950">
            {/* Top Line Accent */}
            <div className="absolute top-0 left-0 w-0 h-[1px] bg-gradient-to-r from-white to-transparent group-hover:w-full transition-all duration-700 ease-out" />
            
            <div className="space-y-2">
              <h3 className="font-bold text-xs uppercase tracking-wider text-white leading-tight line-clamp-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all duration-300">
                {product.name}
              </h3>
              
              <p className="text-[10px] text-white/50 line-clamp-1 leading-relaxed font-light">
                {product.description}
              </p>
            </div>

            {/* View CTA */}
            <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
              <span className="text-[9px] text-white/40 font-mono tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                View
              </span>
              
              <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-150 transform translate-x-2 group-hover:translate-x-0">
                <div className="h-[1px] w-6 bg-white/40" />
                <svg 
                  className="w-3 h-3 text-white/40" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17 8l4 4m0 0l-4 4m4-4H3" 
                  />
                </svg>
              </div>
            </div>

            {/* Corner Accent */}
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>
      </div>
    </Link>
  )
}
