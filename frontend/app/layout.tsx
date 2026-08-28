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

export const metadata: Metadata = {
  metadataBase: new URL('https://adlercontracts.com'),
  title: {
    default: 'Adler Contracts | Power Built With Precision',
    template: '%s | Adler Contracts',
  },
  description:
    "Adler Contracts — India's premier electrical panel specialists. Expert design, installation, and maintenance of MCC, PCC, and control panels.",
  keywords: [
    'electrical panel design',
    'MCC panel',
    'PCC panel',
    'APFC panel',
    'industrial electrical',
    'panel installation',
    'Adler Contracts',
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/icon.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Adler Contracts | Power Built With Precision',
    description:
      "India's premier electrical panel specialists. Turnkey design, manufacturing, and installation of MCC, PCC, and control panels.",
    url: 'https://adlercontracts.com',
    siteName: 'Adler Contracts',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Adler Contracts',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adler Contracts | Power Built With Precision',
    description:
      "India's premier electrical panel specialists. Expert design and installation.",
    images: ['/logo.png'],
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
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className={`min-h-full bg-white text-black antialiased overflow-x-hidden ${inter.variable} ${outfit.variable} ${montserrat.variable}`}>
        <JsonLd />
        {children}
      </body>
    </html>
  )
}
