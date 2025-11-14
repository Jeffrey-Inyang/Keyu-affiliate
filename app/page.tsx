"use client"

import { useEffect, useState, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import type { Product } from "@/lib/types/product"
import { ProductCard } from "@/components/store/product-card"
import { CategoryFilter } from "@/components/store/category-filter"

type FilterCategory = "All" | "Tops" | "Bottoms" | "Outerwear" | "Footwear" | "Accessories"

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("All")
  const [isLoading, setIsLoading] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const heroRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  const PRODUCTS_PER_PAGE = 12

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false })
      if (data) setProducts(data)
      setIsLoading(false)
    }
    fetchProducts()
  }, [supabase])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const filteredProducts = products.filter((product) => {
    if (activeCategory === "All") return true
    return product.category === activeCategory
  })

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1)
  }, [activeCategory])

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const endIndex = startIndex + PRODUCTS_PER_PAGE
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
  }

  const parallaxX = (mousePosition.x - window.innerWidth / 2) * 0.02
  const parallaxY = (mousePosition.y - window.innerHeight / 2) * 0.02

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Cursor Follower */}
      <div
        className="hidden md:block fixed w-6 h-6 border border-white/30 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-200 ease-out"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
              transform: `translate(${parallaxX}px, ${parallaxY}px)`,
            }}
          />
        </div>

        {/* Floating Orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          style={{
            transform: `translate(${parallaxX * 2}px, ${parallaxY * 2}px) scale(${1 - scrollY * 0.001})`,
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          style={{
            transform: `translate(${-parallaxX * 2}px, ${-parallaxY * 2}px) scale(${1 - scrollY * 0.001})`,
          }}
        />

        {/* Main Content */}
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          {/* Glitch Effect Line */}
          <div className="mb-12 flex items-center justify-center gap-4 overflow-hidden">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/50" />
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-white/60 animate-pulse">
              Est. 2025
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/50" />
          </div>

          {/* Main Title with Split Effect */}
          <div className="relative mb-8">
            <h1
              className="text-[15vw] md:text-[12vw] font-black tracking-tighter leading-none"
              style={{
                transform: `translateY(${scrollY * 0.3}px)`,
              }}
            >
              <span className="inline-block hover:scale-110 transition-transform duration-300 cursor-default">K</span>
              <span className="inline-block hover:scale-110 transition-transform duration-300 cursor-default">E</span>
              <span className="inline-block hover:scale-110 transition-transform duration-300 cursor-default">Y</span>
              <span className="inline-block hover:scale-110 transition-transform duration-300 cursor-default">U</span>
            </h1>
            {/* Glitch Shadow */}
            <h1
              className="absolute inset-0 text-[15vw] md:text-[12vw] font-black tracking-tighter leading-none opacity-20 blur-sm"
              style={{
                transform: `translate(${Math.sin(Date.now() * 0.001) * 2}px, ${Math.cos(Date.now() * 0.001) * 2}px)`,
                color: "#8b5cf6",
              }}
            >
              KEYU
            </h1>
          </div>

          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-16 leading-relaxed font-light">
            <span className="text-white italic">I may earn from qualifying purchases</span>. 
          </p>

          {/* CTA with Magnetic Effect */}
          <button
            onClick={() => {
              document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
            }}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = `scale(1.05) translateY(-2px)`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = `scale(1)`
            }}
          >
            <span className="relative z-10">Enter Collection</span>
            <svg
              className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
            <span className="text-xs text-white/40 font-mono">SCROLL</span>
            <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="relative py-24 px-6">
        {/* Section Divider */}
        <div className="max-w-7xl mx-auto mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="text-xs font-mono tracking-widest text-white/40">COLLECTION</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

          {isLoading ? (
            <div className="text-center py-32">
              <div className="inline-flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <p className="text-white/40 font-mono text-sm">LOADING COLLECTION</p>
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-32">
              <div className="inline-flex flex-col items-center gap-4">
                <div className="w-16 h-16 border border-white/20 flex items-center justify-center">
                  <span className="text-2xl">∅</span>
                </div>
                <p className="text-white/60">No products in this category</p>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mt-16">
                {currentProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-16 flex items-center justify-center gap-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`w-10 h-10 border flex items-center justify-center transition-all duration-300 ${
                      currentPage === 1
                        ? "border-white/10 text-white/20 cursor-not-allowed"
                        : "border-white/20 text-white/60 hover:border-white/40 hover:text-white"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 border font-mono text-xs transition-all duration-300 ${
                          currentPage === page
                            ? "bg-white text-black border-white"
                            : "border-white/20 text-white/60 hover:border-white/40 hover:text-white"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`w-10 h-10 border flex items-center justify-center transition-all duration-300 ${
                      currentPage === totalPages
                        ? "border-white/10 text-white/20 cursor-not-allowed"
                        : "border-white/20 text-white/60 hover:border-white/40 hover:text-white"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-2xl font-black tracking-tighter mb-2">KEYU</p>
              <p className="text-sm text-white/40 font-mono">Premium Curation © 2025</p>
            </div>
            <div className="flex items-center gap-8">
              <a
                href="mailto:keyu-affiliate@outlook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/60 hover:text-white transition-colors duration-300 font-mono uppercase tracking-wider"
              >
                Contact
              </a>
              <a
                href="/terms"
                className="text-sm text-white/60 hover:text-white transition-colors duration-300 font-mono uppercase tracking-wider"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-sm text-white/60 hover:text-white transition-colors duration-300 font-mono uppercase tracking-wider"
              >
                About
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
