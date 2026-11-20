"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function SchoolAtAGlance() {
  const [activeCategory, setActiveCategory] = useState<"heritage" | "grow" | "thrive" | "admissions">("heritage");
  const [activeStage, setActiveStage] = useState<"foundational" | "primary" | "middle" | "senior">("foundational");

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
        <div className="text-center max-w-5xl mx-auto mb-10 md:mb-14">
          {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FDB515]/15 border border-[#FDB515]/30 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#FDB515] animate-pulse" />
            <span className="text-[#003262] font-black text-xs md:text-sm tracking-widest uppercase">
              We are Birla Heritage
            </span>
          </div> */}

          <h2 className="heading-xl text-3xl sm:text-4xl md:text-5xl text-gray-900 mb-5 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            Nurturing Enlightened Humanity & Academic Excellence
          </h2>
          <div className="w-24 h-1 bg-[#FDB515] mx-auto mb-6 rounded-full" />
          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-3xl mx-auto font-light">
            Founded on the eternal conviction that every child is a triumph of nature. Explore who we are through our guiding ethos, and how we grow through our experiential IGNITE pedagogy.
          </p>

          {/* ── Four Main Categories Tab Switcher (Single Line) ── */}
          <div className="w-full flex justify-center mt-8 overflow-x-auto py-2 scrollbar-none">
            <div className="inline-flex items-center p-1.5 bg-gray-100 rounded-2xl border border-gray-200/80 shadow-inner flex-nowrap whitespace-nowrap gap-1">
              <button
                type="button"
                onClick={() => setActiveCategory("heritage")}
                className={`flex items-center gap-2 px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 rounded-xl font-extrabold text-[11px] sm:text-xs md:text-[13px] uppercase tracking-wider transition-all duration-300 cursor-pointer shrink-0 ${
                  activeCategory === "heritage"
                    ? "bg-[#003262] text-white shadow-lg shadow-[#003262]/25 scale-[1.02]"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
                }`}
              >
                <span className={`w-2 h-2 rounded-full shrink-0 ${activeCategory === "heritage" ? "bg-[#FDB515]" : "bg-gray-400"}`} />
                <span>We are Birla Heritage</span>
              </button>
              
              <button
                type="button"
                onClick={() => setActiveCategory("grow")}
                className={`flex items-center gap-2 px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 rounded-xl font-extrabold text-[11px] sm:text-xs md:text-[13px] uppercase tracking-wider transition-all duration-300 cursor-pointer shrink-0 ${
                  activeCategory === "grow"
                    ? "bg-[#003262] text-white shadow-lg shadow-[#003262]/25 scale-[1.02]"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
                }`}
              >
                <span className={`w-2 h-2 rounded-full shrink-0 ${activeCategory === "grow" ? "bg-[#FDB515]" : "bg-gray-400"}`} />
                <span>How We Grow (IGNITE)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory("thrive")}
                className={`flex items-center gap-2 px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 rounded-xl font-extrabold text-[11px] sm:text-xs md:text-[13px] uppercase tracking-wider transition-all duration-300 cursor-pointer shrink-0 ${
                  activeCategory === "thrive"
                    ? "bg-[#003262] text-white shadow-lg shadow-[#003262]/25 scale-[1.02]"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
                }`}
              >
                <span className={`w-2 h-2 rounded-full shrink-0 ${activeCategory === "thrive" ? "bg-[#FDB515]" : "bg-gray-400"}`} />
                <span>THRIVE – Beyond Academics</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory("admissions")}
                className={`flex items-center gap-2 px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 rounded-xl font-extrabold text-[11px] sm:text-xs md:text-[13px] uppercase tracking-wider transition-all duration-300 cursor-pointer shrink-0 ${
                  activeCategory === "admissions"
                    ? "bg-[#003262] text-white shadow-lg shadow-[#003262]/25 scale-[1.02]"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
                }`}
              >
                <span className={`w-2 h-2 rounded-full shrink-0 ${activeCategory === "admissions" ? "bg-[#FDB515]" : "bg-gray-400"}`} />
                <span>ADMISSION</span>
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

              <div className="inline-flex p-1 bg-gray-100 rounded-xl border border-gray-200 shrink-0 flex-wrap sm:flex-nowrap">
                <button
                  type="button"
                  onClick={() => setActiveStage("foundational")}
                  className={`px-3 sm:px-4 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    activeStage === "foundational"
                      ? "bg-[#003262] text-white shadow"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Foundational (Nursery–Gr II)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStage("primary")}
                  className={`px-3 sm:px-4 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    activeStage === "primary"
                      ? "bg-[#003262] text-white shadow"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Primary (Grades III–V)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStage("middle")}
                  className={`px-3 sm:px-4 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    activeStage === "middle"
                      ? "bg-[#003262] text-white shadow"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Middle (Grades VI–VIII)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStage("senior")}
                  className={`px-3 sm:px-4 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    activeStage === "senior"
                      ? "bg-[#003262] text-white shadow"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Senior (Grades IX–X)
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
                        <h6 className="font-bold text-gray-900 text-base mb-2">Learner&apos;s Comate</h6>
                        <ul className="text-gray-600 text-xs space-y-1.5 leading-relaxed">
                          <li>• Subject-wise booklet of assignments.</li>
                          <li>• An aid to enhance student learning.</li>
                          <li>• Helps students to prepare for and understand lessons, and apply concepts.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Value & Cultural Integration */}
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
                  <h5 className="text-lg font-bold text-[#003262] uppercase tracking-wider mb-2 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#003262]" />
                    Value & Cultural Integration
                  </h5>
                  <p className="text-gray-500 text-sm mb-6">Instilling cultural grounding, national pride, and global responsibility through experiential arts.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">🕉️ Shlok / Doha Recitation</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">
                        Builds focus and pronunciation, and provides cultural grounding and clarity of speech.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">🇮🇳 Know Your Country</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">
                        Map work and presentations inspire patriotism, cultural appreciation, and geographic awareness.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">🎭 Art-Integrated Learning (AIL)</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">
                        Dance, music, theatre, and role play bring academics alive while celebrating Indian art and culture.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">🎨 Art-Integrated Project</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">
                        CBSE-aligned cultural themes integrate subjects while developing research, critical thinking, teamwork, and presentation skills.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60 md:col-span-2 lg:col-span-2">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">🌍 SDG Integration</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">
                        UN Sustainable Development Goals integrated into assignments develop globally-minded, environmentally responsible, and empathetic students.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 5. Holistic Growth & Evaluation */}
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
                  <h5 className="text-lg font-bold text-[#003262] uppercase tracking-wider mb-2 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FDB515]" />
                    Holistic Growth & Evaluation
                  </h5>
                  <p className="text-gray-500 text-sm mb-6">Continuous 360-degree assessment mapping scholastic and co-scholastic progress.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 rounded-xl border-l-4 border-l-[#003262] border border-gray-200 bg-gray-50">
                      <h6 className="font-bold text-[#003262] text-base mb-1.5">📋 Holistic Progress Card (HPC)</h6>
                      <p className="text-gray-700 text-xs leading-relaxed">
                        A holistic progress report card helps students by providing comprehensive feedback on all aspects of their development, enabling personalized learning and well-rounded growth beyond academics.
                      </p>
                    </div>
                    <div className="p-5 rounded-xl border-l-4 border-l-[#FDB515] border border-gray-200 bg-gray-50">
                      <h6 className="font-bold text-[#003262] text-base mb-1.5">📝 Regular & Annual Assessments</h6>
                      <p className="text-gray-700 text-xs leading-relaxed">
                        Monthly, Half-Yearly, and Annual Assessments. Regular assessments help in monitoring progress, identifying learning gaps, and ensuring holistic student growth.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* ═════════════════════════════════════════════════════════════════
                STAGE 3: MIDDLE STAGE (GRADES VI – VIII)
               ═════════════════════════════════════════════════════════════════ */}
            {activeStage === "middle" && (
              <div className="space-y-8 animate-fadeIn">
                
                {/* Header Banner */}
                <div className="bg-gradient-to-r from-[#003262]/10 via-amber-50/50 to-white p-6 md:p-8 rounded-2xl border-l-4 border-[#003262] border border-blue-200/60 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <span className="inline-block px-3 py-1 rounded bg-[#003262] text-white font-black text-xs uppercase tracking-wider mb-2">
                      Academic Approach & Innovation
                    </span>
                    <h4 className="text-2xl md:text-3xl font-black text-[#003262]" style={{ fontFamily: 'var(--font-heading)' }}>
                      Middle Stage (Grades VI–VIII)
                    </h4>
                    <p className="text-gray-700 text-sm md:text-base mt-2 max-w-3xl">
                      <strong>Pedagogy:</strong> Competency-based learning with a strong emphasis on critical thinking, innovation, and self-reliance.
                    </p>
                    <p className="text-gray-700 text-sm md:text-base mt-1 max-w-3xl">
                      <strong>Learning Focus:</strong> Design thinking, financial literacy, and interdisciplinary projects that encourage innovation and independence.
                    </p>
                  </div>
                  <Link href="/admissions" className="btn-primary py-2.5 px-6 text-xs font-bold uppercase tracking-wider shrink-0 self-start md:self-center">
                    Enrol in Middle Stage
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
                        {[
                          "English", "Hindi", "Sanskrit", "Urdu",
                          "Mathematics", "Physics", "Chemistry", "Biology",
                          "History", "Civics", "Geography"
                        ].map((sub) => (
                          <span key={sub} className="px-3.5 py-1.5 bg-white border border-gray-300 rounded-lg text-sm font-bold text-gray-800 shadow-sm">
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-5 rounded-xl bg-blue-50/50 border border-blue-200/60">
                      <span className="text-xs font-extrabold text-[#003262] uppercase tracking-widest block mb-3">Additional Subjects</span>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Music", "Dance", "Drawing", "Games",
                          "Value Education", "Career Awareness", "Skill Based Education",
                          "Robotics", "GK", "Computer", "etc."
                        ].map((sub) => (
                          <span key={sub} className="px-3 py-1.5 bg-white border border-blue-200 rounded-lg text-xs font-semibold text-blue-950 shadow-sm">
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 1. Skill-Based Education and Learning with Experience */}
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
                  <h5 className="text-lg font-bold text-[#003262] uppercase tracking-wider mb-2 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FDB515]" />
                    Skill-Based Education & Learning with Experience
                  </h5>
                  <p className="text-gray-500 text-sm mb-6">Empowering students with practical knowledge, design thinking, and 21st-century competencies.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">💡 Skill-Based Education</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">Design thinking empowers students with practical knowledge and 21st-century skills for real-world success.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">🎙️ Listening & Speaking Skills</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">Structured sessions and role-plays help students become confident communicators who actively participate in academic and social settings.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">🧠 Bloom’s Taxonomy & Question-Making</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">Through question-making activities, students develop higher-order thinking, encouraging analysis, evaluation, creation, and self-driven inquiry.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">🔢 Jodo Gyan</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">Hands-on math activities make numbers logical, practical, fun, and deeply understood.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">📐 Math Walk</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">Assignments are designed to engage students with mathematical concepts in a real-world context through observation and interaction with their environment.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">📊 Class Project</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">Students explore a topic in depth, develop research and presentation skills, and showcase their creativity.</p>
                    </div>
                  </div>
                </div>

                {/* 2. Value & Cultural Integration */}
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
                  <h5 className="text-lg font-bold text-[#003262] uppercase tracking-wider mb-2 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#003262]" />
                    Value & Cultural Integration
                  </h5>
                  <p className="text-gray-500 text-sm mb-6">Bridging heritage and contemporary learning through experiential expeditions and culture.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">🕉️ Shlok / Doha Recitation</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">Builds focus and pronunciation, and provides cultural grounding and clarity of speech.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">🇮🇳 Know Your Country</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">Map work and presentations inspire patriotism, cultural awareness, and geographic insight.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">🏛️ History Expedition</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">Brings the past alive with field visits, artifacts analysis, and experiential historical learning.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">🎭 Art Integrated Learning (AIL)</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">Academics come alive through dance, music, role play, and theatre, connecting the curriculum with art and cultural expression.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">🎨 Art Integrated Project</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">CBSE-aligned cultural themes integrate subjects while developing research, critical thinking, teamwork, and presentation skills.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">🌍 SDG Integration</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">Develops globally minded, responsible students sensitive to sustainable community development.</p>
                    </div>
                  </div>
                </div>

                {/* 3. Assessment & Evaluation */}
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
                  <h5 className="text-lg font-bold text-[#003262] uppercase tracking-wider mb-2 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FDB515]" />
                    Assessment & Evaluation
                  </h5>
                  <p className="text-gray-500 text-sm mb-6">Continuous and comprehensive evaluation measuring competence and conceptual clarity.</p>

                  <div className="p-5 rounded-xl border-l-4 border-l-[#003262] border border-gray-200 bg-gray-50">
                    <h6 className="font-bold text-[#003262] text-base mb-1.5">📝 Weekly / Monthly, Half Yearly & Annual Assessments</h6>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Regular assessments help in monitoring progress, identifying learning gaps, and ensuring holistic student growth across scholastic and co-scholastic domains.
                    </p>
                  </div>
                </div>

              </div>
            )}

            {/* ═════════════════════════════════════════════════════════════════
                STAGE 4: SENIOR STAGE (GRADES IX – X)
               ═════════════════════════════════════════════════════════════════ */}
            {activeStage === "senior" && (
              <div className="space-y-8 animate-fadeIn">
                
                {/* Header Banner */}
                <div className="bg-gradient-to-r from-[#003262]/10 via-amber-50/50 to-white p-6 md:p-8 rounded-2xl border-l-4 border-[#003262] border border-blue-200/60 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="inline-block px-3 py-1 rounded bg-[#003262] text-white font-black text-xs uppercase tracking-wider">
                        IGNITE
                      </span>
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                        Empowering Futures • Igniting Minds • Creating Global Citizens
                      </span>
                    </div>
                    <h4 className="text-2xl md:text-3xl font-black text-[#003262]" style={{ fontFamily: 'var(--font-heading)' }}>
                      Senior Stage (Grades IX–X)
                    </h4>
                    <p className="text-gray-700 text-sm md:text-base mt-2 max-w-3xl">
                      <strong>Pedagogy:</strong> A blend of personalized mentoring and future-focused academics that shapes lifelong learners and future-ready leaders.
                    </p>
                    <p className="text-gray-700 text-sm md:text-base mt-1 max-w-3xl">
                      <strong>Learning Focus:</strong> Career guidance, internships, competitive exam training, and global exposure equip learners with real-world readiness and leadership skills.
                    </p>
                  </div>
                  <Link href="/admissions" className="btn-primary py-2.5 px-6 text-xs font-bold uppercase tracking-wider shrink-0 self-start md:self-center">
                    Enrol in Senior Stage
                  </Link>
                </div>

                {/* Academic Framework (CBSE Curriculum) */}
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
                  <h5 className="text-lg font-bold text-[#003262] uppercase tracking-wider mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#003262]" />
                    Academic Framework – CBSE Curriculum (Classes IX–X)
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 rounded-xl bg-gray-50 border border-gray-200">
                      <span className="text-xs font-extrabold text-[#003262] uppercase tracking-widest block mb-3">Main Subjects</span>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "English", "Hindi", "Sanskrit", "Urdu",
                          "Mathematics", "Physics", "Chemistry", "Biology",
                          "History", "Civics", "Geography", "Economics"
                        ].map((sub) => (
                          <span key={sub} className="px-3.5 py-1.5 bg-white border border-gray-300 rounded-lg text-sm font-bold text-gray-800 shadow-sm">
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-5 rounded-xl bg-blue-50/50 border border-blue-200/60">
                      <span className="text-xs font-extrabold text-[#003262] uppercase tracking-widest block mb-3">CCA (Co-Curricular Activities)</span>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Art Education", "Work Education", "Physical Education"
                        ].map((sub) => (
                          <span key={sub} className="px-3.5 py-1.5 bg-white border border-blue-200 rounded-lg text-xs font-bold text-blue-950 shadow-sm">
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 1. The Birla Heritage Edge – What Sets Us Apart */}
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
                  <h5 className="text-lg font-bold text-[#003262] uppercase tracking-wider mb-2 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FDB515]" />
                    The Birla Heritage Edge – What Sets Us Apart
                  </h5>
                  <p className="text-gray-500 text-sm mb-6">Real-world internships, skill mastery, and innovative problem solving.</p>

                  <div className="p-5 rounded-xl border-l-4 border-l-[#003262] border border-gray-200 bg-gradient-to-r from-blue-50/40 via-white to-gray-50 mb-6">
                    <h6 className="font-bold text-[#003262] text-base mb-1.5">🚀 Internship Programmes</h6>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      We offer real-world exposure through various clubs of our school, including <strong>Coding, Debate, Literature, and many more</strong>, to foster diverse interests and leadership readiness.
                    </p>
                  </div>

                  <h6 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Skill-Based & Experiential</h6>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">⏱️ Time Management Mastery</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">Teaches productivity skills essential for both academics and real-world success.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">📐 Math Walk</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">Students engage with and learn mathematical concepts by observing and interacting with real-world environments.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">✨ Golden Ratio</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">An exploration of the beauty and harmony of numbers, including their presence in art, nature, and design.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">🎙️ ASL (Speaking & Listening)</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">Activities for Speaking & Listening develop confident articulation and active listening skills.</p>
                    </div>
                  </div>

                  <h6 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Creative Thinking, Competency Based & Problem Solving</h6>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">📚 Enrichment Booklets</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">Competency-Based questions, Logical Reasoning, and Olympiad Preparation.</p>
                    </div>
                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">📖 Learner’s Comate</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">Concept-based assignments specifically designed for deeper learning and mastery.</p>
                    </div>
                  </div>
                </div>

                {/* 2. Creative & Cultural Integration */}
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
                  <h5 className="text-lg font-bold text-[#003262] uppercase tracking-wider mb-2 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#003262]" />
                    Creative & Cultural Integration
                  </h5>
                  <p className="text-gray-500 text-sm mb-6">Holistic interdisciplinarity merging academics with fine arts and reading habits.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">🎭 Art Integrated Learning (AIL)</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">Merges academics with visual arts, drama, dance, and mock parliament to make learning more engaging.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">🎨 Art Integrated Projects (AIP)</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">Investigatory projects guided by CBSE connecting curriculum subjects through art.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">📖 Reading for Pleasure (RFP)</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">A specialized program dedicated to cultivating lifelong reading habits.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">🌐 Interdisciplinary Projects (IDP)</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">Blends multiple subjects into one cohesive activity for holistic conceptual understanding.</p>
                    </div>
                  </div>
                </div>

                {/* 3. Labs & Conclave – Centres of Exploration & Experiential Tools */}
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
                  <h5 className="text-lg font-bold text-[#003262] uppercase tracking-wider mb-2 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FDB515]" />
                    Labs & Conclave – Centres of Exploration
                  </h5>
                  <p className="text-gray-500 text-sm mb-6">
                    Beyond books, interactive learning journeys promote academic excellence, collaborative bonding, and motor skills refinement.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">⚡ Physics Lab</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">A space for practical experiments bringing physical laws and kinematics to life.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">🧪 Chemistry Lab</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">Provides hands-on experience with chemical reactions, titrations, and molecular innovations.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">🔬 Biology Lab</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">Dedicated to exploring life sciences, cellular structures, and botanical research.</p>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/60">
                      <h6 className="font-bold text-[#003262] text-sm mb-1">💻 Computer Lab</h6>
                      <p className="text-gray-600 text-xs leading-relaxed">A cutting-edge hub for programming, Artificial Intelligence, and digital creativity.</p>
                    </div>
                  </div>

                  <div className="p-5 rounded-xl border-l-4 border-l-[#FDB515] border border-gray-200 bg-amber-50/40">
                    <h6 className="font-bold text-[#003262] text-sm mb-1">🏛️ ETM (Education Through Monuments)</h6>
                    <p className="text-gray-700 text-xs leading-relaxed">
                      Connects historical events with rich cultural heritage through site visits, architectural inquiry, and hands-on investigative research.
                    </p>
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
                  onClick={() => {
                    if (activeStage === "foundational") setActiveStage("primary");
                    else if (activeStage === "primary") setActiveStage("middle");
                    else if (activeStage === "middle") setActiveStage("senior");
                    else setActiveStage("foundational");
                  }}
                  className="btn-outline-primary py-2 px-4 text-xs font-bold uppercase tracking-wider"
                >
                  Next: {
                    activeStage === "foundational" ? "Primary Stage" :
                    activeStage === "primary" ? "Middle Stage" :
                    activeStage === "middle" ? "Senior Stage" : "Foundational Stage"
                  } &rarr;
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCategory("thrive")}
                  className="btn-primary py-2 px-5 text-xs font-bold uppercase tracking-wider"
                >
                  Explore THRIVE (Beyond Academics) &rarr;
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════
            OPTION 3: THRIVE – BEYOND ACADEMICS (Parallel Curriculum)
           ══════════════════════════════════════════════════════════════════════ */}
        {activeCategory === "thrive" && (
          <div className="animate-fadeIn space-y-10">

            {/* Hero Banner */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#003262] via-[#002244] to-[#001428] rounded-3xl p-8 sm:p-12 text-white shadow-2xl border-t-4 border-[#FDB515]">
              <div className="relative z-10 max-w-4xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FDB515]/20 border border-[#FDB515]/40 mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#FDB515] animate-pulse" />
                  <span className="text-[#FDB515] font-black text-xs uppercase tracking-widest">
                    Parallel Curriculum
                  </span>
                </div>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                  THRIVE – Beyond Academics
                </h3>
                <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-3xl">
                  At Birla Heritage, education is more than academics—it is about discovering passions, honing skills, and building character. Thrive represents our parallel curriculum, offering a rich blend of sports, arts, clubs, leadership platforms, and experiential learning opportunities.
                </p>
                <p className="text-blue-200/90 text-sm sm:text-base leading-relaxed max-w-3xl mt-3">
                  Students participate in focused activities, co-curricular events, evening sports, debates, creative writing, music, skill camps, and community projects. These experiences allow them to explore interests, uncover hidden talents, and build resilience.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/admissions" className="btn-primary py-3 px-8 text-sm font-bold uppercase tracking-wider">
                    Join Birla Heritage &rarr;
                  </Link>
                  <button
                    type="button"
                    onClick={() => setActiveCategory("grow")}
                    className="px-6 py-3 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    View Academic Stages (IGNITE)
                  </button>
                </div>
              </div>
            </div>

            {/* Pedagogy & Approach Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm border-l-4 border-l-[#003262]">
                <div className="w-12 h-12 rounded-xl bg-[#003262]/10 text-[#003262] flex items-center justify-center font-black text-xl mb-4">
                  🎯
                </div>
                <h4 className="text-xl font-bold text-[#003262] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                  Choice-Based, Skill-Focused & Mentor-Led Pedagogy
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Thrive is built on a choice-based, skill-focused, and mentor-led approach. Students select from a wide range of clubs and activities, each guided by expert mentors in small groups to ensure deep, personalized learning.
                </p>
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100 text-center">
                  <div className="p-2.5 bg-gray-50 rounded-lg">
                    <span className="block text-xs font-bold text-[#003262]">Choice-Based</span>
                    <span className="text-[11px] text-gray-500">Student agency</span>
                  </div>
                  <div className="p-2.5 bg-gray-50 rounded-lg">
                    <span className="block text-xs font-bold text-[#003262]">Skill-Focused</span>
                    <span className="text-[11px] text-gray-500">21st-century</span>
                  </div>
                  <div className="p-2.5 bg-gray-50 rounded-lg">
                    <span className="block text-xs font-bold text-[#003262]">Mentor-Led</span>
                    <span className="text-[11px] text-gray-500">Small cohorts</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm border-l-4 border-l-[#FDB515]">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-black text-xl mb-4">
                  🌟
                </div>
                <h4 className="text-xl font-bold text-[#003262] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                  Cultural Weeks, Camps & Co-Curricular Initiatives
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Festivals, cultural weeks, camps, and co-curricular initiatives further enrich their journey—nurturing confidence, creativity, teamwork, and leadership across all grades.
                </p>
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
                  <div className="p-2.5 bg-amber-50/50 rounded-lg border border-amber-200/50">
                    <span className="block text-xs font-bold text-amber-900">Confidence & Creativity</span>
                    <span className="text-[11px] text-amber-800/80">Expressive arts & stages</span>
                  </div>
                  <div className="p-2.5 bg-amber-50/50 rounded-lg border border-amber-200/50">
                    <span className="block text-xs font-bold text-amber-900">Teamwork & Leadership</span>
                    <span className="text-[11px] text-amber-800/80">Collaborative platforms</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Thrive Pillars Grid */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-sm">
              <div className="text-center max-w-2xl mx-auto mb-8">
                <span className="text-xs font-extrabold text-[#FDB515] uppercase tracking-widest block mb-1">Pillars of Exploration</span>
                <h4 className="text-2xl font-black text-[#003262]" style={{ fontFamily: 'var(--font-heading)' }}>
                  What Students Experience in Thrive
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-gray-50/70 border border-gray-200 hover:shadow-md transition-all">
                  <span className="text-2xl mb-2 block">⚽</span>
                  <h5 className="font-bold text-[#003262] text-sm mb-1.5">Evening Sports & Fitness</h5>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    Athletics, football, cricket, basketball, badminton, and yoga building athletic stamina and physical resilience.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-gray-50/70 border border-gray-200 hover:shadow-md transition-all">
                  <span className="text-2xl mb-2 block">🎭</span>
                  <h5 className="font-bold text-[#003262] text-sm mb-1.5">Performing & Visual Arts</h5>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    Music, dance, theatre, classical arts, and creative exhibitions fostering aesthetic appreciation.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-gray-50/70 border border-gray-200 hover:shadow-md transition-all">
                  <span className="text-2xl mb-2 block">🎙️</span>
                  <h5 className="font-bold text-[#003262] text-sm mb-1.5">Debates & Literature Club</h5>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    Creative writing, elocution, Model UN, and parliamentary debates creating articulate, persuasive thinkers.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-gray-50/70 border border-gray-200 hover:shadow-md transition-all">
                  <span className="text-2xl mb-2 block">🤝</span>
                  <h5 className="font-bold text-[#003262] text-sm mb-1.5">Community & Skill Camps</h5>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    Social outreach, environmental stewardship, SDG action projects, and specialized life-skill bootcamps.
                  </p>
                </div>
              </div>
            </div>

            {/* Back to other sections footer */}
            <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setActiveCategory("grow")}
                className="text-gray-500 hover:text-[#003262] text-xs font-bold uppercase tracking-wider underline cursor-pointer"
              >
                &larr; Back to Academic Framework (IGNITE)
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory("admissions")}
                className="btn-primary py-2.5 px-6 text-xs font-bold uppercase tracking-wider"
              >
                View Admission Criteria & Guidelines &rarr;
              </button>
            </div>

          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════
            OPTION 4: ADMISSION (Age Criteria, Documents, Deadlines & Contacts)
           ══════════════════════════════════════════════════════════════════════ */}
        {activeCategory === "admissions" && (
          <div className="animate-fadeIn space-y-10">

            {/* Hero Header */}
            <div className="bg-gradient-to-r from-[#003262] via-[#002855] to-[#001f3f] rounded-3xl p-8 sm:p-12 text-white shadow-xl border-t-4 border-[#FDB515]">
              <div className="max-w-4xl">
                <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#FDB515]/20 border border-[#FDB515]/40 text-[#FDB515] font-black text-xs uppercase tracking-widest mb-4">
                  Admissions Open 2027–28
                </span>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                  Admission Criteria & Guidelines
                </h3>
                <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-3xl">
                  Clear, transparent guidelines designed to ensure every applicant is placed in an age-appropriate learning environment with seamless documentation support.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/admissions" className="btn-primary py-3 px-8 text-sm font-bold uppercase tracking-wider shadow-lg">
                    Fill Online Admission Form &rarr;
                  </Link>
                  <Link href="/contact-us" className="px-6 py-3 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-all">
                    Contact Admissions Office
                  </Link>
                </div>
              </div>
            </div>

            {/* Grid 1: Age Criteria & Deadlines */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Age Criteria Table Card */}
              <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-gray-200">
                    <div>
                      <h4 className="text-2xl font-black text-[#003262]" style={{ fontFamily: 'var(--font-heading)' }}>
                        Age Criteria
                      </h4>
                      <p className="text-gray-500 text-xs sm:text-sm mt-1">
                        Candidates must fulfil the following age criteria as on <strong className="text-gray-800">31st July</strong>.
                      </p>
                    </div>
                    <span className="self-start sm:self-center px-3.5 py-1.5 bg-amber-50 text-[#003262] text-xs font-black rounded-lg border border-amber-200/80 shadow-sm whitespace-nowrap">
                      📅 As on 31st July
                    </span>
                  </div>

                  {/* High Visibility Structured Table */}
                  <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead>
                        <tr className="bg-[#003262] text-white text-xs uppercase tracking-wider font-extrabold">
                          <th className="py-3.5 px-5 font-bold border-r border-[#002244]">Class / Grade</th>
                          <th className="py-3.5 px-5 font-bold text-center sm:text-left">Minimum Required Age</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 text-gray-800">
                        {[
                          { grade: "Nursery", age: "3 years" },
                          { grade: "KG – I (JKG)", age: "4 years" },
                          { grade: "KG – II (SKG)", age: "5 years" },
                          { grade: "Class I", age: "6 years" },
                          { grade: "Class II", age: "7 years" },
                          { grade: "Class III", age: "8 years" },
                          { grade: "Class IV", age: "9 years" },
                          { grade: "Class V", age: "10 years" },
                          { grade: "Class VI", age: "11 years" },
                          { grade: "Class VII", age: "12 years" },
                          { grade: "Class VIII", age: "13 years" },
                          { grade: "Class IX", age: "14 years" },
                        ].map((row, idx) => (
                          <tr
                            key={row.grade}
                            className={`transition-colors hover:bg-amber-50/40 ${
                              idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                            }`}
                          >
                            <td className="py-3 px-5 font-extrabold text-[#003262] text-sm border-r border-gray-200">
                              {row.grade}
                            </td>
                            <td className="py-3 px-5 font-bold text-gray-900 text-sm">
                              <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#003262] border border-blue-200/60 font-black text-xs sm:text-sm">
                                {row.age}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Deadlines & Important Rules */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                
                <div className="bg-gradient-to-br from-amber-500/10 via-amber-50 to-white p-6 sm:p-8 rounded-3xl border border-amber-200 shadow-sm border-l-4 border-l-[#FDB515]">
                  <span className="text-xs font-black text-amber-900 uppercase tracking-widest block mb-2">Important Deadlines</span>
                  <h4 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                    Deadline for Admission
                  </h4>
                  <ul className="space-y-3 text-sm text-gray-700 leading-relaxed">
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-500 font-bold text-base mt-[-2px]">•</span>
                      <span>The seat gets <strong>automatically cancelled</strong> if admission is not taken within <strong>7 days</strong> of the result declaration.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#003262] font-bold text-base mt-[-2px]">•</span>
                      <span>In general, there is <strong>no last date</strong> for submitting an application for admission. It completely depends on the availability of seats.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm border-l-4 border-l-[#003262]">
                  <span className="text-xs font-black text-[#003262] uppercase tracking-widest block mb-2">Contact Admissions Office</span>
                  <h4 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                    Need Assistance?
                  </h4>
                  <div className="space-y-3 text-sm text-gray-600">
                    <p className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-[#003262]/10 text-[#003262] flex items-center justify-center text-sm font-bold">📞</span>
                      <span>+91 91228 99149 / +91 76338 00196</span>
                    </p>
                    <p className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-[#003262]/10 text-[#003262] flex items-center justify-center text-sm font-bold">✉️</span>
                      <span>info@birlaheritagesiwan.com</span>
                    </p>
                    <p className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-[#003262]/10 text-[#003262] flex items-center justify-center text-sm font-bold">📍</span>
                      <span>Birla Heritage International School, Siwan, Bihar</span>
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <Link href="/admissions" className="btn-primary w-full py-2.5 text-xs font-bold uppercase tracking-wider text-center block">
                      Go to Online Admission Form &rarr;
                    </Link>
                  </div>
                </div>

              </div>

            </div>

            {/* Documents Required */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-3 h-8 bg-[#003262] rounded-full" />
                <div>
                  <h4 className="text-2xl font-black text-[#003262]" style={{ fontFamily: 'var(--font-heading)' }}>
                    Documents Required
                  </h4>
                  <p className="text-gray-500 text-xs mt-0.5">Please ensure all required original documents and certificates are arranged on time.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-gray-50/80 border border-gray-200">
                  <span className="text-2xl mb-2 block">📜</span>
                  <h5 className="font-bold text-[#003262] text-sm mb-2">Birth Certificate / T.C.</h5>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    A student must produce evidence of date of birth (Birth Certificate) for <strong>Nursery to Class I</strong>, and a <strong>T.C.</strong> of the previous school from <strong>Class I upwards</strong> by the second week of April, failing which admission will stand cancelled.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-gray-50/80 border border-gray-200">
                  <span className="text-2xl mb-2 block">📑</span>
                  <h5 className="font-bold text-[#003262] text-sm mb-2">Previous Mark Sheet</h5>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    The original and photocopy of the previous school&apos;s mark sheet needs to be submitted by the <strong>second week of April</strong>, failing which the admission will stand cancelled.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-gray-50/80 border border-gray-200">
                  <span className="text-2xl mb-2 block">🖋️</span>
                  <h5 className="font-bold text-[#003262] text-sm mb-2">District Countersign (Class VII+)</h5>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    The school leaving certificate of a student joining school from <strong>Class VII upwards</strong> must be countersigned by the educational authorities of the district in which the previous school is situated.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-gray-50/80 border border-gray-200">
                  <span className="text-2xl mb-2 block">🏫</span>
                  <h5 className="font-bold text-[#003262] text-sm mb-2">Same School TC & Marksheet</h5>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    The Transfer Certificate (TC) and Marksheet have to be issued by the <strong>exact same previous school</strong>.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-gray-50/80 border border-gray-200 md:col-span-2 lg:col-span-2">
                  <span className="text-2xl mb-2 block">⚠️</span>
                  <h5 className="font-bold text-[#003262] text-sm mb-2">Class Placement Strictness</h5>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    Please note that a student will be admitted <strong>only to the class mentioned on the transfer certificate</strong> and to no higher class, nor will a student be promoted before the end of a regular school calendar year.
                  </p>
                </div>
              </div>
            </div>

            {/* Back to other sections footer */}
            <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setActiveCategory("heritage")}
                className="text-gray-500 hover:text-[#003262] text-xs font-bold uppercase tracking-wider underline cursor-pointer"
              >
                &larr; Back to We are Birla Heritage
              </button>
              <Link href="/admissions" className="btn-primary py-2.5 px-6 text-xs font-bold uppercase tracking-wider">
                Open Admission Form &rarr;
              </Link>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
