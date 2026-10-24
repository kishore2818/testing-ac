'use client'

import { motion } from 'framer-motion'
import SectionLabel from '../shared/SectionLabel'
import ScrollReveal from '../shared/ScrollReveal'
import { ShieldCheck, CheckCircle2, ExternalLink, Award, FileText, BadgeCheck } from 'lucide-react'

export default function Credentials() {
  const credentials = [
    {
      title: 'Class I Electrical Contractor Licence',
      number: '1CL202315BGM',
      scope: 'Works up to and including 33 kV · Valid till 31/01/2031',
      issuer: 'Government of Karnataka',
      verifyUrl: 'https://ksei.karnataka.gov.in',
      verifyText: 'ksei.karnataka.gov.in',
      icon: Award,
    },
    {
      title: 'Electrical Supervisor Permit – Grade I',
      number: '1SP200879BGM',
      scope: 'Continuous Grade I Licensed On-Site Supervision · Valid till 31/12/2030',
      issuer: 'Government of Karnataka',
      verifyUrl: 'https://ksei.karnataka.gov.in',
      verifyText: 'ksei.karnataka.gov.in',
      icon: BadgeCheck,
    },
    {
      title: 'Udyam (MSME) Registration',
      number: 'UDYAM-KR-04-0120128',
      scope: 'Micro Enterprise · Services · NIC 43219 (Electrical Installation)',
      issuer: 'Ministry of MSME, Govt of India',
      verifyUrl: 'https://www.msme.gov.in',
      verifyText: 'msme.gov.in',
      icon: FileText,
    },
    {
      title: 'GSTIN Registration',
      number: '29CIZPP4477R1ZK',
      scope: 'Regular Taxpayer · Karnataka Commercial Taxes',
      issuer: 'Goods and Services Tax Portal',
      verifyUrl: 'https://www.gst.gov.in',
      verifyText: 'gst.gov.in',
      icon: ShieldCheck,
    },
  ]

  return (
    <section className="bg-[var(--gray-bg)] py-12 md:py-20 border-y border-[var(--border)]">
      <div className="site-container">
        
        {/* Header */}
        <div className="text-center flex flex-col items-center mb-10 sm:mb-14 max-w-3xl mx-auto">
          <SectionLabel text="Licences & Credentials" color="accent" centered={true} />
          <h2 className="font-inter font-semibold text-[26px] sm:text-[34px] lg:text-[40px] leading-tight text-[var(--black)] mt-2 sm:mt-3">
            Licensed, Registered, <span className="text-[var(--primary)]">Verifiable</span>
          </h2>
          <p className="font-inter text-xs sm:text-sm text-[var(--gray)] mt-3 leading-relaxed">
            All Adler licences and permits are officially issued by the Government of Karnataka and relevant statutory authorities. Fully verifiable online by procurement teams and statutory bodies.
          </p>
        </div>

        {/* Credentials Grid - 2 columns on mobile with reduced card size */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-2.5 sm:gap-6 max-w-5xl mx-auto mb-8">
          {credentials.map((cred, i) => {
            const Icon = cred.icon
            return (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-white border border-[var(--border)] rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-sm hover:border-[var(--primary)] hover:shadow-md transition-all flex flex-col justify-between h-full group">
                  <div>
                    <div className="flex items-center justify-between gap-1.5 sm:gap-3 mb-2 sm:mb-3">
                      <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[var(--primary-soft)] text-[var(--primary-dark)] flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[var(--primary)]" />
                      </div>
                      <span className="font-inter text-[9px] sm:text-[11px] font-bold text-[var(--primary-dark)] bg-[var(--primary-soft)] px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-[var(--primary)]/20 truncate">
                        {cred.issuer}
                      </span>
                    </div>

                    <h3 className="font-inter font-bold text-xs sm:text-lg text-[var(--black)] mb-1 sm:mb-1.5 group-hover:text-[var(--primary)] transition-colors leading-snug sm:leading-normal line-clamp-2 sm:line-clamp-none">
                      {cred.title}
                    </h3>
                    <p className="font-inter font-bold text-[10px] sm:text-sm text-[var(--primary-dark)] tracking-wider mb-1 sm:mb-2 font-mono truncate">
                      {cred.number}
                    </p>
                    <p className="font-inter text-[10px] sm:text-xs text-[var(--gray)] leading-tight sm:leading-relaxed mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-none">
                      {cred.scope}
                    </p>
                  </div>

                  <div className="pt-2 sm:pt-3 border-t border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center justify-between text-[10px] sm:text-xs font-semibold gap-0.5 sm:gap-0">
                    <span className="text-[9px] sm:text-xs text-[var(--gray)]">Verify at:</span>
                    <a
                      href={cred.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-0.5 sm:gap-1 text-[9px] sm:text-xs text-[var(--primary-dark)] hover:text-[var(--primary)] hover:underline truncate max-w-full sm:max-w-[220px]"
                    >
                      <span className="truncate">{cred.verifyText}</span>
                      <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>

        {/* CEIG Approval Banner */}
        <div className="max-w-5xl mx-auto bg-white border border-[var(--primary)]/30 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[var(--primary)] text-white flex items-center justify-center shrink-0 shadow-sm">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="font-inter font-bold text-xs sm:text-sm text-[var(--black)]">
                CEIG / Electrical Inspectorate Approvals Secured
              </p>
              <p className="font-inter text-[11px] sm:text-xs text-[var(--gray)]">
                We have secured CEIG approvals for major high-voltage aerospace installations including <span className="font-semibold text-[var(--black)]">Thyssenkrupp Aerospace India</span> and <span className="font-semibold text-[var(--black)]">Inovit Aerospace Solutions</span>, Bengaluru.
              </p>
            </div>
          </div>
          <span className="font-inter text-xs font-bold px-3 py-1.5 bg-[var(--primary-soft)] text-[var(--primary-dark)] rounded-lg shrink-0 border border-[var(--primary)]/20">
            Statutory Compliance
          </span>
        </div>

      </div>
    </section>
  )
}
