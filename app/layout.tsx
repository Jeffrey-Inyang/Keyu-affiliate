import type React from "react"
import type { Metadata, Viewport } from "next"
import Script from "next/script"
import "./globals.css"
import { Navbar } from "@/components/layout/navbar"

export const metadata: Metadata = {
  title: "KEYU - Fashion Affiliate",
  description: "Discover curated fashion and lifestyle products",
  icons: {
    icon: "https://res.cloudinary.com/dkccco1fh/image/upload/v1761584509/logo_vxlisa.png",
    shortcut: "https://res.cloudinary.com/dkccco1fh/image/upload/v1761584509/logo_vxlisa.png",
    apple: "https://res.cloudinary.com/dkccco1fh/image/upload/v1761584509/logo_vxlisa.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#000000",
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-60367P2WSN"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-60367P2WSN');
          `}
        </Script>
        
        {/* ShareThis */}
        <Script 
          src="https://platform-api.sharethis.com/js/sharethis.js#property=6916e80590a70be8f33c07ed&product=inline-share-buttons"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}