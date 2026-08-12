"use client";

import HeroSection from "@/components/HeroSection";
import About from "@/components/About";
import MessagesSection from "@/components/MessagesSection";
import StatsSection from "@/components/StatsSection";
import CoursesSection from "@/components/CoursesSection";
import ObjectivesSection from "@/components/ObjectivesSection";
import EventsSection from "@/components/EventsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <main className="w-full min-h-screen font-sans bg-white">
      <HeroSection />
      <About />
      <MessagesSection />
      <StatsSection />
      <CoursesSection />
      <ObjectivesSection />
      <EventsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <ChatWidget />
    </main>
  );
}
