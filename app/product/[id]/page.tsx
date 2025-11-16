"use client"

import { useEffect, useState, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import type { Product } from "@/lib/types/product"

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [imageLoaded, setImageLoaded] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()
  
  // New state to check if the browser history allows going back
  const [canGoBack, setCanGoBack] = useState(false)

  useEffect(() => {
    // Check if there is a history entry that is not the current page
    // If window.history.length is greater than 1, we assume we can safely use router.back()
    if (typeof window !== 'undefined' && window.history.length > 1) {
      setCanGoBack(true)
    }

    const fetchProduct = async () => {
      if (!params.id) return

      const { data } = await supabase.from("products").select("*").eq("id", params.id).single()

      if (data) {
        setProduct(data)
      }
      setIsLoading(false)
    }

    fetchProduct()
  }, [params.id, supabase])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Handler for the back button logic
  const handleBack = () => {
    if (canGoBack) {
      // Normal behavior: go back one page in history
      router.back()
    } else {
      // Fallback: If no history, navigate to the homepage ("/")
      // router.replace is used to prevent the user from hitting "back" again to return here.
      router.replace("/")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          <p className="text-white/40 font-mono text-sm tracking-widest uppercase">Loading</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="mb-8 inline-block border border-white/20 p-8">
            <span className="text-6xl">404</span>
          </div>
          <p className="text-white/60 mb-8 font-mono text-sm tracking-wider uppercase">Product not found</p>
          <button
            onClick={() => router.push("/")}
            className="group inline-flex items-center gap-2 text-white hover:text-white/60 transition-colors duration-300 font-mono text-sm tracking-wider uppercase"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Return Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ShareThis Script */}
      <script 
        type='text/javascript' 
        src='https://platform-api.sharethis.com/js/sharethis.js#property=6916e80590a70be8f33c07ed&product=inline-share-buttons' 
        async={true}
      />

      {/* Animated Background Grid */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-12">
        {/* Back Button - FIXED SYNTAX ERROR */}
        <button
          onClick={handleBack}
          className="group mb-16 flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-300"
        >
          <div className="w-8 h-8 border border-white/20 group-hover:border-white/40 flex items-center justify-center transition-colors duration-300">
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </div>
          <span className="text-xs font-mono tracking-widest uppercase">Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Section */}
          <div className="relative">
            {/* Corner Accents */}
            <div className="absolute -top-4 -left-4 w-12 h-12 border-l-2 border-t-2 border-white/20" />
            <div className="absolute -top-4 -right-4 w-12 h-12 border-r-2 border-t-2 border-white/20" />
            <div className="absolute -bottom-4 -left-4 w-12 h-12 border-l-2 border-b-2 border-white/20" />
            <div className="absolute -bottom-4 -right-4 w-12 h-12 border-r-2 border-b-2 border-white/20" />

            <div 
              ref={imageRef}
              className="relative w-full aspect-square bg-zinc-900 border border-white/10 overflow-hidden group"
            >
              {/* Spotlight Effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
                style={{
                  background: `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.15), transparent 70%)`,
                }}
              />

              <img
                src={product.image_url || "/placeholder.svg?height=600&width=600&query=premium fashion product"}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onLoad={() => setImageLoaded(true)}
              />

              {/* Loading Overlay */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                </div>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-col justify-center">
            {/* Category Badge */}
            {product.category && (
              <div className="mb-8 inline-flex w-fit">
                <div className="relative">
                  <span className="relative z-10 bg-white text-black px-4 py-2 text-[10px] font-bold tracking-[0.2em] uppercase">
                    {product.category}
                  </span>
                  <div className="absolute inset-0 bg-white/30 blur-md" />
                </div>
              </div>
            )}

            {/* Product Name */}
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-none tracking-tighter">
              {product.name.split(" ").map((word, i) => (
                <span key={i}>
                  <span
                    className="inline-block hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-white hover:to-white/60 transition-all duration-300"
                  >
                    {word}
                  </span>
                  {i < product.name.split(" ").length - 1 && " "}
                </span>
              ))}
            </h1>

            {/* Description */}
            <p className="text-base text-white/60 mb-12 leading-relaxed max-w-xl">
              {product.description}
            </p>

            {/* Divider Line */}
            <div className="mb-12">
              <div className="h-[1px] bg-gradient-to-r from-white/20 via-white/40 to-transparent mb-8" />
              <p className="text-sm text-white/50 leading-relaxed max-w-lg font-light">
                Carefully curated from our premium selection. Each piece embodies quality, design excellence, and the distinct aesthetic that defines KEYU's vision.
              </p>
            </div>

            {/* CTA Button */}
            <a
              href={product.affiliate_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-4 font-bold text-sm tracking-wider uppercase overflow-hidden w-fit transition-all duration-300 hover:shadow-2xl hover:shadow-white/20"
            >
              <span className="relative z-10">Shop Now</span>
              <svg
                className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="absolute inset-0 z-10 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white font-bold text-sm tracking-wider uppercase">
                Shop Now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>

            {/* Product Meta */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-xs text-white/40 font-mono tracking-wider uppercase mb-6">
                Premium Quality · KEYU Exclusive
              </p>
              
              {/* Share Buttons */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-white/40 font-mono tracking-wider uppercase">Share:</span>
                
                {/* Twitter/X */}
                <button
                  onClick={() => {
                    const url = encodeURIComponent(window.location.href)
                    const text = encodeURIComponent(`Check out ${product.name} on KEYU`)
                    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=550,height=420')
                  }}
                  className="w-9 h-9 border border-white/20 hover:border-white/40 flex items-center justify-center transition-all duration-300 hover:bg-white/5"
                  aria-label="Share on Twitter"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </button>

                {/* Facebook */}
                <button
                  onClick={() => {
                    const url = encodeURIComponent(window.location.href)
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=550,height=420')
                  }}
                  className="w-9 h-9 border border-white/20 hover:border-white/40 flex items-center justify-center transition-all duration-300 hover:bg-white/5"
                  aria-label="Share on Facebook"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>

                {/* WhatsApp */}
                <button
                  onClick={() => {
                    const url = encodeURIComponent(window.location.href)
                    const text = encodeURIComponent(`Check out ${product.name} on KEYU`)
                    window.open(`https://api.whatsapp.com/send?text=${text}%20${url}`, '_blank')
                  }}
                  className="w-9 h-9 border border-white/20 hover:border-white/40 flex items-center justify-center transition-all duration-300 hover:bg-white/5"
                  aria-label="Share on WhatsApp"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </button>

                {/* Copy Link */}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href)
                    // You could add a toast notification here
                    alert('Link copied to clipboard!')
                  }}
                  className="w-9 h-9 border border-white/20 hover:border-white/40 flex items-center justify-center transition-all duration-300 hover:bg-white/5"
                  aria-label="Copy link"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Shopping Section */}
        <div className="mt-32 pt-16 border-t border-white/10">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/30" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-white/40">More to Explore</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/30" />
            </div>
            
            <button
              onClick={() => router.push("/")}
              className="group inline-flex items-center gap-3 text-white hover:text-white/60 transition-colors duration-300 font-mono text-sm tracking-widest uppercase"
            >
              View Collection
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}