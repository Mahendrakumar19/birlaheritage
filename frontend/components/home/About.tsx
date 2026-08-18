"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

export default function About() {
  return (
    <section className="w-full py-12 md:py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="heading-xl text-2xl sm:text-3xl md:text-4xl inline-block relative max-w-4xl">
            Birla Heritage International School Siwan - A School that redefines education.
          </h2>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-12">
          <div className="w-full md:w-1/2 text-[#4b5563] text-[15px] md:text-[17px] leading-relaxed font-medium text-justify">
            <p className="mb-4">
              Birla Heritage International School Siwan reiterate and restore what Tagore called the hallmarks of childhood- &apos;the Joy of Learning&apos; and the &apos;Creative Spirit&apos;. The School firmly believes in the uniqueness of each child, thereby fostering holistic development through integrated learning opportunities nurturing the 21st Century Skills.
            </p>
            <p className="mb-8">
              Our philosophy is based on the constructive approach where the learners are actively involved in their learning in a self-governing environment. Learning experiences are interactive, student-centric and progress from known to unknown, concrete to abstract and local to global.
            </p>
            <Link
              href="/about-us"
              className="btn-primary no-underline shadow-md hover:shadow-lg"
            >
              Read More
            </Link>
          </div>
          <div className="md:w-1/2 relative">
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-12 -left-12 w-48 h-48 bg-[#e0e7ff] rounded-full mix-blend-multiply opacity-70 z-0 hidden md:block"
            ></motion.div>
            <motion.svg
              animate={{ x: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 w-32 h-32 text-[#003262] opacity-20 z-0 hidden md:block" fill="none" viewBox="0 0 100 100"
            >
              <pattern id="lines" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="10" stroke="currentColor" strokeWidth="2" />
              </pattern>
              <rect x="0" y="0" width="100" height="100" fill="url(#lines)" />
            </motion.svg>

            <motion.svg
              animate={{ rotate: -360, scale: [1, 1.1, 1] }}
              transition={{ rotate: { duration: 15, repeat: Infinity, ease: "linear" }, scale: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
              className="absolute -top-10 right-10 w-12 h-12 text-[#003262] z-0 origin-center" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
            >
              <path d="M12 2v20M2 12h20" />
            </motion.svg>
            <div className="relative z-10 w-full h-[260px] sm:h-[340px] md:h-[400px] rounded-sm overflow-hidden shadow-xl border-4 border-white">
              <Image
                src="/about_small.png"
                alt="Students studying"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
