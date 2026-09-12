import Skeleton from '@/components/ui/Skeleton'

export default function GenericPageSkeleton() {
  return (
    <div className="min-h-screen bg-brand-bg pt-8 pb-20 space-y-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white rounded-3xl border border-brand-border/60 p-8 sm:p-12 space-y-4 shadow-xs">
          <Skeleton className="h-6 w-32 rounded-full" />
          <Skeleton className="h-10 sm:h-12 w-full max-w-lg rounded-2xl" />
          <Skeleton className="h-4 w-3/4 rounded-md" />
        </div>

        <div className="bg-white rounded-3xl border border-brand-border/60 p-6 sm:p-10 space-y-6 shadow-xs">
          <Skeleton className="h-6 w-48 rounded-lg" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-5/6 rounded-md" />
            <Skeleton className="h-4 w-4/5 rounded-md" />
          </div>

          <Skeleton className="h-6 w-56 rounded-lg mt-6" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-3/4 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  )
}
