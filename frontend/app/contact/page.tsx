import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import PageHero from '@/components/shared/PageHero'
import Enquiry from '@/components/home/Enquiry'

export const metadata: Metadata = {
  title: 'Contact Us | Adler Contracts – Get a Free Quote',
  description:
    'Contact Adler Contracts in Bengaluru for electrical panel manufacturing, MCC panels, PCC panels, APFC panels and bus ducts. Get a free project quote today.',
  alternates: { canonical: 'https://adlercontracts.in/contact' },
  openGraph: {
    title: 'Contact Adler Contracts | Get a Free Quote',
    description: 'Get in touch with Bengaluru\'s leading electrical panel manufacturer. Free project consultation.',
    url: 'https://adlercontracts.in/contact',
  },
}


import MapContainer from '@/components/contact/MapContainer'

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero image="/images/page-headers/contact.png" 
          title="CONTACT US" 
          subtitle="Get in touch with our engineering experts for quotes, technical support, and partnership inquiries." 
        />
        
        <section className="bg-white py-12 md:py-24">
          <div className="site-container grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-stretch">
            
            <div className="space-y-4 md:space-y-6 flex flex-col justify-between">
               <div className="bg-[var(--gray-bg)] p-5 md:p-8 border-l-4 border-[var(--primary)] rounded-2xl shadow-sm border border-[var(--border)] border-l-[var(--primary)]">
                 <h3 className="font-rajdhani text-lg md:text-xl font-bold uppercase mb-1 md:mb-2">Head Office – Belagavi</h3>
                 <p className="font-inter text-sm md:text-base text-[var(--gray)]">Plot No 1/A RS No. 43/2A,<br/>Saraf Enclave, Azam Nagar Circle,<br/>Belagavi – 590 010, Karnataka</p>
               </div>
               
               <div className="bg-[var(--gray-bg)] p-5 md:p-8 border-l-4 border-[var(--accent)] rounded-2xl shadow-sm border border-[var(--border)] border-l-[var(--accent)]">
                 <h3 className="font-rajdhani text-lg md:text-xl font-bold uppercase mb-1 md:mb-2">Branch Office – Bengaluru</h3>
                 <p className="font-inter text-sm md:text-base text-[var(--gray)]">Bengaluru, Karnataka</p>
               </div>

               <div className="bg-[var(--gray-bg)] p-5 md:p-8 border-l-4 border-[var(--primary)] rounded-2xl shadow-sm border border-[var(--border)] border-l-[var(--primary)]">
                 <h3 className="font-rajdhani text-lg md:text-xl font-bold uppercase mb-1 md:mb-2">Phone &amp; Email</h3>
                 <p className="font-inter text-sm md:text-base text-[var(--gray)]"><a href="tel:+919035027395" className="hover:text-[var(--primary)] transition-colors">+91 90350 27395</a></p>
                 <p className="font-inter text-sm md:text-base text-[var(--gray)]"><a href="mailto:Priya@adlercontracts.com" className="hover:text-[var(--primary)] transition-colors">Priya@adlercontracts.com</a></p>
               </div>

               <div className="bg-[var(--gray-bg)] p-5 md:p-8 border-l-4 border-[var(--primary)] rounded-2xl shadow-sm border border-[var(--border)] border-l-[var(--primary)]">
                 <h3 className="font-rajdhani text-lg md:text-xl font-bold uppercase mb-1 md:mb-2">Business Hours</h3>
                 <p className="font-inter text-sm md:text-base text-[var(--gray)]">Monday - Saturday: 9:00 AM - 6:30 PM (IST)</p>
                 <p className="font-inter text-sm md:text-base text-[var(--gray)]">Contact: Mrs. Priya Acharya</p>
               </div>
            </div>

            <div className="w-full min-h-[350px] lg:min-h-[100%] h-full border border-[var(--border)] rounded-2xl shadow-sm relative overflow-hidden">
               <MapContainer />
            </div>

          </div>
        </section>

        <section className="bg-[var(--gray-bg)] py-12 md:py-20 lg:py-24 border-t border-[var(--border)]">
          <div className="site-container max-w-5xl mx-auto">
            <Enquiry />
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
