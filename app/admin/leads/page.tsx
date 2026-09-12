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
  Globe,
  Trash2,
  AlertTriangle,
  Send,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'

const SITE_ID = 'a1b2c3d4-1111-1111-1111-000000000002'

const STATUSES = ['new', 'contacted', 'follow-up', 'enrolled', 'lost'] as const
const statusColors: Record<string, string> = {
  new:         'bg-blue-50 text-blue-700 border-blue-200',
  contacted:   'bg-yellow-50 text-yellow-700 border-yellow-200',
  'follow-up': 'bg-purple-50 text-purple-700 border-purple-200',
  enrolled:    'bg-green-50 text-green-700 border-green-200',
  lost:        'bg-gray-100 text-gray-500 border-gray-200',
  closed:      'bg-gray-100 text-gray-500 border-gray-200',
}

function csvEscape(v: unknown) {
  const s = String(v ?? '')
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

function extractEmail(lead: any): string | null {
  if (lead.email) return lead.email
  if (lead.phone && lead.phone.includes('@')) return lead.phone
  if (lead.message) {
    const match = lead.message.match(/\[(?:Email:\s*)?([^\s\]@]+@[^\s\]@]+\.[^\s\]]+)\]/i) || lead.message.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/)
    if (match) return match[1]
  }
  return null
}

function extractCleanMessage(msg: string | null): string {
  if (!msg) return ''
  return msg.replace(/\[Email:\s*[^\]]+\]\s*/gi, '').replace(/\(Source:\s*[^)]+\)\s*/gi, '').trim()
}

function extractSource(lead: any): string {
  if (lead.source_page) return lead.source_page
  if (lead.message) {
    const match = lead.message.match(/\(Source:\s*([^)]+)\)/i)
    if (match) return match[1]
  }
  return ''
}

export default function LeadsPage() {
  const supabase = createClient()
  const [leads, setLeads]             = useState<any[]>([])
  const [loading, setLoading]         = useState(true)
  const [filter, setFilter]           = useState('all')
  const [search, setSearch]           = useState('')
  const [detail, setDetail]           = useState<any | null>(null)
  const [notes, setNotes]             = useState('')
  const [followUp, setFollowUp]       = useState('')
  const [savingDetail, setSavingDetail] = useState(false)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'single' | 'bulk'; lead?: any; count?: number } | null>(null)
  const [isDeleting, setIsDeleting]   = useState(false)

  // Notification Email Management
  const [recipientEmail, setRecipientEmail] = useState('thehoduacademy@gmail.com')
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [tempEmail, setTempEmail]           = useState('')
  const [emailStatus, setEmailStatus]       = useState<{ loading: boolean; message: string; isError: boolean } | null>(null)

  async function loadNotificationEmail() {
    try {
      const res = await fetch('/api/admin/notification-settings')
      const data = await res.json()
      if (data?.email) {
        setRecipientEmail(data.email)
        setTempEmail(data.email)
      }
    } catch {
      // fallback to current state
    }
  }

  async function load() {
    setLoading(true)
    try {
      const { data } = await supabase
        .from('cms_leads')
        .select('*')
        .or(`site_id.eq.${SITE_ID},site_id.is.null`)
        .order('created_at', { ascending: false })
      setLeads(data ?? [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    loadNotificationEmail()
  }, [])

  async function saveNotificationEmail() {
    if (!tempEmail || !tempEmail.includes('@')) {
      setEmailStatus({ loading: false, message: 'Please enter a valid email address.', isError: true })
      return
    }

    setEmailStatus({ loading: true, message: 'Saving new recipient email…', isError: false })
    try {
      const res = await fetch('/api/admin/notification-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: tempEmail.trim() })
      })
      const data = await res.json()

      if (!res.ok || data.error) {
        setEmailStatus({ loading: false, message: data.error || 'Failed to save recipient email', isError: true })
      } else {
        setRecipientEmail(tempEmail.trim())
        setEmailStatus({ loading: false, message: 'Recipient email updated successfully! All future enquiries will go here.', isError: false })
      }
    } catch (err: any) {
      setEmailStatus({ loading: false, message: err.message || 'Error updating email', isError: true })
    }
  }

  async function sendTestEmailFromLeads() {
    const target = tempEmail || recipientEmail
    setEmailStatus({ loading: true, message: `Sending verification test email to ${target}…`, isError: false })

    try {
      const res = await fetch('/api/admin/notification-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: target.trim(), action: 'test' })
      })
      const data = await res.json()

      if (!res.ok || data.error) {
        setEmailStatus({ loading: false, message: data.error || 'Failed to send test email', isError: true })
      } else {
        setEmailStatus({ loading: false, message: `Test email sent to ${target}! Check your inbox.`, isError: false })
      }
    } catch (err: any) {
      setEmailStatus({ loading: false, message: err.message || 'Error sending test email', isError: true })
    }
  }

  async function updateStatus(id: string, status: string) {
    try {
      await fetch('/api/enquiry', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      })
    } catch (err) {
      console.error('Error updating status:', err)
    }
    load()
  }

  function openDetail(lead: any) {
    setDetail(lead)
    setNotes(lead.notes ?? '')
    setFollowUp(lead.follow_up_date ?? '')
  }

  async function saveDetail() {
    if (!detail) return
    setSavingDetail(true)
    try {
      await fetch('/api/enquiry', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: detail.id,
          notes,
          follow_up_date: followUp || null,
        })
      })
    } catch (err) {
      console.error('Error saving detail:', err)
    } finally {
      setSavingDetail(false)
      setDetail(null)
      load()
    }
  }

  // Deletion functions
  async function performDelete() {
    if (!deleteTarget) return
    setIsDeleting(true)

    try {
      if (deleteTarget.type === 'single' && deleteTarget.lead) {
        const id = deleteTarget.lead.id
        await fetch(`/api/enquiry?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
        await supabase.from('cms_leads').delete().eq('id', id)
        
        setSelectedIds(prev => prev.filter(i => i !== id))
        if (detail?.id === id) setDetail(null)
      } else if (deleteTarget.type === 'bulk' && selectedIds.length > 0) {
        await fetch('/api/enquiry', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: selectedIds })
        })
        await supabase.from('cms_leads').delete().in('id', selectedIds)
        
        setSelectedIds([])
      }
    } catch (err) {
      console.error('Delete error:', err)
    } finally {
      setIsDeleting(false)
      setDeleteTarget(null)
      load()
    }
  }

  const counts = useMemo(() => leads.reduce((acc, l) => {
    acc[l.status] = (acc[l.status] ?? 0) + 1
    return acc
  }, {} as Record<string, number>), [leads])

  const visible = useMemo(() => {
    let list = filter === 'all' ? leads : leads.filter(l => l.status === filter)
    const q = search.trim().toLowerCase()
    if (q) {
      list = list.filter(l =>
        (l.name ?? '').toLowerCase().includes(q) ||
        (l.phone ?? '').toLowerCase().includes(q) ||
        (l.city ?? '').toLowerCase().includes(q) ||
        (l.target_exam ?? '').toLowerCase().includes(q) ||
        (l.message ?? '').toLowerCase().includes(q))
    }
    return list
  }, [leads, filter, search])

  const allVisibleSelected = visible.length > 0 && visible.every(l => selectedIds.includes(l.id))

  function toggleSelectAll() {
    if (allVisibleSelected) {
      const visibleIdSet = new Set(visible.map(l => l.id))
      setSelectedIds(prev => prev.filter(id => !visibleIdSet.has(id)))
    } else {
      const combined = Array.from(new Set([...selectedIds, ...visible.map(l => l.id)]))
      setSelectedIds(combined)
    }
  }

  function toggleSelectLead(id: string) {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  function exportCsv() {
    const headers = ['Name', 'Phone', 'Email', 'Target Exam', 'Class', 'City', 'Source Page', 'Status', 'Follow-up Date', 'Notes', 'Message', 'Created At']
    const rows = visible.map(l => [
      l.name,
      l.phone,
      extractEmail(l) ?? '',
      l.target_exam,
      l.class_level,
      l.city,
      extractSource(l),
      l.status,
      l.follow_up_date,
      l.notes,
      extractCleanMessage(l.message),
      l.created_at,
    ].map(csvEscape).join(','))
    const csv = [headers.join(','), ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `hodu-leads-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const today = new Date().toISOString().slice(0, 10)
  const conversionRate = leads.length > 0
    ? Math.round(((counts['enrolled'] ?? 0) / leads.length) * 100)
    : 0

  return (
    <AdminLayout>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-lg font-bold text-[#1B2A44]">Leads Pipeline</h2>
          <p className="text-xs text-[#64748b]">{leads.length} total enquiries · {conversionRate}% enrolled conversion</p>
        </div>
        
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              setTempEmail(recipientEmail)
              setEmailStatus(null)
              setShowEmailModal(true)
            }}
            className="flex items-center gap-1.5 border border-[#F3DCDC] hover:border-[#7E0D0D] text-[#1B2A44] text-xs font-semibold px-3.5 py-2 rounded-xl transition-colors bg-white shadow-xs"
            title="Change Lead Notification Recipient Email"
          >
            <Mail size={14} className="text-[#7E0D0D]" />
            <span className="hidden md:inline text-[#64748b]">Alerts:</span>
            <span className="font-mono text-xs text-[#7E0D0D] font-bold truncate max-w-[170px]">{recipientEmail}</span>
          </button>

          {selectedIds.length > 0 && (
            <button
              onClick={() => setDeleteTarget({ type: 'bulk', count: selectedIds.length })}
              className="flex items-center gap-1.5 bg-red-50 text-red-700 border border-red-200 hover:bg-red-600 hover:text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors shadow-xs"
            >
              <Trash2 size={14} /> Delete Selected ({selectedIds.length})
            </button>
          )}

          <button onClick={exportCsv} className="flex items-center gap-2 border border-[#F3DCDC] hover:border-[#7E0D0D] hover:text-[#7E0D0D] text-[#1B2A44] text-sm font-semibold px-4 py-2 rounded-xl transition-colors bg-white shadow-xs">
            <Download size={15} /> Export CSV
          </button>
        </div>
      </div>

      {/* Pipeline summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-5">
        {STATUSES.map(s => (
          <button key={s} onClick={() => setFilter(filter === s ? 'all' : s)}
            className={`text-left border rounded-2xl p-3.5 transition-all ${filter === s ? 'border-[#7E0D0D] shadow-sm bg-white ring-2 ring-[#7E0D0D]/10' : 'border-[#F3DCDC] bg-white hover:border-[#7E0D0D]/40'}`}>
            <p className="text-xl font-black text-[#1B2A44]">{counts[s] ?? 0}</p>
            <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${statusColors[s]}`}>{s}</span>
          </button>
        ))}
      </div>

      {/* Search + selection toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="flex items-center gap-2 flex-1 min-w-[220px] border border-[#F3DCDC] rounded-xl px-3 py-2 bg-white focus-within:border-[#7E0D0D]">
          <Search size={14} className="text-[#64748b] shrink-0" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search student name, phone, email, exam, city..."
            className="flex-1 text-sm focus:outline-none text-[#1B2A44] placeholder:text-[#94a3b8]"
          />
        </div>
        {filter !== 'all' && (
          <button onClick={() => setFilter('all')} className="text-xs text-[#7E0D0D] font-semibold hover:underline">
            Clear filter ({filter})
          </button>
        )}
      </div>

      {loading ? (
        <AdminTableSkeleton rows={8} columns={8} />
      ) : (
        <div className="bg-white border border-[#F3DCDC] rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#F3DCDC] bg-[#FDF5F5]">
                  <th className="w-10 px-3 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={allVisibleSelected}
                      onChange={toggleSelectAll}
                      title="Select all visible leads"
                      className="w-4 h-4 rounded text-[#7E0D0D] focus:ring-[#7E0D0D] border-gray-300 cursor-pointer"
                    />
                  </th>
                  {['Student / Contact', 'Email Address', 'Exam / Curriculum', 'City & Source', 'Status', 'Follow-up', 'Date', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#64748b] uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visible.map((l) => {
                  const overdue = l.status === 'follow-up' && l.follow_up_date && l.follow_up_date < today
                  const email = extractEmail(l)
                  const source = extractSource(l)
                  const rawPhone = (l.phone ?? '').replace(/[^\d+]/g, '')
                  const whatsappPhone = rawPhone.startsWith('+') ? rawPhone.replace('+', '') : `91${rawPhone.replace(/^0+/, '')}`
                  const isSelected = selectedIds.includes(l.id)

                  return (
                    <tr key={l.id} className={`border-b border-[#F3DCDC] last:border-0 transition-colors ${isSelected ? 'bg-red-50/40' : 'hover:bg-[#FDF5F5]/60'}`}>
                      {/* Checkbox */}
                      <td className="w-10 px-3 py-3 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectLead(l.id)}
                          className="w-4 h-4 rounded text-[#7E0D0D] focus:ring-[#7E0D0D] border-gray-300 cursor-pointer"
                        />
                      </td>

                      {/* Name & Phone */}
                      <td className="px-4 py-3">
                        <div>
                          <button
                            onClick={() => openDetail(l)}
                            className="font-bold text-[#1B2A44] hover:text-[#7E0D0D] transition-colors text-left"
                          >
                            {l.name}
                          </button>
                          <div className="flex items-center gap-1 text-xs text-[#64748b] mt-0.5">
                            <span className="font-mono">{l.phone ?? '—'}</span>
                            {l.phone && (
                              <>
                                <a href={`tel:${l.phone}`} title="Call Student" className="text-[#7E0D0D] hover:scale-110 transition-transform"><Phone size={11} /></a>
                                <a href={`https://wa.me/${whatsappPhone}`} target="_blank" rel="noreferrer" title="Chat on WhatsApp" className="text-green-600 hover:scale-110 transition-transform"><MessageCircle size={11} /></a>
                              </>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-4 py-3 text-xs">
                        {email ? (
                          <a href={`mailto:${email}`} className="text-sky-700 hover:text-sky-900 font-medium inline-flex items-center gap-1">
                            <Mail size={11} className="shrink-0" /> {email}
                          </a>
                        ) : (
                          <span className="text-[#94a3b8] italic">—</span>
                        )}
                      </td>

                      {/* Target Exam & Class */}
                      <td className="px-4 py-3 text-xs">
                        {l.target_exam?.toLowerCase().includes('faculty') ? (
                          <div className="flex flex-col items-start gap-0.5">
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.5 rounded">
                              👨‍🏫 Faculty Application
                            </span>
                            <span className="font-semibold text-[#1B2A44]">{l.class_level || 'Educator'}</span>
                          </div>
                        ) : (
                          <>
                            <p className="font-semibold text-[#1B2A44]">{l.target_exam ?? '—'}</p>
                            {l.class_level && <p className="text-[11px] text-[#64748b]">{l.class_level}</p>}
                          </>
                        )}
                      </td>

                      {/* City & Source */}
                      <td className="px-4 py-3 text-xs">
                        <p className="text-[#1B2A44]">{l.city ?? 'Jaipur'}</p>
                        {source && (
                          <span className="inline-block mt-0.5 px-1.5 py-0.5 rounded text-[10px] bg-neutral-100 text-neutral-600 border border-neutral-200 max-w-[140px] truncate" title={source}>
                            {source}
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold capitalize border ${statusColors[l.status] ?? 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                          {l.status}
                        </span>
                      </td>

                      {/* Follow-up */}
                      <td className="px-4 py-3">
                        {l.follow_up_date ? (
                          <span className={`text-xs font-semibold ${overdue ? 'text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200' : 'text-[#1B2A44]'}`}>
                            {new Date(l.follow_up_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                            {overdue && ' ⚠'}
                          </span>
                        ) : <span className="text-xs text-[#94a3b8]">—</span>}
                      </td>

                      {/* Date */}
                      <td className="px-4 py-3 text-xs text-[#64748b]">
                        {new Date(l.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' })}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <select
                            value={l.status}
                            onChange={(e) => updateStatus(l.id, e.target.value)}
                            className="text-xs border border-[#F3DCDC] rounded-lg px-2 py-1 focus:outline-none focus:border-[#7E0D0D] text-[#1B2A44] capitalize bg-white"
                          >
                            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                            {!STATUSES.includes(l.status) && <option value={l.status}>{l.status}</option>}
                          </select>
                          <button onClick={() => openDetail(l)} className="text-xs px-2.5 py-1 border border-[#F3DCDC] rounded-lg text-[#1B2A44] hover:bg-[#7E0D0D] hover:text-white transition-colors">
                            Open
                          </button>
                          <button
                            onClick={() => setDeleteTarget({ type: 'single', lead: l })}
                            title="Delete Lead"
                            className="p-1 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
            {visible.length === 0 && <p className="text-center text-[#94a3b8] py-12 text-sm">No leads match the current filter.</p>}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <Modal
          title={deleteTarget.type === 'bulk' ? `Delete ${deleteTarget.count} Leads` : 'Delete Enquiry'}
          onClose={() => !isDeleting && setDeleteTarget(null)}
        >
          <div className="space-y-4">
            <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
              <AlertTriangle className="text-red-600 shrink-0 mt-0.5" size={20} />
              <div>
                <p className="text-sm font-bold text-red-900">
                  {deleteTarget.type === 'bulk'
                    ? `Are you sure you want to permanently delete these ${deleteTarget.count} selected lead(s)?`
                    : `Are you sure you want to permanently delete the enquiry from "${deleteTarget.lead?.name}"?`}
                </p>
                <p className="text-xs text-red-700 mt-1">
                  This action cannot be undone. The enquiry will be removed from your database.
                </p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="flex-1 border border-[#F3DCDC] text-[#1B2A44] py-2.5 rounded-xl text-sm font-semibold hover:bg-neutral-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={performDelete}
                disabled={isDeleting}
                className="flex-1 bg-red-600 text-white py-2.5 rounded-xl text-sm font-bold shadow-xs hover:bg-red-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                <Trash2 size={15} />
                {isDeleting ? 'Deleting…' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Lead detail modal */}
      {detail && (
        <Modal title={`Enquiry: ${detail.name}`} onClose={() => setDetail(null)}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm bg-neutral-50/70 p-4 rounded-xl border border-neutral-200">
              <div>
                <p className="text-[11px] font-bold uppercase text-[#64748b]">Contact Phone</p>
                <p className="font-semibold text-[#1B2A44] mt-0.5">{detail.phone}</p>
                {detail.phone && !detail.phone.includes('@') && (
                  <div className="flex gap-2 mt-1">
                    <a href={`tel:${detail.phone}`} className="text-xs text-[#7E0D0D] font-bold hover:underline flex items-center gap-1">
                      <Phone size={11} /> Call
                    </a>
                    <a href={`https://wa.me/${(detail.phone ?? '').replace(/[^\d+]/g, '').replace('+', '')}`} target="_blank" rel="noreferrer" className="text-xs text-green-600 font-bold hover:underline flex items-center gap-1">
                      <MessageCircle size={11} /> WhatsApp
                    </a>
                  </div>
                )}
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase text-[#64748b]">Email Address</p>
                {extractEmail(detail) ? (
                  <a href={`mailto:${extractEmail(detail)}`} className="font-semibold text-sky-700 hover:underline mt-0.5 block break-all">
                    {extractEmail(detail)}
                  </a>
                ) : (
                  <p className="text-xs text-[#94a3b8] mt-0.5 italic">Not provided</p>
                )}
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase text-[#64748b]">Target Course / Exam</p>
                <p className="font-semibold text-[#1B2A44] mt-0.5">{detail.target_exam ?? 'General Academic'}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase text-[#64748b]">Class / Standard</p>
                <p className="font-semibold text-[#1B2A44] mt-0.5">{detail.class_level ?? '—'}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase text-[#64748b]">City</p>
                <p className="font-semibold text-[#1B2A44] mt-0.5">{detail.city ?? 'Jaipur'}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase text-[#64748b]">Submitted Page</p>
                <p className="font-semibold text-[#1B2A44] mt-0.5 text-xs">{extractSource(detail) || 'Website Form'}</p>
              </div>
            </div>

            {detail.message && (
              <div className="bg-[#FDF5F5] border border-[#F3DCDC] rounded-xl p-3.5">
                <p className="text-xs font-bold uppercase text-[#7E0D0D] mb-1">Student Message / Learning Needs</p>
                <p className="text-sm text-[#1B2A44] leading-relaxed whitespace-pre-wrap">{extractCleanMessage(detail.message)}</p>
              </div>
            )}

            <div>
              <label className="flex items-center gap-1.5 text-xs font-bold text-[#1B2A44] mb-1">
                <CalendarClock size={13} className="text-[#7E0D0D]" /> Follow-up Date Reminder
              </label>
              <input
                type="date"
                value={followUp}
                onChange={e => setFollowUp(e.target.value)}
                className="w-full border border-[#F3DCDC] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#7E0D0D] text-[#1B2A44]"
              />
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-xs font-bold text-[#1B2A44] mb-1">
                <NotebookPen size={13} className="text-[#7E0D0D]" /> Counsellor Notes
              </label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={3}
                placeholder="Add notes: Call summary, parents discussion, batch preference, fee discussed..."
                className="w-full border border-[#F3DCDC] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#7E0D0D] resize-none"
              />
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={() => {
                  const toDelete = detail
                  setDetail(null)
                  setDeleteTarget({ type: 'single', lead: toDelete })
                }}
                className="flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-2.5 rounded-xl border border-red-200 transition-colors"
              >
                <Trash2 size={14} /> Delete Enquiry
              </button>

              <div className="flex items-center gap-2">
                <button onClick={() => setDetail(null)} className="border border-[#F3DCDC] text-[#1B2A44] px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-neutral-50 transition-colors">
                  Cancel
                </button>
                <button onClick={saveDetail} disabled={savingDetail} className="bg-[#7E0D0D] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-xs hover:bg-[#600a0a] transition-colors disabled:opacity-60">
                  {savingDetail ? 'Saving…' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Email Notification Settings Modal */}
      {showEmailModal && (
        <Modal title="Lead Notification Settings" onClose={() => setShowEmailModal(false)}>
          <div className="space-y-4">
            <div className="bg-[#FDF5F5] border border-[#F3DCDC] rounded-xl p-4">
              <p className="text-xs text-[#1B2A44] leading-relaxed">
                All admission enquiry forms, consultation requests, and callback forms will dispatch instant HTML lead alerts to this email address via <strong>Resend</strong>.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1B2A44] mb-1">
                Recipient Email Address
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={tempEmail}
                  onChange={(e) => setTempEmail(e.target.value)}
                  placeholder="e.g. thehoduacademy@gmail.com"
                  className="flex-1 border border-[#F3DCDC] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#7E0D0D] text-[#1B2A44] font-medium"
                />
                <button
                  type="button"
                  onClick={sendTestEmailFromLeads}
                  disabled={emailStatus?.loading}
                  className="flex items-center gap-1.5 bg-[#FDF5F5] hover:bg-[#7E0D0D] hover:text-white text-[#7E0D0D] border border-[#F3DCDC] text-xs font-bold px-3.5 py-2.5 rounded-xl transition-colors disabled:opacity-50 shrink-0"
                >
                  <Send size={13} /> {emailStatus?.loading ? 'Sending…' : 'Send Test'}
                </button>
              </div>
              <p className="text-[11px] text-[#94a3b8] mt-1.5">
                Current Active: <span className="font-semibold text-[#7E0D0D]">{recipientEmail}</span>
              </p>
            </div>

            {emailStatus && (
              <div className={`flex items-start gap-2 p-3 rounded-xl text-xs border ${emailStatus.isError ? 'bg-red-50 text-red-700 border-red-200' : 'bg-green-50 text-green-800 border-green-200'}`}>
                {emailStatus.isError ? <AlertCircle size={15} className="shrink-0 mt-0.5 text-red-600" /> : <CheckCircle2 size={15} className="shrink-0 mt-0.5 text-green-600" />}
                <p>{emailStatus.message}</p>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowEmailModal(false)}
                className="flex-1 border border-[#F3DCDC] text-[#1B2A44] py-2.5 rounded-xl text-sm font-semibold hover:bg-neutral-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={saveNotificationEmail}
                disabled={emailStatus?.loading}
                className="flex-1 bg-[#7E0D0D] text-white py-2.5 rounded-xl text-sm font-bold shadow-xs hover:bg-[#600a0a] transition-colors disabled:opacity-60"
              >
                {emailStatus?.loading ? 'Saving…' : 'Save Recipient Email'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </AdminLayout>
  )
}

