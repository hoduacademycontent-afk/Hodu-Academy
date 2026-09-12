'use client'

import React from 'react'

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
}: VideoWithAntigravityProps) {
  return (
    <div
      className={`relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border-2 border-brand-maroon/20 bg-black aspect-video max-w-5xl mx-auto w-full group ${className}`}
    >
      {/* Clean Video Iframe */}
      <iframe
        src={videoEmbedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 w-full h-full border-0 z-0"
      />
    </div>
  )
}

