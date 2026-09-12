import Skeleton from '@/components/ui/Skeleton'

export default function GallerySkeleton() {
  return (
    <div className="min-h-screen bg-brand-bg pt-8 pb-20 space-y-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-brand-border/60 p-8 sm:p-12 text-center space-y-4 shadow-xs">
          <Skeleton className="h-6 w-32 mx-auto rounded-full" />
          <Skeleton className="h-10 sm:h-12 w-full max-w-xl mx-auto rounded-2xl" />
          <Skeleton className="h-4 w-full max-w-md mx-auto rounded-md" />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-10 w-28 shrink-0 rounded-full" />
          ))}
        </div>
      </div>

      {/* Gallery Photos Masonry Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-brand-border/60 shadow-xs">
              <Skeleton className={`w-full ${i % 3 === 0 ? 'h-72' : i % 2 === 0 ? 'h-60' : 'h-52'}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
