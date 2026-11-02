"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const BACKEND_URL =
  (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '')) ||
  'http://localhost:5000';

interface DisplayMessage {
  id: number | string;
  title: string;
  name: string;
  role: string;
  gender: string;
  content: string[];
}

// 1. Primary Leadership: Chairman, Director, Principal
const STATIC_CORE_LEADERS: DisplayMessage[] = [
  {
    id: 1,
    title: "Chairman's Message",
    name: "Nitya Singh",
    role: "Chairman",
    gender: "female",
    content: [
      "Education is the manifestation of perfection already in man, as Swami Vivekananda once said. At Birla Heritage International School Siwan, we have taken it upon ourselves to unlock this latent perfection and talent in every child under our care.",
      "Nitya Singh is a seasoned technology leader with 16 years of management experience at Microsoft. She holds a post-graduate degree in Computer Science from Hyderabad Central University, where she graduated with distinction. She is passionate about creating innovative solutions and mentoring young professionals.",
      "Our vision is to empower young minds with knowledge, character, and 21st-century skills, preparing them to excel in an interconnected global world while remaining grounded in our rich cultural values."
    ]
  },
  {
    id: 2,
    title: "Director's Message",
    name: "Subash Singh",
    role: "Director",
    gender: "male",
    content: [
      "The goal of Birla Heritage International School is to give kids a smooth learning environment so they can reach their greatest potential. We wanted to offer something special where a child can examine all options before starting the journey of academic learning.",
      "In order to ensure that a person's creativity and learning are unrestricted, we sought to maintain the formative years as open and inclusive as possible."
    ]
  },
  {
    id: 3,
    title: "Principal's Message",
    name: "Office of the Principal",
    role: "Principal",
    gender: "neutral",
    content: [
      "Welcome to Birla Heritage International School Siwan. Our vision is to foster an inspiring academic atmosphere that nurtures curiosity, character development, and future-ready skills in every student.",
      "Committed to constructive pedagogy, holistic learning, and empowering every child to evolve into the best version of themselves."
    ]
  }
];

// 2. Academic Administration & Coordination: Vice Principal & School Coordinator
const STATIC_ACADEMIC_LEADERS: DisplayMessage[] = [
  {
    id: 4,
    title: "Vice Principal's Message",
    name: "Office of the Vice Principal",
    role: "Vice Principal",
    gender: "neutral",
    content: [
      "Welcome to Birla Open Minds International School, Siwan! It gives me immense pleasure to welcome you to our school community, where education goes beyond textbooks and classrooms. At Birla Open Minds International School, we believe that every child is unique, capable, and full of potential. Our endeavour is to provide a nurturing, inclusive, and stimulating environment where students are encouraged to learn, explore, question, create, and grow with confidence.",
      "As an institution committed to holistic education, we focus on developing not only academic excellence but also strong values, life skills, creativity, critical thinking, communication, and a sense of responsibility. We strive to create meaningful learning experiences that prepare our students to face the opportunities and challenges of an ever-changing world.",
      "Our dedicated teachers work collaboratively to understand the individual needs of every learner and to make education engaging, experiential, and purposeful. Together, let us empower every child to discover their potential and make a meaningful difference in the world."
    ]
  },
  {
    id: 5,
    title: "School Coordinator's Message",
    name: "Office of the School Coordinator",
    role: "School Coordinator",
    gender: "neutral",
    content: [
      "At Birla Heritage International School, coordination bridges curriculum design, classroom projects, and co-curricular vibrancy. We orchestrate hands-on STEM challenges, art integration, and experiential learning walks.",
      "Our focus is ensuring that every child actively participates, discovers their creative talents, and experiences the joy of learning through structured CCA, clubs, and parent-facilitator partnerships."
    ]
  }
];

const PlaceholderIcon = ({ gender }: { gender: string }) => {
  if (gender === 'female') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-16 h-16 text-gray-300" aria-label="Female avatar placeholder">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M10 3c-1.5 2-2 4-1 6 1.5 2.5 3 2.5 4 1 1-1.5 1-4-.5-6-1.5-1.5-2.5-1z" fill="currentColor" opacity="0.1" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-16 h-16 text-gray-300" aria-label="Leadership avatar placeholder">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
};

export default function MessagesSection() {
  const [coreList, setCoreList] = useState<DisplayMessage[]>(STATIC_CORE_LEADERS);
  const [academicList, setAcademicList] = useState<DisplayMessage[]>(STATIC_ACADEMIC_LEADERS);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/leadership/public`, { cache: 'no-store' })
      .then((r) => r.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const live: DisplayMessage[] = json.data.map((item: { id: number; name: string; designation: string; roleTag?: string; message: string; bio?: string }) => ({
            id: item.id,
            title: item.roleTag || `${item.designation}'s Message`,
            name: item.name,
            role: item.designation,
            gender: item.name.toLowerCase().includes('nitya') ? 'female' : 'male',
            content: [item.message, item.bio].filter(Boolean) as string[],
          }));

          const core = live.filter(m => /chair|director|principal/i.test(m.role) && !/vice/i.test(m.role));
          const academic = live.filter(m => /vice|coordinator/i.test(m.role));

          if (core.length > 0) setCoreList(core);
          if (academic.length > 0) setAcademicList(academic);
        }
      })
      .catch(() => {
        // Silently use static fallbacks
      });
  }, []);

  return (
    <section className="w-full bg-[#fcfbf9] py-16 md:py-24 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* ── Section Header ── */}
        <div className="mb-14 text-center flex flex-col items-center">
          <p className="section-eyebrow mb-2 uppercase tracking-widest text-[#FDB515] font-bold text-[13px]">
            Institutional Guidance
          </p>
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            Messages from Our Leadership
          </h2>
          <div className="w-20 h-1 bg-[#FDB515] mx-auto mt-4 mb-4 rounded-full" />
          <p className="text-gray-500 text-sm md:text-base max-w-2xl text-center">
            Steered by our Chairman, Director, and Principal, with dedicated academic guidance from our Vice Principal and School Coordinator.
          </p>
        </div>

        {/* ── TIER 1: OUR LEADERSHIP TEAM (Chairman, Director, Principal) ── */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[2px] bg-[#FDB515]" />
            <h3 className="text-[#003262] font-black text-lg md:text-xl uppercase tracking-wider" style={{ fontFamily: 'var(--font-heading)' }}>
              Our Leadership Team
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {coreList.map((msg) => (
              <div
                key={msg.id}
                className="bg-white rounded-none p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col relative border border-gray-200 hover:border-[#FDB515]/50 group"
              >
                {/* Decorative Quote Icon */}
                <div className="absolute top-8 right-8 text-[#FDB515] opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M10.733 13.067h-3.467c-.533 0-1.067-.533-1.067-1.067s.533-1.067 1.067-1.067h3.467c1.733 0 3.2-1.467 3.2-3.2s-1.467-3.2-3.2-3.2h-3.467c-3.467 0-6.4 2.933-6.4 6.4v7.467c0 3.467 2.933 6.4 6.4 6.4h3.467c.533 0 1.067-.533 1.067-1.067s-.533-1.067-1.067-1.067zm17.067 0h-3.467c-.533 0-1.067-.533-1.067-1.067s.533-1.067 1.067-1.067h3.467c1.733 0 3.2-1.467 3.2-3.2s-1.467-3.2-3.2-3.2h-3.467c-3.467 0-6.4 2.933-6.4 6.4v7.467c0 3.467 2.933 6.4 6.4 6.4h3.467c.533 0 1.067-.533 1.067-1.067s-.533-1.067-1.067-1.067z"></path>
                  </svg>
                </div>

                {/* Title */}
                <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 relative z-10" style={{ fontFamily: 'var(--font-heading)' }}>
                  {msg.title}
                </h4>

                {/* Message Content */}
                <div className="flex-1 overflow-y-auto pr-2 mb-8 relative z-10 custom-scrollbar" style={{ maxHeight: '250px' }}>
                  <div className="space-y-4 text-gray-600 text-[14px] leading-relaxed font-light">
                    {msg.content.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                {/* Author Footer */}
                <div className="mt-auto pt-6 border-t border-gray-100 flex items-center gap-4 relative z-10">
                  <div className="w-14 h-14 rounded-full bg-gray-50 border-2 border-[#FDB515]/20 flex items-center justify-center overflow-hidden shrink-0">
                    <PlaceholderIcon gender={msg.gender} />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 text-[15px]">{msg.name}</h5>
                    <p className="text-[#FDB515] text-[11px] font-bold uppercase tracking-wider mt-0.5">{msg.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── TIER 2: ACADEMIC ADMINISTRATION & COORDINATION (Vice Principal & School Coordinator) ── */}
        <div className="pt-10 border-t-2 border-gray-200/80">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[2px] bg-[#FDB515]" />
            <h3 className="text-[#003262] font-black text-lg md:text-xl uppercase tracking-wider" style={{ fontFamily: 'var(--font-heading)' }}>
              Vice Principal & School Coordinator
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {academicList.map((msg) => (
              <div
                key={msg.id}
                className="bg-white rounded-none p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col relative border border-gray-200 hover:border-[#FDB515]/50 group"
              >
                {/* Decorative Quote Icon */}
                <div className="absolute top-8 right-8 text-[#FDB515] opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M10.733 13.067h-3.467c-.533 0-1.067-.533-1.067-1.067s.533-1.067 1.067-1.067h3.467c1.733 0 3.2-1.467 3.2-3.2s-1.467-3.2-3.2-3.2h-3.467c-3.467 0-6.4 2.933-6.4 6.4v7.467c0 3.467 2.933 6.4 6.4 6.4h3.467c.533 0 1.067-.533 1.067-1.067s-.533-1.067-1.067-1.067zm17.067 0h-3.467c-.533 0-1.067-.533-1.067-1.067s.533-1.067 1.067-1.067h3.467c1.733 0 3.2-1.467 3.2-3.2s-1.467-3.2-3.2-3.2h-3.467c-3.467 0-6.4 2.933-6.4 6.4v7.467c0 3.467 2.933 6.4 6.4 6.4h3.467c.533 0 1.067-.533 1.067-1.067s-.533-1.067-1.067-1.067z"></path>
                  </svg>
                </div>

                {/* Title */}
                <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 relative z-10" style={{ fontFamily: 'var(--font-heading)' }}>
                  {msg.title}
                </h4>

                {/* Message Content */}
                <div className="flex-1 overflow-y-auto pr-2 mb-8 relative z-10 custom-scrollbar" style={{ maxHeight: '250px' }}>
                  <div className="space-y-4 text-gray-600 text-[14px] leading-relaxed font-light">
                    {msg.content.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                {/* Author Footer */}
                <div className="mt-auto pt-6 border-t border-gray-100 flex items-center gap-4 relative z-10">
                  <div className="w-14 h-14 rounded-full bg-gray-50 border-2 border-[#FDB515]/20 flex items-center justify-center overflow-hidden shrink-0">
                    <PlaceholderIcon gender={msg.gender} />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 text-[15px]">{msg.name}</h5>
                    <p className="text-[#FDB515] text-[11px] font-bold uppercase tracking-wider mt-0.5">{msg.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div className="mt-14 text-center">
          <Link href="/about-us/leadership" className="btn-outline-primary font-bold text-xs uppercase tracking-wider px-8 py-3.5">
            Meet Our Leadership Team & Coordinators &rarr;
          </Link>
        </div>

      </div>
    </section>
  );
}
