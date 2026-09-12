'use client'

import { useState } from 'react'
import {
  GraduationCap,
  Sparkles,
  Users,
  CheckCircle2,
  Send,
  Loader2,
  Building2,
  Award,
  Globe2,
  BookOpen,
  Briefcase,
  Layers,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Laptop
} from 'lucide-react'
import ScrollReveal from '@/components/hodu/ScrollReveal'

const SUBJECT_OPTIONS = [
  'Mathematics (Pure & Applied)',
  'Physics',
  'Chemistry',
  'Biology',
  'Economics & Business Studies',
  'Computer Science & AI / Coding',
  'English Language & Literature',
  'Commerce & Accountancy',
  'Social Sciences & History',
  'Olympiad & Aptitude Foundation',
  'Other / Interdisciplinary'
]

const CURRICULUM_OPTIONS = [
  'Cambridge (IGCSE / AS & A Levels)',
  'International Baccalaureate (IB DP / MYP)',
  'CBSE (Class 9 - 12)',
  'IIT-JEE (Main & Advanced)',
  'NEET-UG (Medical)',
  'Multiple / All Boards'
]

const EXPERIENCE_OPTIONS = [
  '1 - 3 Years',
  '3 - 5 Years',
  '5 - 8 Years',
  '8 - 12 Years',
  '12+ Years (Senior Educator / HOD)'
]

const TEACHING_MODES = [
  'Offline Jaipur Campus (Rajat Path, Mansarovar)',
  'Online Global Classroom',
  'Hybrid (Offline + Online)'
]

export default function JoinFacultySection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Mathematics (Pure & Applied)',
    curriculum: 'Cambridge (IGCSE / AS & A Levels)',
    experience: '3 - 5 Years',
    teaching_mode: 'Offline Jaipur Campus (Rajat Path, Mansarovar)',
    qualification: '',
    resume_link: '',
    bio: '',
  })

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.name.trim()) {
      setError('Please enter your full name.')
      return
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 7) {
      setError('Please enter a valid contact / WhatsApp number.')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/faculty-apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source_page: 'offline_jaipur_campus_page',
        }),
      })

      const result = await res.json()

      if (!res.ok || result.error) {
        throw new Error(result.error || 'Failed to submit application. Please try again.')
      }

      setSubmitted(true)
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="join-faculty" className="py-16 sm:py-24 bg-gradient-to-b from-white via-brand-blush/40 to-white border-t border-brand-border/60 relative overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-crimson/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-maroon/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 bg-brand-maroon/10 border border-brand-maroon/20 text-brand-maroon text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
              <Sparkles size={14} className="text-brand-crimson animate-pulse" />
              <span>Faculty Careers & Recruitment</span>
            </div>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight leading-tight">
              Join Our World-Class Faculty Team
            </h2>
            <div className="w-16 h-1 bg-brand-maroon mx-auto mt-4 rounded-full" />
            <p className="text-sm sm:text-base text-neutral-600 mt-4 leading-relaxed">
              Are you a passionate educator driven by academic excellence? Teach at Jaipur’s premier international coaching campus with small batches, state-of-the-art digital infrastructure, and rewarding career growth.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Why Teach at Hodu */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal animation="fade-up" delay={100}>
              <div className="bg-brand-maroon text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 translate-x-8 -translate-y-8 w-40 h-40 bg-white/10 rounded-full blur-xl pointer-events-none" />
                
                <h3 className="font-serif-editorial text-2xl font-bold mb-4 flex items-center gap-2.5">
                  <GraduationCap className="text-brand-gold h-7 w-7" />
                  <span>Why Teach at Hodu?</span>
                </h3>
                <p className="text-xs sm:text-sm text-red-100/90 leading-relaxed mb-6">
                  We empower educators with complete pedagogical autonomy, cutting-edge smart classroom tools, and an environment focused solely on conceptual mastery.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
                    <Users className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">1:12 Micro-Batches</h4>
                      <p className="text-[11px] sm:text-xs text-red-100/80 leading-normal mt-0.5">
                        Deep personalized engagement without overwhelming classroom sizes.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
                    <Laptop className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">Smart 4K Touch Studios</h4>
                      <p className="text-[11px] sm:text-xs text-red-100/80 leading-normal mt-0.5">
                        Equipped with 85&quot; interactive boards, visualizers & CBT test simulation tools.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
                    <Award className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">Industry-Leading Remuneration</h4>
                      <p className="text-[11px] sm:text-xs text-red-100/80 leading-normal mt-0.5">
                        Top-tier compensation packages with performance incentives and research stipends.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
                    <Globe2 className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">Global Student Reach</h4>
                      <p className="text-[11px] sm:text-xs text-red-100/80 leading-normal mt-0.5">
                        Mentor top-tier learners from Cambridge, IB, and competitive exam tracks worldwide.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-white/15 flex items-center justify-between text-xs text-red-100">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Building2 size={14} className="text-brand-gold" /> Jaipur Campus & Global Online
                  </span>
                  <span className="font-bold text-brand-gold">Hiring for 2025–26</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Teacher Application Form */}
          <div className="lg:col-span-7">
            <ScrollReveal animation="fade-up" delay={200}>
              <div className="bg-white border-2 border-brand-maroon/20 rounded-3xl p-6 sm:p-10 shadow-lg relative">
                {submitted ? (
                  <div className="py-12 text-center space-y-5">
                    <div className="w-16 h-16 bg-green-50 border-2 border-green-200 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
                      <CheckCircle2 size={36} />
                    </div>
                    <h3 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-neutral-900">
                      Application Submitted Successfully!
                    </h3>
                    <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                      Thank you for your interest in joining <strong>Hodu Academy</strong>. Our Academic Director & HR team will review your profile and contact you on WhatsApp / Phone within <strong>24–48 hours</strong>.
                    </p>
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false)
                          setFormData({
                            name: '',
                            email: '',
                            phone: '',
                            subject: 'Mathematics (Pure & Applied)',
                            curriculum: 'Cambridge (IGCSE / AS & A Levels)',
                            experience: '3 - 5 Years',
                            teaching_mode: 'Offline Jaipur Campus (Rajat Path, Mansarovar)',
                            qualification: '',
                            resume_link: '',
                            bio: '',
                          })
                        }}
                        className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold px-6 py-3 rounded-xl transition-all"
                      >
                        Submit Another Application
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <h3 className="font-serif-editorial text-xl sm:text-2xl font-bold text-neutral-900">
                        Faculty Application Form
                      </h3>
                      <p className="text-xs text-neutral-500 mt-1">
                        Fill out your teaching credentials below. Direct response guaranteed from the leadership.
                      </p>
                    </div>

                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3.5 rounded-xl">
                        {error}
                      </div>
                    )}

                    {/* Full Name & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                          Full Name <span className="text-brand-maroon">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Dr. Ramesh Sharma"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-maroon focus:border-transparent transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                          Contact / WhatsApp <span className="text-brand-maroon">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-maroon focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    {/* Email & Highest Qualification */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="e.g. educator@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-maroon focus:border-transparent transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                          Qualification / College
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. M.Sc. (IIT Delhi), B.Ed"
                          value={formData.qualification}
                          onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-maroon focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    {/* Subject Expertise & Curriculum */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                          Primary Subject Expertise <span className="text-brand-maroon">*</span>
                        </label>
                        <select
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-maroon focus:border-transparent transition-all text-neutral-800"
                        >
                          {SUBJECT_OPTIONS.map((sub) => (
                            <option key={sub} value={sub}>
                              {sub}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                          Target Board / Curriculum
                        </label>
                        <select
                          value={formData.curriculum}
                          onChange={(e) => setFormData({ ...formData, curriculum: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-maroon focus:border-transparent transition-all text-neutral-800"
                        >
                          {CURRICULUM_OPTIONS.map((cur) => (
                            <option key={cur} value={cur}>
                              {cur}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Experience & Preferred Mode */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                          Total Teaching Experience
                        </label>
                        <select
                          value={formData.experience}
                          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-maroon focus:border-transparent transition-all text-neutral-800"
                        >
                          {EXPERIENCE_OPTIONS.map((exp) => (
                            <option key={exp} value={exp}>
                              {exp}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                          Preferred Teaching Mode
                        </label>
                        <select
                          value={formData.teaching_mode}
                          onChange={(e) => setFormData({ ...formData, teaching_mode: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-maroon focus:border-transparent transition-all text-neutral-800"
                        >
                          {TEACHING_MODES.map((mode) => (
                            <option key={mode} value={mode}>
                              {mode}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Resume / Portfolio Link */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                        Resume / LinkedIn / Portfolio Link (Google Drive / PDF URL)
                      </label>
                      <input
                        type="url"
                        placeholder="https://drive.google.com/... or https://linkedin.com/in/..."
                        value={formData.resume_link}
                        onChange={(e) => setFormData({ ...formData, resume_link: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-maroon focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Bio / Teaching Philosophy */}
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                        Brief Bio & Key Achievements
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Share your teaching style, past school / institute affiliations, or student rank highlights..."
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-maroon focus:border-transparent transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-brand-maroon hover:bg-brand-crimson text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-wider disabled:opacity-70 disabled:cursor-not-allowed group cursor-pointer"
                      >
                        {loading ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            <span>Submitting Application…</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Faculty Application</span>
                            <Send size={15} className="group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-center gap-4 text-[11px] text-neutral-400 text-center pt-2">
                      <span className="flex items-center gap-1">
                        <ShieldCheck size={13} className="text-green-600" /> Direct Director Review
                      </span>
                      <span>&bull;</span>
                      <span>Strict Confidentiality Guaranteed</span>
                    </div>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
