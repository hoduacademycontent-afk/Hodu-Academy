'use client'

import { useState } from 'react'
import ScrollReveal from '@/components/hodu/ScrollReveal'
import InteractiveFacultyCard from '@/components/hodu/InteractiveFacultyCard'

interface FacultyMember {
  id?: string
  name: string
  role?: string
  subject?: string
  qualification?: string
  experience?: string
  bio?: string
  photo_url?: string
  is_founder?: boolean
  featured_offline?: boolean
}

interface AboutFacultyDirectoryProps {
  facultyList: FacultyMember[]
}

const CATEGORIES = [
  { id: 'all', label: 'All Mentors' },
  { id: 'physics', label: 'Physics' },
  { id: 'math', label: 'Mathematics' },
  { id: 'chem', label: 'Chemistry' },
  { id: 'intl', label: 'English & International' },
]

export default function AboutFacultyDirectory({ facultyList }: AboutFacultyDirectoryProps) {
  const [activeTab, setActiveTab] = useState('all')

  const filteredFaculty = facultyList.filter((f) => {
    if (activeTab === 'all') return true
    const subj = (f.subject || '').toLowerCase()
    const role = (f.role || '').toLowerCase()
    const bio = (f.bio || '').toLowerCase()
    const text = `${subj} ${role} ${bio}`

    if (activeTab === 'physics') return text.includes('physic')
    if (activeTab === 'math') return text.includes('math')
    if (activeTab === 'chem') return text.includes('chem')
    if (activeTab === 'intl') return text.includes('english') || text.includes('igcse') || text.includes('ib') || text.includes('international')
    return true
  })

  return (
    <div className="space-y-10">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {CATEGORIES.map((cat) => {
          const isActive = activeTab === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all uppercase tracking-wider ${
                isActive
                  ? 'bg-brand-maroon text-white shadow-sm ring-2 ring-brand-maroon ring-offset-2'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 hover:text-neutral-900'
              }`}
            >
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* Faculty Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {filteredFaculty.map((member, idx) => (
          <ScrollReveal key={member.id || member.name + idx} animation="fade-up" delay={(idx % 6) * 60} className="h-full">
            <InteractiveFacultyCard
              faculty={member}
              isDirector={member.is_founder}
            />
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}
