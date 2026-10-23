'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()
  const [openSection, setOpenSection] = useState<string | null>('quick')

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'Quality & Safety', href: '/quality-safety' },
    { label: 'Clients', href: '/clients' },
    { label: 'Contact', href: '/contact' },
  ]

  const serviceLinks = [
    { label: 'Turnkey Electrical Projects', href: '/services' },
    { label: 'HT/LT Works up to 33 kV', href: '/services' },
    { label: 'Panels, Cabling & Lighting', href: '/services' },
    { label: 'Testing, Commissioning & CEIG', href: '/services' },
  ]

  return (
    <footer className="bg-[#111827] border-t-2 border-[var(--primary)] pt-16 md:pt-20">
      
      {/* CTA Banner */}
      <div className="site-container mb-10 md:mb-16">
        <div className="bg-[var(--primary)] rounded-2xl md:rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="text-left">
            <h3 className="font-bebas text-2xl md:text-3xl tracking-wide text-white mb-1">
              Plan Your Next HT/LT Electrical Project
            </h3>
            <p className="font-inter text-white/90 text-xs sm:text-sm max-w-xl leading-relaxed">
              Consult with Adler for turnkey engineering, 33 kV substations, panel integration, and CEIG statutory approvals tailored to your site.
            </p>
          </div>
          <a
            href="https://maps.google.com/?q=Azam+Nagar+Circle+Belagavi+Karnataka"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto"
          >
            <button className="w-full md:w-auto bg-white text-[var(--primary-dark)] font-inter font-bold tracking-wider uppercase px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors text-xs shadow-md">
              Find Our Office →
            </button>
          </a>
        </div>
      </div>

      {/* Mobile Footer Accordion */}
      <div className="site-container md:hidden pb-10">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <Link href="/" className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[var(--primary)] rounded-xl flex items-center justify-center shrink-0">
              <span className="font-bebas text-xl text-white">AC</span>
            </div>
            <div>
              <div className="font-bebas text-lg text-white tracking-[0.18em]">ADLER CONTRACTS</div>
              <div className="font-inter text-[11px] text-[var(--primary)]">Class I Contractor · 33 kV</div>
            </div>
          </Link>

          <p className="font-inter text-xs text-gray-400 mb-6 leading-relaxed">
            Class I electrical contractor · HT/LT works up to 33 kV · Licence No. 1CL202315BGM · Belagavi, Karnataka
          </p>

          <div className="space-y-3">
            {/* Quick Links */}
            <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
              <button
                onClick={() => setOpenSection(openSection === 'quick' ? null : 'quick')}
                className="flex w-full items-center justify-between px-4 py-3 text-left font-inter text-xs font-bold uppercase tracking-wider text-white"
              >
                <span>Navigation Links</span>
                <span className="text-[var(--primary)]">{openSection === 'quick' ? '−' : '+'}</span>
              </button>
              {openSection === 'quick' && (
                <div className="border-t border-white/10 px-4 py-3 flex flex-col gap-2.5">
                  {quickLinks.map((link) => (
                    <Link key={link.label} href={link.href} className="font-inter text-xs text-gray-300 hover:text-[var(--primary)]">
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Services */}
            <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
              <button
                onClick={() => setOpenSection(openSection === 'services' ? null : 'services')}
                className="flex w-full items-center justify-between px-4 py-3 text-left font-inter text-xs font-bold uppercase tracking-wider text-white"
              >
                <span>Core Services</span>
                <span className="text-[var(--primary)]">{openSection === 'services' ? '−' : '+'}</span>
              </button>
              {openSection === 'services' && (
                <div className="border-t border-white/10 px-4 py-3 flex flex-col gap-2.5">
                  {serviceLinks.map((link) => (
                    <Link key={link.label} href={link.href} className="font-inter text-xs text-gray-300 hover:text-[var(--primary)]">
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Contact Box Mobile */}
          <div className="mt-5 rounded-2xl bg-white/10 border border-white/15 p-4 text-white">
            <p className="font-inter text-[11px] font-bold uppercase tracking-wider text-[var(--primary)] mb-2">Belagavi Headquarters</p>
            <p className="font-inter text-xs font-bold">Mrs. Priyadarshini B.P., <span className="font-normal text-gray-300">Proprietor</span></p>
            <p className="mt-2 font-inter text-xs text-gray-300">Mobile / WhatsApp: <a href="tel:+919035027395" className="text-white font-semibold">+91 90350 27395</a></p>
            <p className="mt-1 font-inter text-xs text-gray-300">Email: <a href="mailto:priya@adlercontracts.com" className="text-white hover:text-[var(--primary)]">priya@adlercontracts.com</a> · <a href="mailto:adlercontracts@gmail.com" className="text-white hover:text-[var(--primary)]">adlercontracts@gmail.com</a></p>
            <p className="mt-2 font-inter text-xs text-gray-300 leading-relaxed">Shop No. G-01, Saraf Enclave, Plot No. 1/A, RS No. 43/2A, Bauxite Road, Azam Nagar, Belagavi – 590010, Karnataka</p>
            <p className="mt-2 pt-2 border-t border-white/10 font-inter text-[11px] text-gray-400">GSTIN: <span className="text-white font-mono">29CIZPP4477R1ZK</span></p>
          </div>
        </div>
      </div>

      {/* Desktop Multi-Column Footer */}
      <div className="hidden md:grid site-container grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-16">
        {/* Brand */}
        <div>
          <Link href="/" className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[var(--primary)] rounded-lg flex items-center justify-center shrink-0">
              <span className="font-bebas text-xl text-white">AC</span>
            </div>
            <div>
              <div className="font-bebas text-xl text-white tracking-[0.15em] leading-none">ADLER CONTRACTS</div>
              <div className="font-inter text-[10px] text-[var(--primary)] tracking-widest uppercase mt-0.5">Class I Contractor</div>
            </div>
          </Link>
          <p className="font-inter text-xs text-gray-400 mb-4 leading-relaxed">
            Class I electrical contractor · HT/LT works up to 33 kV · Licence No. 1CL202315BGM · Belagavi, Karnataka.
          </p>
          <div className="text-[11px] font-inter text-gray-400 space-y-1">
            <p>Proprietor: <span className="text-white font-semibold">Mrs. Priyadarshini B.P.</span></p>
            <p>Licence Validity: <span className="text-white">Up to 33 kV (31/01/2031)</span></p>
            <p>GSTIN: <span className="text-white font-mono">29CIZPP4477R1ZK</span></p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-inter font-bold text-xs tracking-wider uppercase text-[var(--primary)] mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2.5">
            {quickLinks.map(link => (
              <Link key={link.label} href={link.href} className="font-inter text-xs text-gray-400 hover:text-[var(--primary)] transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Verified Services */}
        <div>
          <h4 className="font-inter font-bold text-xs tracking-wider uppercase text-[var(--primary)] mb-4">Core Scope</h4>
          <div className="flex flex-col gap-2.5">
            {serviceLinks.map(link => (
              <Link key={link.label} href={link.href} className="font-inter text-xs text-gray-400 hover:text-[var(--primary)] transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact info */}
        <div>
          <h4 className="font-inter font-bold text-xs tracking-wider uppercase text-[var(--primary)] mb-4">Belagavi Office</h4>
          <div className="flex flex-col gap-2.5 font-inter text-xs text-gray-400 leading-relaxed">
            <p><strong className="text-white">Mobile / WhatsApp:</strong> <br/><a href="tel:+919035027395" className="hover:text-[var(--primary)] transition-colors">+91 90350 27395</a></p>
            <p><strong className="text-white">Email:</strong> <br/><a href="mailto:priya@adlercontracts.com" className="hover:text-[var(--primary)] transition-colors">priya@adlercontracts.com</a><br/><a href="mailto:adlercontracts@gmail.com" className="hover:text-[var(--primary)] transition-colors">adlercontracts@gmail.com</a></p>
            <p><strong className="text-white">Address:</strong> <br/>Shop No. G-01, Saraf Enclave, Plot No. 1/A, RS No. 43/2A, Bauxite Road, Azam Nagar, Belagavi – 590010, Karnataka</p>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-gray-800">
        <div className="site-container py-5 flex flex-col md:flex-row items-center justify-between gap-3 font-inter text-xs text-gray-400 text-center md:text-left">
          <p>© {year} Adler Contracts. All rights reserved.</p>
          <p>Class I Electrical Contractor · HT/LT Works up to 33 kV · Licence No. 1CL202315BGM</p>
          <div className="flex gap-4">
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
