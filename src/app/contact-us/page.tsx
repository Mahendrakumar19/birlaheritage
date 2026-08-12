"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import HomeNavbar from "@/components/HomeNavbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";

export default function ContactUsPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What security measures are followed at the school?",
      answer: "Once the children are settled, no outsiders are allowed to wait on school premises. The main gate, safety gates, main door and the class door are kept shut at all times to ensure the safety of all students. Security guards are stationed at each gate at all times. No outsiders are allowed to enter the school premises without making an entry in the book. Guards also ensure no child leaves the school premises unaccompanied."
    },
    {
      question: "How does the school respond to illnesses and injuries? Are there any tie-ups with doctors or hospitals?",
      answer: "We have a well-equipped infirmary with a qualified nurse available during school hours. For emergencies, we have tie-ups with leading local hospitals to ensure immediate medical attention."
    },
    {
      question: "Do you have a bus facility? What about safety on the bus?",
      answer: "Yes, we provide safe and secure transport facilities. All our buses are GPS enabled, equipped with CCTV cameras, and accompanied by trained attendants."
    },
    {
      question: "How can I get in touch with Birla Heritage for more information?",
      answer: "You can reach out to our admissions office via phone or email, or fill out the contact form on this page. Our team will be happy to assist you with any queries."
    },
    {
      question: "What are the curricula or boards offered by Birla Heritage?",
      answer: "Birla Heritage offers a comprehensive curriculum designed to foster holistic development, following the guidelines of the CBSE board."
    }
  ];

  return (
    <main className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <HomeNavbar />

      {/* Hero Section */}
      <section className="relative w-full h-[350px] md:h-[500px] mt-[120px] flex flex-col justify-end">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/about_main.png"
            fill
            className="object-cover"
            alt="School Campus"
            priority
          />
          <div className="absolute inset-0 bg-orange-900/10"></div>
        </div>

        {/* Teal Bottom Bar */}
        <div className="relative z-10 w-full bg-[#003262]/95 backdrop-blur-sm py-4 md:py-6 flex items-center justify-center shadow-lg">
          <h1 className="text-white text-3xl md:text-4xl font-bold tracking-wide">
            Contact Us
          </h1>
        </div>
      </section>

      <ContactSection />

      {/* FAQ Section */}
      <section className="w-full py-20 px-4 md:px-8 max-w-7xl mx-auto bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col">
            <span className="text-[#e5a010] font-medium tracking-wide uppercase text-sm mb-3">
              FAQs
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#111111] leading-[1.15] tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              Answers to Your Most Important Questions
            </h2>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7 flex flex-col pt-2">
            <p className="text-gray-500 text-base md:text-lg mb-10 leading-relaxed max-w-xl">
              Find clarity on admissions, curriculum, and everything that matters to you as a parent.
            </p>

            <div className="flex flex-col border-t border-gray-200">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200">
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
                  >
                    <span className="text-[#222222] font-semibold text-[17px] md:text-lg group-hover:text-[#e5a010] transition-colors pr-8">
                      {faq.question}
                    </span>
                    <span className="shrink-0 ml-4">
                      <svg
                        className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openFaqIndex === index ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === index ? "max-h-[500px] pb-6 opacity-100" : "max-h-0 opacity-0"
                      }`}
                  >
                    <p className="text-gray-500 text-[15px] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Information Section */}
      <section className="w-full py-16 px-4 md:px-8 max-w-7xl mx-auto bg-white mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-[#111] mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
          Contact Us Information
        </h2>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column: Call Us & Email */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6">

            {/* Call Us Card */}
            <div className="bg-[#f5f5f5] rounded-2xl p-8 flex-1 flex flex-col justify-center">
              <div className="text-[#e5a010] mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-[#111] mb-3">Call Us</h3>
              <p className="text-[#444] text-lg mb-1">+91 91228 99149</p>
              <p className="text-[#444] text-lg">+91 76338 00196</p>
            </div>

            {/* Email Card */}
            <div className="bg-[#f5f5f5] rounded-2xl p-8 flex-1 flex flex-col justify-center">
              <div className="text-[#e5a010] mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-[#111] mb-3">Email/Write To Us</h3>
              <p className="text-[#444] text-lg">info@birlaheritageSiwan.com</p>
            </div>

          </div>

          {/* Right Column: Map & Address */}
          <div className="w-full lg:w-2/3 bg-[#f5f5f5] rounded-2xl p-6 flex flex-col">
            {/* Map Container */}
            <div className="w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-6 relative">
              <iframe
                src="https://maps.google.com/maps?q=Birla%20Heritage%20International%20School%20Siwan&hl=en&z=15&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>

            {/* Address Details */}
            <div className="flex flex-col px-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="text-[#e5a010]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#111]">Find Us at</h3>
              </div>

              <p className="text-[#444] text-[17px] leading-relaxed mb-6">
                Survey No 813 - 817 Markan, Near Andar Dhala, Siwan, Bihar - 841226
              </p>

              <a
                href="https://www.google.com/maps/search/Birla+Heritage+International+School+Siwan"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-[#333] font-medium hover:text-[#e5a010] transition-colors self-start"
              >
                Get location
                <span className="w-8 h-8 rounded-full bg-[#84cc44] text-white flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
