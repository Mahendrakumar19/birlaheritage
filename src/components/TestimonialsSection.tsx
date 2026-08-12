"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "B.A. Student",
    image: "/test_student_1_1785833398588.png",
    text: "This is the greatest educational experience I have had to date. It is incredibly interactive and the faculty genuinely cares about our growth. Every lecture feels like a step forward towards my career goals. I never thought learning could be this engaging and practical.",
  },
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
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, 3000);
    return () => clearInterval(timer);
  }, [total]);

  // Show 1 on mobile, 2 on md, 4 on lg
  // We'll show a window of cards starting from current index
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

        {/* Sliding Cards - desktop 4 visible, slide by 1 */}
        <div className="relative overflow-hidden">
          <div
            className="flex gap-5 transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(calc(-${current} * (320px + 20px)))` }}
          >
            {/* Duplicate cards for infinite loop feel */}
            {[...testimonials, ...testimonials].map((item, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-[300px] md:w-[320px] group"
              >
                <div className="border border-[#d0cec2] rounded-xl h-[360px] flex flex-col p-3 bg-[#EBE9DE] group-hover:border-[#111]/25 transition-colors duration-300">

                  {/* Profile Row */}
                  <div className="flex items-center gap-3 px-2 pt-2 mb-4">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border border-[#d0cec2]">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold text-[#111] leading-tight">{item.name}</span>
                      <span className="text-[11px] text-[#7a7a72] mt-0.5">{item.role}</span>
                    </div>
                  </div>

                  {/* Quote Box */}
                  <div className="bg-[#FAF9F5] rounded-xl flex-1 p-5 shadow-sm overflow-hidden">
                    <p className="font-serif text-[14px] leading-relaxed text-[#2B2B29]">
                      "{item.text}"
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
