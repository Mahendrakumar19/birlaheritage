"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const BACKEND_URL =
  (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '')) ||
  'http://localhost:5000';

interface DisplayTestimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  text: string;
}

const STATIC_TESTIMONIALS: DisplayTestimonial[] = [
  {
    id: 2,
    name: "Priya Sharma",
    role: "Mother of Class 2 Student",
    image: "/parent_avatar_1.png",
    text: "The dedication of the teachers here is remarkable. My daughter has grown not just academically, but also in confidence and social skills. The school's holistic approach truly makes a difference."
  },
  {
    id: 3,
    name: "Rajesh Kumar",
    role: "Father of Class 6 Student",
    image: "/parent_avatar_2.png",
    text: "Choosing this school was the best decision for our son. The modern facilities, combined with a strong emphasis on values, provide the perfect environment for learning."
  },
  {
    id: 4,
    name: "Anjali Gupta",
    role: "Mother of UKG Student",
    image: "/parent_avatar_3.png",
    text: "I am amazed by the creative teaching methods used in the pre-primary section. My child looks forward to going to school every day, which speaks volumes about the environment."
  }
];

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<DisplayTestimonial[]>(STATIC_TESTIMONIALS);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/testimonials/public`, { cache: 'no-store' })
      .then((r) => r.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const live: DisplayTestimonial[] = json.data.map((item: { id: number; name: string; role: string; quote: string; imagePath?: string }) => ({
            id: item.id,
            name: item.name,
            role: item.role,
            image: item.imagePath || "/parent_avatar_1.png",
            text: item.quote,
          }));
          setTestimonials(live);
        }
      })
      .catch(() => {
        // Fallback to static testimonials on network error
      });
  }, []);

  const total = testimonials.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  // Auto-slide every 3.5 seconds
  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, 3500);
    return () => clearInterval(timer);
  }, [total]);

  return (
    <section className="w-full py-20 bg-[#EBE9DE] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">

        {/* Header & Navigation */}
        <div className="flex flex-col items-center mb-10 gap-5 text-center">
          <h2 className="heading-xl text-3xl md:text-4xl w-full">
            Empowering thousands of students, daily
          </h2>
          <div className="flex justify-center items-center gap-3">
            <button
              onClick={prev}
              className="w-12 h-12 flex items-center justify-center border border-[#c8c6ba] rounded-lg bg-transparent hover:bg-black/8 active:scale-95 transition-all cursor-pointer"
              aria-label="Previous"
            >
              <svg className="w-5 h-5 text-[#444]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <button
              onClick={next}
              className="w-12 h-12 flex items-center justify-center border border-[#c8c6ba] rounded-lg bg-transparent hover:bg-black/8 active:scale-95 transition-all cursor-pointer"
              aria-label="Next"
            >
              <svg className="w-5 h-5 text-[#444]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Sliding Cards */}
        <div className="relative overflow-hidden">
          <div
            className="flex gap-5 transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(calc(-${current} * (320px + 20px)))` }}
          >
            {[...testimonials, ...testimonials].map((item, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-[300px] md:w-[320px] group"
              >
                <div className="border border-[#d0cec2] rounded-xl h-[360px] flex flex-col p-3 bg-[#EBE9DE] group-hover:border-[#111]/25 transition-colors duration-300">

                  {/* Profile Row */}
                  <div className="flex items-center gap-3 px-2 pt-2 mb-4">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border border-[#d0cec2]">
                      <Image src={item.image} alt={item.name} fill sizes="36px" className="object-cover" unoptimized />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold text-[#111] leading-tight">{item.name}</span>
                      <span className="text-[11px] text-[#7a7a72] mt-0.5">{item.role}</span>
                    </div>
                  </div>

                  {/* Quote Box */}
                  <div className="bg-[#FAF9F5] rounded-xl flex-1 p-5 shadow-sm overflow-hidden">
                    <p className="font-serif text-[14px] leading-relaxed text-[#2B2B29]">
                      &quot;{item.text}&quot;
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${i === current % total ? "bg-[#111] w-6" : "bg-[#c8c6ba]"}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
