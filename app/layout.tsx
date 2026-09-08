import type { Metadata, Viewport } from "next";
import { Playfair_Display, Open_Sans, Outfit } from "next/font/google";
import "./globals.css";
import InitialPageLoader from "@/components/hodu/InitialPageLoader";
import SmoothScroll from "@/components/hodu/SmoothScroll";
import OfflinePwaManager from "@/components/hodu/OfflinePwaManager";
import { SITE_URL, DEFAULT_GEO, GLOBAL_KEYWORDS, getEducationalOrganizationSchema, getLocalBusinessSchema } from "@/lib/seo";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["500", "600", "700", "800", "900"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  themeColor: "#7E0D0D",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hodu Academy — Premier Coaching for Cambridge IGCSE, IB, CBSE, JEE & NEET | Jaipur",
    template: "%s | Hodu Academy",
  },
  description:
    "Jaipur’s premier academic coaching institute for Cambridge IGCSE, IB Diploma (MYP & DP), CBSE Class 9–12, IIT-JEE, and NEET-UG. Intimate 1:12 batches, daily doubt desks, and top faculty.",
  keywords: GLOBAL_KEYWORDS,
  authors: [{ name: "Hodu Academy Faculty Team", url: SITE_URL }],
  creator: "Hodu Academy",
  publisher: "Hodu Academy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "/",
      "en-US": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Hodu Academy",
    title: "Hodu Academy — Premier Coaching for Cambridge IGCSE, IB, CBSE, JEE & NEET",
    description:
      "Small 1:12 interactive batches, daily doubt desks, and examiner-mentors for Cambridge IGCSE, IB DP, CBSE 9-12, IIT-JEE, and NEET in Jaipur.",
    images: [
      {
        url: "/images/jaipur_center_bg.png",
        width: 1200,
        height: 630,
        alt: "Hodu Academy Jaipur Campus & Academic Faculty",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hodu Academy — Premier Coaching for Cambridge, IB, CBSE, JEE & NEET",
    description:
      "Top faculty, 1:12 small batches, and proven rankers in Cambridge IGCSE, IB Diploma, CBSE, JEE, and NEET.",
    images: ["/images/jaipur_center_bg.png"],
    creator: "@hoduacademy",
    site: "@hoduacademy",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": DEFAULT_GEO.region,
    "geo.placename": DEFAULT_GEO.placename,
    "geo.position": DEFAULT_GEO.position,
    ICBM: DEFAULT_GEO.icbm,
    "rating": "General",
    "revisit-after": "7 days",
    "distribution": "global",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Hodu Academy",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [{ url: "/favicon.png" }],
    shortcut: ["/favicon.ico"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = getEducationalOrganizationSchema();
  const localBizSchema = getLocalBusinessSchema();

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${openSans.variable} ${outfit.variable} h-full antialiased font-sans`}
    >
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://lh3.googleusercontent.com" />
        <link rel="preconnect" href="https://bgaidfuzvcrjbxmpfvym.supabase.co" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://lh3.googleusercontent.com" />
        <link rel="dns-prefetch" href="https://drive.google.com" />
        <meta name="theme-color" content="#7E0D0D" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        {/* Global Schema.org JSON-LD Structured Data for SEO, AEO & GEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBizSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-brand-bg text-brand-text selection:bg-brand-maroon selection:text-white overflow-x-hidden max-w-full w-full">
        <SmoothScroll />
        <OfflinePwaManager />
        {children}
      </body>
    </html>
  );
}
