import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import PageHero from '@/components/shared/PageHero'
import Enquiry from '@/components/home/Enquiry'
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
          <div className="site-container grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
            
            <div className="space-y-8">
               <div className="bg-[var(--gray-bg)] p-5 md:p-8 border-l-4 border-[var(--primary)] rounded-[1.25rem] md:rounded-none">
                 <h3 className="font-rajdhani text-xl font-bold uppercase mb-2">Head Office – Belagavi</h3>
                 <p className="font-inter text-[var(--gray)]">Plot No 1/A RS No. 43/2A,<br/>Saraf Enclave, Azam Nagar Circle,<br/>Belagavi – 590 010, Karnataka</p>
               </div>
               
               <div className="bg-[var(--gray-bg)] p-5 md:p-8 border-l-4 border-[var(--accent)] rounded-[1.25rem] md:rounded-none">
                 <h3 className="font-rajdhani text-xl font-bold uppercase mb-2">Branch Office – Bengaluru</h3>
                 <p className="font-inter text-[var(--gray)]">Bengaluru, Karnataka</p>
               </div>

               <div className="bg-[var(--gray-bg)] p-5 md:p-8 border-l-4 border-[var(--primary)] rounded-[1.25rem] md:rounded-none">
                 <h3 className="font-rajdhani text-xl font-bold uppercase mb-2">Phone &amp; Email</h3>
                 <p className="font-inter text-[var(--gray)]"><a href="tel:+919035027395" className="hover:text-[var(--primary)] transition-colors">+91 90350 27395</a></p>
                 <p className="font-inter text-[var(--gray)]"><a href="mailto:Priya@adlercontracts.com" className="hover:text-[var(--primary)] transition-colors">Priya@adlercontracts.com</a></p>
               </div>

               <div className="bg-[var(--gray-bg)] p-5 md:p-8 border-l-4 border-[var(--primary)] rounded-[1.25rem] md:rounded-none">
                 <h3 className="font-rajdhani text-xl font-bold uppercase mb-2">Business Hours</h3>
                 <p className="font-inter text-[var(--gray)]">Monday - Saturday: 9:00 AM - 6:30 PM (IST)</p>
                 <p className="font-inter text-[var(--gray)]">Contact: Mrs. Priya Acharya</p>
               </div>
            </div>

            <div className="w-full h-[320px] md:h-[500px] border border-[var(--border)] rounded-[1.5rem] md:rounded-none relative overflow-hidden">
               <MapContainer />
            </div>

          </div>
        </section>

        <Enquiry />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
