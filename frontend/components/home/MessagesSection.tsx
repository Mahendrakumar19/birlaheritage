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

const STATIC_MESSAGES: DisplayMessage[] = [
  {
    id: 1,
    title: "Chairman's Message",
    name: "Nitya Singh",
    role: "Chairman",
    gender: "female",
    content: [
      "Education is the manifestation of perfection already in man, as Swami Vivekananda once said. At Birla Heritage International School Siwan, we have taken it upon ourselves to unlock this latent perfection and talent in every child under our care.",
      "Nitya Singh is a software professional with 16 years of experience in Microsoft, one of the world's leading technology companies. She has a post-graduate degree in Computer Science from Hyderabad Central University, where she graduated with distinction. She is currently working as a Manager in Microsoft, leading a team of talented developers and engineers.",
      "Nitya Singh has a passion for creating innovative solutions that can improve the lives of millions of people. She has been involved in various projects and is recognized for her outstanding contributions and leadership.",
      "She is also a mentor and coach for aspiring software professionals, helping them to achieve their goals and dreams."
    ]
  },
  {
    id: 2,
    title: "Director's Message",
    name: "Subash Singh",
    role: "Director",
    gender: "male",
    content: [
      "The goal of Birla Heritage International School is to give kids a smooth learning environment so they can reach their greatest potential. We wanted to offer something special where a child can examine all options before starting the journey of academic learning, as there are so many schools popping up all over the place but they are all limited to a certain area of learning approach.",
      "In order to ensure that a person's creativity and learning are unrestricted, we sought to maintain the formative years as open and inclusive as possible."
    ]
  },
  {
    id: 3,
    title: "Principal's Message",
    name: "[Principal Information Pending]",
    role: "Principal",
    gender: "neutral",
    content: [
      "Welcome to Birla Heritage International School Siwan. Our vision is to foster an inspiring academic atmosphere that nurtures curiosity, character development, and future-ready skills in every student.",
      "[Content Requirement: Official Principal name, message copy, and portrait photograph are pending final content delivery from school administration.]"
    ]
  }
];

const PlaceholderIcon = ({ gender }: { gender: string }) => {
  if (gender === 'female') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-16 h-16 text-gray-300" aria-label="Female avatar placeholder">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M10 3c-1.5 2-2 4-1 6 1.5 2.5 3 2.5 4 1 1-1.5 1-4-.5-6-1.5-1.5-2.5-1.5-2.5-1z" fill="currentColor" opacity="0.1" />
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
  const [messagesList, setMessagesList] = useState<DisplayMessage[]>(STATIC_MESSAGES);

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
          setMessagesList(live);
        }
      })
      .catch(() => {
        // Fallback to static messages on network error
      });
  }, []);

  return (
    <section className="w-full bg-[#fcfbf9] py-16 md:py-20 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header Section */}
        <div className="mb-12 text-center flex flex-col items-center">
          <p className="section-eyebrow mb-2 uppercase tracking-widest text-[#FDB515] font-bold text-[13px]">Leadership</p>
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            Messages from our Leaders
          </h2>
        </div>

        {/* Greeting Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {messagesList.map((msg) => (
            <div
              key={msg.id}
              className="bg-white rounded-none p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col relative border border-gray-200 hover:border-[#FDB515]/50 group"
            >
              {/* Decorative Quote Icon */}
              <div className="absolute top-8 right-8 text-[#FDB515] opacity-10 group-hover:opacity-20 transition-opacity">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10.733 13.067h-3.467c-.533 0-1.067-.533-1.067-1.067s.533-1.067 1.067-1.067h3.467c1.733 0 3.2-1.467 3.2-3.2s-1.467-3.2-3.2-3.2h-3.467c-3.467 0-6.4 2.933-6.4 6.4v7.467c0 3.467 2.933 6.4 6.4 6.4h3.467c.533 0 1.067-.533 1.067-1.067s-.533-1.067-1.067-1.067zm17.067 0h-3.467c-.533 0-1.067-.533-1.067-1.067s.533-1.067 1.067-1.067h3.467c1.733 0 3.2-1.467 3.2-3.2s-1.467-3.2-3.2-3.2h-3.467c-3.467 0-6.4 2.933-6.4 6.4v7.467c0 3.467 2.933 6.4 6.4 6.4h3.467c.533 0 1.067-.533 1.067-1.067s-.533-1.067-1.067-1.067z"></path>
                </svg>
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 relative z-10" style={{ fontFamily: 'var(--font-heading)' }}>
                {msg.title}
              </h3>

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
                <div className="w-16 h-16 rounded-full bg-gray-50 border-2 border-[#FDB515]/20 flex items-center justify-center overflow-hidden shrink-0">
                  <PlaceholderIcon gender={msg.gender} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-[15px]">{msg.name}</h4>
                  <p className="text-[#FDB515] text-[11px] font-bold uppercase tracking-wider mt-0.5">{msg.role}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link href="/about-us/leadership" className="btn-outline-primary font-bold text-xs uppercase tracking-wider px-6 py-3">
            Read Full Leadership Profiles &rarr;
          </Link>
        </div>

      </div>
    </section>
  );
}
