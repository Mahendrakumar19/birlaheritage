"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* --- TOP HEADER BAR --- */}
      <div className="absolute top-0 left-0 right-0 z-30 w-full h-10 flex overflow-hidden font-sans">
        {/* Left Orange Section */}
        <div className="bg-[#FDB515] px-4 md:px-8 flex items-center gap-2 md:gap-3 shrink-0">
          <span className="text-white font-medium text-[13px] md:text-sm whitespace-nowrap hidden md:inline">Follow Us:</span>
          <span className="text-white font-medium text-[13px] md:text-sm whitespace-nowrap md:hidden">Follow:</span>
          <a href="https://www.facebook.com/openmindsSiwan/" target="_blank" rel="noopener noreferrer" className="bg-[#003262] text-white p-1 rounded-full hover:opacity-80 transition-opacity flex items-center justify-center w-6 h-6">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
          </a>
          <a href="https://www.instagram.com/birlaheritage_Siwan?igsh=dXhiYW4xanR2bmY1" target="_blank" rel="noopener noreferrer" className="bg-[#003262] text-white p-1 rounded-full hover:opacity-80 transition-opacity flex items-center justify-center w-6 h-6">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
          </a>
          <a href="https://x.com/openminds_Siwan" target="_blank" rel="noopener noreferrer" className="bg-[#003262] text-white p-1 rounded-full hover:opacity-80 transition-opacity flex items-center justify-center w-6 h-6">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
          </a>
          <a href="https://www.youtube.com/@openiminds_Siwan/about" target="_blank" rel="noopener noreferrer" className="bg-[#003262] text-white p-1 rounded-full hover:opacity-80 transition-opacity flex items-center justify-center w-6 h-6">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
          </a>
        </div>

        {/* Right Green Section */}
        <div className="bg-[#003262] flex-1 px-4 md:px-8 flex items-center justify-between text-white overflow-hidden">
          <div className="flex items-center gap-4 h-full w-full overflow-hidden">
            <a href="tel:+919122899149" className="flex items-center gap-2 text-[13px] md:text-sm font-medium hover:text-[#FDB515] whitespace-nowrap shrink-0 transition-colors">
              <svg className="w-4 h-4 text-[#FDB515]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              +91 9122899149
            </a>
            <div className="w-[1px] h-4 bg-white/40 shrink-0"></div>
            <a href="mailto:info@birlaheritage.com" className="hidden md:flex items-center gap-2 text-[13px] md:text-sm font-medium hover:text-[#FDB515] whitespace-nowrap shrink-0 transition-colors">
              <svg className="w-4 h-4 text-[#FDB515]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              info@birlaheritage.com
            </a>
            <div className="hidden md:block w-[1px] h-4 bg-white/40 shrink-0"></div>

            {/* Scrolling Marquee for long text */}
            <div className="flex-1 overflow-hidden relative flex items-center h-full">
              <div className="whitespace-nowrap text-[13px] w-full animate-marquee inline-block">
                Important announcement or latest news updates goes here.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 h-full pl-4 shrink-0 bg-[#003262] z-10 relative">
            <div className="w-[1px] h-4 bg-white/30 hidden md:block"></div>
            <a href="tel:+917633800196" className="flex items-center gap-2 text-[13px] md:text-sm font-medium hover:text-[#FDB515] whitespace-nowrap transition-colors">
              <svg className="w-4 h-4 text-[#FDB515]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              +91 7633800196
            </a>
          </div>
        </div>
      </div>

      <header className="absolute top-10 left-0 right-0 z-20 w-full px-8 md:px-12 py-2 flex justify-between items-center">
        {/* Logo area */}
        <Link href="/" className="flex items-center no-underline">
          <Image
            src="/modern-school-logo-featuring-stylized-book-icon-symbolizing-education-learning-sleek-design-graduation-cap-315282989.webp"
            alt="Birla Heritage Siwan Logo"
            width={500}
            height={160}
            className="h-10 md:h-12 w-auto object-contain drop-shadow-lg"
            priority
          />
        </Link>

        {/* Right Nav / Actions */}
        <div className="flex items-center gap-4">


          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center gap-3 bg-[#F9C301] hover:bg-[#E0B001] text-black border-none px-6 py-3 rounded-full text-[15px] font-bold cursor-pointer transition-all active:scale-95 shadow-md"
          >
            Menu
            <svg width="14" height="14" viewBox="0 0 12 12" fill="white" xmlns="http://www.w3.org/2000/svg">
              <circle cx="6" cy="2" r="1.5" />
              <circle cx="2" cy="10" r="1.5" />
              <circle cx="10" cy="10" r="1.5" />
            </svg>
          </button>
        </div>
      </header>

      {/* --- MENU OVERLAY --- */}
      <div
        className={`fixed inset-0 w-full h-[100dvh] flex z-40 transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Left Side: Creative College Background */}
        <div className="hidden md:block md:w-[45%] h-full relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/creative_college_bg.png')" }}
          ></div>
          {/* Creative Gradient Overlay for a seamless blend */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-[#111111]/80 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#111111]"></div>

          {/* Decorative Text */}
          <div className="absolute bottom-16 left-12 right-12 z-10 border-l-4 border-[#F9C301] pl-6">
            <h2 className="text-white text-4xl lg:text-5xl font-bold mb-3 drop-shadow-md tracking-tight">Explore Your <br /><span className="text-[#F9C301]">Creativity</span></h2>
            <p className="text-white/90 text-lg font-medium drop-shadow-sm max-w-sm">Discover programs designed to inspire innovation and empower the next generation of leaders.</p>
          </div>
        </div>

        {/* Right Side: Menu Content */}
        <div className="w-full md:w-[55%] h-full bg-[#111111] flex flex-col relative shadow-[-10px_0_30px_rgba(0,0,0,0.3)]">
          {/* Header Bar */}
          <div className="w-full px-8 md:px-12 py-8 flex flex-col">
            <div className="flex justify-between items-start">


              {/* Close Button */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 bg-[#F9C301] hover:bg-[#E0B001] text-black border-none px-6 py-2.5 rounded-full text-[15px] font-bold cursor-pointer transition-all active:scale-95 shadow-md ml-auto"
              >
                Close
                <svg width="12" height="12" viewBox="0 0 12 12" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="6" cy="2" r="1.5" />
                  <circle cx="2" cy="10" r="1.5" />
                  <circle cx="10" cy="10" r="1.5" />
                </svg>
              </button>
            </div>

            {/* Search */}
            <div className="mt-8">
              <button className="flex items-center gap-2 text-[#F9C301] hover:text-[#E0B001] font-medium transition-colors text-[17px]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </button>
            </div>
          </div>

          {/* Main Menu Links */}
          <div className="flex-1 px-8 md:px-12 py-8 overflow-y-auto flex flex-col gap-8 md:gap-10 justify-center pb-32">
            {[
              { name: 'Home', href: '/' },
              {
                name: 'About Us',
                href: '#',
                subMenu: [
                  { name: "Philosophy", href: "/about-us/philosophy" },
                  { name: "Leadership", href: "/about-us/leadership" },
                  { name: "Mandatory Disclosure", href: "/about-us/mandatory-disclosure" },
                  { name: "Curriculum", href: "/about-us/curriculum" },
                ]
              },
              {
                name: 'Admissions',
                subMenu: [
                  { name: 'Admission Enquiry', href: '/admissions' },
                  { name: 'Admission Process', href: '/admission-process' }
                ]
              },
              {
                name: 'Gallery',
                subMenu: [
                  { name: 'Campus', href: '/gallery/campus' },
                  { name: "Student's corner", href: '/gallery/students-corner' }
                ]
              },
              { name: 'Contact Us', href: '/contact-us' },
            ].map((item) => (
              <div key={item.name} className="group flex flex-col w-fit relative">
                <Link href={item.href || '#'} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-white text-3xl md:text-5xl font-bold tracking-tight w-fit hover:text-[#F9C301] transition-colors no-underline">
                  {item.name}
                  {item.subMenu && (
                    <svg className="w-5 h-5 md:w-8 md:h-8 transition-transform duration-300 group-hover:rotate-180 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  )}
                </Link>
                {item.subMenu && (
                  <div className="flex flex-col ml-4 md:ml-8 gap-4 border-l-2 border-[#F9C301]/50 pl-6 overflow-hidden transition-all duration-500 max-h-0 opacity-0 group-hover:max-h-[500px] group-hover:opacity-100 group-hover:mt-5 group-hover:pb-2">
                    {item.subMenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-white/80 text-xl md:text-2xl font-semibold hover:text-[#F9C301] transition-colors transform hover:translate-x-2 duration-300"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
