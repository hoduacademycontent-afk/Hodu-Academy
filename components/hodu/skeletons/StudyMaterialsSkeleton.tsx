import Skeleton from '@/components/ui/Skeleton'

export default function StudyMaterialsSkeleton() {
  return (
    <div className="min-h-screen bg-brand-bg pt-8 pb-20 space-y-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-brand-border/60 p-8 sm:p-12 text-center space-y-4 shadow-xs">
          <Skeleton className="h-6 w-36 mx-auto rounded-full" />
          <Skeleton className="h-10 sm:h-12 w-full max-w-xl mx-auto rounded-2xl" />
          <Skeleton className="h-4 w-full max-w-md mx-auto rounded-md" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-3xl border border-brand-border/60 p-6 space-y-4 shadow-xs">
              <div className="flex items-center gap-3">
                <Skeleton className="w-12 h-12 rounded-2xl shrink-0" />
                <div className="space-y-1.5 w-full">
                  <Skeleton className="h-5 w-3/4 rounded-md" />
                  <Skeleton className="h-3.5 w-1/2 rounded-md" />
                </div>
              </div>
              <Skeleton className="h-3.5 w-full rounded-md" />
              <div className="space-y-2 pt-2 border-t border-neutral-100">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="flex items-center justify-between p-2 rounded-xl bg-neutral-50">
                    <Skeleton className="h-3.5 w-40 rounded-md" />
                    <Skeleton className="h-6 w-16 rounded-md" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
