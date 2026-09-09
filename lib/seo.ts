import { HODU } from '@/lib/hodu'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://hoduacademy.com'

export const DEFAULT_GEO = {
  region: 'IN-RJ',
  placename: 'Jaipur, Rajasthan, India',
  position: '26.8929;75.7433',
  icbm: '26.8929, 75.7433',
  latitude: 26.8929,
  longitude: 75.7433,
  addressLocality: 'Jaipur',
  addressRegion: 'Rajasthan',
  postalCode: '302021',
  streetAddress: 'C-28, Vaishali Estate, Gandhi Path West',
  country: 'IN',
}

export const GLOBAL_KEYWORDS = [
  'Cambridge IGCSE Coaching Jaipur',
  'Cambridge A Levels Coaching Jaipur',
  'IB Diploma Coaching Jaipur',
  'IB MYP Coaching',
  'CBSE Class 9 10 11 12 Coaching Jaipur',
  'IIT JEE Coaching Jaipur',
  'NEET UG Coaching Jaipur',
  'Junior Olympiad Coaching IMO NSO',
  'Best Coaching Institute in Vaishali Nagar Jaipur',
  'Top International Board Coaching in Jaipur',
  'Offline Coaching Centre Jaipur Gandhi Path',
  'Science and Maths Coaching Jaipur',
  'Hodu Academy Jaipur reviews and results',
  'Hodu Academy admission fees and batch size',
  'Best small batch 1:12 coaching in Jaipur',
  'Daily doubt desk coaching institute Jaipur',
]

/**
 * 1. Global EducationalOrganization Schema
 */
export function getEducationalOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Hodu Academy',
    alternateName: ['Hodu Academy Jaipur', 'Hodu International Coaching'],
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.png`,
    image: `${SITE_URL}/images/jaipur_center_bg.png`,
    description:
      'Jaipur’s premier coaching institute for Cambridge IGCSE, AS & A-Levels, IB Diploma (MYP & DP), CBSE Classes 9–12, IIT-JEE, and NEET-UG with 1:12 intimate batches and daily 1-on-1 doubt desks.',
    telephone: HODU.phone,
    email: HODU.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: DEFAULT_GEO.streetAddress,
      addressLocality: DEFAULT_GEO.addressLocality,
      addressRegion: DEFAULT_GEO.addressRegion,
      postalCode: DEFAULT_GEO.postalCode,
      addressCountry: DEFAULT_GEO.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: DEFAULT_GEO.latitude,
      longitude: DEFAULT_GEO.longitude,
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Jaipur',
      },
      {
        '@type': 'Country',
        name: 'India',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Global Online',
      },
    ],
    sameAs: [
      HODU.socials.youtube,
      HODU.socials.instagram,
      HODU.socials.facebook,
      HODU.socials.linkedin,
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '185',
      bestRating: '5',
      worstRating: '1',
    },
    founder: {
      '@type': 'Person',
      name: 'Abhishek Agarwal',
      jobTitle: 'Founder & Senior Academic Director',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '08:00',
        closes: '21:00',
      },
    ],
  }
}

/**
 * 2. Local Business / Educational Center Schema for Physical Campus
 */
export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/offline#campus`,
    name: 'Hodu Academy — Jaipur Physical Learning Campus',
    image: `${SITE_URL}/images/jaipur_center_bg.png`,
    telephone: HODU.phone,
    email: HODU.email,
    url: `${SITE_URL}/offline`,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: DEFAULT_GEO.streetAddress,
      addressLocality: DEFAULT_GEO.addressLocality,
      addressRegion: DEFAULT_GEO.addressRegion,
      postalCode: DEFAULT_GEO.postalCode,
      addressCountry: DEFAULT_GEO.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: DEFAULT_GEO.latitude,
      longitude: DEFAULT_GEO.longitude,
    },
    hasMap: 'https://maps.google.com/?q=Vaishali+Estate+Gandhi+Path+West+Jaipur',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '08:00',
        closes: '21:00',
      },
    ],
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Acoustic Smart Classrooms',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: '1-on-1 Faculty Doubt Desk',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Silent Study Library',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'GPS AC Doorstep Transport',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Computer-Based Testing (CBT) Lab',
        value: true,
      },
    ],
  }
}

/**
 * 3. WebSite Schema with SearchAction
 */
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'Hodu Academy',
    description:
      'Premier Coaching Institute for Cambridge IGCSE, IB DP, CBSE Class 9-12, IIT-JEE, and NEET.',
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/courses?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

/**
 * 4. Course Schema
 */
export function getCourseSchema(course: {
  title: string
  description?: string
  slug: string
  category?: string
  fee?: number | string
  class_level?: string
  image_url?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description:
      course.description ||
      `Comprehensive coaching program for ${course.title} at Hodu Academy with 1:12 batches and daily doubt resolution.`,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Hodu Academy',
      sameAs: SITE_URL,
    },
    url: `${SITE_URL}/courses/${course.slug}`,
    image: course.image_url || `${SITE_URL}/favicon.png`,
    educationalLevel: course.class_level || course.category || 'High School / Competitive',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: ['Offline', 'Online', 'Blended'],
      courseWorkload: 'PT600H',
      location: {
        '@type': 'Place',
        name: 'Hodu Academy Campus Jaipur',
        address: {
          '@type': 'PostalAddress',
          addressLocality: DEFAULT_GEO.addressLocality,
          addressRegion: DEFAULT_GEO.addressRegion,
          addressCountry: DEFAULT_GEO.country,
        },
      },
    },
    offers: {
      '@type': 'Offer',
      category: 'Academic Coaching Course',
      price: course.fee ? String(course.fee) : '0',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      validFrom: '2026-01-01',
      url: `${SITE_URL}/courses/${course.slug}`,
    },
  }
}

/**
 * 5. BlogPosting / Article Schema
 */
export function getBlogPostingSchema(post: {
  title: string
  slug: string
  date?: string
  created_at?: string
  updated_at?: string
  author?: string
  cover_image?: string
  excerpt?: string
  category?: string
}) {
  const publishedDate = post.created_at || post.date || new Date().toISOString()
  const modifiedDate = post.updated_at || post.created_at || post.date || new Date().toISOString()

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
    headline: post.title,
    description: post.excerpt || post.title,
    image: post.cover_image ? [post.cover_image] : [`${SITE_URL}/favicon.png`],
    datePublished: publishedDate,
    dateModified: modifiedDate,
    author: {
      '@type': 'Person',
      name: post.author || 'Abhishek Agarwal',
      jobTitle: 'Senior Academic Director & Mentor',
      worksFor: {
        '@type': 'EducationalOrganization',
        name: 'Hodu Academy',
      },
    },
    publisher: {
      '@type': 'EducationalOrganization',
      name: 'Hodu Academy',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.png`,
      },
    },
    articleSection: post.category || 'Academic Updates',
    keywords: [
      post.category || 'Education',
      'Hodu Academy Blog',
      'Exam Preparation',
      'Syllabus & Pattern Updates',
      'Jaipur Coaching',
    ],
  }
}

/**
 * 6. FAQPage Schema for Direct Answer Engine (AEO) Citations
 */
export function getFAQPageSchema(faqs: Array<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }
}

/**
 * Helper to strip HTML tags and decode common HTML entities for clean SEO meta descriptions
 */
export function cleanHtmlText(html: string = ''): string {
  if (!html) return ''
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * 8. Custom Concept / Formula / PYQ Page TechArticle & LearningResource Schema
 */
export function getCustomPageArticleSchema(page: {
  title: string
  slug: string
  category?: string
  content?: string
  excerpt?: string
  created_at?: string
  updated_at?: string
}) {
  const publishedDate = page.created_at || '2026-01-01T00:00:00Z'
  const modifiedDate = page.updated_at || page.created_at || new Date().toISOString()
  const cleanDesc = cleanHtmlText(page.excerpt || page.content || page.title).slice(0, 250)

  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/p/${page.slug}`,
    },
    headline: page.title,
    description: cleanDesc,
    image: [`${SITE_URL}/favicon.png`],
    datePublished: publishedDate,
    dateModified: modifiedDate,
    author: {
      '@type': 'EducationalOrganization',
      name: 'Hodu Academy Academic Faculty Team',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'EducationalOrganization',
      name: 'Hodu Academy',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.png`,
      },
    },
    about: {
      '@type': 'Thing',
      name: page.category || 'Science, Mathematics & Competitive Exam Prep',
    },
    educationalLevel: page.category || 'High School & Competitive (JEE, NEET, CBSE, IGCSE, IB)',
    inLanguage: 'en-IN',
  }
}

/**
 * 9. Generic WebPage Schema with Breadcrumbs
 */
export function getWebPageSchema(page: {
  title: string
  description: string
  url: string
  breadcrumb?: Array<{ name: string; url: string }>
}) {
  const canonical = page.url.startsWith('http') ? page.url : `${SITE_URL}${page.url}`
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': canonical,
    url: canonical,
    name: page.title,
    description: cleanHtmlText(page.description),
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    inLanguage: 'en-IN',
  }
}

/**
 * 11. BreadcrumbList Schema
 */
export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  }
}

/**
 * 12. Extract Q&A patterns from HTML content for automatic FAQPage schema generation
 */
export function extractFaqsFromHtml(html: string = ''): Array<{ q: string; a: string }> {
  if (!html) return []
  const faqs: Array<{ q: string; a: string }> = []
  
  // Match <h3> or <h4> or <b> with Question/Q/FAQ followed by answer paragraph
  const qnaRegex = /(?:<h[3-5][^>]*>(?:Q(?:\d+)?[:.\-]\s*|FAQ[:.\-]\s*|)([\s\S]*?)<\/h[3-5]>|<b[^>]*>(?:Q(?:\d+)?[:.\-]\s*|)([\s\S]*?)<\/b>)\s*<p[^>]*>([\s\S]*?)<\/p>/gi
  let match
  while ((match = qnaRegex.exec(html)) !== null && faqs.length < 10) {
    const rawQ = cleanHtmlText(match[1] || match[2] || '')
    const rawA = cleanHtmlText(match[3] || '')
    if (rawQ.length >= 8 && rawQ.length <= 160 && rawA.length >= 15 && (rawQ.includes('?') || rawQ.toLowerCase().includes('what') || rawQ.toLowerCase().includes('how') || rawQ.toLowerCase().includes('why') || rawQ.toLowerCase().includes('define') || rawQ.toLowerCase().includes('difference'))) {
      faqs.push({ q: rawQ, a: rawA })
    }
  }

  return faqs
}


