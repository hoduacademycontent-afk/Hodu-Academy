import type { Metadata } from 'next'
import { SITE_URL, getLocalBusinessSchema, getBreadcrumbSchema } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Contact Us & Campus Visit — Hodu Academy Jaipur',
  description: 'Get in touch with Hodu Academy admissions desk. Book a campus visit at Vaishali Estate Gandhi Path Jaipur or speak with our academic counselors.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Us & Campus Visit — Hodu Academy Jaipur',
    description: 'Speak with our academic counselors or visit our Jaipur center at Vaishali Estate, Gandhi Path West.',
    url: `${SITE_URL}/contact`,
    images: [{ url: '/images/jaipur_center_bg.png', width: 1200, height: 630, alt: 'Contact Hodu Academy' }],
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  const localBizSchema = getLocalBusinessSchema()
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Contact Us', url: '/contact' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBizSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  )
}
