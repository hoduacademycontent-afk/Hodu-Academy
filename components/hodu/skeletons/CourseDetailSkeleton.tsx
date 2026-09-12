import Skeleton from '@/components/ui/Skeleton'

export default function CourseDetailSkeleton() {
  return (
    <div className="min-h-screen bg-brand-bg pt-6 pb-20 space-y-8">
      {/* Breadcrumb Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Skeleton className="h-4 w-48 rounded-md" />
      </div>

      {/* Main Course Hero & Details Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Course Highlights & Syllabus */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-3xl border border-brand-border/60 p-6 sm:p-8 space-y-5 shadow-xs">
              <div className="flex gap-2">
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-32 rounded-full" />
              </div>
              <Skeleton className="h-10 sm:h-12 w-4/5 rounded-2xl" />
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-5/6 rounded-md" />
              <Skeleton className="h-64 sm:h-80 w-full rounded-2xl" />
            </div>

            {/* Curriculum Accordion Skeleton */}
            <div className="bg-white rounded-3xl border border-brand-border/60 p-6 sm:p-8 space-y-4 shadow-xs">
              <Skeleton className="h-7 w-48 rounded-xl" />
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-4 rounded-xl border border-neutral-200/70 space-y-2">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-5 w-1/2 rounded-md" />
                    <Skeleton className="h-4 w-12 rounded-md" />
                  </div>
                  <Skeleton className="h-3.5 w-4/5 rounded-md" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Enrollment Form & Key Highlights Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl border-2 border-brand-maroon/20 p-6 sm:p-8 space-y-5 shadow-md">
              <Skeleton className="h-7 w-44 rounded-xl" />
              <Skeleton className="h-4 w-full rounded-md" />
              <div className="space-y-3">
                <Skeleton className="h-11 w-full rounded-xl" />
                <Skeleton className="h-11 w-full rounded-xl" />
                <Skeleton className="h-11 w-full rounded-xl" />
                <Skeleton className="h-12 w-full rounded-xl" />
              </div>
              <div className="pt-4 border-t border-neutral-100 space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <Skeleton className="w-5 h-5 rounded-full shrink-0" />
                    <Skeleton className="h-4 w-4/5 rounded-md" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
