"use client"

import { useState, useRef } from "react"

type FilterCategory = "All" | "Tops" | "Bottoms" | "Outerwear" | "Footwear" | "Accessories"

const CATEGORIES: FilterCategory[] = ["All", "Tops", "Bottoms", "Outerwear", "Footwear", "Accessories"]

interface CategoryFilterProps {
  activeCategory: FilterCategory
  onCategoryChange: (category: FilterCategory) => void
}

export function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  const [hoveredCategory, setHoveredCategory] = useState<FilterCategory | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = scrollContainerRef.current
    if (!container) return

    setIsDragging(true)
    const startX = e.pageX - container.offsetLeft
    const scrollLeft = container.scrollLeft

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.pageX - container.offsetLeft
      const walk = (x - startX) * 2
      container.scrollLeft = scrollLeft - walk
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  return (
    <div className="mb-16">
      {/* Section Label */}
      <div className="flex items-center gap-3 mb-8">
        <div className="h-px w-8 bg-white/20" />
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/40">Filter</span>
      </div>

      {/* Category Pills */}
      <div 
        ref={scrollContainerRef}
        className={`flex md:flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-hide select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ WebkitOverflowScrolling: 'touch' }}
        onMouseDown={handleMouseDown}
      >
        {CATEGORIES.map((category, index) => {
          const isActive = activeCategory === category
          const isHovered = hoveredCategory === category
          
          return (
            <button
              key={category}
              onClick={(e) => {
                if (!isDragging) {
                  onCategoryChange(category)
                }
              }}
              onMouseEnter={() => setHoveredCategory(category)}
              onMouseLeave={() => setHoveredCategory(null)}
              onMouseDown={(e) => e.stopPropagation()}
              className="relative group flex-shrink-0"
              style={{
                animation: `fadeIn 0.4s ease-out ${index * 0.05}s both`
              }}
            >
              {/* Background */}
              <div
                className={`
                  relative px-5 py-2.5 border transition-all duration-300
                  ${isActive 
                    ? "bg-white text-black border-white" 
                    : "bg-transparent text-white/60 border-white/20 hover:border-white/40 hover:text-white"
                  }
                `}
              >
                {/* Gradient Overlay on Hover (inactive state) */}
                {!isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
                
                {/* Text */}
                <span className="relative z-10 text-xs font-bold tracking-wider uppercase font-mono">
                  {category}
                </span>

                {/* Active Indicator Line */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black" />
                )}
              </div>

              {/* Glow Effect for Active */}
              {isActive && (
                <div className="absolute inset-0 bg-white/30 blur-md -z-10 animate-pulse" />
              )}

              {/* Corner Accents on Hover */}
              {isHovered && !isActive && (
                <>
                  <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/40 transition-all duration-300" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-white/40 transition-all duration-300" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-white/40 transition-all duration-300" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/40 transition-all duration-300" />
                </>
              )}
            </button>
          )
        })}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
