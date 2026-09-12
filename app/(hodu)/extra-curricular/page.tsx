import { SITE_URL } from '@/lib/seo'
import Link from 'next/link'
import { Activity, ArrowRight, Home, ChevronRight } from 'lucide-react'
import ScrollReveal from '@/components/hodu/ScrollReveal'
import OfflineProgramsExplorer from '@/components/hodu/OfflineProgramsExplorer'
import { OFFLINE_PILLARS } from '@/lib/offlineProgramsData'

export const metadata = {
  title: 'Extra-Curricular Activities — Sports, Coding, Dance & Art | Hodu Academy',
  description: 'Unlock sportsmanship, programming literacy, rhythmic expression, and fine arts at Hodu Academy Jaipur.',
  alternates: {
    canonical: '/extra-curricular',
  },
}

export default function ExtraCurricularPage() {
  const pillar = OFFLINE_PILLARS[2]

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text">
      {/* Breadcrumbs */}
      <div className="bg-[#FAF7F7] border-b border-[#F0E4E4] px-4 py-3 sticky top-[108px] z-20 backdrop-blur-xs bg-white/95">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-neutral-600">
          <Link href="/" className="flex items-center gap-1 hover:text-brand-maroon transition-colors font-medium">
            <Home size={13} className="text-neutral-500" />
            <span>Home</span>
          </Link>
          <ChevronRight size={12} className="text-neutral-400" />
          <Link href="/offline" className="hover:text-brand-maroon transition-colors">
            Offline Campus
          </Link>
          <ChevronRight size={12} className="text-neutral-400" />
          <span className="text-brand-maroon font-bold">Extra-Curricular</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 bg-gradient-to-b from-brand-blush/40 to-brand-bg border-b border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#9A3412]/10 text-[#9A3412] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <Activity size={15} />
                <span>Sports, Arts & Technology</span>
              </div>
              <h1 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-maroon tracking-tight leading-tight">
                Extra-Curricular Activities — Ignite Student Passions
              </h1>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                {pillar.description} Comprehensive after-school coaching in athletic sports, software coding, dance fitness, and creative arts.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Interactive Explorer Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <OfflineProgramsExplorer initialPillar="extra-curricular" />
        </div>
      </section>
    </div>
  )
}
