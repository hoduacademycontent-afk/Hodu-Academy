'use client'

import React, { useState, useMemo } from 'react'
import { Search, ChevronDown, HelpCircle, BookOpen, School, GraduationCap, FileCheck, DollarSign, MessageCircle, Phone, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import ScrollReveal from './ScrollReveal'
import { allFaqsData, FaqItem } from '@/lib/faqData'



const categories = [
  'All Questions',
  'Curriculum & Boards',
  'Jaipur Offline Campus',
  'Admissions & Batches',
  'JEE, NEET & Olympiads',
  'Study Materials & DPPs',
  'Fees & Scholarships',
]

export default function FaqInteractiveClient() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Questions')
  const [openIds, setOpenIds] = useState<string[]>(['cb-1', 'jc-1'])

  const toggleAccordion = (id: string) => {
    setOpenIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const filteredFaqs = useMemo(() => {
    return allFaqsData.filter(faq => {
      const matchesCategory =
        selectedCategory === 'All Questions' || faq.category === selectedCategory

      const matchesSearch =
        searchQuery.trim() === '' ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  return (
    <div className="space-y-10">
      {/* ─── Search Bar ─── */}
      <div className="max-w-2xl mx-auto">
        <div className="relative flex items-center bg-white border-2 border-brand-border/80 focus-within:border-brand-maroon rounded-2xl shadow-md p-2 transition-all">
          <Search className="h-5 w-5 text-brand-muted ml-3 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. IGCSE, fees, Jaipur center, batch size, doubts)..."
            className="w-full px-3 py-2 text-sm text-brand-text bg-transparent outline-none placeholder:text-neutral-400 font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-brand-muted hover:text-brand-text font-bold px-2 py-1 mr-1 rounded-md hover:bg-neutral-100 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* ─── Category Filter Pills ─── */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
        {categories.map(cat => {
          const isActive = selectedCategory === cat
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-bold px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-brand-maroon text-white shadow-md -translate-y-0.5'
                  : 'bg-white text-brand-muted hover:text-brand-maroon hover:bg-brand-blush border border-brand-border shadow-2xs'
              }`}
            >
              {cat}
            </button>
          )
        })}
      </div>

      {/* ─── Results Counter ─── */}
      <div className="flex items-center justify-between border-b border-brand-border/60 pb-3 max-w-4xl mx-auto text-xs text-brand-muted">
        <span>
          Showing <strong className="text-brand-maroon">{filteredFaqs.length}</strong> questions in <strong className="text-brand-text">{selectedCategory}</strong>
        </span>
        {searchQuery && (
          <span>Search query: &quot;{searchQuery}&quot;</span>
        )}
      </div>

      {/* ─── Accordion List ─── */}
      <div className="max-w-4xl mx-auto space-y-3.5">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIds.includes(faq.id)
            return (
              <ScrollReveal key={faq.id} animation="fade-up" delay={(idx % 6) * 50}>
                <div
                  className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden shadow-2xs ${
                    isOpen ? 'border-brand-maroon/60 shadow-md ring-1 ring-brand-maroon/10' : 'border-brand-border hover:border-brand-maroon/40'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer select-none"
                    aria-expanded={isOpen}
                  >
                    <div className="space-y-1 pr-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-crimson block">
                        {faq.category}
                      </span>
                      <h3 className="font-serif-editorial text-base sm:text-lg font-bold text-brand-text leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen ? 'bg-brand-maroon text-white rotate-180' : 'bg-brand-blush text-brand-maroon'
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-brand-muted leading-relaxed border-t border-brand-border/40 animate-fade-in">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            )
          })
        ) : (
          <div className="bg-white rounded-2xl p-10 text-center border border-brand-border space-y-3">
            <HelpCircle className="h-10 w-10 text-brand-muted mx-auto" />
            <h4 className="font-bold text-brand-text">No matching questions found</h4>
            <p className="text-xs text-brand-muted max-w-sm mx-auto">
              Try modifying your search keywords or reach out to our counselors directly.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All Questions'); }}
              className="text-xs font-bold text-brand-maroon hover:underline pt-2 inline-block"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* ─── Still Have Questions CTA Banner ─── */}
      <div className="max-w-4xl mx-auto pt-6">
        <div className="bg-gradient-to-br from-[#3D0607] via-[#5C0A0C] to-[#7E0D0D] text-white p-8 sm:p-10 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="bg-white/10 backdrop-blur-xs text-amber-300 text-[11px] font-extrabold px-3 py-1 rounded-full border border-white/15 uppercase tracking-wider">
              Need Personal Guidance?
            </span>
            <h3 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-white leading-tight">
              Still Have Unanswered Questions?
            </h3>
            <p className="text-xs sm:text-sm text-white/80 max-w-md">
              Speak directly with our senior curriculum mentors or visit our Jaipur center for a 1-on-1 counseling session.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <a
              href="tel:+919257879555"
              className="w-full sm:w-auto bg-white hover:bg-neutral-100 text-brand-maroon font-bold px-5 py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <Phone className="h-4 w-4" />
              <span>Call +91-9257879555</span>
            </a>
            <Link
              href="/contact"
              className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-brand-text font-bold px-5 py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <span>Book Diagnostic Visit</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
