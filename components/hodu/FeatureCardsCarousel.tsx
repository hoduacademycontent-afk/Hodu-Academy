'use client'

import React, { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import FeatureBookCard, { LearningFeature } from './FeatureBookCard'

interface FeatureCardsCarouselProps {
  features: LearningFeature[]
}

export default function FeatureCardsCarousel({ features }: FeatureCardsCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (!containerRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10)
  }

  useEffect(() => {
    checkScroll()
    const el = containerRef.current
    if (!el) return
    el.addEventListener('scroll', checkScroll, { passive: true })
    window.addEventListener('resize', checkScroll)
    return () => {
      el.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [features])

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return
    const { clientWidth } = containerRef.current
    const scrollAmount = clientWidth > 768 ? clientWidth * 0.5 : clientWidth * 0.85
    containerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  return (
    <div className="relative group/carousel w-full">
      {/* Previous `<` Floating Circular Button */}
      <button
        onClick={() => scroll('left')}
        disabled={!canScrollLeft}
        aria-label="Previous features"
        className={`flex absolute -left-2 sm:-left-4 lg:-left-5 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full bg-white/95 backdrop-blur-md shadow-xl border-2 border-brand-border/80 text-brand-maroon items-center justify-center transition-all duration-300 hover:bg-brand-maroon hover:text-white hover:border-brand-maroon hover:scale-105 active:scale-95 disabled:opacity-0 disabled:pointer-events-none cursor-pointer ${
          canScrollLeft ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 transform -translate-x-0.5" />
      </button>

      {/* Next `>` Floating Circular Button */}
      <button
        onClick={() => scroll('right')}
        disabled={!canScrollRight}
        aria-label="Next features"
        className={`flex absolute -right-2 sm:-right-4 lg:-right-5 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-full bg-white/95 backdrop-blur-md shadow-xl border-2 border-brand-border/80 text-brand-maroon items-center justify-center transition-all duration-300 hover:bg-brand-maroon hover:text-white hover:border-brand-maroon hover:scale-105 active:scale-95 disabled:opacity-0 disabled:pointer-events-none cursor-pointer ${
          canScrollRight ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 transform translate-x-0.5" />
      </button>

      {/* Horizontal Scrollable Container (snaps on mobile, 4 columns on desktop) */}
      <div
        ref={containerRef}
        data-lenis-prevent
        className="flex lg:grid lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-7 overflow-x-auto lg:overflow-visible scroll-smooth snap-x snap-mandatory py-4 px-2 sm:px-1 no-scrollbar overscroll-contain"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="w-[72vw] max-w-[280px] sm:w-[280px] md:w-[320px] lg:w-full shrink-0 snap-center h-auto flex items-center justify-center"
          >
            <FeatureBookCard feature={feature} index={idx} />
          </div>
        ))}
      </div>
    </div>
  )
}
