'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  GraduationCap,
  Sparkles,
  Activity,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Users,
  Award,
  ArrowRight,
  Shield,
  Lightbulb,
  Zap,
  Target,
  Clock,
  Compass
} from 'lucide-react'
import {
  ACADEMICS_PROGRAMS,
  HOLISTIC_PROGRAMS,
  EXTRA_CURRICULAR_PROGRAMS,
  OFFLINE_PILLARS,
  ProgramTrack
} from '@/lib/offlineProgramsData'

interface OfflineProgramsExplorerProps {
  initialPillar?: 'academics' | 'holistic' | 'extra-curricular'
  initialTrackIndex?: number
  hidePillarTabs?: boolean
}

export default function OfflineProgramsExplorer({
  initialPillar = 'academics',
  initialTrackIndex = 0,
  hidePillarTabs = false,
}: OfflineProgramsExplorerProps) {
  const [activePillar, setActivePillar] = useState<'academics' | 'holistic' | 'extra-curricular'>(initialPillar)
  const [activeTrackIndex, setActiveTrackIndex] = useState<number>(initialTrackIndex)

  // Get current dataset
  const currentPrograms: ProgramTrack[] =
    activePillar === 'academics'
      ? ACADEMICS_PROGRAMS
      : activePillar === 'holistic'
      ? HOLISTIC_PROGRAMS
      : EXTRA_CURRICULAR_PROGRAMS

  // Safe track index
  const safeTrackIndex = Math.min(activeTrackIndex, currentPrograms.length - 1)
  const track = currentPrograms[safeTrackIndex] || currentPrograms[0]

  const pillarMeta = OFFLINE_PILLARS.find(p => p.id === activePillar) || OFFLINE_PILLARS[0]

  return (
    <div id="programs-explorer" className="w-full max-w-7xl mx-auto space-y-8">
      {/* ─── 1. Main Pillar Selector (Academics / Holistic / Extra-Curricular) ─── */}
      {!hidePillarTabs && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {OFFLINE_PILLARS.map((pillar) => {
            const isSelected = activePillar === pillar.id
            const IconComponent =
              pillar.id === 'academics'
                ? GraduationCap
                : pillar.id === 'holistic'
                ? Sparkles
                : Activity

            return (
              <button
                key={pillar.id}
                onClick={() => {
                  setActivePillar(pillar.id as any)
                  setActiveTrackIndex(0)
                }}
                className={`relative text-left p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between group overflow-hidden ${
                  isSelected
                    ? 'border-brand-maroon bg-white shadow-xl shadow-brand-maroon/5 ring-4 ring-brand-maroon/10 scale-[1.01]'
                    : 'border-brand-border/70 bg-white/80 hover:bg-white hover:border-brand-maroon/40 shadow-xs hover:shadow-md'
                }`}
              >
                {/* Active Indicator Top Stripe */}
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-maroon" />
                )}

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-brand-maroon text-white shadow-sm'
                          : 'bg-brand-blush text-brand-maroon group-hover:bg-brand-maroon group-hover:text-white'
                      }`}
                    >
                      <IconComponent size={24} />
                    </div>
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        isSelected
                          ? 'bg-brand-maroon/10 text-brand-maroon'
                          : 'bg-neutral-100 text-neutral-600'
                      }`}
                    >
                      {pillar.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif-editorial text-xl font-bold text-neutral-900 group-hover:text-brand-maroon transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold">
                  <span className="text-brand-maroon">{pillar.stats}</span>
                  <span
                    className={`inline-flex items-center gap-1 transition-transform ${
                      isSelected ? 'text-brand-maroon font-bold' : 'text-neutral-400 group-hover:translate-x-1 group-hover:text-brand-maroon'
                    }`}
                  >
                    {isSelected ? 'Viewing' : 'Explore'}
                    <ArrowRight size={13} />
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      )}

      {/* ─── 2. Sub-Track Tabs (e.g. CBSE / IGCSE / IB / Competitive Exams) ─── */}
      <div className="bg-white rounded-2xl border border-brand-border/70 p-2 sm:p-3 shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-thin">
          {currentPrograms.map((prog, idx) => {
            const isTabActive = safeTrackIndex === idx
            return (
              <button
                key={prog.label}
                onClick={() => setActiveTrackIndex(idx)}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 flex items-center gap-2 ${
                  isTabActive
                    ? 'bg-brand-maroon text-white shadow-md shadow-brand-maroon/20 scale-[1.02]'
                    : 'text-neutral-700 hover:text-brand-maroon hover:bg-brand-blush/60'
                }`}
              >
                <span>{prog.label.split('(')[0].trim()}</span>
                {prog.label.includes('(') && (
                  <span className="text-[10px] hidden lg:inline font-normal opacity-80">
                    ({prog.label.split('(')[1]}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* ─── 3. Detailed Program Track Content ─── */}
      {track && (
        <div className="space-y-8 animate-fade-in">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-brand-maroon via-[#921e1f] to-[#5a0909] rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold text-amber-200 tracking-wide uppercase">
                <Target size={13} />
                <span>{pillarMeta.title} Specialization</span>
              </div>
              <h2 className="font-serif-editorial text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                {track.welcomeHeading || track.label}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                Empowering students with structured methodology, conceptual mastery, and personalized mentorship.
              </p>
            </div>
          </div>

          {/* Problem & Common Issues vs Key Features */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* The Problem & Challenges */}
            <div className="bg-white rounded-2xl border border-red-200/80 p-6 sm:p-7 shadow-xs space-y-4 relative overflow-hidden">
              <div className="flex items-center gap-2.5 text-red-700 font-bold text-base sm:text-lg">
                <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-red-600 shrink-0">
                  <AlertCircle size={18} />
                </div>
                <span>Challenges Students & Parents Face</span>
              </div>

              {track.problem && (
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed italic bg-red-50/50 p-3.5 rounded-xl border border-red-100">
                  "{track.problem}"
                </p>
              )}

              {track.issues && track.issues.length > 0 && (
                <div className="space-y-2.5 pt-2">
                  <div className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                    Common Pitfalls & Obstacles:
                  </div>
                  <ul className="space-y-2">
                    {track.issues.map((issue, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                        <span className="leading-snug">{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Key Features / What Sets This Apart */}
            <div className="bg-white rounded-2xl border border-emerald-200/80 p-6 sm:p-7 shadow-xs space-y-4 relative overflow-hidden">
              <div className="flex items-center gap-2.5 text-emerald-800 font-bold text-base sm:text-lg">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                  <Zap size={18} />
                </div>
                <span>Key Curriculum Highlights & Advantages</span>
              </div>

              {track.whatIsDesc && (
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100">
                  {track.whatIsDesc}
                </p>
              )}

              {track.keyFeatures && track.keyFeatures.length > 0 && (
                <div className="space-y-2.5 pt-2">
                  <div className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                    Program Advantages:
                  </div>
                  <ul className="space-y-2.5">
                    {track.keyFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700">
                        <CheckCircle2 size={16} className="text-emerald-600 mt-0.5 shrink-0" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* ─── 4. The 5 Core Solution Pillars (Cards) ─── */}
          {track.cards && track.cards.length > 0 && (
            <div className="space-y-4">
              <div className="text-center sm:text-left">
                <h3 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-brand-maroon">
                  Our Comprehensive Learning Framework
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                  How Hodu Academy delivers predictable excellence for {track.label}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {track.cards.map((card, idx) => {
                  return (
                    <div
                      key={card.title || idx}
                      className="bg-white rounded-2xl border-2 border-brand-maroon/20 hover:border-brand-maroon p-6 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-brand-blush text-brand-maroon group-hover:bg-brand-maroon group-hover:text-white transition-colors flex items-center justify-center font-bold text-sm shrink-0">
                            {idx + 1}
                          </div>
                          <h4 className="font-serif-editorial text-lg font-bold text-brand-maroon">
                            {card.title}
                          </h4>
                        </div>

                        <ul className="space-y-2 pt-2">
                          {card.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex items-start gap-2 text-xs text-neutral-600 leading-relaxed">
                              <CheckCircle2 size={14} className="text-brand-maroon mt-0.5 shrink-0 opacity-80" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ─── 5. Why Choose Hodu Academy for This Track ─── */}
          {track.whyChooseUs && track.whyChooseUs.length > 0 && (
            <div className="bg-neutral-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                    <Award size={14} />
                    <span>The Hodu Difference</span>
                  </div>
                  <h3 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-white">
                    Why Choose Us for {track.label.split('(')[0].trim()}
                  </h3>
                </div>

                <Link
                  href="/enroll"
                  className="bg-brand-maroon hover:bg-brand-crimson text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-2 shrink-0 group cursor-pointer"
                >
                  <span>Book Free Evaluation</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {track.whyChooseUs.map((point, idx) => {
                  const parts = point.split(':')
                  const head = parts[0]
                  const body = parts.slice(1).join(':')

                  return (
                    <div
                      key={idx}
                      className="bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/80 rounded-xl p-4.5 space-y-2 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-brand-maroon/30 text-amber-300 flex items-center justify-center font-bold text-xs">
                        ✓
                      </div>
                      <div className="font-bold text-sm text-neutral-100">{head}</div>
                      {body && <div className="text-xs text-neutral-400 leading-relaxed">{body.trim()}</div>}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ─── 6. Action Callout ─── */}
          <div className="bg-brand-blush/60 border border-brand-border rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="space-y-1">
              <h4 className="font-serif-editorial text-lg font-bold text-brand-maroon">
                Want to speak with a program specialist?
              </h4>
              <p className="text-xs text-neutral-600">
                Get curriculum maps, sample worksheets, fee schedules, or schedule a campus visit in Jaipur.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/contact"
                className="bg-brand-maroon hover:bg-brand-crimson text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm"
              >
                Contact Academic Counselor
              </Link>
              <Link
                href="/about#faculty"
                className="bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-200 text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
              >
                View Mentors
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
