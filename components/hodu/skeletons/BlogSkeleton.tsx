import Skeleton from '@/components/ui/Skeleton'

export default function BlogSkeleton() {
  return (
    <div className="min-h-screen bg-brand-bg pt-8 pb-20 space-y-10">
      {/* Blog Spotlight Header Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-brand-border/60 p-8 sm:p-12 space-y-4 shadow-xs">
          <Skeleton className="h-6 w-32 rounded-full" />
          <Skeleton className="h-10 sm:h-12 w-full max-w-xl rounded-2xl" />
          <Skeleton className="h-4 w-full max-w-md rounded-md" />
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Skeleton className="h-11 w-full sm:w-80 rounded-xl" />
            <Skeleton className="h-11 w-32 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Featured Post Card Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-brand-border/60 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xs">
          <div className="lg:col-span-6">
            <Skeleton className="h-64 sm:h-80 w-full rounded-2xl" />
          </div>
          <div className="lg:col-span-6 space-y-4">
            <Skeleton className="h-5 w-24 rounded-full" />
            <Skeleton className="h-8 sm:h-10 w-full rounded-xl" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-5/6 rounded-md" />
            <div className="flex items-center gap-3 pt-2">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-3.5 w-24 rounded-md" />
                <Skeleton className="h-3 w-16 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Grid Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-3xl border border-brand-border/60 p-5 space-y-4 shadow-xs">
              <Skeleton className="h-48 w-full rounded-2xl" />
              <Skeleton className="h-4 w-20 rounded-md" />
              <Skeleton className="h-6 w-full rounded-lg" />
              <Skeleton className="h-3.5 w-full rounded-md" />
              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                <Skeleton className="h-3.5 w-24 rounded-md" />
                <Skeleton className="h-3.5 w-16 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
