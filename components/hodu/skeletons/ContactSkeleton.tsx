import Skeleton from '@/components/ui/Skeleton'

export default function ContactSkeleton() {
  return (
    <div className="min-h-screen bg-brand-bg pt-8 pb-20 space-y-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-brand-border/60 p-8 sm:p-12 text-center space-y-4 shadow-xs">
          <Skeleton className="h-6 w-32 mx-auto rounded-full" />
          <Skeleton className="h-10 sm:h-12 w-full max-w-xl mx-auto rounded-2xl" />
          <Skeleton className="h-4 w-full max-w-md mx-auto rounded-md" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Contact Info & Campus Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-brand-border/60 p-6 sm:p-8 space-y-6 shadow-xs">
              <Skeleton className="h-6 w-40 rounded-lg" />
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-3.5 p-3.5 rounded-xl bg-neutral-50 border border-neutral-100">
                    <Skeleton className="w-9 h-9 rounded-lg shrink-0" />
                    <div className="space-y-1.5 w-full">
                      <Skeleton className="h-4 w-28 rounded-md" />
                      <Skeleton className="h-3.5 w-44 rounded-md" />
                    </div>
                  </div>
                ))}
              </div>
              {/* Map Placeholder */}
              <Skeleton className="h-48 w-full rounded-2xl" />
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border-2 border-brand-maroon/20 p-6 sm:p-10 space-y-5 shadow-xs">
              <Skeleton className="h-7 w-48 rounded-xl" />
              <Skeleton className="h-4 w-72 rounded-md" />
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
      </div>
    </div>
  )
}
