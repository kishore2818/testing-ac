import type { Metadata } from 'next'
import { Outfit, Montserrat, Bebas_Neue, Rajdhani } from 'next/font/google'
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

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const rajdhani = Rajdhani({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-rajdhani',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Adler Contracts | Admin Dashboard',
  description: 'Manage projects and reviews for Adler Contracts.',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className={`min-h-full bg-white text-black antialiased overflow-x-hidden ${outfit.variable} ${montserrat.variable} ${bebasNeue.variable} ${rajdhani.variable}`}>
        {children}
      </body>
    </html>
  )
}
