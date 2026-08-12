"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import HomeNavbar from "@/components/HomeNavbar";
import Footer from "@/components/Footer";

const steps = [
  {
    number: "1",
    title: "Your First Step",
    desc: "Start by filling out our enquiry form. We will be happy to guide you from here."
  },
  {
    number: "2",
    title: "Complete the Application",
    desc: "Send us your filled application along with the required documents."
  },
  {
    number: "3",
    title: "View & Review",
    desc: "We will carefully review your application based on grade availability."
  },
  {
    number: "4",
    title: "Come Visit Us!",
    desc: "Meet our admissions and academic teams, and enjoy a guided school tour."
  },
  {
    number: "5",
    title: "The Big Moment!",
    desc: "Receive your admission offer along with fee details, upon application confirmation."
  },
  {
    number: "6",
    title: "Be a Part of Birla Heritage",
    desc: "Make a part payment and complete the documentation to secure your child's place."
  }
];

const faqs = [
  { question: "What is the admission process at Birla Heritage School?", answer: "The admission process typically involves filling out an enquiry form, submitting the application with required documents, an interaction or assessment, and finally fee payment to secure the seat." },
  { question: "What grades can I apply for at Birla Heritage School?", answer: "We offer admissions for classes starting from Pre-Primary up to Grade 12, subject to seat availability." },
  { question: "What curriculum does Birla Heritage School offer?", answer: "Birla Heritage School offers a comprehensive curriculum designed to provide holistic education, combining academics, sports, and co-curricular activities." },
  { question: "What are the age criteria for admission to Pre-Primary classes?", answer: "For Nursery, the child should be at least 3 years old by March 31st of the academic year. For Kindergarten, the age criteria adjusts accordingly." },
  { question: "What documents are required for admission?", answer: "Standard documents include birth certificate, previous school transfer certificate, academic report cards, passport-sized photographs, and address proof." },
  { question: "Are mid-year admissions allowed?", answer: "Mid-year admissions are considered only under special circumstances, such as relocation, and are strictly subject to seat availability in the requested grade." },
  { question: "What is the fee structure at Birla Heritage School?", answer: "The fee structure varies by grade. Please reach out to our admissions office for a detailed fee breakdown." },
  { question: "Does Birla Heritage offer sibling or referral discounts?", answer: "Yes, we have policies in place for sibling discounts. Kindly contact our admissions desk for specific details and eligibility criteria." },
  { question: "Can I schedule a campus tour before admission?", answer: "Absolutely! We encourage parents and students to visit our campus. You can easily schedule a tour by contacting our admissions office." },
  { question: "Are transport facilities available for students?", answer: "Yes, we provide safe and secure transport facilities across various routes. You can verify if your specific route is covered by speaking with our transport coordinator." }
];

function FaqItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      layout
      onClick={() => setIsOpen(!isOpen)}
      className={`rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${isOpen
          ? "border-[#FDB515] bg-[#f8f9fa] shadow-[0_4px_20px_-4px_rgba(253,181,21,0.2)]"
          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
        }`}
    >
      <div className="p-5 md:p-6 flex items-center justify-between gap-4">
        <h3 className={`text-base md:text-[17px] font-bold transition-colors duration-300 ${isOpen ? "text-[#FDB515]" : "text-gray-900 group-hover:text-[#003262]"}`}>
          {question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.4, ease: "backInOut" }}
          className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full transition-colors duration-300 ${isOpen ? "bg-[#FDB515] text-white" : "bg-gray-100 text-gray-500"
            }`}
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-5 md:px-6 pb-5 md:pb-6">
              <p className="text-gray-600 leading-relaxed text-[15px] border-t border-gray-200 pt-4 md:pt-5">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function AdmissionProcessPage() {
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
            alt="Students smiling"
            priority
          />
          {/* Optional overlay to make it look a bit warmer like the reference image */}
          <div className="absolute inset-0 bg-[#003262]/20"></div>
        </div>

        {/* Teal Bottom Bar */}
        <div className="relative z-10 w-full bg-[#003262]/95 backdrop-blur-sm py-4 md:py-6 flex items-center justify-center shadow-lg">
          <h1 className="text-white text-3xl md:text-4xl font-bold tracking-wide">
            Admissions Process
          </h1>
        </div>

      </section>

      {/* Process Steps Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="heading-xl text-3xl md:text-[40px] text-center mb-16 md:mb-20">
            From Process to Admission, We're With You!
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <span className="text-8xl md:text-[140px] font-black text-[#FDB515] leading-none mb-4 transition-all duration-300 group-hover:scale-110 drop-shadow-sm group-hover:text-[#111111]">
                  {step.number}
                </span>
                <h3 className="heading-md text-xl md:text-2xl mb-3">
                  {step.title}
                </h3>
                <p className="text-[15px] text-gray-600 leading-relaxed max-w-[280px]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* Left side Titles */}
          <div className="w-full lg:w-1/3">
            <h4 className="section-eyebrow mb-2">
              FAQs
            </h4>
            <h2 className="heading-xl text-3xl md:text-5xl leading-tight">
              Answers To Your Most Important Questions
            </h2>
          </div>

          {/* Right side Description and Accordion */}
          <div className="w-full lg:w-2/3 flex flex-col gap-8">
            <p className="text-gray-500 text-[17px] font-medium max-w-lg leading-relaxed mt-2">
              Find clarity on admissions, curriculum, and everything that matters to you as a parent.
            </p>

            <div className="w-full flex flex-col gap-4">
              {faqs.map((faq, idx) => (
                <FaqItem key={idx} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
