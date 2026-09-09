'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { Sparkles, Play } from 'lucide-react'

// Dynamically import Antigravity with SSR disabled for flawless Three.js client hydration
const Antigravity = dynamic(() => import('@/components/ui/Antigravity'), {
  ssr: false,
  loading: () => null,
})

interface VideoWithAntigravityProps {
  videoEmbedUrl: string
  title?: string
  className?: string
  particleCount?: number
  particleColor?: string
  particleShape?: 'capsule' | 'sphere' | 'box' | 'tetrahedron'
}

export default function VideoWithAntigravity({
  videoEmbedUrl,
  title = 'Hodu Academy Video',
  className = '',
  particleCount = 280,
  particleColor = '#FF85C0',
  particleShape = 'capsule',
}: VideoWithAntigravityProps) {
  const [particlesEnabled, setParticlesEnabled] = useState(true)

  return (
    <div
      className={`relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border-2 border-brand-maroon/20 bg-black aspect-video max-w-5xl mx-auto w-full group ${className}`}
    >
      {/* 1. Underlying Video Iframe */}
      <iframe
        src={videoEmbedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 w-full h-full border-0 z-0"
      />

      {/* 2. Antigravity 3D Particle Simulation Overlay */}
      {particlesEnabled && (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          <Antigravity
            count={particleCount}
            magnetRadius={12}
            ringRadius={9}
            waveSpeed={0.45}
            waveAmplitude={1.2}
            particleSize={1.8}
            lerpSpeed={0.12}
            color={particleColor}
            autoAnimate={true}
            particleVariance={1.2}
            rotationSpeed={0.15}
            depthFactor={1.2}
            pulseSpeed={2.8}
            particleShape={particleShape}
            fieldStrength={10}
          />
        </div>
      )}

      {/* 3. Subtle floating badge indicator */}
      <div className="absolute top-3 right-3 z-20 pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => setParticlesEnabled(prev => !prev)}
          title={particlesEnabled ? 'Turn off 3D Antigravity Particles' : 'Turn on 3D Antigravity Particles'}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20 transition-all shadow-md active:scale-95"
        >
          <Sparkles className={`w-3.5 h-3.5 ${particlesEnabled ? 'text-pink-400 animate-spin-slow' : 'text-neutral-400'}`} />
          <span>{particlesEnabled ? 'Antigravity FX' : 'FX Off'}</span>
        </button>
      </div>
    </div>
  )
}
