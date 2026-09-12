import { AdminDashboardSkeleton } from '@/components/admin/AdminSkeletons'
import AdminLayout from '@/components/admin/AdminLayout'

export default function AdminLoading() {
  return (
    <AdminLayout>
      <AdminDashboardSkeleton />
    </AdminLayout>
  )
}
