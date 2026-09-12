import Skeleton from '@/components/ui/Skeleton'

export default function BlogPostSkeleton() {
  return (
    <div className="min-h-screen bg-brand-bg pt-8 pb-20 space-y-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb & Category */}
        <div className="space-y-3">
          <Skeleton className="h-4 w-40 rounded-md" />
          <Skeleton className="h-6 w-28 rounded-full" />
          <Skeleton className="h-10 sm:h-14 w-full rounded-2xl" />
        </div>

        {/* Author & Timestamp */}
        <div className="flex items-center gap-3 py-3 border-y border-neutral-200">
          <Skeleton className="w-11 h-11 rounded-full" />
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-32 rounded-md" />
            <Skeleton className="h-3 w-44 rounded-md" />
          </div>
        </div>

        {/* Featured Image */}
        <Skeleton className="h-72 sm:h-96 w-full rounded-3xl" />

        {/* Article Content Paragraphs Skeleton */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border/60 space-y-6 shadow-xs">
          <Skeleton className="h-6 w-4/5 rounded-lg" />
          <div className="space-y-2.5">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-11/12 rounded-md" />
            <Skeleton className="h-4 w-4/5 rounded-md" />
          </div>

          <Skeleton className="h-8 w-1/2 rounded-xl mt-6" />
          <div className="space-y-2.5">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-5/6 rounded-md" />
          </div>

          <div className="p-5 rounded-2xl bg-brand-blush/60 border border-brand-border/40 space-y-2">
            <Skeleton className="h-5 w-36 rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-3/4 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  )
}
