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
  // High-Intent Proximity & Discovery Keywords (SEO / AEO / Local)
  'coaching near me',
  'best education institute near me',
  'best coaching institute near me',
  'top coaching classes near me',
  'education institute near me',
  'coaching centre near me',
  'best tuition classes near me',
  'iit jee coaching near me',
  'neet coaching near me',
  'cbse coaching near me',
  'cbse class 10 coaching near me',
  'cbse class 12 coaching near me',
  'igcse coaching near me',
  'ib diploma coaching near me',
  'maths and science coaching near me',
  'physics chemistry maths coaching near me',
  'offline coaching center near me',
  '1 on 1 doubt clearing coaching near me',
  
  // Specific Geographic & Curriculum Keywords
  'Cambridge IGCSE Coaching Jaipur',
  'Cambridge A Levels Coaching Jaipur',
  'IB Diploma Coaching Jaipur',
  'IB MYP Coaching Jaipur',
  'CBSE Class 9 10 11 12 Coaching Jaipur',
  'IIT JEE Coaching Jaipur',
  'NEET UG Coaching Jaipur',
  'Junior Olympiad Coaching IMO NSO Jaipur',
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
 * 1. Global EducationalOrganization Schema (SEO + GEO + AEO Entity)
 */
export function getEducationalOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Hodu Academy',
    alternateName: ['Hodu Academy Jaipur', 'Hodu International Coaching', 'Hodu Academy — Your Global Classroom'],
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.png`,
    image: `${SITE_URL}/images/jaipur_center_bg.png`,
    description:
      'Jaipur’s premier coaching institute for Cambridge IGCSE, AS & A-Levels, IB Diploma (MYP & DP), CBSE Classes 9–12, IIT-JEE, and NEET-UG with 1:12 intimate batches and daily 1-on-1 doubt desks.',
    telephone: HODU.phone,
    email: HODU.email,
    knowsAbout: [
      'Coaching near me for CBSE, JEE, NEET, IGCSE & IB',
      'Best education institute in Jaipur & Vaishali Nagar',
      'Cambridge IGCSE Curriculum & Past Papers',
      'Cambridge AS & A Level Coaching',
      'International Baccalaureate (IB DP & MYP)',
      'CBSE Class 9, 10, 11, 12 Board Examinations',
      'IIT-JEE (Main & Advanced) Preparation',
      'NEET-UG Medical Entrance Coaching',
      'Mathematics & Science Olympiads (IMO, NSO)',
      'NCERT Solutions, Problem Solving & Formulas',
      '1:12 Intimate Batch Mentorship',
      'Daily 1-on-1 Faculty Doubt Desks',
    ],
    keywords: GLOBAL_KEYWORDS.join(', '),
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
        name: 'Global Online (UAE, Singapore, UK, US, Canada)',
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
      description: 'Expert Educator with 15+ years mentoring IIT-JEE, NEET, Cambridge, and IB students.',
    },
    paymentAccepted: 'Cash, Credit Card, Debit Card, UPI, Net Banking',
    currenciesAccepted: 'INR, USD, EUR, GBP, AED',
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
    alternateName: ['Best Coaching Institute Near Me', 'Hodu Academy Vaishali Nagar Jaipur', 'Top Education Institute Near Me'],
    description: 'Premier coaching institute & tuition centre near you in Jaipur (Gandhi Path / Vaishali Nagar) for Cambridge IGCSE/A-Levels, IB, CBSE 9-12, IIT-JEE, and NEET-UG with 1:12 small batches.',
    image: `${SITE_URL}/images/jaipur_center_bg.png`,
    telephone: HODU.phone,
    email: HODU.email,
    url: `${SITE_URL}/offline`,
    priceRange: '$$',
    keywords: GLOBAL_KEYWORDS.join(', '),
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
  const cleanDesc = generateConceptMetaDescription(page.title, page.category, page.content, page.excerpt)
  const cleanTitle = cleanHtmlText(page.title)

  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/p/${page.slug}`,
    },
    headline: page.title,
    description: cleanDesc,
    image: [`${SITE_URL}/favicon.png`, `${SITE_URL}/images/jaipur_center_bg.png`],
    datePublished: publishedDate,
    dateModified: modifiedDate,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.aeo-quick-answer', 'h1', 'h2', 'h3'],
    },
    author: {
      '@type': 'EducationalOrganization',
      name: 'Hodu Academy Academic Faculty Team',
      url: SITE_URL,
      address: {
        '@type': 'PostalAddress',
        addressLocality: DEFAULT_GEO.addressLocality,
        addressRegion: DEFAULT_GEO.addressRegion,
        addressCountry: DEFAULT_GEO.country,
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
    about: {
      '@type': 'Thing',
      name: cleanTitle,
      description: `${cleanTitle} complete academic notes, formulas, derivations and exam solutions.`,
    },
    educationalLevel: page.category || 'High School & Competitive (JEE, NEET, CBSE, IGCSE, IB)',
    educationalUse: ['Revision Notes', 'Formula Sheet', 'NCERT Solutions', 'Exam Practice'],
    learningResourceType: 'Study Guide',
    inLanguage: 'en-IN',
    keywords: generateConceptKeywords(page.title, page.category).join(', '),
  }
}

/**
 * Generates dynamic, high-ranking SEO / AEO / GEO Titles for concept pages
 */
export function generateConceptMetaTitle(title: string, category?: string | null): string {
  const clean = cleanHtmlText(title).trim()
  const cat = (category || '').trim()

  if (cat.toLowerCase().includes('jee')) {
    return `${clean} — JEE Main & Advanced Notes, Formulas & PYQs | Hodu Academy`
  }
  if (cat.toLowerCase().includes('neet')) {
    return `${clean} — NEET UG Concepts, Formulas & Question Bank | Hodu Academy`
  }
  if (cat.toLowerCase().includes('cbse 10') || cat.toLowerCase().includes('class 10')) {
    return `${clean} Class 10 CBSE — Notes, NCERT Solutions & PYQs | Hodu Academy`
  }
  if (cat.toLowerCase().includes('cbse 12') || cat.toLowerCase().includes('class 12')) {
    return `${clean} Class 12 CBSE — Complete Notes, Derivations & Formulas | Hodu Academy`
  }
  if (cat.toLowerCase().includes('formula')) {
    return `${clean} Formula Sheet & Quick Derivation Notes | Hodu Academy`
  }
  if (cat.toLowerCase().includes('ncert')) {
    return `${clean} NCERT Solutions, Step-by-Step Explanations | Hodu Academy`
  }
  if (cat.toLowerCase().includes('olympiad')) {
    return `${clean} Olympiad (IMO/NSO) Notes & Advanced Problems | Hodu Academy`
  }
  if (cat.toLowerCase().includes('cuet')) {
    return `${clean} CUET UG Chapter Notes & High-Yield MCQs | Hodu Academy`
  }
  if (cat.toLowerCase().includes('international') || cat.toLowerCase().includes('igcse') || cat.toLowerCase().includes('ib')) {
    return `${clean} — Cambridge IGCSE & IB DP Study Guide | Hodu Academy`
  }

  return `${clean} — Notes, Formulas, Solved Examples & PYQs | Hodu Academy`
}

/**
 * Generates high-CTR AEO & SEO meta descriptions
 */
export function generateConceptMetaDescription(
  title: string,
  category?: string | null,
  content?: string | null,
  excerpt?: string | null
): string {
  const cleanTitle = cleanHtmlText(title).trim()
  const cat = (category || 'Academic Concepts').trim()

  const snippet = cleanHtmlText(excerpt || content || '')
    .replace(/\s+/g, ' ')
    .trim()

  if (snippet.length >= 70 && !snippet.toLowerCase().startsWith('select one:')) {
    // If rich snippet available, format into 155-160 chars
    const firstSentence = snippet.split(/(?<=[.?!])\s+/)[0] || snippet
    if (firstSentence.length >= 60 && firstSentence.length <= 145) {
      return `${firstSentence} Learn ${cleanTitle} with expert notes, formulas, and 1-on-1 doubt solving at Hodu Academy.`
    }
  }

  return `Master ${cleanTitle} (${cat}) with concise notes, essential formulas, step-by-step solved examples, and past exam questions curated by expert mentors at Hodu Academy.`
}

/**
 * Generates 25+ High-Intent Keywords for search engine dominance
 */
export function generateConceptKeywords(title: string, category?: string | null): string[] {
  const cleanTitle = cleanHtmlText(title).trim()
  const cat = (category || 'Academic Concepts').trim()

  const list = [
    cleanTitle,
    `${cleanTitle} notes`,
    `${cleanTitle} formulas`,
    `${cleanTitle} formula sheet`,
    `${cleanTitle} definition`,
    `${cleanTitle} solved questions`,
    `${cleanTitle} past year questions`,
    `${cleanTitle} PYQs`,
    `${cleanTitle} derivations`,
    `${cleanTitle} NCERT solutions`,
    `${cleanTitle} class 10 12`,
    `${cleanTitle} JEE Main`,
    `${cleanTitle} NEET UG`,
    `${cleanTitle} CUET exam`,
    `${cleanTitle} Cambridge IGCSE`,
    `${cleanTitle} IB DP`,
    cat,
    `${cat} preparation`,
    `${cat} study materials`,
    'coaching near me',
    'best education institute near me',
    'best coaching institute near me',
    'top tuition classes near me',
    'maths science coaching near me',
    '1 on 1 doubt clearing coaching',
    'Hodu Academy study hub',
    'Hodu Academy Jaipur',
  ]

  return Array.from(new Set(list))
}

/**
 * Extracts 3-4 structured key takeaways for AEO AI Overview cards
 */
export function extractKeyTakeaways(html: string = '', title: string = ''): string[] {
  if (!html) return [`Comprehensive conceptual breakdown of ${title}.`, 'Standard exam definitions and key derivations.', 'Curated practice questions and step-by-step solutions.', 'Personalized 1-on-1 faculty guidance available at Hodu Academy.']
  
  const takeaways: string[] = []
  
  // Look for bold points or list items
  const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi
  let match
  while ((match = liRegex.exec(html)) !== null && takeaways.length < 4) {
    const text = cleanHtmlText(match[1])
    if (text.length >= 20 && text.length <= 150 && !text.includes('Copyright') && !text.includes('http')) {
      takeaways.push(text)
    }
  }

  if (takeaways.length < 3) {
    takeaways.push(
      `In-depth conceptual revision and fundamental principles of ${title}.`,
      'High-yield formula sheet, essential laws, and exam definitions.',
      'Step-by-step problem-solving methods and common exam pitfalls.',
      '1:12 small-batch classroom coaching and daily doubt resolution at Hodu Academy.'
    )
  }

  return takeaways.slice(0, 4)
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



