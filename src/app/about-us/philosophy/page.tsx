"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HomeNavbar from "@/components/HomeNavbar";
import Footer from "@/components/Footer";

function PhilosophyHero() {
  return (
    <section className="relative w-full h-[380px] md:h-[480px] mt-[100px] flex flex-col justify-center items-center overflow-hidden bg-[#003262]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/about_main.png"
          fill
          className="object-cover object-center scale-105"
          alt="Educational Philosophy Banner"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#001f3d]/90 via-[#003262]/80 to-[#003262]/60 mix-blend-multiply" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container-custom text-center md:text-left">
        <div className="inline-block mb-3 px-4 py-1.5 bg-[#FDB515]/20 backdrop-blur-md border border-[#FDB515]/30 rounded-full">
          <span className="text-[#FDB515] font-bold tracking-wider text-xs md:text-sm uppercase">Our Core Pedagogical Beliefs</span>
        </div>
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-xl" style={{ fontFamily: 'var(--font-heading)' }}>
          Educational Philosophy
        </h1>
        <p className="text-white/90 text-base md:text-xl max-w-2xl font-light leading-relaxed">
          A constructive learning framework where students are actively engaged in a self-governing, motivational atmosphere.
        </p>
      </div>

      {/* Decorative Bottom Fade */}
      <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-white to-transparent z-20" />
    </section>
  );
}

function ConstructivistPedagogySection() {
  return (
    <section className="w-full py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <p className="section-eyebrow mb-2">Constructivist Approach</p>
          <h2 className="heading-xl text-3xl md:text-4xl text-gray-900 mb-4">
            Learning from Known to Unknown
          </h2>
          <div className="accent-line mx-auto" />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-14">
          <div className="w-full md:w-1/2 text-gray-700 text-[15px] md:text-[16.5px] leading-relaxed space-y-4">
            <p>
              At Birla Heritage International School Siwan, our educational philosophy is grounded in the <strong>constructivist approach</strong>, where learners are active creators of their own knowledge rather than passive recipients of information.
            </p>
            <p>
              Learning experiences are interactive, student-centric, and systematically progress across three vital axes:
            </p>
            <ul className="space-y-2 pl-4 border-l-2 border-[#FDB515]">
              <li className="flex items-center gap-2 text-[#003262] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#FDB515]" />
                From Known to Unknown
              </li>
              <li className="flex items-center gap-2 text-[#003262] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#FDB515]" />
                From Concrete to Abstract
              </li>
              <li className="flex items-center gap-2 text-[#003262] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#FDB515]" />
                From Local to Global
              </li>
            </ul>
            <p>
              Our educators tailor learning opportunities to support each student&apos;s cognitive growth alongside their emotional, social, psychological, and physical development.
            </p>
          </div>

          <div className="w-full md:w-1/2 relative">
            <div className="relative z-10 w-full h-[280px] sm:h-[360px] md:h-[400px] rounded-lg overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="/about_small.png"
                alt="Constructivist classroom learning environment"
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

function PhilosophyPillars() {
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
    <section className="w-full py-16 md:py-24 bg-[#f8fafc] border-t border-b border-gray-100">
      <div className="container-custom">
        <div className="text-center mb-14">
          <p className="section-eyebrow mb-2">Pedagogical Structure</p>
          <h2 className="heading-xl text-3xl md:text-4xl text-gray-900 mb-4">
            3 Pillars of Our Educational Model
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

const tabData = [
  {
    id: "enthuse",
    title: "ENTHUSE",
    color: "bg-[#003262]",
    contentTitle: "Enthuse",
    content: "With our well-researched curriculum, modern teaching methodologies, and wide range of co-curricular activities, we constantly strive to enthuse our students with fascinating learning experiences every single day.\nWe work tirelessly towards creating future leaders, thinkers, and change-makers while upholding cultural traditions.",
    image: "/about_small.png"
  },
  {
    id: "enlighten",
    title: "ENLIGHTEN",
    color: "bg-[#FDB515]",
    contentTitle: "Enlighten",
    content: "Our goal is to enlighten young minds through exposure to diverse fields of knowledge. By fostering curiosity and a love for learning, we empower students to discover their passions and achieve academic excellence. We provide an environment where ideas flourish.",
    image: "/test_student_1_1785833398588.png"
  },
  {
    id: "empower",
    title: "EMPOWER",
    color: "bg-[#e5a010]",
    contentTitle: "Empower",
    content: "Empowerment is at the core of our educational philosophy. We equip our students with the skills, confidence, and resilience needed to navigate an ever-changing world. Through leadership programs and collaborative projects, we ensure our graduates are ready for the future.",
    image: "/about_small.png"
  }
];

function PhilosophyTabs() {
  const [activeTab, setActiveTab] = useState(tabData[0].id);
  const activeData = tabData.find((t) => t.id === activeTab) || tabData[0];

  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <p className="section-eyebrow mb-2">Learning Continuum</p>
          <h2 className="heading-xl text-3xl md:text-4xl text-gray-900 mb-4">
            Enthuse, Enlighten & Empower
          </h2>
          <div className="accent-line mx-auto" />
        </div>

        <div className="flex flex-col w-full">
          <div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-4 mb-8">
            {tabData.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3 px-6 text-center text-white font-bold text-base md:text-lg transition-all duration-300 rounded cursor-pointer ${tab.color} ${isActive ? 'ring-2 ring-offset-2 ring-[#003262]' : 'opacity-90 hover:opacity-100'}`}
                >
                  {tab.title}
                </button>
              );
            })}
          </div>

          <div className="bg-[#f8fafc] rounded-lg p-6 md:p-10 border border-gray-200 flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold text-[#003262] mb-4">
                {activeData.contentTitle}
              </h3>
              <p className="text-gray-700 text-base leading-relaxed whitespace-pre-line">
                {activeData.content}
              </p>
            </div>
            <div className="md:w-1/2 relative w-full h-[260px] md:h-[320px] rounded-lg overflow-hidden shadow-md">
              <Image
                src={activeData.image}
                alt={activeData.contentTitle}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Action Banner */}
        <div className="mt-14 pt-10 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left">
          <div>
            <h3 className="heading-md text-xl text-gray-900 mb-1">Discover Our Curriculum Spectrum</h3>
            <p className="text-gray-600 text-sm">Explore how our philosophy translates into daily academic learning for Nursery to Class 9.</p>
          </div>
          <div className="flex gap-4">
            <Link href="/about-us/curriculum" className="btn-primary text-xs uppercase tracking-wider">
              View Curriculum &rarr;
            </Link>
            <Link href="/admissions" className="btn-outline-primary text-xs uppercase tracking-wider">
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PhilosophyPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <HomeNavbar />
      <PhilosophyHero />
      <ConstructivistPedagogySection />
      <PhilosophyPillars />
      <PhilosophyTabs />
      <Footer />
    </main>
  );
}
