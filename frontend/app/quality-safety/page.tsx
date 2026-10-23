import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { 
  ShieldCheck, 
  HardHat, 
  FileCheck2, 
  CheckCircle2, 
  Zap, 
  Users, 
  AlertOctagon, 
  ClipboardCheck, 
  Check, 
  ArrowRight,
  BookOpen,
  Sparkles
} from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import PageHero from '@/components/shared/PageHero'
import SectionLabel from '@/components/shared/SectionLabel'

export const metadata: Metadata = {
  title: 'Quality & Safety on Every Site | Adler Contracts',
  description: 'Project-specific quality and safety plans, continuous Grade I supervision, SWMS, LOTO protocols, and zero lost-time incidents for turnkey HT/LT electrical works up to 33 kV.',
  alternates: {
    canonical: 'https://adlercontracts.in/quality-safety',
  },
}

const keyDocuments = [
  'Project-specific quality plan',
  'Project-specific safety plan',
  'Method statement for each activity (SWMS)',
  'Joint measurement records (JMR)',
  'EOHS policy & logistics plan',
  'Material approval & test records (MTC)',
  'Quality control & stage inspection checklists',
  'Logistics & traffic management plan',
]

const trainingModules = [
  {
    title: 'PPE Training & Fitment',
    desc: 'Mandatory certification on arc flash face shields, insulated gloves, composite safety boots, and category-rated apparel.',
  },
  {
    title: 'Electrical Safety & HT Rules',
    desc: 'High-voltage safe clearances, step & touch potential protocols, and de-energization verification procedures.',
  },
  {
    title: 'Work-at-Height & Harness Protocols',
    desc: '100% tie-off rules, dual-lanyard shock-absorbing harnesses, static lifeline inspection, and guardrail compliance.',
  },
  {
    title: 'Aerial Lift & Scaffolding Operation',
    desc: 'Safe maneuvering of articulated boom lifts, scissor lifts, and certified staging towers for overhead cable trays.',
  },
  {
    title: 'Heavy Equipment & Winch Operation',
    desc: 'Safe rigging, crane coordination for heavy transformer installation, and motorized cable-pulling winch controls.',
  },
  {
    title: 'Modern Construction Technologies',
    desc: 'Precision torque-controlled busduct bolting, hydraulic crimping calibrations, and laser-guided tray alignments.',
  },
  {
    title: 'First Aid, CPR & Emergency Response',
    desc: 'On-site emergency first aid response, electric shock resuscitation, burn triage, and designated site evacuation drills.',
  },
]

const qualityPoints = [
  {
    title: 'Project-Specific Quality Plans',
    desc: 'Tailored Inspection & Test Plans (ITP) drafted for every contract before ground-breaking.',
  },
  {
    title: 'Execution Methodologies',
    desc: 'Standardized SOPs for cable laying, transformer rigging, panel terminations, and busbar alignments.',
  },
  {
    title: 'Stage Inspections & Testing',
    desc: 'Multi-stage insulation resistance (meggering), contact resistance, earth pit testing, and hi-pot tests.',
  },
  {
    title: 'Material Test Certificates (MTC)',
    desc: 'Strict procurement verification with factory acceptance test (FAT) records from approved Tier-1 OEMs.',
  },
  {
    title: 'Third-Party Quality Checks',
    desc: 'Adherence to CEIG electrical inspectorate mandates and independent consultant audit requirements.',
  },
  {
    title: 'Continuous On-Site Supervision',
    desc: 'Full-time Grade I licensed electrical supervisor assigned to every active site from start to handover.',
  },
]

const safetyPoints = [
  {
    title: 'Detailed Site Safety Plans',
    desc: 'Comprehensive Job Hazard Analysis (JHA) and risk registers identifying site-specific HT/LT hazards.',
  },
  {
    title: 'Safe Work Method Statements (SWMS)',
    desc: 'Step-by-step risk-mitigated methodologies validated before initiating high-voltage or elevated works.',
  },
  {
    title: 'Permit-to-Work (PTW) & LOTO',
    desc: 'Rigid Lockout-Tagout protocols with zero unauthorized energization before full electrical lockouts.',
  },
  {
    title: '100% Mandatory Site Induction',
    desc: 'Every engineer, technician, and subcontractor completes formal safety induction before site entry.',
  },
  {
    title: 'Daily Morning Toolbox Talks',
    desc: 'Daily briefings identifying day-specific tasks, overhead hazards, weather alerts, and safety reminders.',
  },
  {
    title: 'Certified PPE on Every Crew',
    desc: 'Full-body safety harnesses, Class 00/0/1/2 dielectric gloves, safety helmets, and arc flash gear.',
  },
]

const sitePhotos = [
  {
    src: '/images/quality-safety/image24.jpeg',
    caption: 'Work-at-height safety & full-body harness protocol during high-bay lighting and cable tray installation.',
    tag: 'Height Safety',
  },
  {
    src: '/images/quality-safety/image23.jpeg',
    caption: 'Quality control inspection & precision alignment of industrial cable tray infrastructure.',
    tag: 'Quality Control',
  },
  {
    src: '/images/quality-safety/image25.png',
    caption: 'Morning crew briefing & toolbox talk on site induction before starting electrical distribution works.',
    tag: 'Toolbox Talk',
  },
  {
    src: '/images/quality-safety/image26.jpeg',
    caption: 'Hands-on training session on electrical equipment operations and safety compliance.',
    tag: 'Skill Training',
  },
  {
    src: '/images/quality-safety/image27.jpeg',
    caption: 'Rigorous safety inspection during HT transformer yard and distribution panel installation.',
    tag: 'HT Yard Safety',
  },
]

export default function QualitySafetyPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Page Hero */}
        <PageHero
          title="QUALITY & SAFETY ON EVERY SITE"
          subtitle="Every project has its own quality plan and its own safety plan. A Grade I supervisor is on site daily. We follow Safe Work Method Statements (SWMS), lockout-tagout (LOTO) procedures, and full PPE compliance."
          image="/images/quality-safety/image24.jpeg"
        />

        {/* Core Safety Stats Bar */}
        <section className="bg-white border-b border-[var(--border)] py-8 sm:py-10">
          <div className="site-container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
              <div className="p-4 rounded-xl bg-[var(--gray-bg)] border border-[var(--border)]">
                <div className="font-bebas text-3xl sm:text-4xl text-[var(--primary)] font-bold">134</div>
                <div className="font-inter text-xs font-semibold text-[var(--black)] uppercase tracking-wider mt-1">Workers Trained</div>
                <div className="font-inter text-[11px] text-[var(--gray)] mt-0.5">Certified on safety protocols</div>
              </div>

              <div className="p-4 rounded-xl bg-[var(--gray-bg)] border border-[var(--border)]">
                <div className="font-bebas text-3xl sm:text-4xl text-[var(--primary)] font-bold">0</div>
                <div className="font-inter text-xs font-semibold text-[var(--black)] uppercase tracking-wider mt-1">Lost-Time Incidents</div>
                <div className="font-inter text-[11px] text-[var(--gray)] mt-0.5">Zero tolerance for safety lapses</div>
              </div>

              <div className="p-4 rounded-xl bg-[var(--gray-bg)] border border-[var(--border)]">
                <div className="font-bebas text-3xl sm:text-4xl text-[var(--primary)] font-bold">100%</div>
                <div className="font-inter text-xs font-semibold text-[var(--black)] uppercase tracking-wider mt-1">Site Induction</div>
                <div className="font-inter text-[11px] text-[var(--gray)] mt-0.5">Mandatory before entering site</div>
              </div>

              <div className="p-4 rounded-xl bg-[var(--gray-bg)] border border-[var(--border)]">
                <div className="font-bebas text-3xl sm:text-4xl text-[var(--primary)] font-bold">Daily</div>
                <div className="font-inter text-xs font-semibold text-[var(--black)] uppercase tracking-wider mt-1">Toolbox Talks</div>
                <div className="font-inter text-[11px] text-[var(--gray)] mt-0.5">Grade I supervisor on site</div>
              </div>
            </div>

            <p className="text-center font-inter text-xs sm:text-sm text-[var(--gray)] italic mt-4">
              &ldquo;Investing in our people ensures long-term reliability and zero-incident execution.&rdquo;
            </p>
          </div>
        </section>

        {/* Two-Column Framework: Quality & Safety */}
        <section className="py-12 md:py-20 bg-[var(--gray-bg)] border-b border-[var(--border)]">
          <div className="site-container">
            <div className="text-left md:text-center max-w-2xl mx-auto mb-10 md:mb-16">
              <SectionLabel text="Dual Operational Pillars" color="accent" />
              <h2 className="font-inter font-bold text-2xl sm:text-3xl lg:text-4xl text-[var(--black)] mt-2">
                Engineered for <span className="text-[var(--primary)]">Precision & Life Safety</span>
              </h2>
              <p className="font-inter text-xs sm:text-sm text-[var(--gray)] mt-3">
                Industrial clients score bids on rigorous quality controls and life safety records. Here is how Adler executes on both fronts with zero deviation.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {/* Quality Pillar */}
              <div className="bg-white border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--border)]">
                  <div className="w-10 h-10 rounded-xl bg-[var(--primary-soft)] text-[var(--primary-dark)] flex items-center justify-center shrink-0">
                    <ClipboardCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-inter font-bold text-lg sm:text-xl text-[var(--black)]">Quality Framework</h3>
                    <p className="font-inter text-xs text-[var(--gray)]">Rigorous testing, OEM certification & Grade I supervision</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {qualityPoints.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 text-[var(--primary)] flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                        <Check className="w-3 h-3" />
                      </div>
                      <div>
                        <h4 className="font-inter font-bold text-xs sm:text-sm text-[var(--black)]">{pt.title}</h4>
                        <p className="font-inter text-xs text-[var(--gray)] mt-0.5 leading-relaxed">{pt.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety Pillar */}
              <div className="bg-white border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--border)]">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-inter font-bold text-lg sm:text-xl text-[var(--black)]">Safety Framework</h3>
                    <p className="font-inter text-xs text-[var(--gray)]">SWMS, PTW, LOTO & zero lost-time incidents</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {safetyPoints.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5 border border-amber-200">
                        <Check className="w-3 h-3" />
                      </div>
                      <div>
                        <h4 className="font-inter font-bold text-xs sm:text-sm text-[var(--black)]">{pt.title}</h4>
                        <p className="font-inter text-xs text-[var(--gray)] mt-0.5 leading-relaxed">{pt.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skill & Safety Training Modules */}
        <section className="py-12 md:py-20 bg-white border-b border-[var(--border)]">
          <div className="site-container">
            <div className="text-left md:text-center max-w-2xl mx-auto mb-10 md:mb-14">
              <SectionLabel text="Worker Competence" color="accent" />
              <h2 className="font-inter font-bold text-2xl sm:text-3xl lg:text-4xl text-[var(--black)] mt-2">
                Skill & Safety <span className="text-[var(--primary)]">Training Curriculum</span>
              </h2>
              <p className="font-inter text-xs sm:text-sm text-[var(--gray)] mt-3">
                Continuous skills upgrading to guarantee high-voltage safety, mechanical precision, and emergency preparedness on every project.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {trainingModules.map((m, idx) => (
                <div 
                  key={idx}
                  className="p-5 rounded-xl border border-[var(--border)] bg-[var(--gray-bg)] hover:border-[var(--primary)] transition-all hover:-translate-y-1"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-md bg-[var(--primary)] text-white font-inter text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <h3 className="font-inter font-bold text-sm text-[var(--black)]">{m.title}</h3>
                  </div>
                  <p className="font-inter text-xs text-[var(--gray)] leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mandatory Documentation Submitted With Every Project */}
        <section className="py-12 md:py-20 bg-[var(--gray-bg)] border-b border-[var(--border)]">
          <div className="site-container">
            <div className="bg-white border border-[var(--border)] rounded-2xl p-6 sm:p-10 shadow-sm max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-[var(--border)]">
                <div>
                  <SectionLabel text="Audit-Ready Compliance" color="accent" />
                  <h3 className="font-inter font-bold text-xl sm:text-2xl text-[var(--black)] mt-1">
                    Documents We Submit With Every Project
                  </h3>
                  <p className="font-inter text-xs sm:text-sm text-[var(--gray)] mt-1">
                    Complete statutory and engineering documentation delivered before, during, and upon project completion.
                  </p>
                </div>
                <div className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--primary-soft)] text-[var(--primary-dark)] font-inter text-xs font-bold">
                  <FileCheck2 className="w-4 h-4" />
                  100% Audit Compliance
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {keyDocuments.map((doc, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-[var(--border)] bg-[var(--gray-bg)]">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-[var(--primary)] flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-inter text-xs sm:text-sm font-semibold text-[var(--black)]">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* On-Site Verification Photos */}
        <section className="py-12 md:py-20 bg-white border-b border-[var(--border)]">
          <div className="site-container">
            <div className="text-left md:text-center max-w-2xl mx-auto mb-10 md:mb-14">
              <SectionLabel text="On-Site Evidence" color="accent" />
              <h2 className="font-inter font-bold text-2xl sm:text-3xl lg:text-4xl text-[var(--black)] mt-2">
                Safety & Quality <span className="text-[var(--primary)]">in Action</span>
              </h2>
              <p className="font-inter text-xs sm:text-sm text-[var(--gray)] mt-3">
                Uncompromising field standards: full-body harnesses, static lifelines, certified ladders, and daily supervisor audits.
              </p>
            </div>

            {/* 5 On-Site Photos - Pyramid Layout (3-2 Laptop, 2-2-1 Mobile) */}
            <div className="flex flex-wrap justify-center gap-2.5 sm:gap-5 md:gap-6 max-w-6xl mx-auto">
              {sitePhotos.map((photo, idx) => (
                <div 
                  key={idx}
                  className="group relative rounded-xl sm:rounded-2xl overflow-hidden border border-[var(--border)] bg-black shadow-sm flex flex-col justify-end h-44 sm:h-64 lg:h-72 w-[calc(50%-0.35rem)] sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1.25rem)] max-w-full"
                >
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 px-1.5 sm:px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[var(--primary)] font-inter text-[8px] sm:text-[10px] font-bold border border-white/20">
                    {photo.tag}
                  </div>

                  <div className="relative z-10 p-2.5 sm:p-4">
                    <p className="font-inter text-[9px] sm:text-xs text-white/90 leading-tight sm:leading-relaxed line-clamp-3 sm:line-clamp-none">
                      {photo.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-[var(--primary-dark)] text-white">
          <div className="site-container text-center max-w-2xl mx-auto">
            <h2 className="font-inter font-bold text-2xl sm:text-3xl mb-3">
              Require Quality & Safety Documentation for Your Tender?
            </h2>
            <p className="font-inter text-white/85 text-xs sm:text-sm leading-relaxed mb-6">
              Our engineering team provides comprehensive pre-qualification dossiers, Grade I supervisor credentials, SWMS templates, and CEIG approval track records.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-inter font-bold text-xs uppercase tracking-wider hover:bg-emerald-600 transition-colors shadow-md flex items-center justify-center gap-2"
              >
                Request Pre-Qualification Pack <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/projects"
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-inter font-bold text-xs uppercase tracking-wider transition-colors border border-white/20"
              >
                View 14 Verified Projects
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
