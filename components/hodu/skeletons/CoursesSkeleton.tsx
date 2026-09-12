import Skeleton from '@/components/ui/Skeleton'

export default function CoursesSkeleton() {
  return (
    <div className="min-h-screen bg-brand-bg pt-8 pb-20 space-y-10">
      {/* Header Banner Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-brand-border/60 p-8 sm:p-12 text-center space-y-4 shadow-xs">
          <Skeleton className="h-6 w-36 mx-auto rounded-full" />
          <Skeleton className="h-10 sm:h-12 w-3/4 max-w-xl mx-auto rounded-2xl" />
          <Skeleton className="h-4 w-1/2 max-w-md mx-auto rounded-md" />
        </div>
      </div>

      {/* Filter Tabs Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-10 w-28 shrink-0 rounded-full" />
          ))}
        </div>
      </div>

      {/* Courses Grid Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-3xl border border-brand-border/60 p-5 space-y-4 shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <Skeleton className="h-48 w-full rounded-2xl" />
                <div className="flex gap-2">
                  <Skeleton className="h-5 w-16 rounded-md" />
                  <Skeleton className="h-5 w-24 rounded-md" />
                </div>
                <Skeleton className="h-6 w-5/6 rounded-lg" />
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-4/5 rounded-md" />
              </div>
              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                <Skeleton className="h-4 w-20 rounded-md" />
                <Skeleton className="h-10 w-32 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
