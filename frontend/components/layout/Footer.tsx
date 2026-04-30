'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()
  const [openSection, setOpenSection] = useState<string | null>('quick')

  const mobileSections = [
    {
      key: 'quick',
      title: 'Quick Links',
      links: [
        { label: 'Home', href: '/' },
        { label: 'About Us', href: '/about' },
        { label: 'Projects', href: '/projects' },
        { label: 'Clients', href: '/clients' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      key: 'services',
      title: 'Services',
      links: [
        { label: 'Electrical Panel Design', href: '/services' },
        { label: 'Panel Installation', href: '/services' },
        { label: 'AMC Services', href: '/services' },
        { label: 'Turnkey Projects', href: '/services' },
      ],
    },
  ]

  return (
    <footer className="bg-[#111827] border-t-2 border-[var(--primary)] pt-16 md:pt-20">
      <div className="site-container mb-10 md:mb-16">
        <div className="bg-[var(--primary)] rounded-[1.5rem] p-5 md:rounded-sm md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="text-left">
            <h3 className="font-cormorant md:font-bebas text-3xl md:text-3xl tracking-wide text-white mb-1">Plan Your Next Electrical Project</h3>
            <p className="font-inter text-white/85 text-sm md:text-sm max-w-xl">Talk to Adler for design, manufacturing, commissioning, and maintenance support tailored to your site.</p>
          </div>
          <Link href="/contact" className="w-full md:w-auto">
            <button className="w-full md:w-auto bg-white text-[var(--primary)] font-poppins font-semibold tracking-[0.18em] uppercase px-6 py-3 rounded-2xl md:rounded-sm hover:bg-gray-100 transition-colors text-sm">
              Find Us
            </button>
          </Link>
        </div>
      </div>

      <div className="site-container md:hidden pb-10">
        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
          <Link href="/" className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-[var(--primary)] rounded-xl flex items-center justify-center shrink-0">
              <span className="font-bebas text-xl text-white">AC</span>
            </div>
            <div>
              <div className="font-poppins text-sm text-white font-semibold tracking-[0.18em] uppercase">Adler Contracts</div>
              <div className="font-inter text-xs text-gray-400">Power built with precision</div>
            </div>
          </Link>

          <div className="space-y-3">
            {mobileSections.map((section) => {
              const isOpen = openSection === section.key
              return (
                <div key={section.key} className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
                  <button
                    onClick={() => setOpenSection(isOpen ? null : section.key)}
                    className="flex w-full items-center justify-between px-4 py-3 text-left"
                  >
                    <span className="font-poppins text-sm font-semibold uppercase tracking-[0.16em] text-white">{section.title}</span>
                    <span className="text-white/70">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="border-t border-white/10 px-4 py-3 flex flex-col gap-2">
                      {section.links.map((link) => (
                        <Link key={link.label} href={link.href} className="font-inter text-sm text-gray-300">
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="mt-5 rounded-2xl bg-white px-4 py-4 text-[var(--black)]">
            <p className="font-poppins text-xs uppercase tracking-[0.22em] text-[var(--primary)]">Contact</p>
            <p className="mt-3 font-inter text-sm">+91 90350 27395</p>
            <p className="mt-1 font-inter text-sm">Priya@adlercontracts.com</p>
            <p className="mt-3 font-inter text-sm leading-relaxed">Plot No 1/A RS No. 43/2A, Saraf Enclave, Azam Nagar Circle, Belagavi – 590 010</p>
          </div>
        </div>
      </div>

      <div className="hidden md:grid site-container grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 pb-16">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Link href="/" className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[var(--primary)] rounded-sm flex items-center justify-center shrink-0">
              <span className="font-bebas text-xl text-white">AC</span>
            </div>
            <div>
              <div className="font-bebas text-lg text-white tracking-[0.15em] leading-none">ADLER CONTRACTS</div>
            </div>
          </Link>
          <p className="font-inter text-sm text-[var(--gray-light)] mb-6 leading-relaxed">
            Engineering precision electrical solutions for industrial, commercial, and residential clients across India.
          </p>
          <div className="flex gap-3">
            <Link href="/" className="w-8 h-8 flex items-center justify-center border border-gray-700 text-[var(--gray-light)] rounded hover:border-[var(--primary)] hover:text-[#0077b5] transition-colors" aria-label="LinkedIn">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zm15.11 13.02h-3.56v-5.61c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.15 1.46-2.15 2.96v5.71h-3.56V9h3.42v1.56h.05c.48-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z"/></svg>
            </Link>
            <Link href="/" className="w-8 h-8 flex items-center justify-center border border-gray-700 text-[var(--gray-light)] rounded hover:border-[var(--primary)] hover:text-[#E1306C] transition-colors" aria-label="Instagram">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.36.88.4.4.67.8.88 1.36.17.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.88 1.36-.4.4-.8.67-1.36.88-.43.17-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.36-.88-.4-.4-.67-.8-.88-1.36-.17-.43-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.88-1.36.4-.4.8-.67 1.36-.88.43-.17 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.77.13 4.9.31 4.14.61 3.35.91 2.68 1.35 2.01 2.01 1.35 2.68.91 3.35.61 4.14.31 4.9.13 5.77.07 7.05.01 8.33 0 12c0 3.67.01 4.08.07 5.36.06 1.27.24 2.15.54 2.91.3.79.74 1.46 1.4 2.12.66.66 1.33 1.1 2.12 1.4.76.3 1.64.48 2.91.54 1.27.06 1.68.07 5.36.07 3.67 0 4.08-.01 5.36-.07 1.27-.06 2.15-.24 2.91-.54.79-.3 1.46-.74 2.12-1.4.66-.66 1.1-1.33 1.4-2.12.3-.76.48-1.64.54-2.91.06-1.27.07-1.68.07-5.36 0-3.67-.01-4.08-.07-5.36-.06-1.27-.24-2.15-.54-2.91-.3-.79-.74-1.46-1.4-2.12-.66-.66-1.33-1.1-2.12-1.4-.76-.3-1.64-.48-2.91-.54C15.68.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1018.16 12 6.16 6.16 0 0012 5.84zm0 10.16A4 4 0 1116 12a4 4 0 01-4 4zm6.41-8.59a1.44 1.44 0 10-2.88 0 1.44 1.44 0 002.88 0z"/></svg>
            </Link>
            <Link href="/" className="w-8 h-8 flex items-center justify-center border border-gray-700 text-[var(--gray-light)] rounded hover:border-[var(--primary)] hover:text-[#1877F2] transition-colors" aria-label="Facebook">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"/></svg>
            </Link>
            <Link href="/" className="w-8 h-8 flex items-center justify-center border border-gray-700 text-[var(--gray-light)] rounded hover:border-[var(--primary)] hover:text-[#25D366] transition-colors" aria-label="WhatsApp">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 32 32"><path d="M16 2.1C8.36 2.1 2.13 8.36 2.13 16.06c0 2.45.64 4.84 1.86 6.95L1.93 30.22l7.35-1.93a13.88 13.88 0 006.75 1.76h.01C23.67 30.05 29.9 23.8 29.9 16.07 29.9 12.3 28.45 8.7 25.86 6.17 23.23 3.55 19.74 2.1 16 2.1zm0 2.34c3.21 0 6.23 1.25 8.5 3.53 2.27 2.28 3.52 5.31 3.52 8.54 0 6.39-5.18 11.59-11.53 11.59-2.03 0-4.02-.53-5.75-1.54l-.41-.25-4.27 1.12 1.14-4.18-.27-.43A11.52 11.52 0 014.47 16.1c0-6.39 5.18-11.59 11.54-11.59h.06zm-6.29 4.79c-.24 0-.62.09-.94.45s-1.23 1.21-1.23 2.94c0 1.74 1.26 3.42 1.44 3.66.18.24 2.46 3.9 6.07 5.25.86.32 1.53.51 2.05.66.86.27 1.65.23 2.26.14.7-.1 2.13-.87 2.43-1.72.3-.84.3-1.56.21-1.71-.09-.15-.33-.24-.68-.42s-2.13-1.05-2.46-1.17c-.33-.12-.56-.18-.8.18-.24.36-.93 1.17-1.14 1.41-.21.24-.42.27-.77.09a8.67 8.67 0 01-2.58-1.6 9.54 9.54 0 01-1.79-2.23c-.21-.36-.02-.55.16-.73.16-.16.36-.42.53-.62.18-.21.24-.36.36-.59.12-.24.06-.45-.03-.62-.09-.18-.8-1.93-1.1-2.65-.29-.7-.58-.6-.8-.61-.21-.01-.45-.01-.68-.01z"/></svg>
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-rajdhani font-bold text-xs tracking-[0.2em] uppercase text-[var(--primary)] mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {[{ label: 'Home', href: '/' }, { label: 'About Us', href: '/about' }, { label: 'Projects', href: '/projects' }, { label: 'Clients', href: '/clients' }, { label: 'Contact', href: '/contact' }].map(link => (
              <Link key={link.label} href={link.href} className="font-inter text-sm text-[var(--gray-light)] hover:text-[var(--primary)] transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
           <h4 className="font-rajdhani font-bold text-xs tracking-[0.2em] uppercase text-[var(--primary)] mb-4">Services</h4>
           <div className="flex flex-col gap-2">
            {['Electrical Panel Design', 'Panel Installation', 'AMC Services', 'Turnkey Projects', 'Consultancy'].map(link => (
              <Link key={link} href="/services" className="font-inter text-sm text-[var(--gray-light)] hover:text-[var(--primary)] transition-colors">
                {link}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact info */}
        <div>
           <h4 className="font-rajdhani font-bold text-xs tracking-[0.2em] uppercase text-[var(--primary)] mb-4">Contact</h4>
           <div className="flex flex-col gap-3 font-inter text-sm text-[var(--gray-light)]">
             <p><strong className="text-white">Phone:</strong> <br/>+91 90350 27395</p>
             <p><strong className="text-white">Email:</strong> <br/>Priya@adlercontracts.com</p>
             <p><strong className="text-white">Address:</strong> <br/>Plot No 1/A RS No. 43/2A, Saraf Enclave, Azam Nagar Circle, Belagavi – 590 010</p>
           </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="site-container py-6 flex flex-col md:flex-row items-center justify-between gap-3 font-inter text-xs text-gray-500 text-center md:text-left">
          <p>© {year} Adler Contracts. All rights reserved.</p>
          <p>Built for industrial and commercial power infrastructure.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
