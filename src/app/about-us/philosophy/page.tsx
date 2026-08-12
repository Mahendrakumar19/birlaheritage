"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import HomeNavbar from "@/components/HomeNavbar";
import Footer from "@/components/Footer";

function AboutHero() {
  return (
    <section className="relative w-full h-[400px] md:h-[550px] mt-[100px] flex flex-col justify-center items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/about_main.png"
          fill
          className="object-cover object-center scale-105 animate-[pulse_20s_ease-in-out_infinite]"
          alt="Philosophy Banner"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/90 via-[#111111]/70 to-[#003262]/40 mix-blend-multiply"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 text-center md:text-left">
        <div className="inline-block mb-4 px-4 py-1.5 bg-[#FDB515]/20 backdrop-blur-md border border-[#FDB515]/30 rounded-full">
          <span className="text-[#FDB515] font-semibold tracking-wider text-sm uppercase">Our Core Beliefs</span>
        </div>
        <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight mb-4 drop-shadow-xl" style={{ fontFamily: 'var(--font-heading)' }}>
          Philosophy
        </h1>
        <p className="text-white/80 text-lg md:text-xl max-w-2xl font-light">
          A constructive approach where learners are actively involved in a self-governing environment.
        </p>
      </div>

      {/* Decorative Bottom Wave/Curve */}
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-20"></div>

    </section>
  );
}

function AboutIntroduction() {
  return (
    <section className="w-full py-12 md:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="heading-xl text-2xl sm:text-3xl md:text-5xl inline-block relative max-w-5xl">
            Birla Heritage International School Siwan - A School that redefines education.
          </h2>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-12">
          <div className="w-full md:w-1/2 text-[#4b5563] text-[15px] md:text-[17px] leading-relaxed font-medium text-justify">
            <p className="mb-4">
              Birla Heritage International School Siwan reiterate and restore what Tagore called the hallmarks of childhood- &apos;the Joy of Learning&apos; and the &apos;Creative Spirit&apos;. The School firmly believes in the uniqueness of each child, thereby fostering holistic development through integrated learning opportunities nurturing the 21st Century Skills.
            </p>
            <p className="mb-4">
              Our philosophy is based on the constructive approach where the learners are actively involved in their learning in a self-governing environment. Learning experiences are interactive, student-centric and progress from known to unknown, concrete to abstract and local to global.
            </p>
            <p className="mb-4">
              The teachers are aware of each student&apos;s emotional, social, psychological and physical development as well as their cognitive growth. They provide a motivational framework for each learning opportunity.
            </p>
            <p>
              A learner at Birla Heritage International School Siwan develops global perspective and life skills to help and excel in his or her desired field and become a life-long learner.
            </p>
          </div>
          <div className="w-full md:w-1/2 relative">
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
              animate={{ rotate: 360, y: [0, -10, 0] }}
              transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
              className="absolute top-1/2 -left-20 w-12 h-12 text-[#003262] z-0 hidden md:block origin-center" viewBox="0 0 24 24" fill="currentColor"
            >
              <path d="M24 12L0 24V0L24 12Z" />
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

function AboutValues() {
  return (
    <section className="w-full py-12 md:py-24 bg-[#f8f9fa]">
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
        <h2 className="heading-xl text-2xl sm:text-3xl md:text-4xl mb-6 md:mb-8">
          Values and Ethos
        </h2>
        <div className="text-[#4b5563] text-[15px] md:text-[17px] leading-relaxed font-medium">
          <p className="mb-4">
            The School provides a nurturing environment wherein young children feel loved, cared, secured, respected and valued.
          </p>
          <p>
            The school focuses on 4 C&apos;s: Care, Co-operation, Collaboration and Courtesy. We believe that today&apos;s children are tomorrow&apos;s leaders.
          </p>
        </div>
      </div>
    </section>
  );
}

function AboutPillars() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const pillars = [
    {
      icon: (
        <svg className="w-12 h-12 mx-auto mb-4 text-[#003262]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v6" />
        </svg>
      ),
      title: "Academic Excellence",
      desc: "Our learners achieve amazing things. Recognised as one of the leading school brands in India, our learners enjoy a remarkable range of innovative learning experiences, which inspire and challenge them to be their very best. This includes exclusive collaborations with abroad universities and more than 50+ extra-curricular clubs and activities.\n\nWe focus heavily on STEM subjects, humanities, and arts, ensuring a well-rounded academic foundation. Our state-of-the-art laboratories and extensive library resources provide students with the tools they need to explore complex concepts deeply. We also emphasize critical thinking, problem-solving, and collaboration, preparing our students for the rigors of higher education and beyond. Our dedicated faculty members are experts in their fields, providing personalized attention and mentorship to every student."
    },
    {
      icon: (
        <svg className="w-12 h-12 mx-auto mb-4 text-[#003262]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      title: "Liberal Arts And Sports Tradition",
      desc: "We value the role of sports and arts in life. It is an integral part of our student's learning experience. We believe in the positive benefits of participating in individual / team sports and performing arts. We deliver a curriculum that gives children the opportunity to experience a wide range of activities in an atmosphere of enjoyment and personal development.\n\nFrom classical music and contemporary dance to competitive athletics and team sports, our students have countless opportunities to discover and hone their talents. We boast exceptional sports facilities, including Olympic-sized swimming pools, professional-grade tennis courts, and expansive athletic fields. Our arts programs are equally robust, featuring dedicated studios for visual arts, a fully equipped theatre for dramatic productions, and numerous music practice rooms. We believe that engaging in these activities fosters discipline, resilience, and creativity, which are essential for holistic development."
    },
    {
      icon: (
        <svg className="w-12 h-12 mx-auto mb-4 text-[#003262]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Mentor And Guide",
      desc: "With our passionate, well-qualified and highly experienced teachers and inspired leaders, our students are destined to shine on the global platform. The emphasis is on teacher development with teachers working in teams to develop engaging lessons, observing, and critiquing classes and working with students of different talents and capabilities.\n\nOur mentorship program pairs each student with a dedicated faculty member who provides academic guidance, emotional support, and career advice. These mentors help students navigate the challenges of their academic journey, ensuring they stay focused and motivated. We also invite industry professionals and alumni to serve as guest mentors, offering students real-world insights and networking opportunities. By fostering strong mentor-mentee relationships, we empower our students to achieve their full potential and become confident, compassionate leaders."
    }
  ];

  return (
    <section className="w-full py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <h2 className="heading-xl text-4xl md:text-5xl">
            3 Pillars of Our Success
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {pillars.map((pillar, idx) => {
            const isExpanded = expandedIdx === idx;
            return (
              <motion.div layout key={idx} className="bg-white border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col group overflow-hidden rounded-sm">
                <motion.div layout>
                  {pillar.icon}
                </motion.div>
                <motion.h3 layout className="text-xl font-bold text-[#003262] text-center mb-3">{pillar.title}</motion.h3>
                <motion.div layout className={`relative mb-5 overflow-hidden`}>
                  <p className={`text-gray-600 text-[14px] leading-relaxed text-justify whitespace-pre-line ${!isExpanded ? 'line-clamp-4' : ''}`}>
                    {pillar.desc}
                  </p>
                </motion.div>
                <motion.div layout className="mt-auto flex justify-center">
                  <button
                    onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                    className="border-2 border-[#003262] text-[#003262] px-5 py-1.5 rounded-none text-sm font-semibold hover:bg-[#003262] hover:text-white transition-colors duration-300"
                  >
                    {isExpanded ? 'Read less' : 'Read more'}
                  </button>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const tabData = [
  {
    id: "enthuse",
    title: "ENTHUSE",
    color: "bg-[#003262]", // Berkeley Blue
    icon: (
      <svg className="w-16 h-16 text-[#003262] mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    contentTitle: "Enthuse",
    content: "With our well-researched curriculum, modern teaching methodologies and wide range of extra-curricular activities and facilities we constantly strive to enthuse our students with fascinating learning experiences every single day.\nWe work tirelessly towards creating future leaders, thinkers, change-makers and givers, who would make a real difference in tomorrow's world while also upholding our cultural traditions.",
    image: "/about_small.png"
  },
  {
    id: "enlighten",
    title: "ENLIGHTEN",
    color: "bg-[#FDB515]", // California Gold
    icon: (
      <svg className="w-16 h-16 text-[#FDB515] mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    contentTitle: "Enlighten",
    content: "Our goal is to enlighten young minds through exposure to diverse fields of knowledge. By fostering curiosity and a love for learning, we empower students to discover their passions and achieve academic excellence. We provide an environment where ideas flourish and every student's potential is recognized and nurtured.",
    image: "/test_student_1_1785833398588.png"
  },
  {
    id: "empower",
    title: "EMPOWER",
    color: "bg-[#e5a010]", // Deep Gold
    icon: (
      <svg className="w-16 h-16 text-[#e5a010] mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    contentTitle: "Empower",
    content: "Empowerment is at the core of our educational philosophy. We equip our students with the skills, confidence, and resilience needed to navigate an ever-changing world. Through leadership programs, collaborative projects, and practical experiences, we ensure our graduates are ready to take on the challenges of the future.",
    image: "/about_small.png"
  }
];

function AboutTabs() {
  const [activeTab, setActiveTab] = useState(tabData[0].id);
  const activeData = tabData.find((t) => t.id === activeTab) || tabData[0];

  return (
    <section className="w-full py-20 md:py-28 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <h2 className="heading-xl text-4xl md:text-5xl">
            The three strong &apos;pillars&apos; that define us
          </h2>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-4 mb-8">
            {tabData.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-2 px-6 text-center text-white font-bold text-lg transition-all duration-300 relative rounded-none
                    ${tab.color} ${isActive ? '' : 'hover:brightness-95'}
                  `}
                >
                  {tab.title}
                  {isActive && (
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px]" style={{ borderTopColor: tab.color.replace('bg-[', '').replace(']', '') }}></div>
                  )}
                </button>
              );
            })}
          </div>
          <div className="bg-[#f8f9fa] rounded-sm p-6 md:p-8 relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
            <svg className="absolute bottom-0 right-0 w-64 h-64 text-[#003262] opacity-10" viewBox="0 0 100 100" fill="none">
              <pattern id="circles" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="currentColor" />
              </pattern>
              <rect x="0" y="0" width="100" height="100" fill="url(#circles)" />
            </svg>
            <svg className="absolute -top-10 -right-10 w-32 h-32 text-[#003262] opacity-20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12L0 24V0L24 12Z" />
            </svg>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="w-full flex flex-col md:flex-row items-center gap-12 relative z-10"
              >
                <div className="md:w-1/2">
                  <div className="flex items-center gap-4 mb-6">
                    {activeData.icon}
                    <h3 className={`text-3xl font-bold`} style={{ color: activeData.color.replace('bg-[', '').replace(']', '') }}>
                      {activeData.contentTitle}
                    </h3>
                  </div>
                  <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                    {activeData.content}
                  </div>
                </div>
                <div className="md:w-1/2 relative">
                  <div className="relative w-full h-[300px] rounded-sm shadow-md overflow-hidden">
                    <Image
                      src={activeData.image}
                      alt={activeData.contentTitle}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutTeam() {
  const team = [
    {
      name: "Nitya Singh",
      title: "Chairman's Message",
      image: "/chairman_placeholder.jpeg",
      bio: "Education is the manifestation of perfection already in man, as Swami Vivekananda once said. At Birla Heritage International School Siwan, we have taken it upon ourselves to unlock this latent perfection and talent in every child under our care.\n\nNitya Singh is a software professional with 16 years of experience in Microsoft, one of the world's leading technology companies. She has a post-graduate degree in Computer Science from Hyderabad Central University, where she graduated with distinction. She is currently working as a Manager in Microsoft, leading a team of talented developers and engineers.\n\nNitya Singh has a passion for creating innovative solutions that can improve the lives of millions of people. She has been involved in various projects and is recognized for her outstanding contributions and leadership. She is also a mentor and coach for aspiring software professionals, helping them to achieve their goals and dreams.",
      bgColor: "bg-[#003262]",
    },
    {
      name: "Subash Singh",
      title: "Director's Message",
      image: "/team_placeholder.jpeg",
      bio: "The goal of Birla Heritage International School Siwan is to give kids a smooth learning environment so they can reach their greatest potential. We wanted to offer something special where a child can examine all options before starting the journey of academic learning, as there are so many schools popping up all over the place but they are all limited to a certain area of learning approach. In order to ensure that a person's creativity and learning are unrestricted, we sought to maintain the formative years as open and inclusive as possible.",
      bgColor: "bg-[#003262]",
    }
  ];

  return (
    <section className="w-full py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <div className="w-px h-16 bg-[#003262] mx-auto mb-4"></div>
          <h2 className="heading-xl text-4xl md:text-5xl mb-4">
            Our Team
          </h2>
          <p className="text-gray-700 text-[15px]">
            Our team consists of experienced and dynamic individuals, who drive the institution with a passion to impart quality education and are committed to the overall development of the students.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {team.map((member, idx) => (
            <div key={idx} className="relative group w-full h-[380px] overflow-hidden rounded-sm shadow-sm cursor-pointer flex flex-col border border-gray-100">
              <div className="relative w-full h-full flex-grow">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-fill object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className={`${member.bgColor} w-full py-3 px-2 text-center relative z-10 transition-transform duration-300 group-hover:translate-y-full`}>
                <h3 className="text-white font-bold text-lg">{member.name}</h3>
                <p className="text-white/80 text-xs mt-1">{member.title}</p>
              </div>
              <div className={`absolute inset-0 ${member.bgColor} opacity-0 group-hover:opacity-95 transition-all duration-300 flex flex-col items-center justify-center p-5 text-center z-20 translate-y-full group-hover:translate-y-0`}>
                <h3 className="text-white font-bold text-xl mb-1">{member.name}</h3>
                <p className="text-white/90 text-xs font-medium mb-4 pb-3 border-b border-white/20 w-3/4 mx-auto">{member.title}</p>
                <div className="text-white/90 text-[12px] leading-relaxed overflow-y-auto custom-scrollbar text-left whitespace-pre-line">
                  {member.bio}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function PhilosophyPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <HomeNavbar />
      <AboutHero />
      <AboutIntroduction />
      <AboutValues />
      <AboutPillars />
      <AboutTabs />
      <AboutTeam />
      <Footer />
    </main>
  );
}
