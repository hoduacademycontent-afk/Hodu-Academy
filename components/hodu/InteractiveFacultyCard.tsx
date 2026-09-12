'use client'

import React, { useState } from 'react'
import { 
  Crown, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  X, 
  BookOpen, 
  Calendar,
  GraduationCap,
  Award
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
  const [showModal, setShowModal] = useState(false)

  const bioText = faculty.bio || ''

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className={`group relative bg-white border-2 border-[#921e1f] rounded-2xl p-6 sm:p-7 text-center shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between items-center h-full hover:-translate-y-1.5 cursor-pointer ${className}`}
      >
        {/* Card Header & Avatar */}
        <div className="w-full flex flex-col items-center">
          
          {/* Circular Photo with Hover Glow */}
          <div className="relative mb-3.5">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mx-auto bg-neutral-50 ring-4 ring-[#921e1f]/15 group-hover:ring-[#921e1f]/40 p-0.5 shadow-xs transition-all duration-300 group-hover:scale-105 flex items-center justify-center">
              {faculty.photo_url ? (
                <img
                  src={normalizeImageUrl(faculty.photo_url)}
                  alt={faculty.name}
                  className="w-full h-full object-cover object-top rounded-full"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center font-serif-editorial font-bold text-[#921e1f] bg-[#FAF4F4] rounded-full">
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
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-md border border-neutral-100 flex items-center justify-center">
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
          <h3 className="font-serif-editorial text-lg sm:text-xl font-bold text-[#921e1f] group-hover:text-[#651416] transition-colors">
            {faculty.name}
          </h3>

          <p className="text-xs sm:text-sm font-bold text-[#1B2A44] mt-0.5">
            {faculty.role || faculty.subject || (isDirector ? 'Co-Founder & Director' : 'Faculty')}
          </p>

          {faculty.experience && (
            <p className="text-[11px] font-semibold text-[#921e1f] mt-0.5">
              {faculty.experience}
            </p>
          )}
        </div>

        {/* Bio Section with Truncation & Read More */}
        {bioText && (
          <div className="w-full mt-3.5 pt-3 border-t border-neutral-100 flex flex-col items-center">
            <p className="text-xs text-neutral-600 leading-relaxed text-justify line-clamp-3 w-full">
              {bioText}
            </p>

            {/* Read More Trigger Button */}
            <div className="w-full flex items-center justify-between mt-3 pt-2 border-t border-neutral-50 text-[11px]">
              <span className="text-[#921e1f] font-bold inline-flex items-center gap-1 group-hover:underline">
                <span>Read More</span>
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </span>

              <span className="text-[10px] text-neutral-400 font-medium">
                {faculty.qualification || 'Hodu Academy'}
              </span>
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
                    <div className="w-full h-full flex items-center justify-center font-bold text-2xl text-[#921e1f] bg-[#FAF4F4]">
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
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-0.5 flex items-center gap-1">
                    <GraduationCap size={12} className="text-[#921e1f]" />
                    Alma Mater / Degree
                  </span>
                  <span className="text-xs font-bold text-neutral-800">
                    {faculty.qualification}
                  </span>
                </div>
              )}

              {faculty.subject && (
                <div className="bg-neutral-50 border border-neutral-200/80 rounded-xl p-3">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-0.5 flex items-center gap-1">
                    <Award size={12} className="text-[#921e1f]" />
                    Subject & Curricula
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
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-[#921e1f] hover:bg-[#651416] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  <Calendar size={14} />
                  <span>Book Demo Class</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl border border-neutral-200 text-neutral-700 hover:bg-neutral-50 text-xs font-semibold transition-colors cursor-pointer"
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
