"use client";

import Image from "next/image";
import HomeNavbar from "@/components/HomeNavbar";
import Footer from "@/components/Footer";

export default function CurriculumPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <HomeNavbar />

      {/* Hero Section */}
      <section className="relative w-full h-[400px] md:h-[550px] mt-[100px] flex flex-col justify-center items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/about_main.png"
            fill
            className="object-cover object-center scale-105 animate-[pulse_20s_ease-in-out_infinite]"
            alt="Curriculum Banner"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/90 via-[#111111]/70 to-[#003262]/40 mix-blend-multiply"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 text-center md:text-left">
          <div className="inline-block mb-4 px-4 py-1.5 bg-[#FDB515]/20 backdrop-blur-md border border-[#FDB515]/30 rounded-full">
            <span className="text-[#FDB515] font-semibold tracking-wider text-sm uppercase">Academic Excellence</span>
          </div>
          <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight mb-4 drop-shadow-xl" style={{ fontFamily: 'var(--font-heading)' }}>
            Curriculum
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl font-light">
            A comprehensive curriculum designed to nurture 21st century skills and holistic development.
          </p>
        </div>

        {/* Decorative Bottom Wave/Curve */}
        <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-20"></div>

      </section>

      {/* Section 1: Welcome to BOMIS */}
      <section className="py-16 md:py-20 px-4 md:px-8 max-w-6xl mx-auto w-full">
        <div className="flex flex-col gap-6">
          <div className="text-center mb-10">
            <h2 className="heading-xl text-3xl md:text-5xl inline-block relative max-w-5xl">
              Welcome to BOMIS
            </h2>
          </div>
          <div className="bg-[#f8f9fa] p-8 md:p-12 shadow-sm border-l-4 border-[#FDB515] border-y border-r border-gray-100">
            <div className="text-gray-700 text-base md:text-lg leading-relaxed flex flex-col gap-4 text-justify font-medium">
              <p>
                Birla Heritage International School Siwan - CBSE School (BOMIS), offers a comprehensive solution for education that envelops the individual's learning period right from the formative early years to K-12 schooling.
              </p>
              <p>
                Birla Heritage International School Siwan - CBSE School (BOMIS) encompasses wide-ranging interests in the sphere of high quality education with dedication to excellence.
              </p>
              <p>
                Today, Birla Edutech Limited has a close-knit network of academicians, researchers and professionals. We focus on providing contemporary and world-class education for NURTURING INDIAS TOMORROW.
              </p>
              <p>
                The Birla Heritage International School Siwan - CBSE School provide a nurturing environment wherein young children feel loved, cared, secured, respected and valued. The school focuses on 4 C's: Care, Co-operation, Collaboration and Courtesy. We believe that today's children are tomorrow's leaders!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: CBSE */}
      <section className="py-16 md:py-20 px-4 md:px-8 max-w-6xl mx-auto w-full">
        <div className="flex flex-col gap-6">
          <div className="text-center mb-10">
            <h2 className="heading-xl text-3xl md:text-5xl inline-block relative max-w-5xl">
              CBSE
            </h2>
          </div>
          <div className="bg-[#f8f9fa] p-8 md:p-12 shadow-sm border-l-4 border-[#FDB515] border-y border-r border-gray-100">
            <div className="text-gray-700 text-base md:text-lg leading-relaxed text-justify font-medium">
              <p>
                Welcome to Birla Heritage International School Siwan, a school for CBSE students. Our programs are designed to enhance the academic and personal development of our students. We provide a supportive and stimulating environment for students to learn and grow. We offer a wide range of programs to meet the needs and interests of our students. Our programs include academic subjects such as Math, Science, and English, as well as extracurricular activities such as sports, music, and art. Our experienced and dedicated teachers work closely with our students to help them achieve their full potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
