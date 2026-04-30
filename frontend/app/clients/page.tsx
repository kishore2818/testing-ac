'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import PageHero from '@/components/shared/PageHero'
import { clients } from '@/data/clients'

function ClientCard({ client }: { client: typeof clients[0] }) {
  return (
    <div className="aspect-square bg-white border border-[var(--border)] flex flex-col items-center justify-center p-4 md:p-8 rounded-[1.25rem] md:rounded-none hover:border-[var(--primary)] hover:shadow-xl transition-all group relative overflow-hidden">
      <img 
        src={client.logo} 
        alt={`${client.name} logo`}
        className="w-full h-full object-contain transition-all duration-500 transform group-hover:scale-110"
      />
      
      <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 p-4 backdrop-blur-sm">
        <span className="font-cormorant md:font-bebas text-xl md:text-2xl text-[var(--primary)] text-center leading-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          {client.name}
        </span>
        <span className="font-inter text-[10px] text-[var(--black-muted)] font-semibold uppercase tracking-wider text-center mt-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
          {client.industry}
        </span>
      </div>
    </div>
  )
}

export default function ClientsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero 
          image="/images/page-headers/clients.png" 
          title="OUR CLIENTS" 
          subtitle="We are incredibly proud to partner with some of India's most respected organizations." 
        />
        
        <section className="py-12 md:py-24 bg-[var(--gray-bg)]">
          <div className="site-container max-w-7xl">
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
               {clients.map((client, i) => (
                 <ClientCard key={i} client={client} />
               ))}
             </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
