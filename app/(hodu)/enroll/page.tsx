import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default function EnrollPage() {
  redirect('https://portal.hoduacademy.com/hodu-academy/learner-login')
}
