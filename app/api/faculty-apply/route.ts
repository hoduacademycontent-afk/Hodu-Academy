import { NextRequest, NextResponse } from 'next/server'
import { HODU_SITE_ID } from '@/lib/hodu'
import { sendFacultyApplicationEmailNotification } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      name,
      email,
      phone,
      subject,
      curriculum,
      experience,
      teaching_mode,
      qualification,
      resume_link,
      bio,
      city,
      source_page,
    } = body

    if (!name?.trim() || !phone?.trim() || phone.trim().length < 7) {
      return NextResponse.json(
        { error: 'Valid Name and Contact Number are required.' },
        { status: 400 }
      )
    }

    if (!subject?.trim()) {
      return NextResponse.json(
        { error: 'Please specify your Subject Expertise.' },
        { status: 400 }
      )
    }

    const cleanName = name.trim()
    const cleanPhone = phone.trim()
    const cleanEmail = email?.trim() || null
    const cleanSubject = subject.trim()
    const cleanCurriculum = curriculum?.trim() || null
    const cleanExp = experience?.trim() || null
    const cleanMode = teaching_mode?.trim() || 'Offline Jaipur Campus'
    const cleanQual = qualification?.trim() || null
    const cleanResume = resume_link?.trim() || null
    const cleanBio = bio?.trim() || null
    const cleanCity = city?.trim() || cleanMode
    const cleanSource = source_page?.trim() || 'offline_faculty_careers'

    // Format structured application message
    const details = [
      `[Faculty Application]`,
      cleanEmail ? `[Email: ${cleanEmail}]` : null,
      `[Subject: ${cleanSubject}]`,
      cleanCurriculum ? `[Curriculum: ${cleanCurriculum}]` : null,
      cleanExp ? `[Experience: ${cleanExp}]` : null,
      cleanMode ? `[Mode: ${cleanMode}]` : null,
      cleanQual ? `[Qualification: ${cleanQual}]` : null,
      cleanResume ? `[Resume: ${cleanResume}]` : null,
      cleanBio ? `\n\nBio & Background:\n${cleanBio}` : null,
      `\n(Source: ${cleanSource})`
    ].filter(Boolean).join(' ')

    // 1. Store in Supabase cms_leads database
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://bgaidfuzvcrjbxmpfvym.supabase.co'
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    
    let insertedApplication: any = null
    try {
      const { createClient: createAdminClient } = await import('@supabase/supabase-js')
      const supabase = createAdminClient(supabaseUrl, supabaseKey)
      const { data, error: dbError } = await supabase
        .from('cms_leads')
        .insert({
          site_id: HODU_SITE_ID,
          name: cleanName,
          phone: cleanPhone,
          class_level: cleanSubject,
          target_exam: `Faculty Application`,
          city: cleanCity,
          message: details,
          status: 'new',
        })
        .select('*')
        .single()

      if (dbError) {
        console.error('[Faculty DB Insert Error]:', dbError)
      } else {
        insertedApplication = data
      }
    } catch (dbErr) {
      console.error('[Faculty DB Exception]:', dbErr)
    }

    // 2. Dispatch instant email notification via Resend
    const emailResult = await sendFacultyApplicationEmailNotification({
      name: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
      subject: cleanSubject,
      curriculum: cleanCurriculum,
      experience: cleanExp,
      teaching_mode: cleanMode,
      qualification: cleanQual,
      resume_link: cleanResume,
      bio: cleanBio,
      source_page: cleanSource,
    })

    return NextResponse.json({
      success: true,
      application_id: insertedApplication?.id || null,
      email_sent: emailResult.success,
      message: 'Faculty application submitted and recorded successfully.',
    })
  } catch (err: any) {
    console.error('[Faculty Application Exception]:', err)
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your faculty application.' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const queryId = searchParams.get('id')
    
    let idsToDelete: string[] = []
    if (queryId) {
      idsToDelete = [queryId]
    } else {
      try {
        const body = await req.json()
        if (Array.isArray(body.ids)) {
          idsToDelete = body.ids
        } else if (body.id) {
          idsToDelete = [body.id]
        }
      } catch {
        // empty body
      }
    }

    if (!idsToDelete.length) {
      return NextResponse.json({ error: 'No application ID provided for deletion.' }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://bgaidfuzvcrjbxmpfvym.supabase.co'
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    const { createClient: createAdminClient } = await import('@supabase/supabase-js')
    const supabase = createAdminClient(supabaseUrl, supabaseKey)

    const { error } = await supabase
      .from('cms_leads')
      .delete()
      .in('id', idsToDelete)

    if (error) {
      console.error('[Delete Faculty Applications Error]:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      deleted_count: idsToDelete.length,
      message: `Successfully deleted ${idsToDelete.length} application(s).`
    })
  } catch (err: any) {
    console.error('[Delete Faculty Applications Exception]:', err)
    return NextResponse.json({ error: err.message || 'Failed to delete application(s).' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, status, notes } = body

    if (!id) {
      return NextResponse.json({ error: 'Application ID is required.' }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://bgaidfuzvcrjbxmpfvym.supabase.co'
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    const { createClient: createAdminClient } = await import('@supabase/supabase-js')
    const supabase = createAdminClient(supabaseUrl, supabaseKey)

    const updatePayload: Record<string, any> = {}
    if (status !== undefined) updatePayload.status = status
    if (notes !== undefined) updatePayload.notes = notes

    const { data, error } = await supabase
      .from('cms_leads')
      .update(updatePayload)
      .eq('id', id)
      .select('*')
      .single()

    if (error) {
      console.error('[Update Faculty Application Error]:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      application: data,
      message: 'Faculty application updated successfully.'
    })
  } catch (err: any) {
    console.error('[Update Faculty Application Exception]:', err)
    return NextResponse.json({ error: err.message || 'Failed to update application.' }, { status: 500 })
  }
}

