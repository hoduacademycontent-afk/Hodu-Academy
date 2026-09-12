import Skeleton from '@/components/ui/Skeleton'

export default function AboutSkeleton() {
  return (
    <div className="min-h-screen bg-brand-bg pt-8 pb-20 space-y-12">
      {/* Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-brand-border/60 p-8 sm:p-12 text-center space-y-4 shadow-xs">
          <Skeleton className="h-6 w-36 mx-auto rounded-full" />
          <Skeleton className="h-10 sm:h-12 w-full max-w-xl mx-auto rounded-2xl" />
          <Skeleton className="h-4 w-full max-w-lg mx-auto rounded-md" />
        </div>
      </div>

      {/* Leadership 3 Directors Spotlight */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <Skeleton className="h-8 w-56 mx-auto rounded-xl" />
          <Skeleton className="h-4 w-72 mx-auto rounded-md" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl border-2 border-brand-maroon/20 p-6 text-center flex flex-col items-center space-y-3">
              <Skeleton className="w-28 h-28 rounded-full" />
              <Skeleton className="h-5 w-40 rounded-md" />
              <Skeleton className="h-3.5 w-32 rounded-md" />
              <Skeleton className="h-3 w-48 rounded-md" />
            </div>
          ))}
        </div>
      </div>

      {/* Values & Pedagogy */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-brand-border/60 p-6 space-y-3">
              <Skeleton className="w-10 h-10 rounded-xl" />
              <Skeleton className="h-5 w-36 rounded-md" />
              <Skeleton className="h-3.5 w-full rounded-md" />
              <Skeleton className="h-3.5 w-4/5 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
