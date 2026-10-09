import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import PageHero from '@/components/shared/PageHero'
import MissionVision from '@/components/about/MissionVision'
import CoreValues from '@/components/about/CoreValues'
import WorkingTeam from '@/components/about/WorkingTeam'
import Framework from '@/components/about/Framework'
import Partners from '@/components/about/Partners'
import StatsCounter from '@/components/home/StatsCounter'

export const metadata: Metadata = {
  title: 'About Us | Adler Contracts – Class I Electrical Contractor',
  description:
    'Learn about Adler Contracts – Class I Electrical Contractor. Our mission, values, engineering team, quality framework and turnkey electrical solutions.',
  alternates: { canonical: 'https://adlercontracts.in/about' },
  openGraph: {
    title: 'About Adler Contracts | Class I Electrical Contractor',
    description: 'Trusted Class I electrical contractor delivering turnkey industrial & commercial infrastructure.',
    url: 'https://adlercontracts.in/about',
  },
}


export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero image="/images/page-headers/about.png" 
          title="WHO WE ARE" 
          subtitle="ENGINEERING EXCELLENCE IN POWER DISTRIBUTION | CLASS I CONTRACTOR" 
        />
        
        <div className="py-12 md:py-24 bg-white">
          <div className="site-container max-w-5xl text-left md:text-center">
            <h2 className="font-cormorant md:font-bebas text-4xl md:text-7xl text-[var(--accent)] mb-4 md:mb-8">Powering Possibilities.</h2>
            <p className="font-inter text-base md:text-xl text-[var(--gray)] leading-relaxed">
              A Class I Electrical contractor with deep expertise in turnkey End to End Electrical solutions, Adler is committed to deliver from design to planning, panel manufacturing, installation, testing and commissioning.
            </p>
          </div>
        </div>

        <StatsCounter />
        <MissionVision />
        <CoreValues />
        <WorkingTeam />
        <Framework />
        <Partners />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
