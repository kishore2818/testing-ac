import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import PageHero from '@/components/shared/PageHero'
import MissionVision from '@/components/about/MissionVision'
import CoreValues from '@/components/about/CoreValues'
import Framework from '@/components/about/Framework'
import Partners from '@/components/about/Partners'
import StatsCounter from '@/components/home/StatsCounter'

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero image="/images/page-headers/about.png" 
          title="WHO WE ARE" 
          subtitle="ENGINEERING EXCELLENCE IN POWER DISTRIBUTION Since 2014" 
        />
        
        <div className="py-12 md:py-24 bg-white">
          <div className="site-container max-w-5xl text-left md:text-center">
            <h2 className="font-cormorant md:font-bebas text-4xl md:text-7xl text-[var(--accent)] mb-4 md:mb-8">Powering Possibilities.</h2>
            <p className="font-inter text-base md:text-xl text-[var(--gray)] leading-relaxed">
              A Class I Electrical contractor with deep expertise in turnkey End to End Electrical solutions, Adler is committed to deliver from design to planning and installation.
            </p>
          </div>
        </div>

        <StatsCounter />
        <MissionVision />
        <CoreValues />
        <Framework />
        <Partners />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
