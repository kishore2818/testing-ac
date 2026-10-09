'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ShieldCheck, CheckCircle2, Award, FileText } from 'lucide-react'
import SectionLabel from '../shared/SectionLabel'

const licenses = [
  {
    title: 'Electrical Supervisor Permit - Grade I',
    badge: 'State Govt. Authorized',
    description: 'Statutory qualification authorizing oversight of HT/LT electrical installations, substations, and industrial power distribution networks.',
    image: '/images/licenses/electrical-license-1.png'
  },
  {
    title: 'Class I Electrical Contractor License',
    badge: 'Class I Certified',
    description: 'Official Class I contractor licensing permitting execution of high-capacity turnkey electrical engineering projects across Karnataka and India.',
    image: '/images/licenses/electrical-license-2.png'
  },
  {
    title: 'Statutory Electrical Board Approval',
    badge: 'Certified',
    description: 'Full compliance with State Electrical Inspectorate regulations, CEIG approval standards, and grid synchronization safety.',
    image: '/images/licenses/electrical-license-3.png'
  },
  {
    title: 'Certified Competency Endorsement',
    badge: 'Grade I Permit',
    description: 'Technical competency certification for lead engineering staff, ensuring all site installations meet national safety codes.',
    image: '/images/licenses/electrical-license-4.png'
  }
]

export default function LicensesSection() {
  return (
    <section className="py-12 md:py-24 bg-[var(--gray-bg)] border-b border-[var(--border)] overflow-hidden">
      <div className="site-container">
        
        {/* Section Header */}
        <div className="flex flex-col items-start md:items-center text-left md:text-center mb-8 md:mb-14">
          <SectionLabel text="Official Compliance" color="accent" />
          <h2 className="font-inter font-semibold text-[26px] sm:text-[34px] lg:text-[40px] leading-tight text-[var(--black)] mt-2">
            Statutory Licenses & <span className="text-[var(--primary)]">Certifications</span>
          </h2>
          <p className="font-inter text-[var(--gray)] text-sm md:text-base mt-3 max-w-2xl leading-relaxed">
            Adler Contracts operates with full statutory compliance under Class I Electrical Contractor licensing and Grade I Electrical Supervisor permits.
          </p>
        </div>

        {/* 4 License Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {licenses.map((lic, index) => (
            <motion.div
              key={lic.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.06)' }}
              className="bg-white rounded-xl border border-[var(--border)] overflow-hidden flex flex-col shadow-sm hover:border-[var(--primary)] transition-all duration-300"
            >
              {/* License Document Preview Header */}
              <div className="relative h-40 bg-[var(--black)] overflow-hidden p-3 flex items-center justify-center">
                <Image
                  src={lic.image}
                  alt={lic.title}
                  fill
                  className="object-cover object-center opacity-90 transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-[var(--primary)]/90 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
                  <ShieldCheck className="w-3 h-3" />
                  {lic.badge}
                </div>
              </div>

              {/* License Details */}
              <div className="p-4 sm:p-5 flex flex-col flex-grow">
                <h3 className="font-inter font-bold text-sm sm:text-base text-[var(--black)] leading-snug mb-2">
                  {lic.title}
                </h3>
                <p className="font-inter text-xs text-[var(--gray)] leading-relaxed mb-4 flex-grow">
                  {lic.description}
                </p>
                <div className="pt-3 border-t border-[var(--border)] flex items-center gap-1.5 text-[11px] font-semibold text-[var(--primary-dark)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--primary)] shrink-0" />
                  <span>Verified & Active</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Trust Banner */}
        <div className="mt-8 md:mt-12 bg-white rounded-xl border border-[var(--border)] p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--primary-soft)] text-[var(--primary)] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-inter font-bold text-sm sm:text-base text-[var(--black)]">
                Class I Certified Electrical Engineering Partner
              </h4>
              <p className="font-inter text-xs text-[var(--gray)]">
                Authorized for HT/LT electrical contracting, panel distribution, and high-voltage grid connections.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="font-inter text-xs font-bold text-[var(--black)] bg-[var(--gray-bg)] px-3 py-1.5 rounded-lg border border-[var(--border)]">
              GSTIN: 29CIZPP4477R1ZK
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}
