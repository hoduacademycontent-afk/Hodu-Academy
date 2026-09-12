'use client'

import { useEffect, useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import AdminLayout from '@/components/admin/AdminLayout'
import Modal from '@/components/admin/Modal'
import { AdminTableSkeleton } from '@/components/admin/AdminSkeletons'
import {
  Phone,
  MessageCircle,
  Mail,
  Download,
  Search,
  NotebookPen,
  CalendarClock,
  ExternalLink,
  Trash2,
  AlertTriangle,
  Send,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  Briefcase,
  Layers,
  Sparkles,
  Building2,
  Globe,
  FileText,
  Clock,
  UserCheck,
  XCircle,
  Filter
} from 'lucide-react'

const SITE_ID = 'a1b2c3d4-1111-1111-1111-000000000002'

const STATUSES = [
  { key: 'new', label: 'New', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { key: 'reviewing', label: 'Reviewing', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { key: 'shortlisted', label: 'Shortlisted', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { key: 'interview', label: 'Interview Scheduled', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { key: 'hired', label: 'Selected / Hired', color: 'bg-green-50 text-green-700 border-green-200' },
  { key: 'rejected', label: 'Not Selected', color: 'bg-gray-100 text-gray-500 border-gray-200' },
]

function csvEscape(v: unknown) {
  const s = String(v ?? '')
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

// Helpers to extract structured metadata from message
function parseFacultyDetails(app: any) {
  const msg = app.message || ''
  
  const emailMatch = app.email || (msg.match(/\[Email:\s*([^\]]+)\]/i)?.[1]) || null
  const subjectMatch = app.class_level || (msg.match(/\[Subject:\s*([^\]]+)\]/i)?.[1]) || 'Educator'
  const curriculumMatch = msg.match(/\[Curriculum:\s*([^\]]+)\]/i)?.[1] || null
  const expMatch = msg.match(/\[Experience:\s*([^\]]+)\]/i)?.[1] || null
  const modeMatch = msg.match(/\[Mode:\s*([^\]]+)\]/i)?.[1] || app.city || null
  const qualMatch = msg.match(/\[Qualification:\s*([^\]]+)\]/i)?.[1] || null
  const resumeMatch = msg.match(/\[Resume:\s*([^\]]+)\]/i)?.[1] || null
  
  // Clean bio
  let cleanBio = msg
    .replace(/\[Faculty Application\]/gi, '')
    .replace(/\[Email:\s*[^\]]+\]/gi, '')
    .replace(/\[Subject:\s*[^\]]+\]/gi, '')
    .replace(/\[Curriculum:\s*[^\]]+\]/gi, '')
    .replace(/\[Experience:\s*[^\]]+\]/gi, '')
    .replace(/\[Mode:\s*[^\]]+\]/gi, '')
    .replace(/\[Qualification:\s*[^\]]+\]/gi, '')
    .replace(/\[Resume:\s*[^\]]+\]/gi, '')
    .replace(/\(Source:\s*[^)]+\)/gi, '')
    .replace(/Bio & Background:\s*/gi, '')
    .trim()

  return {
    email: emailMatch,
    subject: subjectMatch,
    curriculum: curriculumMatch,
    experience: expMatch,
    teachingMode: modeMatch,
    qualification: qualMatch,
    resumeLink: resumeMatch,
    bio: cleanBio,
  }
}

export default function FacultyApplicationsPage() {
  const supabase = createClient()
  const [applications, setApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [subjectFilter, setSubjectFilter] = useState('all')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [detailApp, setDetailApp] = useState<any | null>(null)
  const [internalNotes, setInternalNotes] = useState('')
  const [savingDetail, setSavingDetail] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'single' | 'bulk'; app?: any; count?: number } | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  async function loadApplications() {
    setLoading(true)
    try {
      const { data } = await supabase
        .from('cms_leads')
        .select('*')
        .or(`site_id.eq.${SITE_ID},site_id.is.null`)
        .order('created_at', { ascending: false })

      // Filter leads that are faculty applications
      const facultyOnly = (data || []).filter((item: any) => {
        const isFacultyTarget = item.target_exam?.toLowerCase().includes('faculty')
        const isFacultyMsg = item.message?.includes('[Faculty Application]') || item.message?.includes('Source: offline_')
        return isFacultyTarget || isFacultyMsg
      })

      setApplications(facultyOnly)
    } catch (err) {
      console.error('Error loading faculty applications:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadApplications()
  }, [])

  // Filtered Applications
  const filteredApps = useMemo(() => {
    return applications.filter((app) => {
      const parsed = parseFacultyDetails(app)
      const q = search.toLowerCase()
      
      const matchSearch =
        !search ||
        app.name?.toLowerCase().includes(q) ||
        app.phone?.toLowerCase().includes(q) ||
        parsed.email?.toLowerCase().includes(q) ||
        parsed.subject?.toLowerCase().includes(q) ||
        parsed.curriculum?.toLowerCase().includes(q) ||
        parsed.qualification?.toLowerCase().includes(q)

      const matchStatus = statusFilter === 'all' || app.status === statusFilter
      const matchSubject = subjectFilter === 'all' || parsed.subject?.toLowerCase().includes(subjectFilter.toLowerCase())

      return matchSearch && matchStatus && matchSubject
    })
  }, [applications, search, statusFilter, subjectFilter])

  // Unique Subjects for filter dropdown
  const uniqueSubjects = useMemo(() => {
    const set = new Set<string>()
    applications.forEach((a) => {
      const p = parseFacultyDetails(a)
      if (p.subject) set.add(p.subject)
    })
    return Array.from(set)
  }, [applications])

  // Stats calculation
  const stats = useMemo(() => {
    const total = applications.length
    const isNew = applications.filter((a) => a.status === 'new' || !a.status).length
    const shortlisted = applications.filter((a) => a.status === 'shortlisted' || a.status === 'reviewing').length
    const interview = applications.filter((a) => a.status === 'interview').length
    const hired = applications.filter((a) => a.status === 'hired').length
    return { total, isNew, shortlisted, interview, hired }
  }, [applications])

  // Update Application Status
  async function updateStatus(id: string, newStatus: string) {
    const prev = [...applications]
    setApplications((curr) =>
      curr.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    )

    const { error } = await supabase
      .from('cms_leads')
      .update({ status: newStatus })
      .eq('id', id)

    if (error) {
      console.error('Failed to update status:', error)
      setApplications(prev)
    }
  }

  // Open Detail Modal
  function openDetail(app: any) {
    setDetailApp(app)
    setInternalNotes(app.notes || '')
  }

  // Save Notes from Detail Modal
  async function saveDetailNotes() {
    if (!detailApp) return
    setSavingDetail(true)
    try {
      const { error } = await supabase
        .from('cms_leads')
        .update({ notes: internalNotes })
        .eq('id', detailApp.id)

      if (!error) {
        setApplications((curr) =>
          curr.map((a) => (a.id === detailApp.id ? { ...a, notes: internalNotes } : a))
        )
        setDetailApp({ ...detailApp, notes: internalNotes })
      }
    } finally {
      setSavingDetail(false)
    }
  }

  // Delete Handlers
  async function executeDelete() {
    if (!deleteTarget) return
    setIsDeleting(true)

    const idsToDelete =
      deleteTarget.type === 'single' && deleteTarget.app
        ? [deleteTarget.app.id]
        : selectedIds

    try {
      const res = await fetch('/api/faculty-apply', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: idsToDelete }),
      })

      const data = await res.json()
      if (res.ok && data.success) {
        setApplications((curr) => curr.filter((a) => !idsToDelete.includes(a.id)))
        setSelectedIds((curr) => curr.filter((id) => !idsToDelete.includes(id)))
        if (detailApp && idsToDelete.includes(detailApp.id)) {
          setDetailApp(null)
        }
        setDeleteTarget(null)
      } else {
        alert(data.error || 'Failed to delete applications.')
      }
    } catch (err: any) {
      alert(err.message || 'Error occurred while deleting.')
    } finally {
      setIsDeleting(false)
    }
  }

  // Export to CSV
  function exportCSV() {
    const headers = [
      'Name',
      'Contact',
      'Email',
      'Primary Subject',
      'Curriculum Experience',
      'Years Experience',
      'Teaching Mode',
      'Qualification',
      'Resume Link',
      'Status',
      'Internal Notes',
      'Applied Date',
    ]

    const rows = filteredApps.map((a) => {
      const p = parseFacultyDetails(a)
      return [
        csvEscape(a.name),
        csvEscape(a.phone),
        csvEscape(p.email),
        csvEscape(p.subject),
        csvEscape(p.curriculum),
        csvEscape(p.experience),
        csvEscape(p.teachingMode),
        csvEscape(p.qualification),
        csvEscape(p.resumeLink),
        csvEscape(a.status || 'new'),
        csvEscape(a.notes || ''),
        csvEscape(new Date(a.created_at).toLocaleDateString('en-IN')),
      ].join(',')
    })

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `hodu_faculty_applications_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
        {/* Header Title & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-brand-maroon/10 border border-brand-maroon/20 flex items-center justify-center text-brand-maroon shrink-0">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 font-serif-editorial">
                  Teacher & Faculty Applications
                </h1>
                <span className="bg-brand-maroon text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                  {applications.length}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
                Manage and review educator profiles, subject expertise, and hiring pipelines for Jaipur Campus & Global Online.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {selectedIds.length > 0 && (
              <button
                type="button"
                onClick={() => setDeleteTarget({ type: 'bulk', count: selectedIds.length })}
                className="inline-flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold px-4 py-2.5 rounded-xl border border-red-200 transition-all cursor-pointer"
              >
                <Trash2 size={14} />
                <span>Delete Selected ({selectedIds.length})</span>
              </button>
            )}

            <button
              type="button"
              onClick={exportCSV}
              disabled={filteredApps.length === 0}
              className="inline-flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-xs disabled:opacity-50 cursor-pointer"
            >
              <Download size={14} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Metric Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs">
            <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">Total Applicants</p>
            <p className="text-2xl font-bold text-neutral-900 mt-1">{stats.total}</p>
          </div>
          <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-200 shadow-xs">
            <p className="text-[11px] font-bold uppercase tracking-wider text-blue-700">New / Uncontacted</p>
            <p className="text-2xl font-bold text-blue-800 mt-1">{stats.isNew}</p>
          </div>
          <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200 shadow-xs">
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-700">Under Review</p>
            <p className="text-2xl font-bold text-amber-800 mt-1">{stats.shortlisted}</p>
          </div>
          <div className="bg-indigo-50/70 p-4 rounded-xl border border-indigo-200 shadow-xs">
            <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-700">Interview Stage</p>
            <p className="text-2xl font-bold text-indigo-800 mt-1">{stats.interview}</p>
          </div>
          <div className="bg-green-50/70 p-4 rounded-xl border border-green-200 shadow-xs col-span-2 sm:col-span-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-green-700">Selected / Hired</p>
            <p className="text-2xl font-bold text-green-800 mt-1">{stats.hired}</p>
          </div>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by name, subject, phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-maroon focus:border-transparent transition-all"
            />
          </div>

          {/* Status & Subject Filters */}
          <div className="flex items-center gap-2.5 w-full md:w-auto flex-wrap sm:flex-nowrap">
            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              <Filter size={14} className="text-neutral-400 shrink-0" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-maroon text-neutral-800"
              >
                <option value="all">All Statuses</option>
                {STATUSES.map((st) => (
                  <option key={st.key} value={st.key}>
                    {st.label}
                  </option>
                ))}
              </select>
            </div>

            {uniqueSubjects.length > 0 && (
              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-maroon text-neutral-800 max-w-[200px] truncate"
              >
                <option value="all">All Subjects</option>
                {uniqueSubjects.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {loading ? (
          <AdminTableSkeleton rows={6} columns={7} />
        ) : (
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs overflow-hidden">
            {filteredApps.length === 0 ? (
              <div className="py-20 text-center px-4">
              <GraduationCap className="h-12 w-12 text-neutral-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-neutral-700">No faculty applications found</h3>
              <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                {search || statusFilter !== 'all' || subjectFilter !== 'all'
                  ? 'Try resetting your search filters.'
                  : 'Teacher applications submitted from the Offline page form will automatically appear here.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 font-bold uppercase tracking-wider text-[11px]">
                    <th className="p-4 w-10 text-center">
                      <input
                        type="checkbox"
                        checked={selectedIds.length === filteredApps.length && filteredApps.length > 0}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedIds(filteredApps.map((a) => a.id))
                          } else {
                            setSelectedIds([])
                          }
                        }}
                        className="rounded text-brand-maroon focus:ring-brand-maroon"
                      />
                    </th>
                    <th className="py-3.5 px-4">Applicant</th>
                    <th className="py-3.5 px-4">Subject & Board</th>
                    <th className="py-3.5 px-4">Experience & Mode</th>
                    <th className="py-3.5 px-4">Contact</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filteredApps.map((app) => {
                    const parsed = parseFacultyDetails(app)
                    const isSelected = selectedIds.includes(app.id)
                    const rawPhone = app.phone?.replace(/[^\d+]/g, '') || ''
                    const waPhone = rawPhone.startsWith('+') ? rawPhone.replace('+', '') : `91${rawPhone.replace(/^0+/, '')}`
                    const currentStatus = STATUSES.find((s) => s.key === app.status) || STATUSES[0]

                    return (
                      <tr
                        key={app.id}
                        className={`hover:bg-neutral-50/70 transition-colors ${
                          isSelected ? 'bg-brand-maroon/5' : ''
                        }`}
                      >
                        {/* Checkbox */}
                        <td className="p-4 text-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedIds((curr) => [...curr, app.id])
                              } else {
                                setSelectedIds((curr) => curr.filter((id) => id !== app.id))
                              }
                            }}
                            className="rounded text-brand-maroon focus:ring-brand-maroon"
                          />
                        </td>

                        {/* Name & Qualification */}
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-neutral-900 text-sm">
                            {app.name}
                          </div>
                          {parsed.qualification && (
                            <p className="text-[11px] text-neutral-500 font-medium mt-0.5">
                              {parsed.qualification}
                            </p>
                          )}
                          <p className="text-[10px] text-neutral-400 mt-1 flex items-center gap-1">
                            <Clock size={11} />
                            <span>{new Date(app.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                          </p>
                        </td>

                        {/* Subject & Curriculum */}
                        <td className="py-3.5 px-4">
                          <span className="inline-block bg-brand-maroon/10 text-brand-maroon font-bold px-2 py-0.5 rounded-md text-[11px]">
                            {parsed.subject}
                          </span>
                          {parsed.curriculum && (
                            <p className="text-[11px] text-neutral-600 font-medium mt-1">
                              {parsed.curriculum}
                            </p>
                          )}
                        </td>

                        {/* Experience & Mode */}
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-neutral-800">
                            {parsed.experience || 'Not specified'}
                          </div>
                          {parsed.teachingMode && (
                            <span className="inline-flex items-center gap-1 text-[10px] text-neutral-500 mt-1">
                              <Building2 size={11} />
                              <span className="truncate max-w-[150px]">{parsed.teachingMode}</span>
                            </span>
                          )}
                        </td>

                        {/* Contact info */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <a
                              href={`tel:${app.phone}`}
                              className="font-bold text-neutral-900 hover:text-brand-maroon transition-colors"
                            >
                              {app.phone}
                            </a>
                            <a
                              href={`https://wa.me/${waPhone}?text=Hello%20${encodeURIComponent(app.name)}%2C%20thank%20you%20for%20applying%20for%20Faculty%20at%20Hodu%20Academy.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 rounded-md bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                              title="Chat on WhatsApp"
                            >
                              <MessageCircle size={14} />
                            </a>
                          </div>
                          {parsed.email && (
                            <a
                              href={`mailto:${parsed.email}`}
                              className="text-[11px] text-neutral-500 hover:text-blue-600 truncate max-w-[180px] block mt-0.5"
                            >
                              {parsed.email}
                            </a>
                          )}
                        </td>

                        {/* Status dropdown */}
                        <td className="py-3.5 px-4">
                          <select
                            value={app.status || 'new'}
                            onChange={(e) => updateStatus(app.id, e.target.value)}
                            className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border focus:outline-none transition-colors cursor-pointer ${currentStatus.color}`}
                          >
                            {STATUSES.map((st) => (
                              <option key={st.key} value={st.key}>
                                {st.label}
                              </option>
                            ))}
                          </select>
                        </td>

                        {/* Action buttons */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {parsed.resumeLink && (
                              <a
                                href={parsed.resumeLink.startsWith('http') ? parsed.resumeLink : `https://${parsed.resumeLink}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors"
                                title="View Resume / Portfolio"
                              >
                                <FileText size={14} />
                              </a>
                            )}
                            <button
                              type="button"
                              onClick={() => openDetail(app)}
                              className="p-1.5 rounded-lg bg-brand-maroon/10 hover:bg-brand-maroon/20 text-brand-maroon font-bold text-[11px] px-2.5 transition-colors cursor-pointer"
                            >
                              View Profile
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteTarget({ type: 'single', app })}
                              className="p-1.5 rounded-lg hover:bg-red-50 text-neutral-400 hover:text-red-600 transition-colors cursor-pointer"
                              title="Delete Application"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

        {/* Application Details Modal */}
        {detailApp && (() => {
          const parsed = parseFacultyDetails(detailApp)
          const rawPhone = detailApp.phone?.replace(/[^\d+]/g, '') || ''
          const waPhone = rawPhone.startsWith('+') ? rawPhone.replace('+', '') : `91${rawPhone.replace(/^0+/, '')}`

          return (
            <Modal
              onClose={() => setDetailApp(null)}
              title="Faculty Application Profile"
              wide
            >
              <div className="space-y-6">
                {/* Header Profile Box */}
                <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold text-neutral-900 font-serif-editorial">
                        {detailApp.name}
                      </h2>
                      <span className="bg-brand-maroon text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {parsed.subject}
                      </span>
                    </div>
                    {parsed.qualification && (
                      <p className="text-xs text-neutral-600 font-medium mt-1">
                        🎓 {parsed.qualification}
                      </p>
                    )}
                    <p className="text-[11px] text-neutral-400 mt-1">
                      Applied on {new Date(detailApp.created_at).toLocaleString('en-IN', { dateStyle: 'full', timeStyle: 'short' })}
                    </p>
                  </div>

                  {/* Direct Action Buttons */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <a
                      href={`tel:${detailApp.phone}`}
                      className="inline-flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all"
                    >
                      <Phone size={13} />
                      <span>Call</span>
                    </a>
                    <a
                      href={`https://wa.me/${waPhone}?text=Hello%20${encodeURIComponent(detailApp.name)}%2C%20thank%20you%20for%20applying%20for%20Faculty%20at%20Hodu%20Academy.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all"
                    >
                      <MessageCircle size={13} />
                      <span>WhatsApp</span>
                    </a>
                    {parsed.email && (
                      <a
                        href={`mailto:${parsed.email}`}
                        className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all"
                      >
                        <Mail size={13} />
                        <span>Email</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 bg-white border border-neutral-200 rounded-xl">
                    <span className="text-neutral-400 font-bold uppercase tracking-wider text-[10px] block mb-1">
                      Primary Subject
                    </span>
                    <span className="font-bold text-neutral-900 text-sm">{parsed.subject}</span>
                  </div>

                  <div className="p-3.5 bg-white border border-neutral-200 rounded-xl">
                    <span className="text-neutral-400 font-bold uppercase tracking-wider text-[10px] block mb-1">
                      Board / Curriculum Experience
                    </span>
                    <span className="font-bold text-neutral-900 text-sm">{parsed.curriculum || 'Not specified'}</span>
                  </div>

                  <div className="p-3.5 bg-white border border-neutral-200 rounded-xl">
                    <span className="text-neutral-400 font-bold uppercase tracking-wider text-[10px] block mb-1">
                      Years of Experience
                    </span>
                    <span className="font-bold text-neutral-900 text-sm">{parsed.experience || 'Not specified'}</span>
                  </div>

                  <div className="p-3.5 bg-white border border-neutral-200 rounded-xl">
                    <span className="text-neutral-400 font-bold uppercase tracking-wider text-[10px] block mb-1">
                      Preferred Mode
                    </span>
                    <span className="font-bold text-neutral-900 text-sm">{parsed.teachingMode || 'Offline Jaipur Campus'}</span>
                  </div>
                </div>

                {/* Resume Link */}
                {parsed.resumeLink && (
                  <div className="p-4 bg-brand-blush/60 border border-brand-maroon/20 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs">
                      <FileText className="text-brand-maroon h-5 w-5 shrink-0" />
                      <div>
                        <p className="font-bold text-neutral-900">Applicant Resume / Portfolio</p>
                        <p className="text-[11px] text-neutral-500 truncate max-w-sm">{parsed.resumeLink}</p>
                      </div>
                    </div>
                    <a
                      href={parsed.resumeLink.startsWith('http') ? parsed.resumeLink : `https://${parsed.resumeLink}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-brand-maroon hover:bg-brand-crimson text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs"
                    >
                      <span>Open Link</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                )}

                {/* Bio / Background */}
                {parsed.bio && (
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
                      Bio & Statement
                    </label>
                    <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-700 leading-relaxed whitespace-pre-wrap">
                      {parsed.bio}
                    </div>
                  </div>
                )}

                {/* Status & Review Notes */}
                <div className="border-t border-neutral-200 pt-5 space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                      Application Hiring Status
                    </label>
                    <select
                      value={detailApp.status || 'new'}
                      onChange={(e) => {
                        const val = e.target.value
                        updateStatus(detailApp.id, val)
                        setDetailApp({ ...detailApp, status: val })
                      }}
                      className="text-xs font-bold px-3 py-1.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand-maroon text-neutral-800"
                    >
                      {STATUSES.map((st) => (
                        <option key={st.key} value={st.key}>
                          {st.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
                      Internal Interview & Review Notes
                    </label>
                    <textarea
                      rows={3}
                      value={internalNotes}
                      onChange={(e) => setInternalNotes(e.target.value)}
                      placeholder="Add notes from interview call, demo lecture rating, salary discussion..."
                      className="w-full p-3 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-maroon transition-all resize-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setDetailApp(null)}
                      className="px-4 py-2 text-xs font-bold text-neutral-600 hover:bg-neutral-100 rounded-xl transition-all"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      disabled={savingDetail}
                      onClick={saveDetailNotes}
                      className="px-5 py-2 bg-brand-maroon hover:bg-brand-crimson text-white text-xs font-bold rounded-xl transition-all shadow-xs disabled:opacity-50"
                    >
                      {savingDetail ? 'Saving…' : 'Save Notes'}
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
          )
        })()}

        {/* Delete Confirmation Modal */}
        {deleteTarget && (
          <Modal
            onClose={() => setDeleteTarget(null)}
            title="Confirm Deletion"
          >
            <div className="space-y-4 text-center py-2">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900">
                  {deleteTarget.type === 'single'
                    ? `Delete application from ${deleteTarget.app?.name}?`
                    : `Delete ${deleteTarget.count} selected applications?`}
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  This action cannot be undone. The application record will be permanently removed.
                </p>
              </div>

              <div className="flex items-center justify-center gap-2.5 pt-4">
                <button
                  type="button"
                  onClick={() => setDeleteTarget(null)}
                  className="px-4 py-2 text-xs font-bold text-neutral-600 hover:bg-neutral-100 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={executeDelete}
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs disabled:opacity-50"
                >
                  {isDeleting ? 'Deleting…' : 'Yes, Delete'}
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </AdminLayout>
  )
}
