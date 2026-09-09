'use client'

import { useEffect, useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import AdminLayout from '@/components/admin/AdminLayout'
import Modal from '@/components/admin/Modal'
import { Phone, MessageCircle, Mail, Download, Search, NotebookPen, CalendarClock, ExternalLink, Globe } from 'lucide-react'

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
  const [leads, setLeads]     = useState<any[]>([])
  const [filter, setFilter]   = useState('all')
  const [search, setSearch]   = useState('')
  const [detail, setDetail]   = useState<any | null>(null)
  const [notes, setNotes]     = useState('')
  const [followUp, setFollowUp] = useState('')
  const [savingDetail, setSavingDetail] = useState(false)

  async function load() {
    const { data } = await supabase
      .from('cms_leads')
      .select('*')
      .or(`site_id.eq.${SITE_ID},site_id.is.null`)
      .order('created_at', { ascending: false })
    setLeads(data ?? [])
  }
  useEffect(() => { load() }, [])

  async function updateStatus(id: string, status: string) {
    await supabase.from('cms_leads').update({ status }).eq('id', id)
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
    await supabase.from('cms_leads').update({
      notes,
      follow_up_date: followUp || null,
    }).eq('id', detail.id)
    setSavingDetail(false)
    setDetail(null)
    load()
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
        <button onClick={exportCsv} className="flex items-center gap-2 border border-[#F3DCDC] hover:border-[#7E0D0D] hover:text-[#7E0D0D] text-[#1B2A44] text-sm font-semibold px-4 py-2 rounded-xl transition-colors bg-white shadow-xs">
          <Download size={15} /> Export CSV
        </button>
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

      {/* Search + reset filter */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="flex items-center gap-2 flex-1 min-w-[220px] border border-[#F3DCDC] rounded-xl px-3 py-2 bg-white focus-within:border-[#7E0D0D]">
          <Search size={14} className="#64748b shrink-0" />
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

      <div className="bg-white border border-[#F3DCDC] rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#F3DCDC] bg-[#FDF5F5]">
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

                return (
                  <tr key={l.id} className="border-b border-[#F3DCDC] last:border-0 hover:bg-[#FDF5F5]/60 transition-colors">
                    {/* Name & Phone */}
                    <td className="px-4 py-3">
                      <div>
                        <button onClick={() => openDetail(l)} className="font-bold text-[#1B2A44] hover:text-[#7E0D0D] text-left">
                          {l.name}
                          {l.notes && <NotebookPen size={11} className="inline ml-1.5 text-amber-600" />}
                        </button>
                        <div className="flex items-center gap-2 mt-0.5 text-xs text-[#64748b]">
                          <span>{l.phone}</span>
                          {l.phone && !l.phone.includes('@') && (
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
                      <p className="font-semibold text-[#1B2A44]">{l.target_exam ?? '—'}</p>
                      {l.class_level && <p className="text-[11px] text-[#64748b]">{l.class_level}</p>}
                    </td>

                    {/* City & Source */}
                    <td className="px-4 py-3 text-xs">
                      <p className="text-[#1B2A44]">{l.city ?? 'Jaipur'}</p>
                      {source && (
                        <span className="inline-block mt-0.5 px-1.5 py-0.5 rounded text-[10px] bg-neutral-100 text-neutral-600 border border-neutral-200">
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
                      <div className="flex items-center gap-2">
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

            <div className="flex gap-3 pt-1">
              <button onClick={() => setDetail(null)} className="flex-1 border border-[#F3DCDC] text-[#1B2A44] py-2.5 rounded-xl text-sm font-semibold hover:bg-neutral-50 transition-colors">
                Cancel
              </button>
              <button onClick={saveDetail} disabled={savingDetail} className="flex-1 bg-[#7E0D0D] text-white py-2.5 rounded-xl text-sm font-bold shadow-xs hover:bg-[#600a0a] transition-colors disabled:opacity-60">
                {savingDetail ? 'Saving…' : 'Save Notes & Follow-up'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </AdminLayout>
  )
}

