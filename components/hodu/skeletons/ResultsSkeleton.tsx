import Skeleton from '@/components/ui/Skeleton'

export default function ResultsSkeleton() {
  return (
    <div className="min-h-screen bg-brand-bg pt-8 pb-20 space-y-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-brand-border/60 p-8 sm:p-12 text-center space-y-4 shadow-xs">
          <Skeleton className="h-6 w-36 mx-auto rounded-full" />
          <Skeleton className="h-10 sm:h-12 w-full max-w-xl mx-auto rounded-2xl" />
          <Skeleton className="h-4 w-full max-w-md mx-auto rounded-md" />
        </div>
      </div>

      {/* Year Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-10 w-24 rounded-full" />
          ))}
        </div>
      </div>

      {/* Topper Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-white rounded-3xl border border-brand-border/60 p-5 space-y-3 shadow-xs flex flex-col items-center text-center">
              <Skeleton className="w-24 h-24 rounded-full" />
              <Skeleton className="h-5 w-32 rounded-md" />
              <Skeleton className="h-4 w-20 rounded-md" />
              <Skeleton className="h-6 w-28 rounded-lg" />
              <Skeleton className="h-3.5 w-36 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
