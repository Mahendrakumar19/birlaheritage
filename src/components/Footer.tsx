"use client";
import Link from "next/link";
import React from "react";

const importantLinks = [
  { name: "Admission Enquiry", href: "/admissions" },
  { name: "Admission Process", href: "/admission-process" },
  { name: "Campus Gallery", href: "/gallery#campus" },
  { name: "Student's Corner", href: "/gallery#students-corner" },
];

const navLinks = [
  { name: "Home", href: "/" },
  {
    name: "About Us",
    href: "#",
    subMenu: [
      { name: "Philosophy", href: "/about-us/philosophy" },
      { name: "Leadership", href: "/about-us/leadership" },
      { name: "Mandatory Disclosure", href: "/about-us/mandatory-disclosure" },
      { name: "Curriculum", href: "/about-us/curriculum" },
    ],
  },
  {
    name: "Admissions",
    href: "/admissions",
    subMenu: [
      { name: "Admission Enquiry", href: "/admissions" },
      { name: "Admission Process", href: "/admission-process" },
    ],
  },
  {
    name: "Gallery",
    href: "/gallery",
    subMenu: [
      { name: "Campus", href: "/gallery/campus" },
      { name: "Student's Corner", href: "/gallery/students-corner" },
    ],
  },
  { name: "Contact Us", href: "/contact-us" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#003262] text-white mt-12">
      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

        {/* Col 1: About Us */}
        <div className="flex flex-col gap-6">
          <div>
            <h4 className="text-white font-bold text-[17px] uppercase tracking-wide mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              ABOUT US
            </h4>
            <div className="w-12 h-[2px] bg-[#FDB515]"></div>
          </div>
          <p className="text-white/90 text-[14.5px] leading-[1.8]">
            At Birla Heritage International School Siwan we aim to promote the optimum overall development of each child through planned play experiences which reflect children's interests and curiosity in the world around them.
          </p>
          <Link href="/about-us" className="text-[#FDB515] text-[14.5px] hover:underline w-fit font-medium">
            Read More
          </Link>
          {/* Social Icons */}
          <div className="flex items-center gap-2 mt-2">
            <a href="https://www.facebook.com/openmindsSiwan/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#0a4539] flex items-center justify-center hover:bg-[#FDB515] text-white transition-colors shadow-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
            </a>
            <a href="https://www.instagram.com/birlaheritage_Siwan?igsh=dXhiYW4xanR2bmY1" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#0a4539] flex items-center justify-center hover:bg-[#FDB515] text-white transition-colors shadow-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
            </a>
            <a href="https://x.com/openminds_Siwan" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#0a4539] flex items-center justify-center hover:bg-[#FDB515] text-white transition-colors shadow-sm">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </a>
            <a href="https://www.youtube.com/@openiminds_Siwan/about" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#0a4539] flex items-center justify-center hover:bg-[#FDB515] text-white transition-colors shadow-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M21.2 3.6c-1.1-.3-5.2-.6-9.2-.6s-8.1.3-9.2.6C1.5 4.1 1 5.3 1 7.2v9.6c0 1.9.5 3.1 1.8 3.6 1.1.3 5.2.6 9.2.6s8.1-.3 9.2-.6c1.3-.5 1.8-1.7 1.8-3.6V7.2c0-1.9-.5-3.1-1.8-3.6zM9.5 15.5V8.5l6.5 3.5-6.5 3.5z" /></svg>
            </a>
          </div>
        </div>

        {/* Col 2: Important Links */}
        <div className="flex flex-col gap-6">
          <div>
            <h4 className="text-white font-bold text-[17px] uppercase tracking-wide mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              IMPORTANT LINKS
            </h4>
            <div className="w-12 h-[2px] bg-[#FDB515]"></div>
          </div>
          <div className="flex flex-col">
            {importantLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-white/90 text-[14.5px] py-2.5 border-b border-white/20 hover:text-[#FDB515] transition-colors flex items-center gap-3 group"
              >
                <svg className="w-3 h-3 text-white/70 group-hover:text-[#FDB515] transition-colors" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Col 3: Quick Links */}
        <div className="flex flex-col gap-6">
          <div>
            <h4 className="text-white font-bold text-[17px] uppercase tracking-wide mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              QUICK LINKS
            </h4>
            <div className="w-12 h-[2px] bg-[#FDB515]"></div>
          </div>
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <Link
                  href={link.href}
                  className="text-white/90 text-[14.5px] py-2.5 border-b border-white/20 hover:text-[#FDB515] transition-colors flex items-center justify-between cursor-pointer w-full"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-3 h-3 text-white/70 group-hover:text-[#FDB515] transition-colors" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    {link.name}
                  </div>
                  {link.subMenu && (
                    <svg className="w-3 h-3 text-white/50 group-hover:text-[#FDB515] group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
                {link.subMenu && (
                  <div className="absolute left-0 top-[100%] w-56 bg-[#003262] shadow-xl border border-white/10 rounded-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 flex flex-col py-2 border-b-[3px] border-b-[#FDB515]">
                    {link.subMenu.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className="px-4 py-2.5 text-sm text-white/90 hover:bg-white/10 hover:text-[#FDB515] transition-colors flex items-center gap-2"
                      >
                        <span className="w-1 h-1 bg-[#FDB515] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Col 4: Get In Touch */}
        <div className="flex flex-col gap-6">
          <div>
            <h4 className="text-white font-bold text-[17px] uppercase tracking-wide mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              GET IN TOUCH
            </h4>
            <div className="w-12 h-[2px] bg-[#FDB515]"></div>
          </div>
          <div className="flex flex-col gap-5 mt-2">
            <div className="flex items-start gap-4 text-white/90 text-[14.5px]">
              <svg className="w-5 h-5 mt-1 shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <div className="leading-[1.7]">
                <span className="font-semibold block mb-1">Corporate Office</span>
                Birla Heritage International School
                <br />Survey No 813 - 817 Markan,
                <br />Siwan, Bihar - 841226
              </div>
            </div>
            <div className="flex items-center gap-4 text-white/90 text-[14.5px]">
              <svg className="w-5 h-5 shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              <div className="flex flex-col">
                <a href="tel:+919122899149" className="hover:text-[#FDB515]">+91 9122899149</a>
                <a href="tel:+917633800196" className="hover:text-[#FDB515]">+91 7633800196</a>
              </div>
            </div>
            <div className="flex items-center gap-4 text-white/90 text-[14.5px]">
              <svg className="w-5 h-5 shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <a href="mailto:info@birlaheritage.com" className="hover:text-[#FDB515]">info@birlaheritage.com</a>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="bg-[#0e5244] py-5 border-t border-black/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row justify-between items-center gap-3 text-[13.5px] text-white/70">
          <p>
            © Copyright {new Date().getFullYear()} All rights reserved by <a href="https://nighwantech.com/" target="_blank" rel="noopener noreferrer" className="text-[#FDB515] font-medium hover:underline">Nighwan Technology</a>
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-[#FDB515] transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#FDB515] transition-colors">Terms of Use</Link>
            <Link href="#" className="hover:text-[#FDB515] transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
