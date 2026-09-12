import { NextRequest, NextResponse } from 'next/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/rtf',
  'text/plain',
  'image/jpeg',
  'image/png',
]

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided.' }, { status: 400 })
    }

    const maxSize = 12 * 1024 * 1024 // 12MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'Resume file too large. Maximum allowed size is 10MB.' }, { status: 400 })
    }

    const rawExt = file.name.split('.').pop()?.toLowerCase() || 'pdf'
    const cleanFileName = `resumes/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://bgaidfuzvcrjbxmpfvym.supabase.co'
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

    if (!serviceKey) {
      return NextResponse.json({ error: 'Storage credentials not configured.' }, { status: 500 })
    }

    const supabase = createServiceClient(supabaseUrl, serviceKey)

    // Try uploading to 'cms-files' bucket first
    let bucket = 'cms-files'
    let uploadRes = await supabase.storage
      .from(bucket)
      .upload(cleanFileName, buffer, {
        contentType: file.type || 'application/pdf',
        upsert: true,
      })

    // If bucket doesn't exist, try 'cms-images' or 'resumes'
    if (uploadRes.error && uploadRes.error.message?.includes('Bucket not found')) {
      bucket = 'cms-images'
      uploadRes = await supabase.storage
        .from(bucket)
        .upload(cleanFileName, buffer, {
          contentType: file.type || 'application/pdf',
          upsert: true,
        })
    }

    if (uploadRes.error) {
      console.error('[Resume Upload Storage Error]:', uploadRes.error)
      return NextResponse.json({ error: uploadRes.error.message || 'Failed to upload resume to storage.' }, { status: 500 })
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(cleanFileName)

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: file.name,
      fileSize: file.size,
    })
  } catch (err: any) {
    console.error('[Resume Upload Exception]:', err)
    return NextResponse.json({ error: err.message || 'An unexpected error occurred during upload.' }, { status: 500 })
  }
}
