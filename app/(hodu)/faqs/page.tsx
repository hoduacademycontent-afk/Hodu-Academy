import React from 'react'
import Link from 'next/link'
import { HelpCircle, MessageSquare, ChevronRight, Phone } from 'lucide-react'
import FaqInteractiveClient from '@/components/hodu/FaqInteractiveClient'
import BannerElasticMesh from '@/components/ui/BannerElasticMesh'
import { SITE_URL, getFAQPageSchema, getBreadcrumbSchema } from '@/lib/seo'
import { allFaqsData } from '@/lib/faqData'

export const metadata = {
  title: 'Frequently Asked Questions (FAQs) — Hodu Academy Jaipur',
  description: 'Get clear answers to all questions about Hodu Academy Cambridge IGCSE, IB DP, CBSE 9-12, IIT-JEE, NEET, Jaipur offline center, batch sizes, and admission roadmap.',
  alternates: {
    canonical: '/faqs',
  },
  openGraph: {
    title: 'Frequently Asked Questions (FAQs) — Hodu Academy',
    description: 'Admissions, batch sizes, doubt desks, international boards, and fee structure answered.',
    url: `${SITE_URL}/faq`,
    images: [{ url: '/images/jaipur_center_bg.png', width: 1200, height: 630, alt: 'Hodu Academy FAQs' }],
  },
}

export default function FaqPage() {
  const faqSchema = getFAQPageSchema(
    allFaqsData.map(f => ({ q: f.question, a: f.answer }))
  )
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'FAQs', url: '/faqs' },
  ])

  return (
    <div className="bg-brand-bg min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* ─── Hero Header ─── */}
      <section className="relative py-14 sm:py-20 bg-[#3D0607] text-white overflow-hidden">
        <BannerElasticMesh variant="crimson" opacity={0.9} interaction="hover" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-xs text-white/70 font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-amber-300 font-semibold">FAQs</span>
          </div>

          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-xs font-semibold text-amber-200 shadow-sm">
            <HelpCircle className="h-3.5 w-3.5 text-amber-300" />
            <span>Curriculum • Admissions • Jaipur Campus • Testing</span>
          </div>

          <h1 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Frequently Asked Questions
          </h1>

          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our teaching methodology, batch structure, Jaipur offline center, international boards, and academic support.
          </p>
        </div>
      </section>

      {/* ─── Interactive FAQ Explorer ─── */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqInteractiveClient />
        </div>
      </section>
    </div>
  )
}
