'use client'

import { useState } from 'react'
import { Loader, Send, CheckCircle2 } from 'lucide-react'

export default function EnquiryForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [err, setErr] = useState('')

  function set(k: string, v: string) { setForm(f => ({ ...f, [k]: v })) }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim() || form.phone.trim().length < 10) {
      setErr('Please enter a valid name and 10-digit mobile number.')
      return
    }
    setLoading(true)
    setErr('')

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim() || null,
          message: form.message.trim() || null,
          source_page: typeof window !== 'undefined' ? window.location.pathname : '',
        }),
      })

      const data = await res.json()
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Failed to submit enquiry')
      }

      setDone(true)
    } catch (error: any) {
      console.error('Submission error:', error)
      setErr(error.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (done) return (
    <div className="text-center py-8 bg-emerald-50/60 border border-emerald-200 rounded-2xl animate-fade-in">
      <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto mb-2.5 animate-bounce" />
      <h4 className="font-extrabold text-brand-navy text-base">Enquiry Submitted Successfully!</h4>
      <p className="text-brand-navy/70 text-xs mt-1 max-w-xs mx-auto">
        Our admissions counsellor will call and email you within 2 hours.
      </p>
    </div>
  )

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-3.5">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-brand-navy block">Your Name *</label>
          <input required value={form.name} onChange={e => set('name', e.target.value)}
            placeholder="Student / Parent name"
            className="w-full bg-brand-bg/60 border border-brand-border rounded-xl px-4 py-2.5 text-xs text-brand-navy outline-none focus:border-brand-maroon focus:ring-2 focus:ring-brand-maroon/10 transition-all" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-brand-navy block">Mobile No. *</label>
          <input required value={form.phone} onChange={e => set('phone', e.target.value)}
            placeholder="+91 98765 43210" type="tel"
            className="w-full bg-brand-bg/60 border border-brand-border rounded-xl px-4 py-2.5 text-xs text-brand-navy outline-none focus:border-brand-maroon focus:ring-2 focus:ring-brand-maroon/10 transition-all" />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-brand-navy block">Email Address (Optional)</label>
        <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
          placeholder="student@example.com"
          className="w-full bg-brand-bg/60 border border-brand-border rounded-xl px-4 py-2.5 text-xs text-brand-navy outline-none focus:border-brand-maroon focus:ring-2 focus:ring-brand-maroon/10 transition-all" />
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-brand-navy block">Message / Target Course (Optional)</label>
        <textarea value={form.message} onChange={e => set('message', e.target.value)}
          placeholder="e.g. Interested in IGCSE Class 10 Physics or JEE Main batch..."
          rows={3}
          className="w-full bg-brand-bg/60 border border-brand-border rounded-xl px-4 py-2.5 text-xs text-brand-navy outline-none focus:border-brand-maroon focus:ring-2 focus:ring-brand-maroon/10 resize-none transition-all" />
      </div>
      {err && <p className="text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2 text-xs font-medium">{err}</p>}
      <button type="submit" disabled={loading}
        className="w-full bg-brand-maroon hover:bg-brand-accent text-white font-extrabold py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-md hover:shadow-lg">
        {loading ? <><Loader size={14} className="animate-spin" /> Submitting Enquiry…</> : <><Send size={13} /> Send Free Consultation Request</>}
      </button>
    </form>
  )
}

