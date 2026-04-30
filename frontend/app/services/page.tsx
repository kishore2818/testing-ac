import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import PageHero from '@/components/shared/PageHero'
import ServicesSection from '@/components/home/Services'
import EngineeringCore from '@/components/services/EngineeringCore'

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero image="/images/page-headers/services.png" 
          title="ENGINEERING SERVICES" 
          subtitle="Comprehensive electrical contracting solutions from design and planning to execution and maintenance." 
        />
        <ServicesSection showAll={true} />
        <EngineeringCore />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
