'use client'

import { useState, useRef } from 'react'
import {
  GraduationCap,
  CheckCircle2,
  Send,
  Loader2,
  UploadCloud,
  FileText,
  X,
  ShieldCheck,
  Paperclip,
  Check
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

  // Resume Upload State
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadingResume, setUploadingResume] = useState(false)
  const [uploadedResume, setUploadedResume] = useState<{ name: string; size: string; url: string } | null>(null)
  const [resumeError, setResumeError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const handleResumeUpload = async (file: File) => {
    if (!file) return

    setResumeError(null)

    // Allowed file types: pdf, doc, docx, rtf
    const validExtensions = ['pdf', 'doc', 'docx', 'rtf', 'txt']
    const fileExt = file.name.split('.').pop()?.toLowerCase() || ''
    
    if (!validExtensions.includes(fileExt)) {
      setResumeError('Please upload a valid PDF or Word document (.pdf, .doc, .docx).')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setResumeError('File size exceeds 10MB limit. Please upload a smaller file.')
      return
    }

    setUploadingResume(true)

    try {
      const fd = new FormData()
      fd.append('file', file)

      const res = await fetch('/api/upload-resume', {
        method: 'POST',
        body: fd,
      })

      const data = await res.json()

      if (!res.ok || data.error) {
        throw new Error(data.error || 'Failed to upload resume.')
      }

      setUploadedResume({
        name: file.name,
        size: formatFileSize(file.size),
        url: data.url,
      })

      setFormData((prev) => ({
        ...prev,
        resume_link: data.url,
      }))
    } catch (err: any) {
      setResumeError(err.message || 'Upload failed. Please try again or paste a link.')
    } finally {
      setUploadingResume(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleResumeUpload(file)
    }
  }

  const removeUploadedResume = () => {
    setUploadedResume(null)
    setFormData((prev) => ({ ...prev, resume_link: '' }))
    setResumeError(null)
  }

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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight leading-tight">
              Join Our World-Class Faculty Team
            </h2>
            <div className="w-16 h-1 bg-brand-maroon mx-auto mt-4 rounded-full" />
            <p className="text-sm sm:text-base text-neutral-600 mt-4 leading-relaxed">
              Are you a passionate educator driven by academic excellence? Teach at Jaipur’s premier international coaching campus with small batches, state-of-the-art digital infrastructure, and rewarding career growth.
            </p>
          </div>
        </ScrollReveal>

        {/* Centered Application Form Card */}
        <ScrollReveal animation="fade-up" delay={100}>
          <div className="bg-white border-2 border-brand-maroon/20 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl relative">
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
                      setUploadedResume(null)
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
                    className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold px-6 py-3 rounded-xl transition-all cursor-pointer"
                  >
                    Submit Another Application
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-serif-editorial text-xl sm:text-2xl font-bold text-neutral-900">
                    Faculty Application Form
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1">
                    Fill out your teaching credentials and upload your CV below. Direct review guaranteed by the academic leadership.
                  </p>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3.5 rounded-xl">
                    {error}
                  </div>
                )}

                {/* Full Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
                      className="w-full px-4 py-3 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-maroon focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                      Contact / WhatsApp Number <span className="text-brand-maroon">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-maroon focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Email & Highest Qualification */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. educator@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-maroon focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                      Highest Qualification / College
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. M.Sc. (IIT Delhi), B.Ed"
                      value={formData.qualification}
                      onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                      className="w-full px-4 py-3 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-maroon focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Subject Expertise & Curriculum */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                      Primary Subject Expertise <span className="text-brand-maroon">*</span>
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-maroon focus:border-transparent transition-all text-neutral-800"
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
                      className="w-full px-4 py-3 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-maroon focus:border-transparent transition-all text-neutral-800"
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                      Total Teaching Experience
                    </label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-4 py-3 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-maroon focus:border-transparent transition-all text-neutral-800"
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
                      className="w-full px-4 py-3 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-maroon focus:border-transparent transition-all text-neutral-800"
                    >
                      {TEACHING_MODES.map((mode) => (
                        <option key={mode} value={mode}>
                          {mode}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Resume Upload Box */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Upload Resume / CV (PDF or DOCX)
                  </label>

                  {/* Hidden input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.rtf"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleResumeUpload(file)
                    }}
                    className="hidden"
                  />

                  {uploadedResume ? (
                    <div className="p-4 bg-emerald-50/70 border border-emerald-300 rounded-2xl flex items-center justify-between transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                          <FileText size={20} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-xs sm:text-sm font-bold text-emerald-900 truncate max-w-[200px] sm:max-w-md">
                              {uploadedResume.name}
                            </p>
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded-full">
                              <Check size={11} /> Uploaded
                            </span>
                          </div>
                          <p className="text-[11px] text-emerald-700 mt-0.5">{uploadedResume.size}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline px-2 py-1 cursor-pointer"
                        >
                          Change
                        </button>
                        <button
                          type="button"
                          onClick={removeUploadedResume}
                          className="p-1.5 rounded-lg text-emerald-700 hover:bg-emerald-200/60 hover:text-red-600 transition-colors cursor-pointer"
                          title="Remove file"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => !uploadingResume && fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                        isDragging
                          ? 'border-brand-maroon bg-brand-maroon/5 scale-[1.01]'
                          : 'border-neutral-300 hover:border-brand-maroon hover:bg-brand-blush/30 bg-neutral-50/50'
                      }`}
                    >
                      {uploadingResume ? (
                        <div className="flex flex-col items-center justify-center py-2 space-y-2">
                          <Loader2 size={28} className="text-brand-maroon animate-spin" />
                          <p className="text-xs font-bold text-brand-maroon">Uploading Resume to Secure Server…</p>
                          <p className="text-[11px] text-neutral-400">Please wait a moment</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <div className="w-12 h-12 rounded-2xl bg-brand-maroon/10 text-brand-maroon flex items-center justify-center mb-1">
                            <UploadCloud size={24} />
                          </div>
                          <div>
                            <span className="text-xs sm:text-sm font-bold text-neutral-800">
                              Click to upload resume
                            </span>
                            <span className="text-xs text-neutral-500"> or drag & drop file here</span>
                          </div>
                          <p className="text-[11px] text-neutral-400">
                            PDF, DOC, DOCX up to 10MB
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {resumeError && (
                    <p className="text-xs text-red-600 font-medium mt-2">
                      {resumeError}
                    </p>
                  )}

                  {/* Secondary option: Paste URL if they have Drive / Portfolio */}
                  <div className="mt-3">
                    <label className="block text-[11px] text-neutral-500 font-medium mb-1">
                      Or paste Google Drive / LinkedIn / Portfolio URL:
                    </label>
                    <input
                      type="url"
                      placeholder="https://drive.google.com/... or https://linkedin.com/in/..."
                      value={formData.resume_link}
                      onChange={(e) => setFormData({ ...formData, resume_link: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-maroon transition-all"
                    />
                  </div>
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
                    className="w-full px-4 py-3 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-maroon focus:border-transparent transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading || uploadingResume}
                    className="w-full bg-brand-maroon hover:bg-brand-crimson text-white font-bold py-4 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-wider disabled:opacity-70 disabled:cursor-not-allowed group cursor-pointer"
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
    </section>
  )
}
