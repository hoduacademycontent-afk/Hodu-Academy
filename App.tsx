'use client'

import React, { useState, useEffect, useRef } from 'react'
import { ArrowLeft } from 'lucide-react'

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
  const textRef = useRef<HTMLDivElement>(null)
  const [scaleY, setScaleY] = useState(1)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [useCanvasAlpha, setUseCanvasAlpha] = useState(false)

  // 1. Dynamic scale calculation for background 404 text and oval
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

  // 2. Real-time Canvas Chroma Key to guarantee 100% transparent video background (ZERO white box)
  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    let animId: number
    let isRunning = true

    const render = () => {
      if (!isRunning) return

      if (video.readyState >= 2 && !video.paused && !video.ended) {
        const w = video.videoWidth || 640
        const h = video.videoHeight || 640

        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w
          canvas.height = h
        }

        try {
          ctx.drawImage(video, 0, 0, w, h)
          const frame = ctx.getImageData(0, 0, w, h)
          const data = frame.data
          const len = data.length

          // Chroma-key out pure white and off-white background with smooth edge feathering
          for (let i = 0; i < len; i += 4) {
            const r = data[i]
            const g = data[i + 1]
            const b = data[i + 2]

            // Perceptual luminance calculation
            const luma = (r * 299 + g * 587 + b * 114) / 1000

            if (luma > 244) {
              data[i + 3] = 0 // Completely transparent
            } else if (luma > 218) {
              // Smooth feather transition for fur and soft contact shadow
              const factor = (244 - luma) / 26
              data[i + 3] = Math.round(data[i + 3] * factor)
            }
          }

          ctx.putImageData(frame, 0, 0)
          setUseCanvasAlpha(true)
        } catch {
          // If security or tainted exception, fallback to CSS multiply blend
          setUseCanvasAlpha(false)
        }
      }

      animId = requestAnimationFrame(render)
    }

    video.play().catch(() => {})
    animId = requestAnimationFrame(render)

    return () => {
      isRunning = false
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <div
      className="fixed inset-0 w-full h-screen overflow-hidden flex flex-col justify-between select-none z-[99999]"
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

      {/* Top Spacer (Navbar completely removed) */}
      <div className="w-full h-8 sm:h-12" />

      {/* =========================================================================
          2. CENTER ANIMATED 3D FOX (100% Transparent Background + Sparkle Stars)
         ========================================================================= */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        style={{
          marginTop: 'calc(-6vh - 40px)',
        }}
      >
        <div className="relative w-[120vw] h-[85vh] sm:w-[70vw] sm:h-[70vh] md:w-[62vw] md:h-[78vh] flex items-center justify-center">
          
          {/* Sparkle Stars (✨) */}
          <div className="absolute top-[28%] right-[22%] sm:right-[26%] animate-pulse duration-1000">
            <SparkleStar className="w-6 h-6 sm:w-8 sm:h-8 opacity-90" />
          </div>
          <div className="absolute top-[38%] right-[18%] sm:right-[22%] animate-pulse delay-300">
            <SparkleStar className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-75" />
          </div>
          <div className="absolute bottom-[28%] left-[20%] sm:left-[24%] animate-pulse delay-500">
            <SparkleStar className="w-4 h-4 sm:w-5 sm:h-5 opacity-80" />
          </div>

          {/* Real-time Transparent Canvas (Removes 100% of White Pixels) */}
          <canvas
            ref={canvasRef}
            className={`w-full h-full object-contain pointer-events-none ${
              useCanvasAlpha ? 'block' : 'hidden'
            }`}
          />

          {/* Video Source Element with CSS Multiply Blend (Active & Backed by Local Video) */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            crossOrigin="anonymous"
            src="/videos/fox-404.mp4"
            style={{
              mixBlendMode: 'multiply',
            }}
            className={`w-full h-full object-contain pointer-events-none filter contrast-[1.04] brightness-[1.01] ${
              useCanvasAlpha ? 'hidden' : 'block'
            }`}
          />
        </div>
      </div>

      {/* =========================================================================
          3. BOTTOM CONTENT (Heading + Subheading + Go Back Home CTA)
         ========================================================================= */}
      <main className="relative z-30 pb-6 sm:pb-12 flex flex-col items-center text-center px-4">
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
    </div>
  )
}
