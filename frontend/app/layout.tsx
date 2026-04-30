import type { Metadata } from 'next'
import { Outfit, Montserrat } from 'next/font/google'
import './globals.css'

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
  title: 'Adler Contracts | Power Built With Precision',
  description:
    'Adler Contracts — India\'s premier electrical panel specialists. Expert design, installation, and maintenance of MCC, PCC, and control panels.',
  keywords:
    'electrical panel design, MCC panel, PCC panel, industrial electrical, panel installation',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className={`min-h-full bg-white text-black antialiased overflow-x-hidden ${outfit.variable} ${montserrat.variable}`}>
        {children}
      </body>
    </html>
  )
}
