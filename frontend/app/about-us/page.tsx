"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HomeNavbar from "@/components/layout/HomeNavbar";
import Footer from "@/components/layout/Footer";

function AboutHero() {
  return (
    <section className="relative w-full h-[380px] md:h-[480px] mt-[100px] flex flex-col justify-center items-center overflow-hidden bg-[#003262]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/about_main.png"
          fill
          className="object-cover object-center scale-105"
          alt="About Birla Heritage International School"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#001f3d]/90 via-[#003262]/80 to-[#003262]/60 mix-blend-multiply" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container-custom text-center md:text-left">
        <div className="inline-block mb-3 px-4 py-1.5 bg-[#FDB515]/20 backdrop-blur-md border border-[#FDB515]/30 rounded-full">
          <span className="text-[#FDB515] font-bold tracking-wider text-xs md:text-sm uppercase">Institutional Overview</span>
        </div>
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-xl" style={{ fontFamily: 'var(--font-heading)' }}>
          About Birla Heritage
        </h1>
        <p className="text-white/90 text-base md:text-xl max-w-2xl font-light leading-relaxed">
          Redefining education through joyful learning, holistic development, and 21st-century skills.
        </p>
      </div>

      {/* Decorative Bottom Fade */}
      <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-white to-transparent z-20" />
    </section>
  );
}

function AboutIntroduction() {
  return (
    <section className="w-full py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <p className="section-eyebrow mb-2">Our Foundation</p>
          <h2 className="heading-xl text-3xl md:text-4xl text-gray-900 mb-4">
            Birla Heritage International School, Siwan
          </h2>
          <div className="accent-line mx-auto" />
        </div>
        <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-14">
          <div className="w-full md:w-1/2 text-gray-700 text-[15px] md:text-[16.5px] leading-relaxed space-y-4">
            <p>
              Birla Heritage International School Siwan reiterates and restores what Tagore called the hallmarks of childhood — <strong>&apos;the Joy of Learning&apos;</strong> and the <strong>&apos;Creative Spirit&apos;</strong>. The School firmly believes in the uniqueness of each child, thereby fostering holistic development through integrated learning opportunities nurturing 21st Century Skills.
            </p>
            <p>
              Our philosophy is based on the constructive approach where learners are actively involved in their learning within a self-governing environment. Learning experiences are interactive, student-centric, and progress from known to unknown, concrete to abstract, and local to global.
            </p>
            <p>
              Educators at Birla Heritage are mindful of each student&apos;s emotional, social, psychological, physical, and cognitive growth, providing a motivational framework for every learning opportunity.
            </p>
            <p className="font-semibold text-[#003262]">
              A learner at Birla Heritage International School develops a global perspective and life skills to excel in their desired field and become a lifelong learner.
            </p>
          </div>
          <div className="w-full md:w-1/2 relative">
            <div className="relative z-10 w-full h-[280px] sm:h-[360px] md:h-[420px] rounded-lg overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="/about_small.png"
                alt="Students engaging in collaborative learning at Birla Heritage"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutIdentityAndValues() {
  return (
    <section className="w-full py-16 md:py-24 bg-[#f8fafc] border-t border-b border-gray-100">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="section-eyebrow mb-2">School Ethos & Identity</p>
          <h2 className="heading-xl text-3xl md:text-4xl text-gray-900 mb-4">
            Values, Vision & Core Pillars
          </h2>
          <div className="accent-line mx-auto" />
          <p className="text-gray-600 text-sm md:text-base">
            The school provides a nurturing environment wherein young children feel loved, cared for, secured, respected, and valued.
          </p>
        </div>

        {/* The 4 C's */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="card-base p-6 text-center border-t-4 border-t-[#003262]">
            <div className="w-12 h-12 rounded-full bg-[#003262]/10 text-[#003262] font-bold text-xl flex items-center justify-center mx-auto mb-4">
              C1
            </div>
            <h3 className="heading-md text-lg text-gray-900 mb-2">Care</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Nurturing an empathetic atmosphere where every child&apos;s physical, emotional, and social well-being is prioritized.
            </p>
          </div>

          <div className="card-base p-6 text-center border-t-4 border-t-[#FDB515]">
            <div className="w-12 h-12 rounded-full bg-[#FDB515]/20 text-[#003262] font-bold text-xl flex items-center justify-center mx-auto mb-4">
              C2
            </div>
            <h3 className="heading-md text-lg text-gray-900 mb-2">Co-operation</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Fostering teamwork and mutual respect among students, staff, and the wider school community.
            </p>
          </div>

          <div className="card-base p-6 text-center border-t-4 border-t-[#003262]">
            <div className="w-12 h-12 rounded-full bg-[#003262]/10 text-[#003262] font-bold text-xl flex items-center justify-center mx-auto mb-4">
              C3
            </div>
            <h3 className="heading-md text-lg text-gray-900 mb-2">Collaboration</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Encouraging group problem solving, interactive projects, and peer learning across disciplines.
            </p>
          </div>

          <div className="card-base p-6 text-center border-t-4 border-t-[#FDB515]">
            <div className="w-12 h-12 rounded-full bg-[#FDB515]/20 text-[#003262] font-bold text-xl flex items-center justify-center mx-auto mb-4">
              C4
            </div>
            <h3 className="heading-md text-lg text-gray-900 mb-2">Courtesy</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Instilling polite behavior, ethical integrity, and appreciation for cultural diversity.
            </p>
          </div>
        </div>

        {/* Institutional Statements & Content Status Notice */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
          <div>
            <h3 className="heading-lg text-xl text-[#003262] mb-3">Institutional Vision & Mission</h3>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              Birla Heritage International School is dedicated to fostering an inspiring academic environment that balances international educational standards with deep-rooted values.
            </p>
            <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded font-medium">
              <strong>Official Content Notice:</strong> Formal Vision, Mission, and Motto statements are pending final administrative publication from school leadership.
            </div>
          </div>

          <div>
            <h3 className="heading-lg text-xl text-[#003262] mb-3">Educational Philosophy Link</h3>
            <p className="text-gray-700 text-sm leading-relaxed mb-6">
              Our constructivist approach ensures students progress seamlessly from concrete to abstract concepts, supported by our three core pillars: Academic Excellence, Liberal Arts & Sports, and Mentorship.
            </p>
            <Link href="/about-us/philosophy" className="btn-outline-primary text-xs uppercase tracking-wider">
              Explore Educational Philosophy &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutPillars() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const pillars = [
    {
      title: "Academic Excellence",
      desc: "Our learners achieve amazing things. Recognised as one of the leading school brands in India, our learners enjoy a remarkable range of innovative learning experiences, which inspire and challenge them to be their very best. This includes structured STEM subjects, humanities, and languages, ensuring a well-rounded academic foundation.\n\nOur laboratories and library resources provide students with tools to explore complex concepts deeply, preparing them for higher academic pursuits."
    },
    {
      title: "Liberal Arts And Sports Tradition",
      desc: "We value the role of sports and arts in life as an integral part of learning. We believe in the positive benefits of participating in individual and team sports, performing arts, and creative expression.\n\nEngaging in athletic activities and creative arts fosters discipline, resilience, and teamwork essential for holistic character development."
    },
    {
      title: "Mentor And Guide",
      desc: "With passionate, well-qualified teachers and inspired leaders, our students are supported at every step. Faculty members work in teams to develop engaging lessons and provide personalized guidance.\n\nOur mentorship focus ensures each student receives academic guidance, emotional support, and encouragement to realize their full potential."
    }
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-14">
          <p className="section-eyebrow mb-2">Our Core Pillars</p>
          <h2 className="heading-xl text-3xl md:text-4xl text-gray-900 mb-4">
            3 Pillars of Our Success
          </h2>
          <div className="accent-line mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {pillars.map((pillar, idx) => {
            const isExpanded = expandedIdx === idx;
            return (
              <div key={idx} className="card-base p-6 flex flex-col justify-between h-full">
                <div>
                  <h3 className="heading-md text-xl text-[#003262] mb-3">{pillar.title}</h3>
                  <p className={`text-gray-600 text-sm leading-relaxed whitespace-pre-line ${!isExpanded ? 'line-clamp-4' : ''}`}>
                    {pillar.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                  <button
                    onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                    className="text-[#003262] font-semibold text-xs uppercase tracking-wider hover:text-[#FDB515] transition-colors cursor-pointer"
                  >
                    {isExpanded ? 'Read less' : 'Read more →'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function LeadershipPreviewSection() {
  return (
    <section className="w-full py-16 md:py-24 bg-[#003262] text-white border-t-4 border-[#FDB515]">
      <div className="container-custom text-center">
        <span className="badge-gold mb-3">Institutional Guidance</span>
        <h2 className="text-white text-3xl md:text-4xl font-extrabold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
          Leadership & Governance
        </h2>
        <p className="text-white/80 text-base max-w-2xl mx-auto mb-10 font-light">
          Guided by dedicated educationists and industry leaders committed to fostering excellence across all aspects of school life.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded border border-white/15">
            <h3 className="text-[#FDB515] font-bold text-sm uppercase tracking-wider mb-1">Chairman</h3>
            <p className="text-white font-bold text-xl mb-2">Nitya Singh</p>
            <p className="text-white/70 text-xs leading-relaxed line-clamp-3">
              16 years of technology management experience in Microsoft. Committed to unlocking the latent potential in every child.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded border border-white/15">
            <h3 className="text-[#FDB515] font-bold text-sm uppercase tracking-wider mb-1">Director</h3>
            <p className="text-white font-bold text-xl mb-2">Subash Singh</p>
            <p className="text-white/70 text-xs leading-relaxed line-clamp-3">
              Dedicated to offering a smooth, inclusive learning environment where children examine all learning possibilities.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded border border-white/15">
            <h3 className="text-[#FDB515] font-bold text-sm uppercase tracking-wider mb-1">Principal</h3>
            <p className="text-white/80 font-semibold text-lg mb-2">[Information Pending]</p>
            <p className="text-amber-300 text-xs leading-relaxed">
              Official Principal message, biography, and portrait photograph pending formal content delivery from administration.
            </p>
          </div>
        </div>

        <Link href="/about-us/leadership" className="btn-primary px-8 py-3 text-sm font-bold">
          View Detailed Leadership Profiles &rarr;
        </Link>
      </div>
    </section>
  );
}

export default function AboutUsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <HomeNavbar />
      <AboutHero />
      <AboutIntroduction />
      <AboutIdentityAndValues />
      <AboutPillars />
      <LeadershipPreviewSection />
      <Footer />
    </main>
  );
}

