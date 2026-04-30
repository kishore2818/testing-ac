import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'

import Hero from '@/components/home/Hero'
import Ticker from '@/components/home/Ticker'
import AboutSnapshot from '@/components/home/AboutSnapshot'
import Services from '@/components/home/Services'
import Industries from '@/components/home/Industries'
import OngoingProjects from '@/components/home/OngoingProjects'
import WhyUs from '@/components/home/WhyUs'
import Testimonials from '@/components/home/Testimonials'
import FAQ from '@/components/home/FAQ'
import Enquiry from '@/components/home/Enquiry'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <AboutSnapshot />
        <Services />
        <Industries />
        <OngoingProjects />
        <WhyUs />
        <Testimonials />
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
          <FAQ />
          <Enquiry />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
