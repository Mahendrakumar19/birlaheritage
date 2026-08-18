"use client";

import HeroSection from "@/components/home/HeroSection";
import SchoolAtAGlance from "@/components/home/SchoolAtAGlance";
import ObjectivesSection from "@/components/home/ObjectivesSection";
import CoursesSection from "@/components/home/CoursesSection";
import About from "@/components/home/About";
import MessagesSection from "@/components/home/MessagesSection";
import CampusPreviewSection from "@/components/home/CampusPreviewSection";
import EventsSection from "@/components/home/EventsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import AdmissionsCtaBanner from "@/components/home/AdmissionsCtaBanner";
import ContactSection from "@/components/home/ContactSection";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/common/ChatWidget";

export default function Home() {
  return (
    <main className="w-full min-h-screen font-sans bg-white">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. School at a Glance */}
      <SchoolAtAGlance />

      {/* 3. Why Birla Heritage? (Objectives) */}
      <ObjectivesSection />

      {/* 4. Academic Excellence (Class 1-9 progression) */}
      <CoursesSection />

      {/* 5. Holistic Development & Institutional Identity */}
      <About />

      {/* 6. Leadership Messages */}
      <MessagesSection />

      {/* 7. Campus & Facilities Preview */}
      <CampusPreviewSection />

      {/* 8 & 9. Events & Gallery Highlights */}
      <EventsSection />

      {/* 10. Testimonials */}
      <TestimonialsSection />

      {/* 12. Admissions Conversion Banner */}
      <AdmissionsCtaBanner />

      {/* 13. Contact & Location */}
      <ContactSection />

      {/* Footer & Chat Widget */}
      <Footer />
      <ChatWidget />
    </main>
  );
}
