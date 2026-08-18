"use client";

import HeroSection from "@/components/HeroSection";
import SchoolAtAGlance from "@/components/home/SchoolAtAGlance";
import ObjectivesSection from "@/components/ObjectivesSection";
import CoursesSection from "@/components/CoursesSection";
import About from "@/components/About";
import MessagesSection from "@/components/MessagesSection";
import CampusPreviewSection from "@/components/home/CampusPreviewSection";
import EventsSection from "@/components/EventsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import AdmissionsCtaBanner from "@/components/home/AdmissionsCtaBanner";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

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
