"use client";
import Link from "next/link";
import React from "react";

const schoolLinks = [
  { name: "About the School", href: "/about-us" },
  { name: "Vision & Philosophy", href: "/about-us/philosophy" },
  { name: "Leadership", href: "/about-us/leadership" },
  { name: "Curriculum Overview", href: "/about-us/curriculum" },
];

const admissionsLinks = [
  { name: "Admission Enquiry", href: "/admissions" },
  { name: "Admission Process", href: "/admission-process" },
];

const mediaLinks = [
  { name: "Photo Gallery Studio", href: "/gallery" },
  { name: "Campus Photos", href: "/gallery/campus" },
  { name: "Student's Corner", href: "/gallery/students-corner" },
];

const complianceLinks = [
  { name: "CBSE Mandatory Disclosure", href: "/about-us/mandatory-disclosure" },
  { name: "Contact Us", href: "/contact-us" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/openmindsSiwan/",
    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/birlaheritage_Siwan?igsh=dXhiYW4xanR2bmY1",
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>,
  },
  {
    label: "X / Twitter",
    href: "https://x.com/openminds_Siwan",
    icon: <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@openiminds_Siwan/about",
    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M21.2 3.6c-1.1-.3-5.2-.6-9.2-.6s-8.1.3-9.2.6C1.5 4.1 1 5.3 1 7.2v9.6c0 1.9.5 3.1 1.8 3.6 1.1.3 5.2.6 9.2.6s8.1-.3 9.2-.6c1.3-.5 1.8-1.7 1.8-3.6V7.2c0-1.9-.5-3.1-1.8-3.6zM9.5 15.5V8.5l6.5 3.5-6.5 3.5z" /></svg>,
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#003262] text-white mt-12 border-t-4 border-[#FDB515]">
      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

        {/* Col 1: Institutional Overview */}
        <div className="flex flex-col gap-5">
          <div>
            <h4 className="text-white font-bold text-[16px] uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              BIRLA HERITAGE
            </h4>
            <div className="w-12 h-[2px] bg-[#FDB515]"></div>
          </div>
          <p className="text-white/80 text-[14px] leading-relaxed">
            Promoting holistic student development, academic excellence, and character building in a nurturing learning environment.
          </p>
          <Link href="/about-us" className="text-[#FDB515] text-[14px] hover:underline font-semibold w-fit">
            Read Institutional Overview →
          </Link>

          {/* Social Links */}
          <div className="flex items-center gap-2.5 mt-2">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FDB515] hover:text-[#003262] text-white transition-all shadow-sm"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Col 2: School & Academics */}
        <div className="flex flex-col gap-5">
          <div>
            <h4 className="text-white font-bold text-[16px] uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              SCHOOL & ACADEMICS
            </h4>
            <div className="w-12 h-[2px] bg-[#FDB515]"></div>
          </div>
          <div className="flex flex-col">
            {schoolLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-white/80 text-[14px] py-2 border-b border-white/10 hover:text-[#FDB515] transition-colors flex items-center gap-2 group"
              >
                <svg className="w-3 h-3 text-[#FDB515] transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Col 3: Admissions & Media */}
        <div className="flex flex-col gap-5">
          <div>
            <h4 className="text-white font-bold text-[16px] uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              ADMISSIONS & MEDIA
            </h4>
            <div className="w-12 h-[2px] bg-[#FDB515]"></div>
          </div>
          <div className="flex flex-col">
            {[...admissionsLinks, ...mediaLinks].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-white/80 text-[14px] py-2 border-b border-white/10 hover:text-[#FDB515] transition-colors flex items-center gap-2 group"
              >
                <svg className="w-3 h-3 text-[#FDB515] transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Col 4: Contact & Disclosures */}
        <div className="flex flex-col gap-5">
          <div>
            <h4 className="text-white font-bold text-[16px] uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              GET IN TOUCH
            </h4>
            <div className="w-12 h-[2px] bg-[#FDB515]"></div>
          </div>
          <div className="flex flex-col gap-4 text-white/80 text-[14px]">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 mt-0.5 shrink-0 text-[#FDB515]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <div className="leading-snug">
                Birla Heritage International School
                <br />Survey No 813 - 817 Markan,
                <br />Siwan, Bihar - 841226
              </div>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 shrink-0 text-[#FDB515]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              <div className="flex gap-2">
                <a href="tel:+919122899149" className="hover:text-[#FDB515]">+91 91228 99149</a>
                <span>/</span>
                <a href="tel:+917633800196" className="hover:text-[#FDB515]">+91 76338 00196</a>
              </div>
            </div>

            {/* Mandatory Disclosures Link */}
            <div className="pt-2 border-t border-white/10">
              {complianceLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[#FDB515] font-semibold text-[13.5px] hover:underline flex items-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="bg-[#001f3d] py-5 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row justify-between items-center gap-3 text-[13px] text-white/70">
          <p>
            © {new Date().getFullYear()} Birla Heritage International School. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <span>Designed &amp; Developed by </span>
            <Link href="https://nighwantech.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FDB515] transition-colors ml-1">
              Nighwan Technology Pvt. Ltd.
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
