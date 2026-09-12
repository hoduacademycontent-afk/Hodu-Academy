import Skeleton from '@/components/ui/Skeleton'

export default function HomeSkeleton() {
  return (
    <div className="min-h-screen bg-brand-bg space-y-12 sm:space-y-16 pb-20">
      {/* Hero Section Skeleton */}
      <div className="relative w-full pt-6 sm:pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="h-[420px] sm:h-[540px] lg:h-[620px] w-full rounded-3xl overflow-hidden relative shadow-md">
          <Skeleton className="w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-6 sm:p-12 flex flex-col justify-end space-y-4">
            <Skeleton className="h-6 w-36 rounded-full bg-white/30" />
            <Skeleton className="h-10 sm:h-14 w-3/4 max-w-2xl rounded-2xl bg-white/40" />
            <Skeleton className="h-5 sm:h-6 w-1/2 max-w-lg rounded-xl bg-white/30" />
            <div className="flex gap-4 pt-2">
              <Skeleton className="h-12 w-36 rounded-full bg-white/50" />
              <Skeleton className="h-12 w-36 rounded-full bg-white/30" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Counter Bar Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-brand-border/60 p-6 sm:p-8 shadow-xs grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center sm:items-start space-y-2">
              <Skeleton className="h-8 w-24 rounded-lg" />
              <Skeleton className="h-4 w-32 rounded-md" />
            </div>
          ))}
        </div>
      </div>

      {/* Featured Courses Grid Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-28 rounded-full" />
            <Skeleton className="h-8 sm:h-10 w-64 rounded-xl" />
          </div>
          <Skeleton className="h-10 w-32 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-3xl border border-brand-border/60 p-5 space-y-4 shadow-xs">
              <Skeleton className="h-48 w-full rounded-2xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-20 rounded-md" />
                <Skeleton className="h-6 w-4/5 rounded-lg" />
                <Skeleton className="h-4 w-full rounded-md" />
              </div>
              <div className="pt-2 flex justify-between items-center border-t border-neutral-100">
                <Skeleton className="h-4 w-24 rounded-md" />
                <Skeleton className="h-9 w-28 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Feature Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-blush/60 rounded-3xl border border-brand-border/60 p-8 sm:p-12 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <Skeleton className="h-8 sm:h-10 w-48 mx-auto rounded-xl" />
            <Skeleton className="h-4 w-72 mx-auto rounded-md" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 space-y-3 shadow-xs">
                <Skeleton className="w-12 h-12 rounded-xl" />
                <Skeleton className="h-5 w-3/4 rounded-md" />
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-5/6 rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
