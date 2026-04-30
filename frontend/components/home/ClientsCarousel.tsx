'use client'

import { motion } from 'framer-motion'
import { clients } from '@/data/clients'

const ACCENT_COLORS = ['var(--primary)', 'var(--accent)']

export default function ClientsCarousel() {
  const ClientChip = ({ client, idx }: { client: typeof clients[0]; idx: number }) => {
    const color = ACCENT_COLORS[idx % ACCENT_COLORS.length]
    const initials = client.name
      .split(' ')
      .slice(0, 2)
      .map((word) => word[0])
      .join('')

    return (
      <div className="flex items-center gap-3 bg-white border border-[var(--border)] rounded-[1.25rem] px-5 py-4 shadow-sm hover:shadow-md transition-all cursor-pointer group">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-bebas text-white text-base shrink-0"
          style={{ backgroundColor: `var(${color === 'var(--primary)' ? '--primary' : '--accent'})` }}
        >
          {initials}
        </div>
        <div className="flex flex-col leading-tight min-w-0">
          <span className="font-poppins font-semibold text-sm text-[var(--black)] uppercase tracking-[0.08em] group-hover:text-[var(--primary)] transition-colors">
            {client.name}
          </span>
          <span className="font-inter text-[11px] text-[var(--black-muted)]">{client.industry}</span>
        </div>
      </div>
    )
  }

  return (
    <section className="bg-white py-14 md:py-24 pt-0">
      <div className="site-container border-t border-[var(--border)] pt-14 md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="mb-8 md:mb-14 text-left"
        >
          <h2 className="font-cormorant text-4xl text-[var(--accent)] tracking-wider">
            Trusted By <span className="text-[var(--primary)]">Leading Companies</span>
          </h2>
          <p className="mt-4 max-w-2xl font-inter text-sm md:text-base text-[var(--gray)]">
            Our client relationships span aerospace, manufacturing, logistics, hospitality, and institutional infrastructure across India.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
          {clients.slice(0, 9).map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.04 }}
            >
              <ClientChip client={client} idx={i} />
            </motion.div>
          ))}
        </div>

        <div className="mt-8 md:mt-12 font-poppins text-[var(--primary)] tracking-[0.18em] uppercase font-semibold text-xs md:text-sm text-left">
          200+ Companies across India trust Adler Contracts
        </div>
      </div>
    </section>
  )
}
