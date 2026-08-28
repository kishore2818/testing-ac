import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import PageHero from '@/components/shared/PageHero'
import { services } from '@/data/services'
import Link from 'next/link'
import * as LucideIcons from 'lucide-react'
import { CheckCircle2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params

  const service = services.find(
    (s) => s.slug === resolvedParams.slug
  )

  if (!service) {
    notFound()
  }

  const IconComponent =
    (LucideIcons[
      service.icon as keyof typeof LucideIcons
    ] as LucideIcon) || LucideIcons.Zap

  return (
    <>
      <Navbar />

      <main>
        <PageHero
          image="/images/page-headers/services.png"
          title={service.title}
          subtitle="Detailed breakdown of our engineering capabilities."
        />

        <section className="py-12 md:py-24 bg-white">
          <div className="site-container grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">

            <div className="lg:col-span-2">

              <div className="text-[var(--primary)] mb-6 bg-[var(--primary-soft)] w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-xl border border-[var(--primary)]/20">
                <IconComponent
                  size={36}
                  strokeWidth={1.75}
                />
              </div>

              <h2 className="font-inter font-bold text-2xl md:text-3xl mb-3 text-[var(--black)]">
                Engineering Scope & Overview
              </h2>

              <p className="font-inter text-sm md:text-base text-[var(--black-soft)] leading-relaxed mb-8">
                {service.description}
              </p>

              <h3 className="font-inter text-lg font-bold uppercase tracking-wider mb-4 text-[var(--primary-dark)]">
                Key Technical Capabilities
              </h3>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {service.subServices.map((sub, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 font-inter text-[var(--black-soft)] bg-[var(--gray-bg)] p-3.5 rounded-lg border border-[var(--border)]"
                  >
                    <CheckCircle2
                      size={18}
                      className="text-[var(--primary)] shrink-0"
                    />

                    <span className="text-xs sm:text-sm font-semibold">
                      {sub}
                    </span>
                  </li>
                ))}
              </ul>

              <h3 className="font-inter text-lg font-bold uppercase tracking-wider mb-4 text-[var(--primary-dark)]">
                Target Industrial Sectors
              </h3>

              <div className="flex flex-wrap gap-2.5">
                {service.industries.map((ind, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 border border-[var(--border)] rounded-lg font-inter text-xs font-bold text-[var(--black)] bg-[var(--gray-bg)] shadow-sm"
                  >
                    {ind}
                  </span>
                ))}
              </div>

            </div>

            <div>
              <div className="bg-[var(--black)] text-white p-6 md:p-8 rounded-2xl sticky top-[100px] border-t-4 border-[var(--primary)] shadow-xl">

                <h3 className="font-inter font-bold text-xl md:text-2xl mb-3 text-white">
                  Have a Project Requirement?
                </h3>

                <p className="font-inter text-xs md:text-sm text-gray-300 mb-6 leading-relaxed">
                  Share your BOQ or single line diagrams with our engineering team for a technical review and quotation within 24 hours.
                </p>

                <Link
                  href="/contact"
                  className="block w-full text-center bg-[var(--primary)] font-inter font-bold text-sm py-3.5 hover:bg-[var(--primary-dark)] transition-colors rounded-lg text-white shadow-md"
                >
                  Request Technical Proposal →
                </Link>

              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />

      <WhatsAppButton />
    </>
  )
}