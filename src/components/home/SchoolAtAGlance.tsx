"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function SchoolAtAGlance() {
  const [activeCategory, setActiveCategory] = useState<"heritage" | "grow">("heritage");
  const [activeStage, setActiveStage] = useState<"foundational" | "primary">("foundational");

  return (
    <section className="w-full py-16 md:py-24 bg-[#fbfcfd] border-b border-gray-100 relative overflow-hidden">
      {/* Decorative background watermark */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: "radial-gradient(#003262 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        
        {/* ── Section Header ── */}
        <div className="text-center max-w-4xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FDB515]/15 border border-[#FDB515]/30 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#FDB515] animate-pulse" />
            <span className="text-[#003262] font-black text-xs md:text-sm tracking-widest uppercase">
              We are Birla Heritage
            </span>
          </div>

          <h2 className="heading-xl text-3xl sm:text-4xl md:text-5xl text-gray-900 mb-5 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            Nurturing Enlightened Humanity & Academic Excellence
          </h2>
          <div className="w-24 h-1 bg-[#FDB515] mx-auto mb-6 rounded-full" />
          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-3xl mx-auto font-light">
            Founded on the eternal conviction that every child is a triumph of nature. Explore who we are through our guiding ethos, and how we grow through our experiential IGNITE pedagogy.
          </p>

          {/* ── Two Main Categories Tab Switcher ── */}
          <div className="flex justify-center mt-8">
            <div className="inline-flex p-1.5 bg-gray-100 rounded-2xl border border-gray-200/80 shadow-inner">
              <button
                type="button"
                onClick={() => setActiveCategory("heritage")}
                className={`flex items-center gap-2.5 px-6 sm:px-9 py-3 rounded-xl font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeCategory === "heritage"
                    ? "bg-[#003262] text-white shadow-lg shadow-[#003262]/25 scale-[1.02]"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full ${activeCategory === "heritage" ? "bg-[#FDB515]" : "bg-gray-400"}`} />
                We are Birla Heritage
              </button>
              
              <button
                type="button"
                onClick={() => setActiveCategory("grow")}
                className={`flex items-center gap-2.5 px-6 sm:px-9 py-3 rounded-xl font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeCategory === "grow"
                    ? "bg-[#003262] text-white shadow-lg shadow-[#003262]/25 scale-[1.02]"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full ${activeCategory === "grow" ? "bg-[#FDB515]" : "bg-gray-400"}`} />
                How We Grow
              </button>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            OPTION 1: WE ARE BIRLA HERITAGE (Vision & Mission + Spirit Combined)
           ══════════════════════════════════════════════════════════════════════ */}
        {activeCategory === "heritage" && (
          <div className="animate-fadeIn">
            
            {/* 1.1 VISION AND MISSION */}
            <div className="mb-14 md:mb-18">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[3px] bg-[#FDB515]" />
                <h3 className="text-[#003262] font-black text-xl md:text-2xl uppercase tracking-wider" style={{ fontFamily: 'var(--font-heading)' }}>
                  VISION AND MISSION
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                
                {/* VISION CARD */}
                <div className="lg:col-span-5 bg-gradient-to-br from-[#003262] to-[#002147] text-white p-8 md:p-10 rounded-2xl shadow-xl flex flex-col justify-between relative overflow-hidden border-t-4 border-[#FDB515]">
                  <div className="absolute top-6 right-6 opacity-10 pointer-events-none">
                    <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                    </svg>
                  </div>
                  <div>
                    <div className="inline-block px-3 py-1 rounded bg-[#FDB515] text-[#003262] font-black text-xs uppercase tracking-wider mb-5">
                      VISION
                    </div>
                    <h4 className="text-2xl md:text-3xl font-bold mb-6 text-white leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>
                      A Triumph of Nature
                    </h4>
                    <p className="text-white/95 text-base md:text-[17px] leading-relaxed font-light italic border-l-2 border-[#FDB515] pl-4 mb-6">
                      &ldquo;To send out into the world, young persons who are a triumph of Nature – strong yet gentle, bright and wise and capable of taking on the world, by inspiring them to an enlightened humanity through the guiding principle of &lsquo;choosing the harder right than the easier wrong&rsquo;.&rdquo;
                    </p>
                  </div>
                  <div className="pt-6 border-t border-white/15 flex items-center justify-between text-xs text-white/70 uppercase tracking-widest font-semibold">
                    <span>Birla Heritage Ethos</span>
                    <span className="text-[#FDB515]">Enlightened Humanity</span>
                  </div>
                </div>

                {/* MISSION CARD */}
                <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-200/80 flex flex-col justify-between">
                  <div>
                    <div className="inline-block px-3 py-1 rounded bg-[#003262]/10 text-[#003262] font-black text-xs uppercase tracking-wider mb-5">
                      OUR MISSION
                    </div>
                    <h4 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>
                      Nurturing Growth & Emotional Resilience
                    </h4>

                    <div className="space-y-4 text-gray-700 text-[15px] md:text-base leading-relaxed font-normal">
                      <p>
                        To provide a nurturing and supportive environment that offers a holistic education, fostering academic excellence, international exposure and a challenging curriculum that enhances creativity and emotional resilience, while inculcating in our students the best of Indian culture and traditions, motivating each one to evolve into the best version of herself and himself.
                      </p>
                      <p>
                        To inspire them to develop a tolerant, balanced yet independent attitude of mind with a sense of service, justice, and fair play and to reinforce a secure sense of Self, so that when they step out into the world, they will not be threatened by the changes around them, but rather become an embodiment of the change that they wish to see.
                      </p>
                    </div>

                    {/* Kingfisher Mascot Metaphor */}
                    <div className="mt-6 p-5 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50/50 border border-amber-200/70">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl shrink-0">🕊️</span>
                        <div>
                          <p className="text-amber-950 font-semibold text-sm md:text-base leading-snug">
                            Eventually, our mission is to teach our Students to <span className="text-[#003262] font-bold">&lsquo;fly higher, dive deeper and continue to shine with brilliance as they soar&rsquo;</span> — like the Kingfisher, that is our mascot.
                          </p>
                          <p className="text-[#003262] font-extrabold text-sm md:text-base mt-2 tracking-wide uppercase">
                            For us, every student is a promise.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                    <Link href="/about-us/philosophy" className="text-[#003262] font-bold text-sm hover:text-[#FDB515] transition-colors inline-flex items-center gap-1.5">
                      Read Institutional Philosophy &rarr;
                    </Link>
                    <Link href="/admissions" className="btn-primary py-2 px-5 text-xs font-bold uppercase tracking-wider">
                      Enrol Today
                    </Link>
                  </div>
                </div>

              </div>
            </div>

            {/* 1.2 THE BIRLA HERITAGE SPIRIT */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[3px] bg-[#FDB515]" />
                <h3 className="text-[#003262] font-black text-xl md:text-2xl uppercase tracking-wider" style={{ fontFamily: 'var(--font-heading)' }}>
                  THE BIRLA HERITAGE SPIRIT
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                
                {/* Card 1: Spirit */}
                <div className="bg-white p-7 md:p-8 rounded-xl shadow-md border-t-4 border-[#003262] border-x border-b border-gray-200 flex flex-col justify-between hover:shadow-xl transition-all duration-300">
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-[#003262]/10 text-[#003262] flex items-center justify-center mb-5 font-bold">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                      Spirit
                    </h4>
                    <p className="text-gray-600 text-sm md:text-[15px] leading-relaxed">
                      The school aim of knowledge is to bring peace. The school aims at developing in its students a sense of discipline and a Spirit of service and Fair play while inculcating the best of Indian culture and tradition in its students.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-100 text-xs font-bold text-[#003262] uppercase tracking-wider">
                    Knowledge & Peace
                  </div>
                </div>

                {/* Card 2: A Secular Space */}
                <div className="bg-white p-7 md:p-8 rounded-xl shadow-md border-t-4 border-[#FDB515] border-x border-b border-gray-200 flex flex-col justify-between hover:shadow-xl transition-all duration-300">
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-[#FDB515]/20 text-[#003262] flex items-center justify-center mb-5 font-bold">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                      A Secular Space
                    </h4>
                    <p className="text-gray-600 text-sm md:text-[15px] leading-relaxed">
                      The school brings together students from varied and socially diverse background and instils in them a strong appreciation for Diversity, thereby becoming appreciative of one another as well as the environment around them. BIRLA HERITAGE celebrates diversity, embraces inclusivity, and promotes mutual respect, equality, and harmony among all students, irrespective of their backgrounds.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-100 text-xs font-bold text-[#FDB515] uppercase tracking-wider">
                    Inclusivity & Harmony
                  </div>
                </div>

                {/* Card 3: CHOOSING THE HARDER RIGHT */}
                <div className="bg-white p-7 md:p-8 rounded-xl shadow-md border-t-4 border-[#003262] border-x border-b border-gray-200 flex flex-col justify-between hover:shadow-xl transition-all duration-300">
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-[#003262]/10 text-[#003262] flex items-center justify-center mb-5 font-bold">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                      CHOOSING THE HARDER RIGHT
                    </h4>
                    <p className="text-gray-600 text-sm md:text-[15px] leading-relaxed mb-3">
                      The school imbues in its students a love for independent thinking and right action.
                    </p>
                    <p className="text-gray-700 text-xs md:text-sm italic bg-gray-50 p-3 rounded border-l-2 border-[#003262]">
                      &ldquo;CHOOSING the harder right over the easier wrong&rdquo; is the byword the school runs on. This is why Birla Heritageans have walked down paths that many others feared to tread, with the confidence to take initiative and to carry others along.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-100 text-xs font-bold text-[#003262] uppercase tracking-wider">
                    Independent Moral Courage
                  </div>
                </div>

              </div>
            </div>

            {/* Seamless Transition CTA to How We Grow */}
            <div className="mt-12 text-center p-6 bg-white rounded-xl border border-gray-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <h5 className="font-bold text-[#003262] text-base">Want to explore our experiential academic frameworks?</h5>
                <p className="text-gray-500 text-sm">Discover IGNITE pedagogy across Foundational Stage & Primary Stage.</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveCategory("grow")}
                className="btn-primary py-2.5 px-6 text-xs font-bold uppercase tracking-wider whitespace-nowrap cursor-pointer"
              >
                Explore How We Grow &rarr;
              </button>
            </div>

          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════
            OPTION 2: HOW WE GROW (IGNITE, Foundational Stage & Primary Stage)
           ══════════════════════════════════════════════════════════════════════ */}
        {activeCategory === "grow" && (
          <div className="animate-fadeIn space-y-12">
            
            {/* 2.1 IGNITE CORE OVERVIEW */}
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[3px] bg-[#FDB515]" />
                <h3 className="text-[#003262] font-black text-2xl md:text-3xl uppercase tracking-wider" style={{ fontFamily: 'var(--font-heading)' }}>
                  HOW WE GROW — IGNITE
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <div className="p-6 rounded-xl bg-gradient-to-br from-[#003262]/5 to-transparent border-l-4 border-[#003262]">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded bg-[#FDB515] text-[#003262] text-xs font-black uppercase">Core Pedagogy</span>
                      <h4 className="text-2xl font-black text-[#003262]" style={{ fontFamily: 'var(--font-heading)' }}>
                        The Joy of Learning
                      </h4>
                    </div>
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                      <strong>Ignite</strong> represents the heart of our academic curriculum. Across all stages, we nurture curiosity, creativity, and confidence while preparing learners for the future.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-bold text-[#003262] text-base uppercase tracking-wider flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#FDB515]" />
                      Pedagogy
                    </h5>
                    <p className="text-gray-700 text-sm md:text-[15px] leading-relaxed">
                      Our approach is <strong>experiential, inquiry-driven, and competency-based</strong>. We blend structured academics with hands-on projects, art integration, and cultural grounding. Every stage is scaffolded to ensure skills of creativity, collaboration, critical thinking, and communication grow stronger year by year.
                    </p>
                  </div>
                </div>

                {/* 4 C's Badges */}
                <div className="lg:col-span-5 bg-gradient-to-br from-[#003262] to-[#001f3d] p-6 md:p-8 rounded-2xl text-white shadow-lg border-t-4 border-[#FDB515]">
                  <span className="text-[#FDB515] font-black text-xs uppercase tracking-widest block mb-2">4C Competency Model</span>
                  <h4 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Scaffolded 21st Century Skills</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-white/10 rounded-lg border border-white/15">
                      <span className="block text-sm font-bold text-[#FDB515]">Creativity</span>
                      <span className="text-white/70 text-xs">Innovation & expression</span>
                    </div>
                    <div className="p-3 bg-white/10 rounded-lg border border-white/15">
                      <span className="block text-sm font-bold text-[#FDB515]">Collaboration</span>
                      <span className="text-white/70 text-xs">Teamwork & empathy</span>
                    </div>
                    <div className="p-3 bg-white/10 rounded-lg border border-white/15">
                      <span className="block text-sm font-bold text-[#FDB515]">Critical Thinking</span>
                      <span className="text-white/70 text-xs">Inquiry & logic</span>
                    </div>
                    <div className="p-3 bg-white/10 rounded-lg border border-white/15">
                      <span className="block text-sm font-bold text-[#FDB515]">Communication</span>
                      <span className="text-white/70 text-xs">Clarity & confidence</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2.2 STAGE SELECTOR SUB-TABS */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-200 pb-4">
              <div>
                <h4 className="text-2xl font-black text-[#003262]" style={{ fontFamily: 'var(--font-heading)' }}>
                  Curriculum Stages & Learning Frameworks
                </h4>
                <p className="text-gray-500 text-sm">Select a learning stage to explore its academic framework and experiential activities.</p>
              </div>

              <div className="inline-flex p-1 bg-gray-100 rounded-xl border border-gray-200 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveStage("foundational")}
                  className={`px-4 sm:px-6 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    activeStage === "foundational"
                      ? "bg-[#003262] text-white shadow"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Foundational (Nursery – Gr II)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStage("primary")}
                  className={`px-4 sm:px-6 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    activeStage === "primary"
                      ? "bg-[#003262] text-white shadow"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Primary (Grades III – V)
                </button>
              </div>
            </div>

            {/* ═════════════════════════════════════════════════════════════════
                STAGE 1: FOUNDATIONAL STAGE (NURSERY – GRADE II)
               ═════════════════════════════════════════════════════════════════ */}
            {activeStage === "foundational" && (
              <div className="space-y-8 animate-fadeIn">
                
                {/* Header Banner */}
                <div className="bg-gradient-to-r from-amber-500/10 via-amber-50 to-white p-6 md:p-8 rounded-2xl border-l-4 border-[#FDB515] border border-amber-200/60 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <span className="inline-block px-3 py-1 rounded bg-[#FDB515] text-[#003262] font-black text-xs uppercase tracking-wider mb-2">
                      Early Childhood Education
                    </span>
                    <h4 className="text-2xl md:text-3xl font-black text-[#003262]" style={{ fontFamily: 'var(--font-heading)' }}>
                      Foundational Stage (Nursery – Grade II)
                    </h4>
                    <p className="text-gray-700 text-sm md:text-base mt-2 max-w-3xl">
                      <strong>Pedagogy:</strong> Play-based and experiential learning that transforms children into explorers, problem-solvers, and joyful learners.
                    </p>
                    <p className="text-gray-700 text-sm md:text-base mt-1 max-w-3xl">
                      <strong>Learning Focus:</strong> Joyful play, storytelling, experiments, nature walks, and creative expression. Children build strong foundations in language, numeracy, and social-emotional growth while discovering the world around them.
                    </p>
                  </div>
                  <Link href="/admissions" className="btn-primary py-2.5 px-6 text-xs font-bold uppercase tracking-wider shrink-0 self-start md:self-center">
                    Enrol in Foundational
                  </Link>
                </div>

                {/* Academic Framework (Subjects) */}
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
                  <h5 className="text-lg font-bold text-[#003262] uppercase tracking-wider mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#003262]" />
                    Academic Framework
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 rounded-xl bg-gray-50 border border-gray-200">
                      <span className="text-xs font-extrabold text-[#003262] uppercase tracking-widest block mb-3">Main Subjects</span>
                      <div className="flex flex-wrap gap-2">
                        {["English", "Hindi", "Math", "EVS"].map((sub) => (
                          <span key={sub} className="px-3.5 py-1.5 bg-white border border-gray-300 rounded-lg text-sm font-bold text-gray-800 shadow-sm">
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-5 rounded-xl bg-amber-50/50 border border-amber-200/60">
                      <span className="text-xs font-extrabold text-amber-900 uppercase tracking-widest block mb-3">Additional Subjects</span>
                      <div className="flex flex-wrap gap-2">
                        {["Music", "Dance", "Art & Craft", "Value Based Education", "Quality Circle Time", "Games"].map((sub) => (
                          <span key={sub} className="px-3 py-1.5 bg-white border border-amber-200 rounded-lg text-xs font-semibold text-amber-950 shadow-sm">
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 1. Learning Through Experience */}
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
                  <h5 className="text-lg font-bold text-[#003262] uppercase tracking-wider mb-2 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FDB515]" />
                    Learning Through Experience
                  </h5>
                  <p className="text-gray-500 text-sm mb-6">Hands-on applications converting foundational concepts into memorable life experiences.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60 hover:bg-white hover:shadow-md transition-all">
                      <h6 className="font-bold text-[#003262] text-sm mb-1.5">🌱 Little Agriculturist</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">
                        Children grow their own vegetables, planting, caring and harvesting while learning responsibility, teamwork and sustainability.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60 hover:bg-white hover:shadow-md transition-all">
                      <h6 className="font-bold text-[#003262] text-sm mb-1.5">🛍️ Entrepreneurship for Kids</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">
                        Through pretend shops, role play and creative projects, children explore planning, innovation and value creation in a fun and playful way.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60 hover:bg-white hover:shadow-md transition-all">
                      <h6 className="font-bold text-[#003262] text-sm mb-1.5">⚙️ Early Engineering Kit</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">
                        Hands-on STEM challenges encourage collaborative problem solving and scientific thinking.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60 hover:bg-white hover:shadow-md transition-all">
                      <h6 className="font-bold text-[#003262] text-sm mb-1.5">🔬 Science Experiments</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">
                        Hands-on exploration to observe, question and connect theory with real life.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60 hover:bg-white hover:shadow-md transition-all md:col-span-2 lg:col-span-2">
                      <h6 className="font-bold text-[#003262] text-sm mb-1.5">🔢 Jodo Gyan</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">
                        Concrete tools and real-world applications make math engaging, logical and deeply understood from the early years.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Language, Literacy & Expression */}
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
                  <h5 className="text-lg font-bold text-[#003262] uppercase tracking-wider mb-2 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#003262]" />
                    Language, Literacy & Expression
                  </h5>
                  <p className="text-gray-500 text-sm mb-6">Comprehensive audio-visual, inquiry, and communication programs establishing articulate speech.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">🗣️ Pronunciation Lab</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">Audio-visual aids and repeated practice refine articulation and enhance clarity of speech.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">📖 Reading Program</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">Personalized book choices with facilitator support improve comprehension, vocabulary and reading confidence.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">🎭 Art-Integrated Learning</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">Dance, music, theatre and role play connect academics with Indian art and culture.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">🎙️ LSD (Listening & Speaking Development)</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">Structured sessions create confident communicators for academic and social settings.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">❓ Make Your Questions</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">Chapter-based activities build inquiry skills and deeper engagement.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">📚 Vocabulary Building Words</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">Learning new words from each chapter to enhance language skills and comprehension.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">💬 Conversation Corner</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">Guided dialogues to develop listening and speaking fluency.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">📝 Grammar Corner</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">Fun activities to strengthen grammar and apply it in real communication.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">🧸 Storytelling & Puppet Shows</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">Fosters language development, creativity and emotional intelligence while engaging young learners.</p>
                    </div>
                  </div>
                </div>

                {/* 3. Exploration & Discovery */}
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
                  <h5 className="text-lg font-bold text-[#003262] uppercase tracking-wider mb-2 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FDB515]" />
                    Exploration & Discovery
                  </h5>
                  <p className="text-gray-500 text-sm mb-6">Active outdoor learning connecting environmental awareness and spatial logic.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h6 className="font-bold text-[#003262] text-xs uppercase mb-1">🗝️ Escape Room Challenges</h6>
                      <p className="text-gray-600 text-xs">Problem-solving adventures that boost logic and perseverance.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h6 className="font-bold text-[#003262] text-xs uppercase mb-1">🖼️ Gallery Walk</h6>
                      <p className="text-gray-600 text-xs">Visual presentations in Science & Social Studies for peer learning.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h6 className="font-bold text-[#003262] text-xs uppercase mb-1">🔺 Shape Walk</h6>
                      <p className="text-gray-600 text-xs">Real-world shape hunts to make geometry fun and practical.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h6 className="font-bold text-[#003262] text-xs uppercase mb-1">🌿 Nature Walk</h6>
                      <p className="text-gray-600 text-xs">Observing plants, animals and natural patterns in the environment.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60 sm:col-span-2 lg:col-span-1">
                      <h6 className="font-bold text-[#003262] text-xs uppercase mb-1">📐 Math Walk</h6>
                      <p className="text-gray-600 text-xs">Applying math in real settings to develop spatial awareness.</p>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* ═════════════════════════════════════════════════════════════════
                STAGE 2: PRIMARY STAGE (GRADES III – V)
               ═════════════════════════════════════════════════════════════════ */}
            {activeStage === "primary" && (
              <div className="space-y-8 animate-fadeIn">
                
                {/* Header Banner */}
                <div className="bg-gradient-to-r from-[#003262]/10 via-blue-50 to-white p-6 md:p-8 rounded-2xl border-l-4 border-[#003262] border border-blue-200/60 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <span className="inline-block px-3 py-1 rounded bg-[#003262] text-white font-black text-xs uppercase tracking-wider mb-2">
                      Where Curiosity Meets Capability
                    </span>
                    <h4 className="text-2xl md:text-3xl font-black text-[#003262]" style={{ fontFamily: 'var(--font-heading)' }}>
                      Primary Stage (Grades III–V)
                    </h4>
                    <p className="text-gray-700 text-sm md:text-base mt-2 max-w-3xl">
                      <strong>Pedagogy:</strong> Inquiry-driven and activity-based learning that fosters confidence, creativity and collaborative problem-solving.
                    </p>
                    <p className="text-gray-700 text-sm md:text-base mt-1 max-w-3xl">
                      <strong>Learning Focus:</strong> Hands-on math, science projects, robotics, cultural integration and reading programs that make knowledge meaningful and connected to real life.
                    </p>
                  </div>
                  <Link href="/admissions" className="btn-primary py-2.5 px-6 text-xs font-bold uppercase tracking-wider shrink-0 self-start md:self-center">
                    Enrol in Primary
                  </Link>
                </div>

                {/* Academic Framework (Subjects) */}
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
                  <h5 className="text-lg font-bold text-[#003262] uppercase tracking-wider mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#003262]" />
                    Academic Framework
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 rounded-xl bg-gray-50 border border-gray-200">
                      <span className="text-xs font-extrabold text-[#003262] uppercase tracking-widest block mb-3">Main Subjects</span>
                      <div className="flex flex-wrap gap-2">
                        {["English", "Hindi", "Mathematics", "Social Science", "Science", "Urdu"].map((sub) => (
                          <span key={sub} className="px-3.5 py-1.5 bg-white border border-gray-300 rounded-lg text-sm font-bold text-gray-800 shadow-sm">
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-5 rounded-xl bg-blue-50/50 border border-blue-200/60">
                      <span className="text-xs font-extrabold text-[#003262] uppercase tracking-widest block mb-3">Additional Subjects</span>
                      <div className="flex flex-wrap gap-2">
                        {["Music", "Dance", "Drawing", "Games", "Value Based Education", "G.K.", "Computer", "etc."].map((sub) => (
                          <span key={sub} className="px-3 py-1.5 bg-white border border-blue-200 rounded-lg text-xs font-semibold text-blue-950 shadow-sm">
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 1. Skill-Development and Learning with Experience */}
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
                  <h5 className="text-lg font-bold text-[#003262] uppercase tracking-wider mb-2 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FDB515]" />
                    Skill-Development and Learning with Experience
                  </h5>
                  <p className="text-gray-500 text-sm mb-6">Fostering higher-order analytical capabilities, inquiry, and financial literacy.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">📖 Reading Program</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">Personalized book choices and guided sessions enhance vocabulary, comprehension and a love for reading.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">🎙️ Listening & Speaking Skills</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">Structured LSR sessions and role plays develop confident communicators for academic and social interaction.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">🖼️ Gallery Walk</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">Student-created visual displays in Science and Social Studies spark curiosity and peer learning.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">🧠 Bloom's Taxonomy & Question-Making</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">Students develop higher-order thinking through questions that encourage analysis, evaluation, and creation.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">🔢 Jodo Gyan</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">Hands-on math activities make numbers logical, practical, fun and deeply understood.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">💰 Entrepreneurship & Financial Literacy</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">Independent thinking and financial acumen through hands-on projects in budgeting, planning and innovation.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">🌐 Integrated Approach (IA)</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">Interdisciplinary approach links concepts across subjects for real-world relevance.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">📐 Math Walk</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">Engages students with mathematical concepts in real-world contexts through observation and environmental interaction.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">🌅 Sunrise and Sunset Observation</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">Recording sunrise and sunset timings over time to foster practical understanding of Earth's rotation and seasons.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">📊 Class Project</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">In-depth exploration of topics, developing research, presentation, and collaborative creativity.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60 sm:col-span-2 lg:col-span-2">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">📚 Vocabulary Building Words</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">Learning new words from each chapter to enrich vocabulary, articulation, and reading comprehension.</p>
                    </div>
                  </div>
                </div>

                {/* 2. Innovation & STEM Exposure */}
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
                  <h5 className="text-lg font-bold text-[#003262] uppercase tracking-wider mb-2 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#003262]" />
                    Innovation & STEM Exposure
                  </h5>
                  <p className="text-gray-500 text-sm mb-6">Scientific mindset and engineering design challenges.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 rounded-xl border-l-4 border-l-[#003262] border border-gray-200 bg-gray-50">
                      <h6 className="font-bold text-[#003262] text-base mb-1.5">🔬 Inspirational Stories of Scientists</h6>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Biographies of renowned scientists foster curiosity, resilience and STEM aspirations among young learners.
                      </p>
                    </div>
                    <div className="p-5 rounded-xl border-l-4 border-l-[#FDB515] border border-gray-200 bg-gray-50">
                      <h6 className="font-bold text-[#003262] text-base mb-1.5">⚙️ Early Engineering Kits</h6>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Play-based engineering challenges ignite creative problem-solving, mechanics understanding, and collaborative building.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. Creative Thinking and Problem Solving */}
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
                  <h5 className="text-lg font-bold text-[#003262] uppercase tracking-wider mb-2 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FDB515]" />
                    Creative Thinking and Problem Solving
                  </h5>
                  <p className="text-gray-500 text-sm mb-6">Skill-enrichment booklets and SDG-aligned experiential learning.</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-5 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-black text-[#003262] uppercase tracking-wider block mb-2">Booklet 1</span>
                        <h6 className="font-bold text-gray-900 text-base mb-2">Enrichment Booklet</h6>
                        <ul className="text-gray-600 text-xs space-y-1.5 leading-relaxed">
                          <li>• Competency-based questions (Maths Enrichment Sheet, Asset Assignment)</li>
                          <li>• Logical Reasoning Assignment</li>
                          <li>• Verbal Reasoning Assignment</li>
                          <li>• Global Assignment</li>
                        </ul>
                      </div>
                    </div>

                    <div className="p-5 rounded-xl bg-gradient-to-br from-amber-50/40 to-white border border-amber-200/80 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-black text-amber-800 uppercase tracking-wider block mb-2">Booklet 2</span>
                        <h6 className="font-bold text-gray-900 text-base mb-2">Summer Cool Enjoyment Sheet</h6>
                        <p className="text-gray-600 text-xs leading-relaxed">
                          Interactive, activity-based assignments that are integrated with the United Nations Sustainable Development Goals (SDGs).
                        </p>
                      </div>
                    </div>

                    <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50/40 to-white border border-blue-200/80 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-black text-[#003262] uppercase tracking-wider block mb-2">Booklet 3</span>
                        <h6 className="font-bold text-gray-900 text-base mb-2">Learner&apos;s Corner</h6>
                        <ul className="text-gray-600 text-xs space-y-1.5 leading-relaxed">
                          <li>• Subject-wise booklet of assignments.</li>
                          <li>• An aid to enhance student learning.</li>
                          <li>• Helps students prepare for, understand, and apply concepts.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Stage Toggle Footer */}
            <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setActiveCategory("heritage")}
                className="text-gray-500 hover:text-[#003262] text-xs font-bold uppercase tracking-wider underline cursor-pointer"
              >
                &larr; Back to We are Birla Heritage (Vision, Mission & Spirit)
              </button>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveStage(activeStage === "foundational" ? "primary" : "foundational")}
                  className="btn-outline-primary py-2 px-4 text-xs font-bold uppercase tracking-wider"
                >
                  Switch to {activeStage === "foundational" ? "Primary Stage" : "Foundational Stage"} &rarr;
                </button>
                <Link href="/about-us/curriculum" className="btn-primary py-2 px-5 text-xs font-bold uppercase tracking-wider">
                  Full Curriculum Framework
                </Link>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
