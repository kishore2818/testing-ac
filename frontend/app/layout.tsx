import type { Metadata } from 'next'
import { Inter, Outfit, Montserrat } from 'next/font/google'
import './globals.css'
import JsonLd from '@/components/shared/JsonLd'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '600', '700'],
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const SITE_URL = 'https://adlercontracts.in'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'Adler Contracts | Electrical Panel Specialists in Bengaluru',
    template: '%s | Adler Contracts',
  },
  description:
    'Adler Contracts – India\'s trusted electrical panel manufacturer in Bengaluru. Expert design, manufacturing & installation of MCC panels, PCC panels, APFC panels, control desks & bus ducts. Call now!',

  keywords: [
    'Adler Contracts',
    'adler contracts',
    'adlercontracts.in',
    'electrical panel manufacturer Bengaluru',
    'MCC panel manufacturer India',
    'PCC panel manufacturer',
    'APFC panel',
    'control panel manufacturer Bangalore',
    'industrial electrical panels',
    'bus duct manufacturer',
    'switchgear manufacturer Bangalore',
    'electrical contractor Bengaluru',
    'panel board manufacturer India',
    'motor control centre',
    'power control centre',
  ],

  authors: [{ name: 'Adler Contracts', url: SITE_URL }],
  creator: 'Adler Contracts',
  publisher: 'Adler Contracts',

  alternates: {
    canonical: SITE_URL,
  },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/icon.png',
    apple: '/apple-icon.png',
  },

  openGraph: {
    title: 'Adler Contracts | Electrical Panel Specialists in Bengaluru',
    description:
      'India\'s trusted electrical panel manufacturer. Turnkey design, manufacturing & installation of MCC, PCC, APFC panels & bus ducts. Based in Bengaluru.',
    url: SITE_URL,
    siteName: 'Adler Contracts',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Adler Contracts – Electrical Panel Specialists',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Adler Contracts | Electrical Panel Specialists in Bengaluru',
    description:
      'India\'s trusted electrical panel manufacturer. MCC, PCC, APFC panels & bus ducts. Bengaluru.',
    images: [`${SITE_URL}/og-image.png`],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  verification: {
    google: 'UlZpIxpvEmXTU-ieYqeyg6hICwcgRgh6Usrp_Yt5aUU',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* Canonical domain reinforcement */}
        <link rel="canonical" href={SITE_URL} />
        {/* Favicon & Logo icons for Google Search & browsers */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* Geo tags for local SEO (Bengaluru, India) */}
        <meta name="geo.region" content="IN-KA" />
        <meta name="geo.placename" content="Bengaluru" />
        <meta name="geo.position" content="12.9716;77.5946" />
        <meta name="ICBM" content="12.9716, 77.5946" />
      </head>
      <body className={`min-h-full bg-white text-black antialiased overflow-x-hidden ${inter.variable} ${outfit.variable} ${montserrat.variable}`}>
        <JsonLd />
        {children}
      </body>
    </html>
  )
}
