"use client";

import Image from "next/image";
import Link from "next/link";
import HomeNavbar from "@/components/layout/HomeNavbar";
import Footer from "@/components/layout/Footer";

const academicStages = [
  {
    stage: "Pre-Primary Stage",
    grades: "Nursery, L.K.G & U.K.G",
    eyebrow: "Early Childhood Education",
    desc: "Focuses on foundational literacy, numeracy, and sensory development in a nurturing, play-based environment designed to cultivate curiosity and social skills.",
    highlights: ["Foundational Numeracy & Literacy", "Interactive Play-Based Learning", "Social & Emotional Well-Being"],
  },
  {
    stage: "Primary Stage",
    grades: "Classes 1 to 5",
    eyebrow: "Foundational Academics",
    desc: "Builds core competence across Languages, Mathematics, Science, and Environmental Studies through student-centric inquiry and interactive discovery.",
    highlights: ["Core Conceptual Mastery", "Reading & Expression", "Environmental Awareness"],
  },
  {
    stage: "Middle School Stage",
    grades: "Classes 6 to 8",
    eyebrow: "Analytical & Skill Development",
    desc: "Introduces specialized academic subjects, encouraging analytical thinking, structured problem solving, and group collaboration.",
    highlights: ["Specialized Subject Learning", "Analytical Reasoning", "Co-Curricular Integration"],
  },
  {
    stage: "Secondary Stage",
    grades: "Class 9",
    eyebrow: "Secondary Foundations",
    desc: "Emphasizes subject specialization, deep conceptual understanding, and academic readiness across core disciplines.",
    highlights: ["Subject Specialization", "Critical Thinking", "Academic Mentorship"],
  },
];

export default function CurriculumPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col font-sans">
      <HomeNavbar />

      {/* Hero Section */}
      <section className="relative w-full h-[380px] md:h-[480px] mt-[100px] flex flex-col justify-center items-center overflow-hidden bg-[#003262]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/about_main.png"
            fill
            className="object-cover object-center scale-105"
            alt="Curriculum Banner"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001f3d]/90 via-[#003262]/80 to-[#003262]/60 mix-blend-multiply" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container-custom text-center md:text-left">
          <div className="inline-block mb-3 px-4 py-1.5 bg-[#FDB515]/20 backdrop-blur-md border border-[#FDB515]/30 rounded-full">
            <span className="text-[#FDB515] font-bold tracking-wider text-xs md:text-sm uppercase">Academic Framework</span>
          </div>
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-xl" style={{ fontFamily: 'var(--font-heading)' }}>
            Curriculum & Academics
          </h1>
          <p className="text-white/90 text-base md:text-xl max-w-2xl font-light leading-relaxed">
            A comprehensive academic progression from Nursery through Class 9 designed to foster 21st-century skills and lifelong learning.
          </p>
        </div>

        {/* Decorative Bottom Fade */}
        <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-white to-transparent z-20" />
      </section>

      {/* Academic Overview & Philosophy Link */}
      <section className="py-16 md:py-24 container-custom">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <p className="section-eyebrow mb-2">Educational Approach</p>
          <h2 className="heading-xl text-3xl md:text-4xl text-gray-900 mb-4">
            Constructivist Learning Progression
          </h2>
          <div className="accent-line mx-auto mb-6" />
          <p className="text-gray-700 text-base leading-relaxed">
            At Birla Heritage International School Siwan, academic delivery is anchored in our verified constructivist philosophy — guiding learners seamlessly from the <em>known to unknown</em>, <em>concrete to abstract</em>, and <em>local to global</em>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#f8fafc] p-8 rounded-lg border border-gray-100 mb-14">
          <div className="text-center p-4">
            <div className="w-10 h-10 rounded-full bg-[#003262] text-[#FDB515] font-bold text-sm flex items-center justify-center mx-auto mb-3">1</div>
            <h3 className="heading-md text-base text-gray-900 mb-1">Joy of Learning</h3>
            <p className="text-gray-600 text-xs leading-relaxed">Restoring Tagore&apos;s vision of childhood curiosity and creative exploration.</p>
          </div>
          <div className="text-center p-4">
            <div className="w-10 h-10 rounded-full bg-[#003262] text-[#FDB515] font-bold text-sm flex items-center justify-center mx-auto mb-3">2</div>
            <h3 className="heading-md text-base text-gray-900 mb-1">21st-Century Skills</h3>
            <p className="text-gray-600 text-xs leading-relaxed">Developing critical thinking, collaboration, communication, and adaptability.</p>
          </div>
          <div className="text-center p-4">
            <div className="w-10 h-10 rounded-full bg-[#003262] text-[#FDB515] font-bold text-sm flex items-center justify-center mx-auto mb-3">3</div>
            <h3 className="heading-md text-base text-gray-900 mb-1">Holistic Mentorship</h3>
            <p className="text-gray-600 text-xs leading-relaxed">Integrating academic learning with character building and emotional growth.</p>
          </div>
        </div>

        <div className="text-center">
          <Link href="/about-us/philosophy" className="btn-outline-primary text-xs uppercase tracking-wider">
            Read Full Educational Philosophy &rarr;
          </Link>
        </div>
      </section>

      {/* Academic Stages */}
      <section className="py-16 md:py-24 bg-[#f8fafc] border-t border-b border-gray-100">
        <div className="container-custom">
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <p className="section-eyebrow mb-2">Grade Progression</p>
            <h2 className="heading-xl text-3xl md:text-4xl text-gray-900 mb-4">
              Academic Stages (Nursery to Class 9)
            </h2>
            <div className="accent-line mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {academicStages.map((stage, idx) => (
              <div key={idx} className="card-base p-8 flex flex-col justify-between border-t-4 border-t-[#003262]">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="badge-gold text-xs">{stage.eyebrow}</span>
                    <span className="text-[#003262] font-bold text-xs uppercase tracking-wider">{stage.grades}</span>
                  </div>
                  <h3 className="heading-lg text-2xl text-gray-900 mb-3">{stage.stage}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">{stage.desc}</p>
                  
                  <div className="space-y-2">
                    <p className="text-[#003262] font-bold text-xs uppercase tracking-wider">Key Focus Areas:</p>
                    <ul className="space-y-1.5 pl-4 border-l-2 border-[#FDB515]">
                      {stage.highlights.map((h, i) => (
                        <li key={i} className="text-gray-700 text-xs font-medium">{h}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Notice Section */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="p-6 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-xs md:text-sm">
            <strong>Academic Content Status Notice:</strong> Detailed syllabus blueprints, subject breakdowns, and elective specifications for secondary grades are maintained internally and published per academic term. Formal syllabus publications are available upon consultation with the academic office.
          </div>
        </div>
      </section>

      {/* Admissions Conversion Banner */}
      <section className="w-full py-16 bg-[#003262] text-white text-center px-4 border-t-4 border-[#FDB515]">
        <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
          Begin Your Child&apos;s Academic Journey
        </h2>
        <p className="text-white/80 max-w-xl mx-auto text-sm md:text-base mb-6">
          Admissions are open for Nursery through Class 9. Experience a learning environment dedicated to excellence.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/admissions" className="btn-primary text-sm font-bold px-8 py-3.5">
            Apply for Admissions &rarr;
          </Link>
          <Link href="/contact-us" className="btn-outline-primary text-white border-white hover:bg-white hover:text-[#003262] text-sm font-bold px-8 py-3.5">
            Contact Academic Office
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

