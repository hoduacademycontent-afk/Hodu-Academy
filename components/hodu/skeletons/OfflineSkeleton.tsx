import Skeleton from '@/components/ui/Skeleton'

export default function OfflineSkeleton() {
  return (
    <div className="min-h-screen bg-brand-bg space-y-12 sm:space-y-16 pb-20">
      {/* Offline Campus Hero Skeleton */}
      <div className="pt-6 sm:pt-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl border border-brand-border/60 p-6 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <Skeleton className="h-6 w-44 rounded-full" />
            <Skeleton className="h-10 sm:h-14 w-full max-w-lg rounded-2xl" />
            <Skeleton className="h-4 w-5/6 rounded-md" />
            <Skeleton className="h-4 w-4/6 rounded-md" />
            <div className="flex gap-4 pt-4">
              <Skeleton className="h-12 w-40 rounded-full" />
              <Skeleton className="h-12 w-36 rounded-full" />
            </div>
          </div>
          <div className="lg:col-span-5">
            <Skeleton className="h-64 sm:h-80 w-full rounded-2xl" />
          </div>
        </div>
      </div>

      {/* Facilities Grid Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <Skeleton className="h-8 sm:h-10 w-56 mx-auto rounded-xl" />
          <Skeleton className="h-4 w-80 mx-auto rounded-md" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-brand-border/60 p-5 space-y-4 shadow-xs">
              <Skeleton className="h-40 w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-3/4 rounded-md" />
                <Skeleton className="h-3.5 w-full rounded-md" />
                <Skeleton className="h-3.5 w-4/5 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Faculty Mentors Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <Skeleton className="h-8 sm:h-10 w-64 mx-auto rounded-xl" />
          <Skeleton className="h-4 w-72 mx-auto rounded-md" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl border-2 border-brand-maroon/20 p-6 text-center flex flex-col items-center space-y-3">
              <Skeleton className="w-28 h-28 rounded-full" />
              <Skeleton className="h-5 w-36 rounded-md" />
              <Skeleton className="h-3.5 w-28 rounded-md" />
              <Skeleton className="h-3 w-48 rounded-md" />
            </div>
          ))}
        </div>
      </div>

      {/* Join Faculty Form Card Skeleton */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border-2 border-brand-maroon/20 rounded-3xl p-6 sm:p-10 space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-7 w-64 rounded-xl" />
            <Skeleton className="h-4 w-96 rounded-md" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Skeleton className="h-11 w-full rounded-xl" />
            <Skeleton className="h-11 w-full rounded-xl" />
            <Skeleton className="h-11 w-full rounded-xl" />
            <Skeleton className="h-11 w-full rounded-xl" />
          </div>
          <Skeleton className="h-28 w-full rounded-2xl" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </div>
    </div>
  )
}
