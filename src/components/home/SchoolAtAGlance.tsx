"use client";
import React from "react";
import Link from "next/link";

export default function SchoolAtAGlance() {
  return (
    <section className="w-full py-16 md:py-24 bg-white border-b border-gray-100 relative overflow-hidden">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="section-eyebrow mb-3">Institutional Overview</p>
          <h2 className="heading-xl text-3xl md:text-4xl text-gray-900 mb-4">
            Birla Heritage International School, Siwan
          </h2>
          <div className="accent-line mx-auto"></div>
          <p className="text-gray-600 text-[15px] md:text-[17px] leading-relaxed">
            Restoring the hallmarks of childhood — the Joy of Learning and the Creative Spirit. Fostering holistic student development, active learning, and 21st-century skills in a self-governing environment.
          </p>
        </div>

        {/* 4 Overview Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card-base p-6 flex flex-col items-start border-l-4 border-l-[#003262]">
            <div className="w-12 h-12 rounded-full bg-[#003262]/10 text-[#003262] flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <h3 className="heading-md text-lg text-gray-900 mb-2">Curriculum Spectrum</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Comprehensive academic progression from Nursery through Class 9, building strong foundational literacy and analytical skills.
            </p>
            <Link href="/about-us/curriculum" className="text-[#003262] font-semibold text-xs uppercase tracking-wider hover:text-[#FDB515] transition-colors">
              Explore Curriculum &rarr;
            </Link>
          </div>

          <div className="card-base p-6 flex flex-col items-start border-l-4 border-l-[#FDB515]">
            <div className="w-12 h-12 rounded-full bg-[#FDB515]/20 text-[#003262] flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="heading-md text-lg text-gray-900 mb-2">Pedagogical Approach</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Student-centric, constructive learning that moves from known to unknown, concrete to abstract, and local to global.
            </p>
            <Link href="/about-us/philosophy" className="text-[#003262] font-semibold text-xs uppercase tracking-wider hover:text-[#FDB515] transition-colors">
              Our Philosophy &rarr;
            </Link>
          </div>

          <div className="card-base p-6 flex flex-col items-start border-l-4 border-l-[#003262]">
            <div className="w-12 h-12 rounded-full bg-[#003262]/10 text-[#003262] flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V5a2 2 0 012-2h2a2 2 0 012 2v14" />
              </svg>
            </div>
            <h3 className="heading-md text-lg text-gray-900 mb-2">Campus Environment</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Spacious campus situated at Survey No 813 - 817 Markan, Siwan, offering modern learning spaces and safety.
            </p>
            <Link href="/about-us" className="text-[#003262] font-semibold text-xs uppercase tracking-wider hover:text-[#FDB515] transition-colors">
              About Campus &rarr;
            </Link>
          </div>

          <div className="card-base p-6 flex flex-col items-start border-l-4 border-l-[#FDB515]">
            <div className="w-12 h-12 rounded-full bg-[#FDB515]/20 text-[#003262] flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="heading-md text-lg text-gray-900 mb-2">Visionary Leadership</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Guided by dedicated management committed to academic excellence, character building, and individual growth.
            </p>
            <Link href="/about-us/leadership" className="text-[#003262] font-semibold text-xs uppercase tracking-wider hover:text-[#FDB515] transition-colors">
              Meet Leadership &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
