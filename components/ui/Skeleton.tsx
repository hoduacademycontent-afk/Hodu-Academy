import React from 'react'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  variant?: 'default' | 'brand' | 'card' | 'circle'
}

export function Skeleton({ className = '', variant = 'default', ...props }: SkeletonProps) {
  const variantClass =
    variant === 'brand'
      ? 'animate-shimmer-brand bg-brand-blush/80 border border-brand-border/40'
      : variant === 'card'
      ? 'bg-white border border-neutral-200/80 shadow-xs'
      : variant === 'circle'
      ? 'rounded-full animate-shimmer'
      : 'animate-shimmer rounded-xl'

  return (
    <div
      className={`relative overflow-hidden ${variantClass} ${className}`}
      {...props}
    />
  )
}

export default Skeleton
