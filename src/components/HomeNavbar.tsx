"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Montserrat } from "next/font/google";

const BACKEND_URL =
  (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '')) ||
  'http://localhost:5000';

interface Announcement {
  id: number;
  text: string;
  emoji?: string;
  linkUrl?: string;
  linkLabel?: string;
  priority: number;
  isActive: number;
}

const FALLBACK_ANNOUNCEMENT = '🎓 Welcome to Birla Heritage International School Siwan — Admissions Open for 2025–26!';

const montserrat = Montserrat({ subsets: ["latin"] });

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

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/openmindsSiwan/",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/birlaheritage_Siwan?igsh=dXhiYW4xanR2bmY1",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "X / Twitter",
    href: "https://x.com/openminds_Siwan",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@openiminds_Siwan/about",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function HomeNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [annIndex, setAnnIndex] = useState(0);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Fetch live announcements from backend
  useEffect(() => {
    fetch(`${BACKEND_URL}/api/announcements/active`, { cache: 'no-store' })
      .then(r => r.json())
      .then(json => {
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setAnnouncements(json.data);
        }
      })
      .catch(() => { /* silently use fallback */ });
  }, []);

  // Cycle through announcements every 8s if multiple exist
  useEffect(() => {
    if (announcements.length <= 1) return;
    const timer = setInterval(() => {
      setAnnIndex(i => (i + 1) % announcements.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [announcements]);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  // Close sidebar on outside click
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (sidebarOpen && sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [sidebarOpen]);

  const closeSidebar = () => {
    setSidebarOpen(false);
    setOpenAccordion(null);
  };

  return (
    <>
      {/* ─── TOP INFO BAR ─── */}
      <div className={`absolute top-0 left-0 right-0 z-30 w-full h-10 flex overflow-hidden ${montserrat.className}`}>
        {/* Social Icons — hidden on very small screens */}
        <div className="hidden sm:flex bg-[#FDB515] px-3 md:px-8 items-center gap-2 shrink-0">
          <span className="text-white font-semibold text-[12px] whitespace-nowrap hidden md:inline">Follow Us:</span>
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="bg-[#003262] text-white p-1 rounded-full hover:bg-white hover:text-[#FDB515] transition-all duration-200 flex items-center justify-center w-6 h-6"
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Contact & Marquee */}
        <div className="bg-[#003262] flex-1 px-3 md:px-8 flex items-center justify-between text-white overflow-hidden">
          <div className="flex items-center gap-3 h-full overflow-hidden flex-1 min-w-0">
            <a href="tel:+919122899149" className="flex items-center gap-1.5 text-[12px] md:text-sm font-medium hover:text-[#FDB515] whitespace-nowrap shrink-0 transition-colors">
              <svg className="w-3.5 h-3.5 text-[#FDB515]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +91 91228 99149
            </a>
            <div className="w-px h-4 bg-white/30 shrink-0 hidden sm:block" />
            <a href="mailto:info@birlaheritagesiwan.com" className="hidden md:flex items-center gap-1.5 text-[12px] md:text-sm font-medium hover:text-[#FDB515] whitespace-nowrap shrink-0 transition-colors">
              <svg className="w-3.5 h-3.5 text-[#FDB515]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              info@birlaheritagesiwan.com
            </a>
            <div className="w-px h-4 bg-white/30 shrink-0 hidden md:block" />
            <div className="flex-1 overflow-hidden hidden sm:flex items-center h-full min-w-0">
              {announcements.length > 0 ? (
                <span key={annIndex} className="whitespace-nowrap text-[12px] animate-marquee inline-block">
                  {announcements[annIndex].emoji ? `${announcements[annIndex].emoji} ` : ''}
                  {announcements[annIndex].text}
                  {announcements[annIndex].linkUrl && announcements[annIndex].linkLabel && (
                    <>
                      {' — '}
                      <Link
                        href={announcements[annIndex].linkUrl!}
                        className="text-[#FDB515] font-semibold hover:underline"
                      >
                        {announcements[annIndex].linkLabel}
                      </Link>
                    </>
                  )}
                </span>
              ) : (
                <span className="whitespace-nowrap text-[12px] animate-marquee inline-block">
                  {FALLBACK_ANNOUNCEMENT}
                </span>
              )}
            </div>
          </div>
          <a href="tel:+917633800196" className="hidden lg:flex items-center gap-1.5 text-[12px] md:text-sm font-medium hover:text-[#FDB515] whitespace-nowrap shrink-0 ml-4 transition-colors">
            <svg className="w-3.5 h-3.5 text-[#FDB515]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            +91 76338 00196
          </a>
        </div>
      </div>

      {/* ─── MAIN NAVBAR ─── */}
      <header
        className={`fixed left-0 right-0 z-40 w-full transition-all duration-300 bg-[#003262] border-b-[4px] border-[#FDB515] ${montserrat.className} ${scrolled ? "top-0 shadow-lg" : "top-10 shadow-sm"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center no-underline shrink-0" onClick={closeSidebar}>
            <Image
              src="/modern-school-logo-featuring-stylized-book-icon-symbolizing-education-learning-sleek-design-graduation-cap-315282989.webp"
              alt="Birla Heritage Siwan Logo"
              width={500}
              height={160}
              className="h-10 md:h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* ── DESKTOP NAV ── */}
          <nav className="hidden lg:flex items-stretch self-stretch border-l border-white/20">
            {navLinks.map((item) =>
              item.subMenu ? (
                <div key={item.name} className="relative group flex items-stretch">
                  <Link
                    href={item.href || "#"}
                    className="flex items-center gap-1 px-4 lg:px-5 py-4 text-[15px] font-semibold text-white hover:bg-[#FDB515] hover:text-white transition-colors duration-200 no-underline border-r border-white/20"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {item.name}
                    <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                  {/* Dropdown */}
                  <div className="absolute top-[100%] left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[240px]">
                    <div className="bg-[#003262] shadow-2xl border-t-0 border border-[#FDB515] overflow-hidden rounded-b-md">
                      {item.subMenu.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="block px-5 py-3.5 text-[14.5px] font-medium text-white hover:bg-[#FDB515] hover:text-white border-b border-white/20 last:border-b-0 transition-all duration-150 no-underline"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href!}
                  className="flex items-center px-4 lg:px-5 py-4 text-[15px] font-semibold text-white hover:bg-[#FDB515] hover:text-white transition-colors duration-200 no-underline border-r border-white/20"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {item.name}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center">
            <Link href="/admissions" className="btn-primary px-5 py-2.5 text-[14px] font-bold whitespace-nowrap no-underline">
              Admissions Open
            </Link>
          </div>

          {/* ── MOBILE: CTA + HAMBURGER ── */}
          <div className="lg:hidden flex items-center gap-2">
            <Link href="/admissions" className="btn-primary text-[12px] px-3 py-2 no-underline font-bold whitespace-nowrap hidden sm:inline-flex">
              Admissions
            </Link>

            {/* Hamburger Button */}
            <button
              id="mobile-menu-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle menu"
              aria-expanded={sidebarOpen}
              className="relative w-11 h-11 flex flex-col items-center justify-center gap-[5px] rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all duration-200 active:scale-95"
            >
              <span
                className={`block h-[2.5px] bg-white rounded-full transition-all duration-300 origin-center ${sidebarOpen ? "w-6 rotate-45 translate-y-[7.5px]" : "w-6"
                  }`}
              />
              <span
                className={`block h-[2.5px] bg-white rounded-full transition-all duration-300 ${sidebarOpen ? "w-0 opacity-0" : "w-5"
                  }`}
              />
              <span
                className={`block h-[2.5px] bg-white rounded-full transition-all duration-300 origin-center ${sidebarOpen ? "w-6 -rotate-45 -translate-y-[7.5px]" : "w-6"
                  }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ─── MOBILE SIDEBAR BACKDROP ─── */}
      <div
        onClick={closeSidebar}
        className={`fixed inset-0 z-[49] bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        aria-hidden="true"
      />

      {/* ─── MOBILE SIDEBAR PANEL ─── */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 z-50 h-full w-[85vw] max-w-[360px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out lg:hidden ${sidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#FDB515] to-[#ea580c]">
          <Link href="/" onClick={closeSidebar} className="no-underline">
            <Image
              src="/modern-school-logo-featuring-stylized-book-icon-symbolizing-education-learning-sleek-design-graduation-cap-315282989.webp"
              alt="Logo"
              width={180}
              height={60}
              className="h-9 w-auto object-contain brightness-0 invert"
            />
          </Link>
          <button
            onClick={closeSidebar}
            aria-label="Close menu"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto py-4" aria-label="Mobile navigation">
          {navLinks.map((item) => (
            <div key={item.name} className="border-b border-gray-100 last:border-none">
              {item.subMenu ? (
                <>
                  <button
                    onClick={() => setOpenAccordion(openAccordion === item.name ? null : item.name)}
                    className="w-full flex items-center justify-between px-6 py-4 text-[16px] font-bold text-gray-800 hover:text-[#FDB515] hover:bg-orange-50 transition-all duration-150 text-left"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    <span>{item.name}</span>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openAccordion === item.name ? "rotate-180 text-[#FDB515]" : ""
                        }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Sub links — smooth accordion */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openAccordion === item.name ? "max-h-[300px]" : "max-h-0"
                      }`}
                  >
                    <div className="bg-gray-50 py-1">
                      {item.subMenu.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          onClick={closeSidebar}
                          className="flex items-center gap-3 px-8 py-3.5 text-[14px] font-semibold text-gray-600 hover:text-[#FDB515] hover:bg-orange-50 transition-all duration-150 no-underline"
                        >
                          <span className="w-2 h-2 rounded-full bg-[#FDB515]/60 shrink-0" />
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  href={item.href!}
                  onClick={closeSidebar}
                  className="flex items-center px-6 py-4 text-[16px] font-bold text-gray-800 hover:text-[#FDB515] hover:bg-orange-50 transition-all duration-150 no-underline"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="px-6 py-5 border-t border-gray-100 bg-gray-50 flex flex-col gap-4">
          <Link
            href="/admissions"
            onClick={closeSidebar}
            className="btn-primary w-full text-center py-3.5 text-[15px] font-bold no-underline rounded-xl"
          >
            Apply for Admissions →
          </Link>

          <div className="flex flex-col gap-2">
            <a href="tel:+919122899149" className="flex items-center gap-3 text-[13px] font-semibold text-gray-700 hover:text-[#FDB515] transition-colors">
              <div className="w-8 h-8 rounded-full bg-[#003262]/10 flex items-center justify-center text-[#003262] shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              +91 91228 99149
            </a>
            <a href="mailto:info@birlaheritagesiwan.com" className="flex items-center gap-3 text-[13px] font-semibold text-gray-700 hover:text-[#FDB515] transition-colors">
              <div className="w-8 h-8 rounded-full bg-[#FDB515]/10 flex items-center justify-center text-[#FDB515] shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              info@birlaheritagesiwan.com
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3 pt-1">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-full bg-[#003262] text-white flex items-center justify-center hover:bg-[#FDB515] transition-colors duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
