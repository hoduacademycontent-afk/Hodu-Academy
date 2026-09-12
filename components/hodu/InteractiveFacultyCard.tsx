'use client'

import React, { useState } from 'react'
import { 
  ChevronDown, 
  ChevronUp, 
  Crown, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  X, 
  BookOpen, 
  Calendar
} from 'lucide-react'
import { normalizeImageUrl } from '@/lib/imageUtils'
import Link from 'next/link'

export interface FacultyMember {
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

interface InteractiveFacultyCardProps {
  faculty: FacultyMember
  isDirector?: boolean
  className?: string
}

export default function InteractiveFacultyCard({
  faculty,
  isDirector = false,
  className = '',
}: InteractiveFacultyCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const bioText = faculty.bio || ''
  const isLongBio = bioText.length > 120

  // Extract badges/tags if available
  const badges: string[] = []
  if (faculty.qualification) {
    badges.push(faculty.qualification)
  }
  if (faculty.subject && faculty.subject !== faculty.qualification) {
    const subjects = faculty.subject.split(',').map(s => s.trim()).filter(Boolean)
    subjects.forEach(s => {
      if (!badges.includes(s) && badges.length < 3) badges.push(s)
    })
  }

  return (
    <>
      <div
        className={`group relative bg-white border-2 border-[#921e1f]/20 hover:border-[#921e1f] rounded-2xl p-6 sm:p-7 text-center shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between items-center h-full hover:-translate-y-1.5 ${className}`}
      >
        {/* Top subtle decorative gradient on hover */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#921e1f] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />

        {/* Card Header & Avatar */}
        <div className="w-full flex flex-col items-center">
          
          {/* Circular Photo with Hover Glow */}
          <div className="relative mb-4 cursor-pointer" onClick={() => setShowModal(true)}>
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mx-auto bg-neutral-50 ring-4 ring-[#921e1f]/15 group-hover:ring-[#921e1f]/40 p-0.5 shadow-sm transition-all duration-300 group-hover:scale-105 flex items-center justify-center">
              {faculty.photo_url ? (
                <img
                  src={normalizeImageUrl(faculty.photo_url)}
                  alt={faculty.name}
                  className="w-full h-full object-cover object-top rounded-full"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center font-serif-editorial font-bold text-brand-maroon bg-brand-blush rounded-full">
                  {isDirector || faculty.is_founder ? (
                    <>
                      <Crown size={24} className="text-[#921e1f] mb-0.5 opacity-80" />
                      <span className="text-[10px] font-sans tracking-widest font-bold">DIRECTOR</span>
                    </>
                  ) : (
                    <span className="text-xl font-bold text-[#921e1f]">
                      {faculty.name.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Verified Badge Icon */}
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md border border-neutral-100 flex items-center justify-center">
              {isDirector || faculty.is_founder ? (
                <div className="bg-amber-100 text-amber-700 p-1 rounded-full" title="Founding Director">
                  <Crown size={12} className="fill-amber-600 text-amber-600" />
                </div>
              ) : (
                <div className="bg-emerald-50 text-emerald-600 p-1 rounded-full" title="Verified Master Faculty">
                  <CheckCircle2 size={12} className="fill-emerald-600 text-white" />
                </div>
              )}
            </div>
          </div>

          {/* Name & Title */}
          <h3 
            onClick={() => setShowModal(true)}
            className="font-serif-editorial text-lg sm:text-xl font-bold text-[#921e1f] group-hover:text-[#651416] transition-colors cursor-pointer"
          >
            {faculty.name}
          </h3>

          <p className="text-xs sm:text-sm font-bold text-[#1B2A44] mt-0.5">
            {faculty.role || faculty.subject || 'Educator & Mentor'}
          </p>

          {faculty.experience && (
            <div className="mt-1.5 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#921e1f]/5 border border-[#921e1f]/15 text-[#921e1f] text-[11px] font-semibold">
              <Sparkles size={11} className="text-[#921e1f] shrink-0" />
              <span>{faculty.experience}</span>
            </div>
          )}

          {/* Optional Badge Chips */}
          {badges.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2.5">
              {badges.slice(0, 2).map((badge, bIdx) => (
                <span
                  key={bIdx}
                  className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 text-[10px] font-medium border border-neutral-200/60"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Bio Section with Read More / Read Less */}
        {bioText && (
          <div className="w-full mt-4 pt-3 border-t border-neutral-100 flex flex-col items-center">
            <div className="w-full text-left">
              <p
                className={`text-xs text-neutral-600 leading-relaxed transition-all duration-300 ${
                  !isExpanded && isLongBio ? 'line-clamp-3' : ''
                }`}
              >
                {bioText}
              </p>
            </div>

            {/* Read More Toggle & Quick View Buttons */}
            <div className="w-full flex items-center justify-between mt-2.5 pt-1.5 border-t border-neutral-50 text-[11px]">
              {isLongBio ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsExpanded(!isExpanded)
                  }}
                  className="inline-flex items-center gap-1 text-[#921e1f] hover:text-[#651416] font-bold transition-colors cursor-pointer py-1"
                >
                  <span>{isExpanded ? 'Read Less' : 'Read More'}</span>
                  {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              ) : (
                <span className="text-[10px] text-neutral-400 font-medium">Hodu Academy</span>
              )}

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowModal(true)
                }}
                className="inline-flex items-center gap-1 text-neutral-500 hover:text-[#921e1f] font-semibold transition-colors cursor-pointer ml-auto py-1"
              >
                <span>Full Profile</span>
                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ─── FULL PROFILE DETAIL MODAL ─── */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#921e1f]/30 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-900 transition-all cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-5 border-b border-neutral-100">
              <div className="relative shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-neutral-50 ring-4 ring-[#921e1f]/20 shadow-md">
                  {faculty.photo_url ? (
                    <img
                      src={normalizeImageUrl(faculty.photo_url)}
                      alt={faculty.name}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-2xl text-[#921e1f] bg-brand-blush">
                      {faculty.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md border border-neutral-200">
                  {isDirector || faculty.is_founder ? (
                    <div className="bg-amber-100 text-amber-800 p-1 rounded-full">
                      <Crown size={14} className="fill-amber-600 text-amber-600" />
                    </div>
                  ) : (
                    <div className="bg-emerald-100 text-emerald-800 p-1 rounded-full">
                      <CheckCircle2 size={14} className="fill-emerald-600 text-white" />
                    </div>
                  )}
                </div>
              </div>

              <div className="text-center sm:text-left flex-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#921e1f]/10 text-[#921e1f] text-[10px] font-bold uppercase tracking-wider mb-1.5">
                  {isDirector || faculty.is_founder ? 'Academic Director' : 'Master Faculty'}
                </div>
                <h3 className="font-serif-editorial text-2xl font-bold text-neutral-900">
                  {faculty.name}
                </h3>
                <p className="text-sm font-bold text-[#1B2A44] mt-0.5">
                  {faculty.role || faculty.subject}
                </p>
                {faculty.experience && (
                  <p className="text-xs font-semibold text-[#921e1f] mt-1">
                    {faculty.experience}
                  </p>
                )}
              </div>
            </div>

            {/* Modal Body Info Cards */}
            <div className="grid grid-cols-2 gap-3 my-4">
              {faculty.qualification && (
                <div className="bg-neutral-50 border border-neutral-200/80 rounded-xl p-3">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-0.5">
                    Qualification / Alma Mater
                  </span>
                  <span className="text-xs font-bold text-neutral-800">
                    {faculty.qualification}
                  </span>
                </div>
              )}

              {faculty.subject && (
                <div className="bg-neutral-50 border border-neutral-200/80 rounded-xl p-3">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-0.5">
                    Specialization / Boards
                  </span>
                  <span className="text-xs font-bold text-neutral-800">
                    {faculty.subject}
                  </span>
                </div>
              )}
            </div>

            {/* Full Bio */}
            {bioText && (
              <div className="space-y-2 mt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                  <BookOpen size={14} className="text-[#921e1f]" />
                  <span>About & Pedagogical Philosophy</span>
                </h4>
                <div className="bg-[#FAF4F4] rounded-2xl p-4 sm:p-5 border border-[#921e1f]/15">
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed text-justify whitespace-pre-line">
                    {bioText}
                  </p>
                </div>
              </div>
            )}

            {/* Action Footer */}
            <div className="mt-6 pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-neutral-500 font-medium">
                Want to study with {faculty.name.split(' ')[0]}?
              </span>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link
                  href="/contact"
                  onClick={() => setShowModal(false)}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-[#921e1f] hover:bg-[#651416] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm active:scale-95"
                >
                  <Calendar size={14} />
                  <span>Book Demo Class</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-neutral-200 text-neutral-700 hover:bg-neutral-50 text-xs font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
