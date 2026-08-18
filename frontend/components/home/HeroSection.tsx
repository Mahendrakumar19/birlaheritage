"use client";
import React, { useState } from "react";
import HomeNavbar from "@/components/layout/HomeNavbar";
import Image from "next/image";
import Link from "next/link";

const heroSlides = [
  {
    image: "https://birlaheritagesiwan.com/uploads/gallery/gallery_b363d145-55b1-48dc-aad3-4e860c6cbbd7.jpg",
    subtitle: "BIRLA HERITAGE INTERNATIONAL SCHOOL",
    title: "Empowering Minds,\nShaping Future Leaders",
    desc: "Fostering academic excellence, character, and 21st-century skills in Siwan, Bihar."
  },
  {
    image: "https://birlaheritagesiwan.com/uploads/gallery/gallery_14d0881e-104e-4a49-9592-6878f54394d9.jpg",
    subtitle: "WORLD CLASS EDUCATION",
    title: "Empowering Students\nFor a Better Tomorrow",
    desc: "Discover a diverse community of learners and educators."
  },
  {
    image: "https://birlaheritagesiwan.com/uploads/gallery/gallery_6d349b6b-4e29-47cb-acbf-beef08bf8daa.jpg",
    subtitle: "FUTURE-READY LEARNING",
    title: "A Legacy of Excellence\nin Education",
    desc: "Fostering holistic development and global citizenship."
  }
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));

  const slide = heroSlides[current];

  return (
    <section className="relative w-full h-[100dvh] min-h-[580px] overflow-hidden bg-black">

      {/* Background Images Slider */}
      {heroSlides.map((s, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out z-0 ${
            idx === current ? "opacity-100" : "opacity-0"
          }`}
          style={{ top: 0 }}
        >
          <Image
            src={s.image}
            alt={`Hero background ${idx + 1}`}
            fill
            priority={idx === 0}
            quality={100}
            unoptimized
            className="object-cover object-[75%_center] md:object-center"
          />
        </div>
      ))}

      {/* Gradient Overlay — stronger on mobile for text legibility */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.15) 100%), linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 40%)"
        }}
      />

      {/* Navbar */}
      <div className="relative z-20">
        <HomeNavbar />
      </div>

      {/* Slider Arrow Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/25 hover:bg-black/60 text-white backdrop-blur-sm transition-all border border-white/20 hover:border-white/50 group cursor-pointer"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/25 hover:bg-black/60 text-white backdrop-blur-sm transition-all border border-white/20 hover:border-white/50 group cursor-pointer"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Hero Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-end pb-14 md:pb-20 px-5 sm:px-8 md:px-16 lg:px-24 pointer-events-none">

        {/* Text block */}
        <div className="max-w-xs sm:max-w-md md:max-w-2xl pointer-events-auto">

          {/* Eyebrow / subtitle */}
          {slide.subtitle && (
            <div className="flex items-center gap-2 text-[#FDB515] font-bold text-[11px] sm:text-sm md:text-base tracking-[0.18em] uppercase mb-2 md:mb-3">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-[#FDB515]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
              </svg>
              <span className="leading-snug">{slide.subtitle}</span>
            </div>
          )}

          {/* Main Title */}
          {slide.title && (
            <h1 className="text-white text-[26px] sm:text-4xl md:text-5xl lg:text-[56px] leading-[1.1] font-extrabold tracking-tight drop-shadow-xl whitespace-pre-line mb-3 md:mb-4">
              {slide.title}
            </h1>
          )}

          {/* Description */}
          {slide.desc && (
            <p className="text-white/90 text-[13px] sm:text-base md:text-lg font-medium drop-shadow-md max-w-sm md:max-w-lg mb-6">
              {slide.desc}
            </p>
          )}

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <Link
              href="/admissions"
              className="btn-primary no-underline font-bold text-xs sm:text-sm px-5 py-2.5 sm:px-6 sm:py-3"
            >
              Apply for Admissions &rarr;
            </Link>
            <Link
              href="/about-us/curriculum"
              className="btn-outline-primary border-white text-white hover:bg-white hover:text-[#003262] no-underline font-bold text-xs sm:text-sm px-5 py-2.5 sm:px-6 sm:py-3"
            >
              Curriculum
            </Link>
          </div>
        </div>

        {/* Slider Dots — larger touch targets on mobile */}
        <div className="flex items-center gap-2 sm:gap-3 mt-6 md:mt-8 pointer-events-auto">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 sm:w-10 h-2 bg-[#F9C301]"
                  : "w-2 h-2 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
