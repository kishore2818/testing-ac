import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Projects | Adler Contracts – Electrical Panel Portfolio',
  description:
    'Explore Adler Contracts\' portfolio of completed electrical panel projects – MCC, PCC, APFC panels and bus ducts installed across industrial, commercial and infrastructure sectors in India.',
  alternates: { canonical: 'https://adlercontracts.in/projects' },
  openGraph: {
    title: 'Projects Portfolio | Adler Contracts',
    description: 'Browse Adler Contracts\' completed MCC, PCC, APFC panel projects across India.',
    url: 'https://adlercontracts.in/projects',
  },
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
