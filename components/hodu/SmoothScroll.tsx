'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'

export default function SmoothScroll() {
  const pathname = usePathname()

  useEffect(() => {
    // Disable smooth scroll in admin portal so native scrolling works 100% reliably
    if (!pathname || pathname.startsWith('/admin')) return
    if (typeof window === 'undefined') return

    // Enable smooth Lenis scrolling on desktop & fine pointer devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Silky exponential deceleration
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      infinite: false,
      autoResize: true,
      prevent: (node: any) => {
        return (
          node?.hasAttribute?.('data-lenis-prevent') ||
          !!node?.closest?.('[data-lenis-prevent], [data-prevent-scroll], .no-lenis, select, textarea')
        )
      },
    })

    let rafId: number

    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [pathname])

  return null
}
