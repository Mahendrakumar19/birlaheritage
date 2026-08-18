"use client";
import React from "react";
import Link from "next/link";

export default function AdmissionsCtaBanner() {
  return (
    <section className="w-full py-16 md:py-20 bg-gradient-to-r from-[#003262] via-[#001f3d] to-[#003262] text-white border-t-4 border-[#FDB515] relative overflow-hidden">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FDB515_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="container-custom relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
        <span className="badge-gold mb-4">Admissions Open 2025–26</span>
        <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
          Begin Your Child&apos;s Journey of Excellence
        </h2>
        <p className="text-white/90 text-base md:text-lg max-w-2xl mb-8 leading-relaxed font-light">
          Join Birla Heritage International School, Siwan. Enroll today for foundational pre-primary through secondary Class 9 education.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link
            href="/admissions"
            className="btn-primary w-full sm:w-auto text-center px-8 py-3.5 text-base font-bold no-underline"
          >
            Apply for Admissions &rarr;
          </Link>
          <Link
            href="/admission-process"
            className="border-2 border-white text-white hover:bg-white hover:text-[#003262] transition-colors rounded-sm w-full sm:w-auto text-center px-8 py-3.5 text-base font-bold no-underline"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            View Admission Process
          </Link>
        </div>
      </div>
    </section>
  );
}
