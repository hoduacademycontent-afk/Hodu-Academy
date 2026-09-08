'use client'

import React from 'react'

export interface LearningFeature {
  title: string
  subtitle: string
  image: string
}

interface FeatureBookCardProps {
  feature: LearningFeature
  index: number
}

export default function FeatureBookCard({ feature, index }: FeatureBookCardProps) {
  return (
    <div
      className="group relative w-full aspect-[1066/1600] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer select-none bg-white border-2 border-brand-border/80 shadow-md hover:shadow-2xl hover:border-brand-maroon/60 hover:-translate-y-2 transition-all duration-300 flex items-center justify-center"
    >
      <img
        src={feature.image}
        alt={feature.title}
        loading="lazy"
        className="w-full h-full object-cover rounded-2xl sm:rounded-3xl transform transition-transform duration-500 group-hover:scale-[1.03]"
      />
    </div>
  )
}
