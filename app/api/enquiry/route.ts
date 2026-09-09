import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { HODU_SITE_ID } from '@/lib/hodu'
import { sendEnquiryEmailNotification } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      name,
      phone,
      email,
      class_level,
      target_exam,
      city,
      message,
      source_page,
    } = body

    if (!name?.trim() || !phone?.trim() || phone.trim().length < 7) {
      return NextResponse.json(
        { error: 'Valid Name and Contact Number are required.' },
        { status: 400 }
      )
    }

    const cleanName = name.trim()
    const cleanPhone = phone.trim()
    const cleanEmail = email?.trim() || null
    const cleanClass = class_level?.trim() || null
    const cleanExam = target_exam?.trim() || null
    const cleanCity = city?.trim() || null
    const cleanMsg = message?.trim() || null
    const cleanSource = source_page?.trim() || null

    // Compose formatted message containing email & context if applicable
    let storedMessage = cleanMsg || ''
    if (cleanEmail && !storedMessage.includes(cleanEmail)) {
      storedMessage = storedMessage ? `[Email: ${cleanEmail}] ${storedMessage}` : `[Email: ${cleanEmail}]`
    }
    if (cleanSource) {
      storedMessage = storedMessage ? `${storedMessage} (Source: ${cleanSource})` : `(Source: ${cleanSource})`
    }

    // 1. Store in Supabase cms_leads database
    const supabase = await createClient()
    const { data: insertedLead, error: dbError } = await supabase
      .from('cms_leads')
      .insert({
        site_id: HODU_SITE_ID,
        name: cleanName,
        phone: cleanPhone,
        class_level: cleanClass,
        target_exam: cleanExam,
        city: cleanCity,
        message: storedMessage || null,
        status: 'new',
      })
      .select('id')
      .single()

    if (dbError) {
      console.error('[Database Insert Error]:', dbError)
    }

    // 2. Dispatch instant email notification via Resend
    const emailResult = await sendEnquiryEmailNotification({
      name: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
      class_level: cleanClass,
      target_exam: cleanExam,
      city: cleanCity,
      message: cleanMsg,
      source_page: cleanSource,
    })

    return NextResponse.json({
      success: true,
      lead_id: insertedLead?.id || null,
      email_sent: emailResult.success,
      message: 'Enquiry submitted and recorded successfully.',
    })
  } catch (err: any) {
    console.error('[Enquiry Handler Exception]:', err)
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your enquiry.' },
      { status: 500 }
    )
  }
}

