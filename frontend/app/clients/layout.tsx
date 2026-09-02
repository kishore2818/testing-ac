import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Clients | Adler Contracts – Trusted by Leading Industries',
  description:
    'Adler Contracts is trusted by leading industries across India. View our clients in manufacturing, infrastructure, power and commercial sectors who rely on our MCC, PCC and APFC panels.',
  alternates: { canonical: 'https://adlercontracts.in/clients' },
  openGraph: {
    title: 'Our Clients | Adler Contracts',
    description: 'Trusted by leading industries across India for MCC, PCC, APFC panel manufacturing.',
    url: 'https://adlercontracts.in/clients',
  },
}

export default function ClientsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
