import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'
import { HODU_SITE_ID } from '@/lib/hodu'
import { SITE_URL } from '@/lib/seo'
import { FALLBACK_BLOGS } from '@/lib/blogFallbacks'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()

  const [{ data: courses }, { data: dbBlogs }] = await Promise.all([
    supabase
      .from('cms_courses')
      .select('slug, updated_at, created_at')
      .eq('site_id', HODU_SITE_ID),
    supabase
      .from('cms_blogs')
      .select('slug, updated_at, created_at')
      .eq('site_id', HODU_SITE_ID)
      .eq('published', true),
  ])

  const currentDate = new Date()

  // Static High-Impact Core Pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/courses`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/offline`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/results`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/ptm`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/ptm-gallery`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/study-materials`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Dynamic Course Pages
  const coursePages: MetadataRoute.Sitemap = (courses ?? []).map((c: any) => ({
    url: `${SITE_URL}/courses/${c.slug}`,
    lastModified: c.updated_at ? new Date(c.updated_at) : currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }))

  // Dynamic & Fallback Blog Posts
  const blogSlugsSet = new Set<string>()
  const blogPages: MetadataRoute.Sitemap = []

  // Add DB Blogs
  for (const b of dbBlogs ?? []) {
    if (b.slug && !blogSlugsSet.has(b.slug)) {
      blogSlugsSet.add(b.slug)
      blogPages.push({
        url: `${SITE_URL}/blog/${b.slug}`,
        lastModified: b.updated_at || b.created_at ? new Date(b.updated_at || b.created_at) : currentDate,
        changeFrequency: 'monthly',
        priority: 0.8,
      })
    }
  }

  // Add Fallback Blogs if not in DB
  for (const slug of Object.keys(FALLBACK_BLOGS)) {
    if (!blogSlugsSet.has(slug)) {
      blogSlugsSet.add(slug)
      blogPages.push({
        url: `${SITE_URL}/blog/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.8,
      })
    }
  }

  return [...staticPages, ...coursePages, ...blogPages]
}
