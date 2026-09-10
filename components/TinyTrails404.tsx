'use client'

import React, { useState, useEffect, useRef } from 'react'
import { ArrowLeft, Menu, X } from 'lucide-react'

const navItems = ['About Us', 'Programs', 'Reviews', 'FAQ', 'Contacts']

// 4-point Sparkle Star SVG
function SparkleStar({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`text-white drop-shadow-sm pointer-events-none ${className}`}
    >
      <path d="M12 0L14.7 9.3L24 12L14.7 14.7L12 24L9.3 14.7L0 12L9.3 9.3L12 0Z" />
    </svg>
  )
}

export default function TinyTrails404() {
  const [menuOpen, setMenuOpen] = useState(false)
  const textRef = useRef<HTMLDivElement>(null)
  const [scaleY, setScaleY] = useState(1)

  useEffect(() => {
    const updateScale = () => {
      if (textRef.current && typeof window !== 'undefined') {
        const textHeight = textRef.current.offsetHeight || 1
        const calculatedScaleY = window.innerHeight / textHeight
        setScaleY(calculatedScaleY)
      }
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <div
      className="fixed inset-0 w-full h-screen overflow-hidden flex flex-col select-none z-[99999]"
      style={{
        background: 'linear-gradient(to bottom, #FF8233 0%, #FDAC55 100%)',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Load Inter font from Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      {/* =========================================================================
          1. BACKGROUND "404" TEXT & OVAL EFFECT (Dynamic Scaling & Masked Gradient)
         ========================================================================= */}
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0"
        style={{
          opacity: 0.82,
          maskImage: 'linear-gradient(to bottom, black 35%, transparent 95%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 35%, transparent 95%)',
        }}
      >
        <div className="relative flex items-center justify-center w-full h-full">
          {/* Dynamic 404 Text */}
          <div
            ref={textRef}
            className="text-white font-black leading-none tracking-tighter whitespace-nowrap text-[clamp(200px,48vw,800px)]"
            style={{
              transform: `scale(1.15, ${scaleY * 1.4})`,
              transformOrigin: 'center',
            }}
          >
            404
          </div>

          {/* White Oval Over Text */}
          <div
            className="absolute rounded-full h-[22vh] sm:h-[26vh] md:h-[50vh] w-[clamp(120px,20vw,400px)] bg-white pointer-events-none"
            style={{
              transform: `scale(1, ${scaleY})`,
              transformOrigin: 'center',
            }}
          />
        </div>
      </div>

      {/* =========================================================================
          2. NAVIGATION BAR
         ========================================================================= */}
      <header className="relative z-20 flex flex-row items-center justify-between px-4 sm:px-6 md:px-12 py-4 sm:py-5">
        {/* Logo (Left): 2x2 grid of white circles + "TinyTrails" */}
        <a href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="grid grid-cols-2 gap-0.5">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full" />
          </div>
          <span className="text-white font-bold text-lg sm:text-xl ml-1 tracking-tight">
            TinyTrails
          </span>
        </a>

        {/* Desktop Nav Links (Center/Right): Pill buttons */}
        <nav className="hidden md:flex items-center gap-1.5">
          {navItems.map(item => (
            <a
              key={item}
              href="/"
              className="px-4 py-1.5 text-sm font-medium rounded-full bg-white text-[#F16524] hover:opacity-90 transition-all cursor-pointer shadow-2xs hover:scale-[1.02]"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Menu Button (Right): Pill button with Menu icon */}
        <button
          onClick={() => setMenuOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-white bg-[#F16524] hover:opacity-90 transition-all shadow-sm active:scale-95 cursor-pointer"
          aria-label="Open menu"
        >
          <Menu className="w-4 h-4" />
          <span className="text-sm font-medium hidden sm:inline ml-0.5">Menu</span>
        </button>
      </header>

      {/* =========================================================================
          3. CENTER ANIMATED VIDEO (Flawless Multiply Blend Mode + Sparkles)
         ========================================================================= */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        style={{
          marginTop: 'calc(-6vh - 40px)',
        }}
      >
        <div className="relative w-[120vw] h-[85vh] sm:w-[70vw] sm:h-[70vh] md:w-[62vw] md:h-[78vh] flex items-center justify-center">
          
          {/* Sparkle Stars */}
          <div className="absolute top-[28%] right-[22%] sm:right-[26%] animate-pulse duration-1000">
            <SparkleStar className="w-6 h-6 sm:w-8 sm:h-8 opacity-90" />
          </div>
          <div className="absolute top-[38%] right-[18%] sm:right-[22%] animate-pulse delay-300">
            <SparkleStar className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-75" />
          </div>
          <div className="absolute bottom-[28%] left-[20%] sm:left-[24%] animate-pulse delay-500">
            <SparkleStar className="w-4 h-4 sm:w-5 sm:h-5 opacity-80" />
          </div>

          {/* Video with multiply blend mode & contrast filter for 100% transparent background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260713_234424_b1332b69-2e69-4302-8dbc-40f86846afbd.mp4"
            style={{
              mixBlendMode: 'multiply',
            }}
            className="w-full h-full object-contain pointer-events-none filter contrast-[1.03] brightness-[1.01]"
          />
        </div>
      </div>

      {/* =========================================================================
          4. BOTTOM CONTENT (Heading + Subheading + Go Back Home CTA)
         ========================================================================= */}
      <main className="relative z-30 mt-auto pb-6 sm:pb-12 flex flex-col items-center text-center px-4">
        <h1 className="text-white text-lg sm:text-xl md:text-2xl font-semibold tracking-tight">
          Oops, something went wrong!
        </h1>
        <p className="text-white/90 text-xs sm:text-sm md:text-base font-normal mt-1 mb-3.5 sm:mb-4 tracking-normal">
          This page does not exist.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 rounded-full text-white font-semibold text-xs sm:text-sm md:text-base bg-[#F16524] hover:scale-105 hover:shadow-lg transition-all active:scale-95 shadow-md cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          <span>Go back home</span>
        </a>
      </main>

      {/* =========================================================================
          5. MOBILE MENU OVERLAY
         ========================================================================= */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          menuOpen ? 'pointer-events-auto opacity-100 visible' : 'pointer-events-none opacity-0 invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-full sm:w-[380px] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          } flex flex-col p-6 overflow-hidden shadow-2xl`}
          style={{
            background: 'linear-gradient(135deg, #FF6B1A 0%, #FF9642 100%)',
          }}
        >
          {/* Panel Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/15">
            <div className="flex items-center gap-2">
              <div className="grid grid-cols-2 gap-0.5">
                <div className="w-2.5 h-2.5 bg-white rounded-full" />
                <div className="w-2.5 h-2.5 bg-white rounded-full" />
                <div className="w-2.5 h-2.5 bg-white rounded-full" />
                <div className="w-2.5 h-2.5 bg-white rounded-full" />
              </div>
              <span className="text-white font-bold text-lg ml-1 tracking-tight">
                TinyTrails
              </span>
            </div>

            <button
              onClick={() => setMenuOpen(false)}
              className="w-10 h-10 rounded-full bg-white/20 text-white hover:bg-white/30 flex items-center justify-center transition-colors active:scale-95 cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Staggered Menu Items */}
          <nav className="flex flex-col gap-3 mt-6 flex-1 overflow-y-auto">
            {navItems.map((item, i) => (
              <a
                key={item}
                href="/"
                onClick={() => setMenuOpen(false)}
                style={{
                  transitionDelay: menuOpen ? `${150 + i * 60}ms` : '0ms',
                }}
                className={`px-6 py-4 text-lg font-semibold text-white rounded-2xl bg-white/10 hover:bg-white/20 transition-all duration-300 block text-left ${
                  menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Bottom CTA */}
          <div
            style={{
              transitionDelay: menuOpen ? '450ms' : '0ms',
            }}
            className={`pt-4 transition-all duration-300 ${
              menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <a
              href="/"
              onClick={() => setMenuOpen(false)}
              className="w-full py-4 rounded-full bg-white font-semibold text-base text-[#F16524] hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg transition-transform cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Go back home</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
