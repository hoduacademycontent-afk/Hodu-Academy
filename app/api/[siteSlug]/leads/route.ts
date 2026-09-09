import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendEnquiryEmailNotification } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, email, class_level, target_exam, city, message, site_id } = body

    if (!name?.trim() || !phone?.trim() || !site_id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const cleanName = name.trim()
    const cleanPhone = phone.trim()
    const cleanEmail = email?.trim() || null
    const cleanClass = class_level?.trim() || null
    const cleanExam = target_exam?.trim() || null
    const cleanCity = city?.trim() || null
    const cleanMsg = message?.trim() || null

    let storedMsg = cleanMsg || ''
    if (cleanEmail && !storedMsg.includes(cleanEmail)) {
      storedMsg = storedMsg ? `[Email: ${cleanEmail}] ${storedMsg}` : `[Email: ${cleanEmail}]`
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://bgaidfuzvcrjbxmpfvym.supabase.co'
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

    try {
      const { createClient: createAdminClient } = await import('@supabase/supabase-js')
      const supabase = createAdminClient(supabaseUrl, supabaseKey)
      const { error } = await supabase.from('cms_leads').insert({
        name: cleanName,
        phone: cleanPhone,
        class_level: cleanClass,
        target_exam: cleanExam,
        city: cleanCity,
        message: storedMsg || null,
        site_id,
        status: 'new',
      })

      if (error) {
        console.error('Lead insert error:', error)
      }
    } catch (dbErr) {
      console.error('Lead DB exception:', dbErr)
    }

    // Dispatch email notification via Resend
    await sendEnquiryEmailNotification({
      name: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
      class_level: cleanClass,
      target_exam: cleanExam,
      city: cleanCity,
      message: cleanMsg,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Lead insert error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

